module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
    node: true,
  },
  globals: {
    DocumentTouch: true,
  },
  rules: {
    'no-plusplus': 0,
    'no-continue': 0,
    'default-case': 0,
    'no-use-before-define': 0,
    'operator-linebreak': ['error', 'after'],
    'prefer-template': 0,
  },
};
