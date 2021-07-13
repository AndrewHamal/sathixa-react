import React, {useEffect, useState, useRef} from 'react';
import Login from "@/pages/vendor/Login";
import LoginRider from "@/pages/rider/Login";
import Logout from "./pages/vendor/Logout";
import { useDispatch, useSelector } from "react-redux";
import {Switch, Route, Redirect, useHistory, BrowserRouter as Router} from 'react-router-dom';
import ProtectedRoute from "./routes/ProtectedRoutes";
import LoadingBar from 'react-top-loading-bar';
import './assets/global.css';
import './antdTheme.less';
import Notif from "./pages/rider/Notif";
import Delivery from "./pages/rider/Delivery";
import ProfileEdit from "./pages/rider/ProfileEdit";
import Documents from "./pages/rider/Documents";
import ProfileRider from "./pages/rider/ProfileRider";
import authClient from '@/services/auth';

import { isAuthRider, setToken } from "@/reducers/rider/reducers"

import VendorLayout from "@/components/vendor/layouts"
import vendorRoutes from "@/routes/vendor"

import RiderLayout from "@/components/rider/layouts"
import riderRoutes from "@/routes/rider"

import { vendorAuth } from "@/reducers/reducers"

import authClientInstance from "@/services/rider/auth"

import Test from "@/pages/test"

const App = () => {

    const ref = useRef(null)
    const dispatch = useDispatch()

    const isRiderAuth = useSelector(isAuthRider)

    const isVendorAuth = useSelector(vendorAuth)

    const [getPathname, setPathname] = useState(null)
    const history = useHistory()

    // vendor routes collection 
    const [vendorRoute, setVendorRoute] = useState({
      path: [],
      comp: [],
    });

    const prepareVendorRoute = () => {
      let tempPath = [],
      tempComp = [];
   
      Object.keys(vendorRoutes).forEach((v, i) => {
        tempPath.push(Object.values(vendorRoutes)[i].path);
        tempComp.push(Object.values(vendorRoutes)[i].component);
      })

      setVendorRoute({
        ...vendorRoute,
        path: tempPath,
        comp: tempComp,
      });
    }

    // rider routes collection 
    const [riderRoute, setRiderRoute] = useState({
      path: [],
      comp: [],
    });

    const prepareRiderRoute = () => {
      let tempPath = [],
      tempComp = [];
   
      Object.keys(riderRoutes).forEach((v, i) => {
        tempPath.push(Object.values(riderRoutes)[i].path);
        tempComp.push(Object.values(riderRoutes)[i].component);
      })

      setRiderRoute({
        ...riderRoute,
        path: tempPath,
        comp: tempComp,
      });
    }

    const logout = () => {
      authClient.post('logout')
        .then( response => {
            if (response.status === 200) {
                localStorage.setItem('loggedIn', false);
                // setLoggedIn(false)
            }
        })
    };

    // global error handeling 
    useEffect(() => {
    
      prepareRiderRoute()
      prepareVendorRoute()

      if(history.location.pathname === '/'){
        history.push('/rider/login')
      }
  
      authClientInstance.interceptors.response.use(
        (response) => Promise.resolve(response),
        (error) => {
          const { response } = error;

          if (!response.status){
            return Promise.reject(response);
          }

          if (response.status === 500) {
            // notifyAnt['error']({message:"Somthing went wrong. please try again"})
          }

          if (response.status === 401) { //Unauthenticated
            dispatch(setToken(false));
            window.localStorage.removeItem('_riderToken');
            history.push("/rider/login");
            // notifyAnt['error']({message:"Session expired"})
          }

          return Promise.reject(response);
        },
      );

    }, [])


    useEffect(() => {
      console.log(isVendorAuth)
        const listener = history.listen(() => {
          if(typeof ref?.current !== "undefined"){
            ref?.current?.continuousStart();
            setPathname(prev => prev + 1)
          }
        })
        return () => {
          listener();
        }
    
    }, [history])

    useEffect(() => {
        const completeLoader = () => {
          if(typeof ref?.current !== "undefined") {
            setTimeout(() => {
              ref?.current?.complete()
            }, 600)
          }
        }
    
        return () => {
          completeLoader()
        }
     
      }, [getPathname])

    // loader init

    return (
        <div>
            <LoadingBar color='#f11946' ref={ref} />

            <div className={ isVendorAuth && window.location.pathname !== "/map-search" ? 'App mb-100' : 'App'} >
              <Switch>
                <Route exact path={"/notif"} component={Notif} />
                <Route exact path={"/delivery"} component={Delivery} />
                <Route exact path={"/ProfileEdit"} component={ProfileEdit} />
                <Route exact path={"/Documents"} component={Documents} />
                <Route exact path={"/ProfileRider"} component={ProfileRider} />


                {/* common route  */}
                <Route exact path={"/test"} component={Test} />


                {/* Rider routes  */}
                {history.location.pathname.match('/rider') ?
                <Router exact basename="/rider">
                  <Switch>
                    <Route exact render={props =>
                      !isRiderAuth ? (
                      <LoginRider {...props}/>
                        ) : (
                        <Redirect to={{ pathname: '/dashboard' }} />
                      )} path="/login" />

                    <RiderLayout 
                      mainHistory={history} 
                      isAuth={isRiderAuth}
                    >
                        {riderRoute?.path?.map((v, i) => (
                          <ProtectedRoute exact path={ v } key={i} auth={isRiderAuth}>
                            {riderRoute.comp[i]}
                          </ProtectedRoute>
                          ))
                        }
                    </RiderLayout>
                  </Switch>
                </Router> : "" }  
                {/* Rider routes end */}

                  
                {/* vendor routes  */}
                {history.location.pathname.match('/vendor') ?
                <Router exact basename="/vendor">
                  <Switch>
                    <Route exact render={props =>
                      !isVendorAuth ? (
                      <Login {...props}/>
                        ) : (
                        <Redirect to={{ pathname: '/dashboard' }} />
                    )} path="/login" />  

                    <VendorLayout 
                      mainHistory={history} 
                      isAuth={isVendorAuth}
                    >
                        {vendorRoute?.path?.map((v, i) => (
                          <ProtectedRoute exact path={ v } key={i} auth={isVendorAuth}>
                            {vendorRoute.comp[i]}
                          </ProtectedRoute>
                          ))
                        }
                    </VendorLayout>
                  </Switch>
                </Router> : "" }
          
                {/* vendor routes end */}

                <Route exact render={props =>
                    (<Logout {...props} logout={logout} />
                    )} path="/logout" />

              </Switch>

              {/* {  loggedIn && window.location.pathname !== "/map-search" ?
                   : ''
              } */}
          </div>
        </div>
    )
}

export default App;
