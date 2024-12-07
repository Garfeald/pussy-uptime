import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tseslint.config(
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            'react': eslintReact,
            'react-hooks': eslintReactHooks,
            'react-refresh': eslintReactRefresh,
        },
    },
    {
        ignores: ['build', 'node_modules', 'coverage', 'eslint.config.js'],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021,
            },
            parserOptions: {
                project: ['tsconfig.json', 'tsconfig.node.json'],
            }
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        rules: {
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'prefer-const': 'error',
            'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
            'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
            'react/self-closing-comp': ['error', { component: true, html: true }],
            'max-lines': ['warn', { max: 124 }],
            'max-params': ['error', 3],
            'react-hooks/exhaustive-deps': 'warn',
        },
    },
);