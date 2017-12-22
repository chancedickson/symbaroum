import "./index.scss";
import Preact from "preact";
import {Provider} from "react-redux";
import {Router} from "./components/router.js";
import {store} from "./store/index.js";

const component = (
  <Provider store={store}>
    <Router />
  </Provider>
);

Preact.render(component, document.body);
