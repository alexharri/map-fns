/** @internal */
type Key = string | number;

/** @internal */
export interface AnyMap {
  [key: Key]: any;
}

/** @internal */
export interface MapOf<T> {
  [key: Key]: T;
}

/** @internal */
export type ItemInMap<M extends AnyMap> = M[keyof M];

/** @internal */
export type FilterType<T, U, K extends keyof T = keyof T> = {
  [_K in K as T[_K] extends U ? _K : never]: T[_K];
};

/** @internal */
export type KeysOfFilteredType<T, U> = keyof FilterType<T, U> & string;
