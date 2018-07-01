// @flow

import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

function render() {
  const element = document.getElementById("__react-root");
  if (element) {
    ReactDOM.render(<App />, element);
  }
}

if (module && module.hot) {
  module.hot.accept("./App.jsx", render);
}
render();
