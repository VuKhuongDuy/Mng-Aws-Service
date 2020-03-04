const path = require("path");

module.exports = {
  
  rootDir: path.resolve(__dirname, "../../"),
  roots: ["_test_"],
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "<rootDir>/node_modules/vue-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.(js|jsx)?$": "<rootDir>/node_modules/babel-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  // snapshotSerializers: ['jest-serializer-vue'],
  setupFiles: ["<rootDir>/_test_/unit/setup"],
  mapCoverage: true,
  coverageDirectory: "<rootDir>/_test_/unit/coverage",
  collectCoverageFrom: [
    "src/**/*.{js,vue}",
    "!src/main.js",
    "!src/axios.js",
    "!src/router/index.js",
    "!**/node_modules/**",
    "!src/cookie.js",
    "!src/lang/**"
  ],
  
  // testMatch: [
  //   '<rootDir>/(_test_/unit/**/*.spec.(js|jsx|ts|tsx)|**/__test__/*.(js|jsx|ts|tsx))'
  // ],
  // transformIgnorePatterns: ['<rootDir>/node_modules/']
};

