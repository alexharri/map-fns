<h1 align="center">
  <code>map-fns</code>
</h1>

<p align="center">
Easily manipulate key-value stores in the browser and Node.js.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/map-fns" target="_blank">
    <img src="https://img.shields.io/npm/v/map-fns.svg?style=flat" />
  </a>
  <img src="https://img.shields.io/github/checks-status/alexharri/map-fns/master" />
</p>

---

## Why `map-fns`?

- __Zero dependencies__: Keep your deployments and node modules lightweight.
- __Modular__: Import the functions you need, tree-shake the rest.
- __Immutable & Pure__: Function arguments are not modified and new objects are returned.
- __TypeScript__: Well documented and fully typed.
- __Normal JavaScript objects__: Keeps things simple. No custom classes.
- __Open Source__: MIT licensed. 

```tsx
import { mergeInMap } from "map-fns";

const map = {
  alice: {
    name: "Alice",
    permissions: ["view"],
  },
  bob: {
    name: "Bob",
    permissions: ["view", "merge", "push"],
  },
};

const newMap = mergeInMap(map, ["alice"], {
  permissions: (list) => [...list, "merge"],
});

console.log(newMap);
// > {
//     alice: {
//       name: "Alice",
//       permissions: ["view", "merge"],
//     },
//     bob: {
//       name: "Bob",
//       permissions: ["view", "merge", "push"],
//     },
//   }
```

`map-fns` supports tree-shaking. If your environment does not you can import a specific function directly.

```tsx
import mergeInMap from "map-fns/mergeInMap";
```
