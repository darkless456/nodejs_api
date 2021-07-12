module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.mjs',
        ],
      },
    },
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-unused-vars': 1,
    'no-underscore-dangle': 0,
    'linebreak-style': 0,
    'max-classes-per-file': 0,
    'arrow-body-style': 0,
    'no-plusplus': 0,
    'import/prefer-default-export': 0,
  },
};
