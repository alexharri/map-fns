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
