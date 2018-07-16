export function reduceObject(obj, reducer, initialState) {
  if (!initialState) {
    throw new Error("An initial state is required with reduceObject().");
  }

  return Object.keys(obj).reduce((acc, key) => {
    return reducer(acc, obj[key], key);
  }, initialState);
}
