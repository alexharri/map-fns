import { mergeInMap } from "map-fns";

enum Teams {
  Product,
  Support,
  Infra,
}

const employees = {
  alice: {
    name: "Alice Thompson",
    team: Teams.Product,
  },
  bob: {
    name: "Bob Smith",
    team: Teams.Product,
  },
  charlie: {
    name: "Charlie Miller",
    team: Teams.Product,
  },
};

// Reassign Alice and Charlie to the Infra team

mergeInMap(employees, ["alice", "charlie"], {
  team: Teams.Infra,
});
//=> {
//   alice: {
//     name: "Alice Thompson",
//     team: Teams.Infra,
//   },
//   bob: {
//     name: "Bob Smith",
//     team: Teams.Product,
//   },
//   charlie: {
//     name: "Charlie Miller",
//     team: Teams.Infra,
//   },
// }
