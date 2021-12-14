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
