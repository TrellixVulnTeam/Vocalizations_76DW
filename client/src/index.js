import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import logger from "redux-logger";

import reducers from "./reducers";

import App from "./App";
import './index.css';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk, logger)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
