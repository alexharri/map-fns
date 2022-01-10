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
