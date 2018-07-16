/**
 * The purpose of this module is to augment Redux's createStore to...
 *
 * 1. Accept an object tree mapping strings to reducer functions in the shape
 *    you want your state tree to be in.
 * 2. Maintain a mapping of the reducer function names to where they are in
 *    the state tree.
 *
 * This gives a few benefits.
 *
 * 1. You can look-up where a reducer function is in the state tree. With a
 *    connect() function that utilizes this, you could "connect" to specific
 *    reducers, decoupling mapStateToProps() from the state shape.
 * 2. The state tree is flattened during this process, making dispatching
 *    actions to nested reducers iterative instead of recursive.
 */

import { mapValues, reduceObject } from "./util";

function compileReducersInner({ reducers, reducerByName }, value, key) {
  if (typeof key !== "string") {
    throw new Error(
      `Keys in the reducer tree must be strings. Received ${JSON.stringify(
        key,
      )}.`,
    );
  } else if (
    // value is not a function or an object
    typeof value !== "function" &&
    (typeof value !== "object" || Array.isArray(value))
  ) {
    throw new Error(
      `Values in the reducer tree must be either functions or objects. Received ${JSON.stringify(
        value,
      )}.`,
    );
  } else if (typeof value === "function") {
    return {
      reducers: [...reducers, value],
      reducerByName: {
        ...reducerByName,
        [value.name]: [key],
      },
    };
  }

  const compiledLeaf = compileReducerTree(value);
  const updatedLeafMap = mapValues(compiledLeaf.reducerByName, (value) => [
    key,
    ...value,
  ]);

  return {
    reducers: [...reducers, ...compiledLeaf.reducers],
    reducerByName: { ...reducerByName, ...updatedLeafMap },
  };
}

export function compileReducerTree(tree) {
  const { reducers, reducerByName } = reduceObject(tree, compileReducersInner, {
    reducers: [],
    reducerByName: {},
  });

  return {
    reducers,
    reducerByName,
    reducer(state = Map(), action) {
      return reducers.reduce((reducer) => {
        const path = reducerByName[reducer.name];
        const newState = reducer(state.getIn(path), action);
        return state.setIn(path, newState);
      });
    },
  };
}

export function silo(createStore) {
  return (...args) => {
    const reducerTree = args[0];
    let { reducers, reducerByName, reducer } = compileReducerTree(reducerTree);
    const createStoreArgs = [reducer, args.slice(1)];
    const store = createStore(...createStoreArgs);

    return {
      ...store,
      getReducerPath: (reducer) => reducerByName[reducer.name],
      replaceReducer: (reducerTree) => {
        const compiled = compileReducerTree(reducerTree);
        reducers = compiled.reducers;
        reducerByName = compiled.reducerByName;
        reducer = compiled.reducer;

        store.replaceReducer(reducer);
      },
    };
  };
}
