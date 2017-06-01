import React from "react";
import {connect} from "react-redux";
import Modal from "./modal.js";
import {hideModal} from "../store/actions.js";

function ActionModal({title, message, action, cb, hideModal}) {
  return (
    <Modal title={title} message={message}>
      <button className="cancel" onClick={() => hideModal()}>Cancel</button>
      <button className="confirm" onClick={() => hideModal(action, cb)}>Confirm</button>
    </Modal>
  );
}

function mapState(state) {
  const modal = state.get("modal");
  return {
    title: modal.get("title"),
    message: modal.get("message"),
    action: modal.get("action"),
    cb: modal.get("cb")
  };
}

export default connect(mapState, {hideModal})(ActionModal);
