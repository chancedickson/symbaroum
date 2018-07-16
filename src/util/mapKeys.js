import { reduceObject } from "./";

export function mapKeys(o, mapper) {
  return reduceObject(
    o,
    (o, v, k) => {
      return {
        ...o,
        [mapper(v, k)]: v,
      };
    },
    {},
  );
}
