const module = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    // Possible Problems
    'no-unused-vars': 'error',
    'no-undef': 'error',
    'no-shadow': 'warn',
    'no-extra-semi': 'error',
    'no-empty': 'warn',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-loop-func': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'consistent-return': 'error',
    curly: ['error', 'multi-line'],
    eqeqeq: 'error',
    'guard-for-in': 'error',
    'no-debugger': 'error',
    'no-alert': 'error',
    'react/prop-types': 'off',

    // Best Practices
    'prefer-const': 'error',

    // Stylistic Issues
    camelcase: 'error',
    quotes: ['error', 'single'],
    indent: ['error', 2],
    'space-before-function-paren': ['error', 'never'],
    'space-infix-ops': 'error',
    'keyword-spacing': ['error', { before: true, after: true }],
    'comma-spacing': ['error', { before: false, after: true }],
    'object-curly-spacing': ['error', 'always'],
    'newline-before-return': 'error',
    'newline-after-var': 'off', // Adjust as needed

    // ECMAScript 6
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'prefer-arrow-callback': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};

export default module;
