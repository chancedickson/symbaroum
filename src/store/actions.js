import {
  UPDATE_CHARACTERS,
  SHOW_MODAL,
  HIDE_MODAL,
  READ_MESSAGES,
  SET_MESSAGE,
  SET_PAGE_SIZE
} from "./action_consts";

export function updateCharacters(keyPath, value) {
  return {type: UPDATE_CHARACTERS, keyPath, value};
}

export function showModal(message, action, cb) {
  return {type: SHOW_MODAL, message, action, cb};
}

export function hideModal(action, cb) {
  return (dispatch) => {
    dispatch({type: HIDE_MODAL, action});
    if (cb) cb();
  };
}

export function readMessages() {
  return {type: READ_MESSAGES};
}

export function setMessage(i) {
  return {type: SET_MESSAGE, message: i};
}

export function setPageSize(pageSize) {
  return {type: SET_PAGE_SIZE, pageSize};
}
