import Immutable from "immutable";

function filter(map, keys) {
  if (keys) {
    return map.filter((v, k) => keys.includes(k));
  }
  return map;
}

export function LocalStorageBacked(key, defaultState = {}, savedKeys) {
  return {
    middleware: (store) => (next) => (action) => {
      const ret = next(action),
        state = store.getState(),
        savableState = filter(state, savedKeys),
        obj = savableState.toJS(),
        json = JSON.stringify(obj);
      localStorage.setItem(key, json);
      return ret;
    },
    initial: () => {
      if (localStorage.getItem(key)) {
        const json = localStorage.getItem(key),
          obj = JSON.parse(json);
        return Immutable.fromJS(obj);
      }
      return defaultState;
    }
  };
}
