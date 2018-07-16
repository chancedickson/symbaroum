import { reduceObject } from "./";

export function mapValues(o, mapper) {
  return reduceObject(
    o,
    (o, v, k) => {
      return {
        ...o,
        [k]: mapper(v, k),
      };
    },
    {},
  );
}
