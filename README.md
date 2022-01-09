# `map-fns`

Easily manipulate key-value stores in the browser and Node.js.

---

## Why `map-fns`?

- __Zero dependencies__: Keep your deployments and node modules lightweight.
- __Modular__: Import the functions you need, tree-shake the rest.
- __Immutable & Pure__: Function arguments are not modified and new objects are returned.
- __TypeScript__: Well documented and fully typed.
- __Normal JavaScript objects__: Keeps things simple. No custom classes.

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

const newMap = mergeInMap(map, "alice", {
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

`map-fns` supports tree-shaking, but if your environment does not you can import a specific function directly.

```tsx
import mergeInMap from "map-fns/mergeInMap";
```
