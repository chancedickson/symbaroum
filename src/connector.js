import React, { createContext, component } from "react";

const context = createContext();

export const Provider = context.Provider;

function normalizeReducers(reducers) {
  if (typeof reducers === "function" && reducers.name !== "") {
    return { [reducers]: reducers.name };
  } else if (typeof reducers === "function") {
    throw new Error("connect() given a single reducer without a name.");
  } else if (Array.isArray(reducers)) {
    return reducers.reduce((reducer, reducers) => {
      if (reducer.name !== "") {
        return { ...reducers, [reducer]: reducer.name };
      }
      throw new Error(
        "connect() given an array of reducers, one of which does not have a name.",
      );
    }, {});
  } else if (typeof reducers === "object") {
    return reducers;
  }
  throw new Error(
    "connect() given an argument it doesn't understand in the first position.",
  );
}

export function connect(desiredData, mapStateToProps, mapStateToDispatch) {
  const reducerMap = normalizeReducers(desiredData);

  return (Component) => (ownProps) => (
    <Consumer>
      {(store) => {
        const fullState = store.getState();
        const reducers = state._reducers;
        const props = reducers;
        const props = mapStateToProps(state.getState());
      }}
    </Consumer>
  );
}
