import React, {useEffect, useState, useRef} from 'react';
import Login from "@/pages/vendor/Login";
import LoginRider from "@/pages/rider/Login";
import Logout from "./pages/vendor/Logout";
import { useDispatch, useSelector } from "react-redux";
import {Switch, Route, Redirect, useHistory, BrowserRouter as Router} from 'react-router-dom';
import ProtectedRoute from "./routes/ProtectedRoutes";
import LoadingBar from 'react-top-loading-bar';
// import MapPage from "./pages/vendor/MapPage";
import { location } from "./reducers/locateReducer";
import './assets/global.css';
import './antdTheme.less';
import Notif from "./pages/rider/Notif";
import Delivery from "./pages/rider/Delivery";
import ProfileEdit from "./pages/rider/ProfileEdit";
import Pack from "./pages/rider/Pack";
import Documents from "./pages/rider/Documents";
import ProfileRider from "./pages/rider/ProfileRider";
import PackageTrack from "./pages/rider/PackageTrack";
import authClient from '@/services/auth';

import { isAuthRider } from "@/reducers/rider/reducers"

import VendorLayout from "@/components/vendor/layouts"
import vendorRoutes from "@/routes/vendor"

import RiderLayout from "@/components/rider/layouts"
import riderRoutes from "@/routes/rider"

import { vendorAuth } from "@/reducers/reducers"

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

  
      // authClient.interceptors.response.use(
      //   (response) => Promise.resolve(response),
      //   (error) => {
      //     const { response } = error;

      //     if (!response.status){
      //       return Promise.reject(response);
      //     }

      //     if (response.status === 500) {
      //       // notifyAnt['error']({message:"Somthing went wrong. please try again"})
      //     }

      //     if (response.status === 401) { //Unauthenticated
      //       // dispatch(checkAuth(false));
      //       // window.localStorage.removeItem('_token');
      //       // history.push("/login");
      //       // notifyAnt['error']({message:"Session expired"})
      //     }

      //     return Promise.reject(response);
      //   },
      // );

    }, [])

    useEffect(() => {
        // websocket listen
   
        // redirect if base
        // if(window.location.pathname === '/')
        //     history.push('/vendor/login')
            
        // ref.current.complete()

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
                <Route exact path={"/PackageTrack"} component={PackageTrack} />
                <Route exact path={"/Documents"} component={Documents} />
                <Route exact path={"/ProfileRider"} component={ProfileRider} />


                {/* common route  */}
                {/* <Route exact path={"/map-search"} component={MapSearch} /> */}


                {/* Rider routes  */}
                <Route exact render={props =>
                !isRiderAuth ? (
                <LoginRider {...props}/>
                  ) : (
                  <Redirect to={{ pathname: '/rider/dashboard' }} />
                )} path="/rider/login" />

                {
                  isRiderAuth ? 
                  <Router exact basename="/rider">
                  <RiderLayout mainHistory={history}>
                       {riderRoute?.path?.map((v, i) => (
                         <ProtectedRoute path={ v } key={i} auth={isRiderAuth}>
                           {riderRoute.comp[i]}
                         </ProtectedRoute>
                         ))
                       }
                  </RiderLayout>
                </Router> : "" }            
                {/* Rider routes end */}

                  
                {/* vendor routes  */}
                <Route exact render={props =>
                  !isVendorAuth ? (
                  <Login {...props}/>
                    ) : (
                    <Redirect to={{ pathname: '/vendor/dashboard' }} />
                )} path="/vendor/login" />  
                
                {isVendorAuth ? 

                <Router exact basename="/vendor">
                  <VendorLayout>
                      {vendorRoute?.path?.map((v, i) => (
                        <ProtectedRoute path={ v } key={i} auth={isVendorAuth}>
                          {vendorRoute.comp[i]}
                        </ProtectedRoute>
                        ))
                      }
                  </VendorLayout>
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
