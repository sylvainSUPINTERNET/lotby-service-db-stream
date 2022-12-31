// "use strict";

// // Sync object
// const config = {
//     verbose: true,
//     collectCoverage: true,
//     collectCoverageFrom: [
//         "src/**/*.{js,jsx,ts,tsx}",
//         "!src/**/*.d.ts"
//     ],
//     coverageReporters: ["json", "html"],
//     transform: {
//         "^.+\\.tsx?$": "ts-jest",
//     },
// };
// exports.default = config;



/** @type {import('jest').Config} */
const config = {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts"
    ],
    // coverageReporters: ["json", "html"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
  };
  
module.exports = config;