module.exports = {
  extends: [
    "plugin:flowtype/recommended",
    "airbnb",
    "prettier",
    "prettier/flowtype",
    "prettier/react",
  ],
  plugins: ["flowtype", "react", "jsx-a11y", "import"],
  parser: "babel-eslint",
  env: {
    browser: true,
  },
  rules: {
    "import/prefer-default-export": 0,
    "import/no-default-export": 2,
  },
};
