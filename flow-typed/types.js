// @flow

declare var module: {
  hot: {
    accept: (path: string, callback: () => void) => void,
  },
};

declare type Action<A, B> = {
  type: A,
  payload: B,
};
