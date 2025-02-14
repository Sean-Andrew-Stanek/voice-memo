module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
    },
    ignorePatterns: ['.eslintrc.js'],
    plugins: ['react', '@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'next/core-web-vitals',
        'plugin:react/jsx-runtime'
    ],
    rules: {
        '@typescript-eslint/explicit-function-return-type': [
            'error',
            {
                allowExpressions: false,
                allowTypedFunctionExpressions: true
            }
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }
        ],
        'no-console': 'error',
        'react/function-component-definition': [
            'error',
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function'
            }
        ]
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
};
