import React, {useEffect, useState, useRef} from 'react';
import authClient from "./services/auth";
import Login from "./pages/vendor/Login";
import Logout from "./pages/vendor/Logout";
import Dashboard from "./pages/vendor/Dashboard";
import { token } from "./reducers/reducers";
import { useDispatch} from "react-redux";
import {Switch, Route, Redirect, useHistory,} from 'react-router-dom';
import ProtectedRoute from "./routes/ProtectedRoutes";
import Packages from './pages/vendor/Packages';
import FooterMenu from "./parts/vendor/FooterMenu";
import SendPackage from "./pages/vendor/SendPackage";
import Success from "./pages/vendor/Success";
import LoadingBar from 'react-top-loading-bar';
// import MapPage from "./pages/vendor/MapPage";
import Echo from 'laravel-echo';
import { location } from "./reducers/locateReducer";
import './assets/global.css';
import './antdTheme.less';
import MapSearch from "./pages/vendor/MapSearch";
import Pusher from "pusher-js"

const App = () => {

    const ref = useRef(null)
    const [loggedIn, setLoggedIn] = React.useState(
        localStorage.getItem('loggedIn') == 'true' || false
    );
    const [getPathname, setPathname] = useState(null)
    const history = useHistory()

    const dispatch = useDispatch()
    const login = (response) => {
        setLoggedIn(true);
        dispatch(token(response))
        localStorage.setItem('_token', response)
        localStorage.setItem('loggedIn', true);
    };

    const logout = () => {
        authClient().post('logout')
            .then( response => {
                if (response.status === 200) {
                    localStorage.setItem('loggedIn', false);
                    setLoggedIn(false)
                }
            })
    };

    useEffect(() => {
        // websocket listen
        const options = {
            broadcaster: process.env.REACT_APP_BROADCAST,
            key: process.env.REACT_APP_PUSHER_KEY,
            cluster: 'ap2',
            wsHost: '127.0.0.1',
            wsPort: 6001,
            forceTLS: false,
            encrypted: false,
            disableStats: true,
            enabledTransports: ['ws'],
        };

        const echo = new Echo(options);
        echo.connector.pusher.config.authEndpoint = `http://127.0.0.1:8000/broadcasting/auth`;

        echo.channel(`testChannel`).listen('.server.created',(data) => {
            dispatch(location({lat: data.lat, long: data.long}))
        });


        // redirect if base
        if(window.location.pathname === '/')
            history.push('/login')
            
        ref.current.complete()

    }, [])

    useEffect(() => {
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

            <div className={ loggedIn && window.location.pathname !== "/map-search" ? 'App mb-100' : 'App'} >
              <Switch>

                  /*vendo routes */

                  <Route exact path={'/'} />
                  <Route exact render={props =>
                      !loggedIn ? (
                      <Login {...props} login={login} />
                        ) : (
                        <Redirect to={{ pathname: '/dashboard' }} />
                      )} path="/login" />

                  <ProtectedRoute path={ "/dashboard" } component={ Dashboard } auth={loggedIn}/>
                  {/*<ProtectedRoute path={ "/map" } component={ MapPage } auth={loggedIn}/>*/}
                  <ProtectedRoute path={ "/map-search" } component={ MapSearch } auth={loggedIn}/>
                  <ProtectedRoute path={ "/package" } component={ Packages } auth={loggedIn}/>
                  <ProtectedRoute path={ "/package-form" } component={ SendPackage } auth={loggedIn}/>
                  <ProtectedRoute path ={ "/Success" } component={ Success } auth={loggedIn} />

                  <Route exact render={props =>
                      (<Logout {...props} logout={logout} />
                      )} path="/logout" />

              </Switch>

              {  loggedIn && window.location.pathname !== "/map-search" ?
                  <FooterMenu />  : ''
              }
          </div>
        </div>
    )
}

export default App;
