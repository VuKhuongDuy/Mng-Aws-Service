module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  rules: {
    "one-var-declaration-per-line": [2, "always"],
    "block-scoped-var": 1, // var khai báo bên trong 1 scope và sử dụng ở bên ngoài
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-duplicate-case": "warn",
    "no-await-in-loop": "warn",
    "newline-before-return": "error", // newline trước khi return
    "no-empty": ["error", { allowEmptyCatch: true }],
    "keyword-spacing": ["error", { before: true }], // bắt lỗi key ko có dấu cách so với các đấu { }
    "newline-after-var": ["error", "always"],
    "arrow-body-style": ["error", "always"]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
