import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import store from "./store";
import {BrowserRouter as Router} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import Echo from "laravel-echo";
require('dotenv').config()

ReactDOM.render(
      <Provider store={store}>
          <Router>
            <App />
          </Router>
      </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
