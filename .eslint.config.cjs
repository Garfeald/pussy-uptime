module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "react-hooks",
        "react"
    ],
    "rules": {
        "prettier/prettier": [0],
        'react/no-array-index-key':[0],
        'react/jsx-props-no-spreading': [0],
        'react/prop-types': [0],
        'react/display-name': [0],
        'no-plusplus':["error",{ "allowForLoopAfterthoughts": true }],
        'linebreak-style': 'off',
        "class-methods-use-this": [0],
        "@typescript-eslint/no-unused-expressions": ["error", {  "allowTernary": true }],
        "consistent-return": 'off',
        "@typescript-eslint/no-namespace": "off",
        "react/react-in-jsx-scope": "off",
        "react/jsx-uses-react": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react/no-children-prop": "off"
    }
}
