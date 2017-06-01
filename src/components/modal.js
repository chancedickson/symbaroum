import React from "react";

function getMessage(m, rawHtml) {
  if (rawHtml) {
    return <p dangerouslySetInnerHTML={{__html: m}} />;
  }
  return <p>{m}</p>;
}

function Modal({title, message, children, rawHtml = false}) {
  return (
    <div className="modal">
      <div className="modal-inner">
        <h1>{title || "Confirm"}</h1>
        {getMessage(message, rawHtml)}
        <div className="modal-buttons">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
