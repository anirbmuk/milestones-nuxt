module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:sonarjs/recommended',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always'],
    'no-console': ['error', { allow: ['error'] }],
    'vue/no-v-html': 'off',
    'vue/no-multiple-template-root': 'off',
    camelcase: 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'sonarjs/cognitive-complexity': ['warn'],
    'vue/first-attribute-linebreak': 'off',
    indent: ['error', 2],
    'computed-property-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-before-function-paren': 'off',
    'arrow-parens': ['error', 'always'],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'always',
    }],
  },
};
