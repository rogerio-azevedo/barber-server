module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    settings: {
      "import/resolver": {
        typescript: {},
      },
    },
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
      },
    ],
    "prettier/prettier": "error",
  },
};
