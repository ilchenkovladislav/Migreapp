module.exports = {
  root: true,
  env: { browser: true, es2024: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    "plugin:sonarjs/recommended",
    "plugin:unicorn/recommended",
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ["react", "react-hooks", "@typescript-eslint", 'react-refresh', "simple-import-sort", "sonarjs", "unicorn"],
  parserOptions: {
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: true
    },
    project: true
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    '@typescript-eslint/ban-ts-comment': "off",
    "react/react-in-jsx-scope": ["off"],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  },
}
