/* eslint-env node */
module.exports = {
    root: true,
    env: {},
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        'prettier',
        'plugin:storybook/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    }
};
