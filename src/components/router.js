import Preact from "preact";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {ScrollToTop} from "./scroll_to_top.js";
import {App} from "./app.js";
import {PrintSheet} from "./print_sheet.js";

export function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path="/character/:id/print" component={PrintSheet} />
          <Route path="/" component={App} />
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  );
}
