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
  <a href="https://github.com/alexharri/map-fns/actions/workflows/publish.yml" target="_blank">
    <img src="https://img.shields.io/github/workflow/status/alexharri/map-fns/Publish%20to%20npm" />
  </a>
  <a href="https://app.codecov.io/gh/alexharri/map-fns" target="_blank">
    <img src="https://img.shields.io/codecov/c/gh/alexharri/map-fns" />
  </a>
  <a href="https://github.com/alexharri/map-fns/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/alexharri/map-fns" />
  </a>
</p>

---

## Why `map-fns`?

- __Zero dependencies__: Keep your deployments and node modules lightweight.
- __Modular__: Import the functions you need, tree-shake the rest.
- __Immutable & Pure__: Function arguments are not modified and new objects are returned.
- __TypeScript__: Well documented and fully typed.
- __Plain JavaScript objects__: Keep things simple. No custom classes.
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

mergeInMap(map, "alice", {
  permissions: (permissions) => [...permissions, "merge"],
});
//=> {
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


# Functions

`map-fns` exports a variety of functions that can be used to easily manipulate key-value stores.

 * addListToMap
 * areMapsShallowEqual
 * mapEntries
 * mapMap
 * [mergeInMap](#mergeInMap)
 * modifyInMap
 * removeKeysFromMap

 Examples have yet to be created for functions that are not a link.


<h2 id="mergeInMap">
  mergeInMap
</h2>

[Examples of using `mergeInMap`](https://github.com/alexharri/map-fns/tree/master/examples/mergeInMap).

Use `mergeInMap` to modify entries in a map deeply.

```tsx
import { mergeInMap } from "map-fns";

const companies = {
  apple: {
    name: "Apple Inc.",
    headquarters: {
      country: "United States",
      address: "1 Apple Park Way",
    },
  },
  google: {
    name: "Google LLC",
    headquarters: {
      country: "United States",
      address: "1600 Amphitheatre Parkway",
    },
  },
};

// Move Google's headquarters

mergeInMap(companies, "google", {
  headquarters: {
    address: "50 Quantum Avenue St.",
  },
});
//=> {
//     apple: {
//       name: "Apple Inc.",
//       headquarters: {
//         country: "United States",
//         address: "1 Apple Park Way",
//       },
//     },
//     google: {
//       name: "Google LLC",
//       headquarters: {
//         country: "United States",
//         address: "1600 Amphitheatre Parkway",
//       },
//     },
//   }
```

Instead of providing a property directly, a callback can be provided:

```tsx
import { mergeInMap } from "map-fns";

const departments = {
  engineering: {
    name: "Engineering",
    employees: ["Alex", "Brandon", "Caitlin"],
  },
  design: {
    name: "Design",
    employees: ["Daniela", "Evan"],
  },
};

// Let's welcome Francesca to the Design team

mergeInMap(departments, "design", {
  employees: (employees) => [...employees, "Francesca"],
});
//=> {
//     engineering: {
//       name: "Engineering",
//       employees: ["Alex", "Brandon", "Caitlin"],
//     },
//     design: {
//       name: "Design",
//       employees: ["Daniela", "Evan", "Francesca"],
//     },
//   }
```

By providing an array of keys, multiple entries in the map can be modified at once:

```tsx
import { mergeInMap } from "map-fns";

const employees = {
  alice: {
    name: "Alice Thompson",
    salary: 160_000,
  },
  bob: {
    name: "Bob Smith",
    salary: 120_000,
  },
  charlie: {
    name: "Charlie Miller",
    salary: 145_000,
  },
};

// Give Alice and Bob a 10% raise

mergeInMap(employees, ["alice", "bob"], {
  salary: (salary) => salary * 1.1,
});
//=> {
//     alice: {
//       name: "Alice Thompson",
//       salary: 176_000,
//     },
//     bob: {
//       name: "Bob Smith",
//       salary: 132_000,
//     },
//     charlie: {
//       name: "Charlie Miller",
//       salary: 145_000,
//     },
//   }
```