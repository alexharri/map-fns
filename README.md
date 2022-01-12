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

 * [addListToMap](#addListToMap)
 * areMapsShallowEqual
 * [mapEntries](#mapEntries)
 * [mapMap](#mapMap)
 * [mergeInMap](#mergeInMap)
 * modifyInMap
 * [partialMap](#partialMap)
 * [removeKeysFromMap](#removeKeysFromMap)

Examples have yet to be created for functions that are not a link.

## addListToMap

<p>
  <a href="https://github.com/alexharri/map-fns/tree/master/examples/addListToMap" target="_blank">
    Examples of using <code>addListToMap</code>
  </a>.
</p>

Use `addListToMap` to add a list of entries to a map.

```tsx
import { addListToMap } from "map-fns";

const map = {
  a: { id: "a", value: 1 },
  b: { id: "b", value: 2 },
  c: { id: "c", value: 3 },
};

addListToMap(
  map,
  [
    { id: "d", value: 4 },
    { id: "e", value: 5 },
  ],
  "id"
);

//=> {
//     a: { id: "a", value: 1 },
//     b: { id: "b", value: 2 },
//     c: { id: "c", value: 3 },
//     d: { id: "d", value: 4 },
//     d: { id: "e", value: 5 },
//   }
```

`addListToMap` assumes that there is a __key__ field (such as `id` in this example) whose value is equal to the entry's key in the map.


## mapEntries

<p>
  <a href="https://github.com/alexharri/map-fns/tree/master/examples/mapEntries" target="_blank">
    Examples of using <code>mapEntries</code>
  </a>.
</p>

Use `mapEntries` to get the list of key-value entries in a map.

```tsx
import { mapEntries } from "map-fns";

const map = { a: 1, b: 2, c: 3 };

mapEntries(map);
//=> [
//     ["a", 1],
//     ["b", 2],
//     ["c", 3]
//   ]
```

A list of keys can be provided as the second argument to only return the entries for those keys.

```tsx
import { mapEntries } from "map-fns";

const map = { a: 1, b: 2, c: 3 };

// The order of the keys determines the order of the entries

mapEntries(map, ["c", "b"]);
//=> [
//     ["c", 3]
//     ["b", 2],
//   ]
```

If a provided key does not exist in the map an error is thrown.


## mapMap

<p>
  <a href="https://github.com/alexharri/map-fns/tree/master/examples/mapMap" target="_blank">
    Examples of using <code>mapMap</code>
  </a>.
</p>

Use `mapMap` to transform every value in map to a new value with a callback function.

```tsx
import { mapMap } from "map-fns";

const map = {
  a: 1,
  b: 2,
  c: 3,
};

mapMap(map, (n) => n * 2);
//=> {
//     a: 2,
//     b: 4,
//     c: 6,
//   }
```


## mergeInMap

<p>
  <a href="https://github.com/alexharri/map-fns/tree/master/examples/mergeInMap" target="_blank">
    Examples of using <code>mergeInMap</code>
  </a>.
</p>

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


## partialMap

<p>
  <a href="https://github.com/alexharri/map-fns/tree/master/examples/partialMap" target="_blank">
    Examples of using <code>partialMap</code>
  </a>.
</p>

Use `partialMap` to get a copy of a map only including the keys provided in the second argument.

```tsx
import { partialMap } from "map-fns";

const map = {
  a: 1,
  b: 2,
  c: 3,
};

partialMap(map, ["a", "b"]);
//=> {
//     a: 1,
//     b: 2,
//   }
```


## removeKeysFromMap

<p>
  <a href="https://github.com/alexharri/map-fns/tree/master/examples/removeKeysFromMap" target="_blank">
    Examples of using <code>removeKeysFromMap</code>
  </a>.
</p>

Use `removeKeysFromMap` to get a copy of a map excluding the keys provided in the second argument.

```tsx
import { removeKeysFromMap } from "map-fns";

const map = {
  a: 1,
  b: 2,
  c: 3,
};

removeKeysFromMap(map, ["a", "c"]);
//=> {
//     b: 2,
//   }
```

If you only need to remove a single key from the map, that key may be provided directly as the second argument.

```tsx
import { removeKeysFromMap } from "map-fns";

const map = {
  a: 1,
  b: 2,
  c: 3,
};

removeKeysFromMap(map, "c");
//=> {
//     a: 1,
//     b: 2,
//   }
```