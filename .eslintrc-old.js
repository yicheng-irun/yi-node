
const commonRules = {
    'linebreak-style':0,
    'camelcase': [2, {
        "properties": "never",
        "ignoreDestructuring": true,
    }],
    // 3格缩进
    'indent': ['error', 3, {
        "SwitchCase": 1
    }],
    'space-before-function-paren': ['error', 'always'],
    'import/no-unresolved': 'off',
    'import/extensions': [0, 'always', {
            'js': 'never',
            'ts': 'never'
        }
    ],
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
};

module.exports = {
    root: true,
    overrides: [
        {
            files: "*.ts",
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
                ...commonRules,
                'import/no-unresolved': 'off',
                'import/extensions': [0, 'always', {
                        'js': 'never',
                        'ts': 'never'
                    }
                ],
                'import/prefer-default-export': 'off'
            }
        },
        {
            files: ["*.js", "*.vue"],
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
                ...commonRules,
                "vue/html-indent": [
                    'error',
                    3
                ]
            },
        }
    ],
};
