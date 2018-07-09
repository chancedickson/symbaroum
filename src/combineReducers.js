function normalizeReducers(reducers) {
  if (typeof reducers !== "object") {
    throw new Error(
      "The first parameter given to combineReducers() must be an array of named functions or an map of strings to reducer functions.",
    );
  } else if (
    Array.isArray(reducers) &&
    reducers.any((reducer) => reducer.name === "")
  ) {
    throw new Error("Reducer given to combineReducers() without a name.");
  } else if (Array.isArray(reducers)) {
    return reducers.reduce(
      (reducer, reducerMap) => ({
        ...reducerMap,
        [reducer]: reducer.name,
      }),
      {},
    );
  }
}

function combineReducers(reducers) {
  const reducerMap = normalizeReducers(reducers);
  const defaultState = Object.keys(reducerMap).map(
    (reducerFunc, state) => ({
      ...state,
      [reducerMap[reducerFunc]]: reducerFunc(undefined, initAction),
    }),
    {
      _reducers: reducerMap,
    },
  );
}
