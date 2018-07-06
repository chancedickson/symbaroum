import { SET_INPUT_VALUE } from "./actions";

const defaultState = {};

export function reducer(state = defaultState, action) {
  if (action.type === SET_INPUT_VALUE) {
    return { ...state, [action.payload.id]: action.payload.value };
  }
  return state;
}
