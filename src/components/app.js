import Preact from "preact";
import {connect} from "react-redux";
import {Route, Redirect, Switch} from "react-router-dom";
import {CharacterEditor} from "./character_editor";
import {CharacterSelector} from "./character_selector.js";
import {ActionModal} from "./action_modal.js";
import {MessageModal} from "./message_modal.js";
import {messages} from "../data";

function getModal(unreadMessages, modal) {
  if (unreadMessages) {
    return <MessageModal />;
  } else if (modal) {
    return <ActionModal />;
  }
}

function mapState(state) {
  return {
    modal: state.has("modal"),
    unreadMessages: state.get("readMessages", 0) < messages.length,
    printing: state.get("printing", false)
  };
}

export function AppView({modal, unreadMessages}) {
  return (
    <div className="app-container">
      <div className="app">
        {getModal(unreadMessages, modal)}
        <Switch>
          <Route exact path="/" component={CharacterSelector} />
          <Route path="/character/:id" component={CharacterEditor} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}

export const App = connect(mapState)(AppView);
