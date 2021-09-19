import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk"; // lets you write async logic that interacts with the store
// import logger from "redux-logger";

// root reducer function is responsible for handling all of the actions that are dispatched, and calculating what the entire new state result should be every time
import reducers from "./reducers"; 

import App from "./App";
import './index.css';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk))); // use logger here

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
