import React from "react";
import { connect } from "react-redux";
import uuid from "uuid/v4";

export const SET_INPUT_VALUE = "SET_INPUT_VALUE";
const defaultState = {};

export function setInputValue(id, value) {
  return {
    type: SET_INPUT_VALUE,
    payload: { id, value },
  };
}

export function reducer(state = defaultState, action) {
  if (action.type === SET_INPUT_VALUE) {
    return { ...state, [action.payload.id]: action.payload.value };
  }
  return state;
}

function mapStateToProps({ inputs }, ownProps) {
  const id = ownProps.id || uuid();
  return {
    value: inputs[id] || ownProps.defaultValue,
  };
}

function mapDispatchToProps(dispatch, { id }) {
  return {
    onChange: function onChange(e) {
      dispatch(setInputValue(id, e.target.value));
    },
  };
}

export function InputRender({ value, onChange }) {
  return <input value={value} onChange={onChange} />;
}

export const Input = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputRender);
