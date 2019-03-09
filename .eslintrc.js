module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "quotes": ["warn", "double"],
    "no-console": "off",
    "consistent-return": "off",
    "no-underscore-dangle": ["error", { "allow": ["_id"]}],
  },
};
