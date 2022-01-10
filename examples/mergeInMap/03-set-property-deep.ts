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
