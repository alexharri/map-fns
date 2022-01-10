import { mergeInMap } from "map-fns";

const employees = {
  alice: {
    name: "Alice Thompson",
    job: "Software Engineer",
  },
  bob: {
    name: "Bob Smith",
    job: "Junior Frontend Developer",
  },
};

// Give Bob a promotion

mergeInMap(employees, "bob", {
  job: "Frontend Developer",
});
//=> {
//     alice: {
//       name: "Alice Thompson",
//       job: "Software Engineer",
//     },
//     bob: {
//       name: "Bob Smith",
//       job: "Junior Frontend Developer",
//     },
//   }
