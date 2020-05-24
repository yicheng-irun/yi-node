/**
 * 单独给client端加的eslint文件
 */
const parentRules = require('../../.eslintrc.js').rules;

module.exports = {
    root: true,
    env: {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    extends: [
        "airbnb-base",
        "plugin:vue/recommended",
    ],
    parserOptions: {
        parser: "babel-eslint",
        sourceType: "module"
    },
    plugins: [
        'vue'
    ],
    rules: {
        ...parentRules,
        "vue/html-indent": [
            'error',
            3
        ]
    },
};