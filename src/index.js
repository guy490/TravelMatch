import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import reducers from "./Redux/Reducers"; // default going to index.js

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
