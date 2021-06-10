import React, { useEffect, useState, useRef } from "react";
import Send from "./pages/vendor/send";
import authClient from "./services/auth";
import Login from "./pages/vendor/Login";
import Logout from "./pages/vendor/Logout";
import Dashboard from "./pages/vendor/Dashboard";
import { token } from "./reducers/reducers";
import { useDispatch } from "react-redux";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Packages from "./pages/vendor/Packages";
import FooterMenu from "./parts/vendor/FooterMenu";
import SendPackage from "./pages/vendor/SendPackage";
import Success from "./pages/vendor/Success";
import LoadingBar from "react-top-loading-bar";
import MapPage from "./pages/vendor/MapPage";
import Echo from "laravel-echo";
import { location } from "./reducers/locateReducer";
import "./antdTheme.less";
import Pusher from "pusher-js";
import Notif from "./pages/vendor/Notif";
import Delivery from "./pages/vendor/Delivery";

const App = () => {
  const ref = useRef(null);
  const [loggedIn, setLoggedIn] = React.useState(
    localStorage.getItem("loggedIn") == "true" || false
  );
  const history = useHistory();

  const dispatch = useDispatch();
  const login = (response) => {
    setLoggedIn(true);
    dispatch(token(response));
    localStorage.setItem("_token", response);
    localStorage.setItem("loggedIn", true);
  };

  const logout = () => {
    authClient()
      .post("logout")
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("loggedIn", false);
          setLoggedIn(false);
        }
      });
  };

  useEffect(() => {
    // websocket listen
    const options = {
      broadcaster: process.env.REACT_APP_BROADCAST,
      key: process.env.REACT_APP_PUSHER_KEY,
      cluster: "ap2",
      wsHost: "127.0.0.1",
      wsPort: 6001,
      forceTLS: false,
      encrypted: false,
      disableStats: true,
      enabledTransports: ["ws"],
    };

    const echo = new Echo(options);
    echo.connector.pusher.config.authEndpoint = `http://127.0.0.1:8000/broadcasting/auth`;

    echo.channel(`testChannel`).listen(".server.created", (data) => {
      dispatch(location({ lat: data.lat, long: data.long }));
    });

    // redirect if base
    if (window.location.pathname === "/") history.push("/login");

    history.listen((param) => {
      if (ref) ref.current.continuousStart();
      checkDom();
    });

    const checkDom = () => {
      if (document.readyState === "complete") {
        if (ref) ref.current.complete();
      } else {
        ref.current.complete();
      }
    };
  });

  return (
    <div>
      <LoadingBar color="#f11946" ref={ref} />

      <div className="App mb-100">
        <Switch>
          /*vendo routes */
          <Route exact path={"/"} />
          <Route exact path={"/send"} component={Send} />
          <Route exact path={"/notif"} component={Notif} />
          <Route exact path={"/delivery"} component={Delivery} />
          <Route
            exact
            render={(props) =>
              !loggedIn ? (
                <Login {...props} login={login} />
              ) : (
                <Redirect to={{ pathname: "/dashboard" }} />
              )
            }
            path="/login"
          />
          <ProtectedRoute
            path={"/dashboard"}
            component={Dashboard}
            auth={loggedIn}
          />
          <ProtectedRoute path={"/map"} component={MapPage} auth={loggedIn} />
          <ProtectedRoute
            path={"/package"}
            component={Packages}
            auth={loggedIn}
          />
          <ProtectedRoute
            path={"/package-form"}
            component={SendPackage}
            auth={loggedIn}
          />
          <ProtectedRoute
            path={"/Success"}
            component={Success}
            auth={loggedIn}
          />
          <Route
            exact
            render={(props) => <Logout {...props} logout={logout} />}
            path="/logout"
          />
        </Switch>

        {loggedIn ? <FooterMenu /> : ""}
      </div>
    </div>
  );
};

export default App;
