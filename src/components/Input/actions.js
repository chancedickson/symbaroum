export const SET_INPUT_VALUE = "SET_INPUT_VALUE";

export function setInputValue(id, value) {
  return {
    type: SET_INPUT_VALUE,
    payload: { id, value },
  };
}
