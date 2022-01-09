type Key = string | number;

export interface AnyMap {
  [key: Key]: any;
}

export interface MapOf<T> {
  [key: Key]: T;
}

export type ItemInMap<M extends AnyMap, T extends M[keyof M] = M[keyof M]> = T;

export type FilterType<T, U, K extends keyof T = keyof T> = {
  [_K in K as T[_K] extends U ? _K : never]: T[_K];
};

export type KeysOfFilteredType<T, U> = keyof FilterType<T, U> &
  (string | number);
