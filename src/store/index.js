import {Map, List} from "immutable";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {LocalStorageBacked} from "./local_storage_backed.js";
import {messages} from "../data/index.js";
import {
  UPDATE_CHARACTERS,
  SHOW_MODAL,
  HIDE_MODAL,
  READ_MESSAGES,
  SET_MESSAGE,
  SET_PAGE_SIZE
} from "./action_consts";

const defaultState = Map({characters: List()});

function reducer(state = {}, action) {
  switch (action.type) {
  case UPDATE_CHARACTERS:
    return state.setIn(["characters"].concat(action.keyPath), action.value);
  case SHOW_MODAL:
    return state.set("modal",
      Map({message: action.message, action: action.action, cb: action.cb}));
  case HIDE_MODAL:
    if (action.action) {
      return reducer(state, action.action).delete("modal");
    }
    return state.delete("modal");
  case READ_MESSAGES:
    return state.set("readMessages", messages.length);
  case SET_MESSAGE:
    return state.set("currentMessage", action.message);
  case SET_PAGE_SIZE:
    return state.set("pageSize", action.pageSize);
  default:
    return state;
  }
}

const localStorage = LocalStorageBacked("state", defaultState, ["characters", "readMessages", "pageSize"]),
  middleware = applyMiddleware(localStorage.middleware, thunk);

export const store = createStore(reducer, localStorage.initial(), middleware);
