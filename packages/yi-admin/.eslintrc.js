
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends:  [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    ],
    parserOptions: {
        ecmaVersion: 2017,  // Allows for the parsing of modern ECMAScript features
        sourceType: 'module',  // Allows for the use of imports
    },
    rules: {
        'linebreak-style':0,
        'camelcase': [2, {
            "properties": "never",
            "ignoreDestructuring": true,
        }],
        // 3格缩进
        'indent': ['error', 3, {
            "SwitchCase": 1
        }],
        // 声明函数时，函数名和括号间要有空格
        'space-before-function-paren': ['error', 'always'],
        
        'import/no-unresolved': 'off',

        "import/extensions": [
            0,
            "never",
        ],

        // 允许对参数的属性进行修改
        'no-param-reassign': [
            'error',
            {
                'props': false,
            }
        ],
        'max-len': ['error', {
            code: 200,
            tabWidth: 4,
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [0],
    },
};
