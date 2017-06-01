import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import Router from "./components/router.js";
import store from "./store/index.js";

const component = (
  <Provider store={store}>
    <Router />
  </Provider>
);

ReactDOM.render(component, document.getElementById("react-root"));
