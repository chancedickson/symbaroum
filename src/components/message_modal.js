import Preact from "preact";
import {connect} from "react-redux";
import {Modal} from "./modal.js";
import {setMessage, readMessages} from "../store/actions.js";
import {messages} from "../data";

function mapState(state) {
  return {
    currentMessage: state.has("currentMessage") ?
      state.get("currentMessage") :
      state.get("readMessages", 0)
  };
}

function MessageModalView({currentMessage, setMessage, readMessages}) {
  return (
    <Modal title={messages[currentMessage].title} message={messages[currentMessage].message} rawHtml={true}>
      <button className="close" onClick={readMessages}>Close</button>
      <button className="prev" disabled={currentMessage === 0}
        onClick={() => setMessage(currentMessage - 1)}>Previous</button>
      <button className="next" disabled={currentMessage === messages.length - 1}
        onClick={() => setMessage(currentMessage + 1)}>Next</button>
    </Modal>
  );
}

export const MessageModal = connect(mapState, {setMessage, readMessages})(MessageModalView);
