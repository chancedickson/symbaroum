import {
  UPDATE_CHARACTERS,
  SHOW_MODAL,
  HIDE_MODAL,
  READ_MESSAGES,
  SET_MESSAGE,
  SET_PAGE_SIZE
} from "./action_consts";

function updateCharacters(keyPath, value) {
  return {type: UPDATE_CHARACTERS, keyPath, value};
}

function showModal(message, action, cb) {
  return {type: SHOW_MODAL, message, action, cb};
}

function hideModal(action, cb) {
  return (dispatch) => {
    dispatch({type: HIDE_MODAL, action});
    if (cb) cb();
  };
}

function readMessages() {
  return {type: READ_MESSAGES};
}

function setMessage(i) {
  return {type: SET_MESSAGE, message: i};
}

function setPageSize(pageSize) {
  return {type: SET_PAGE_SIZE, pageSize};
}

export {
  updateCharacters,
  showModal,
  hideModal,
  readMessages,
  setMessage,
  setPageSize
};
