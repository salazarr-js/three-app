import antfu from '@antfu/eslint-config'

export default antfu(
  {
    stylistic: true,
    markdown: true,
    typescript: true,
    vue: true,

    ignores: [],
  },
  {
    files: ['**/*.ts'],
    rules: {
      stylistic: {
        'ts/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      },
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/block-order': ['error', {
        order: [['script', 'template'], 'style'],
      }],
    },
  },
  {
    files: ['**/*.test.*'],
    rules: {
      'test/consistent-test-it': ['error', { fn: 'test', withinDescribe: 'test' }],
    },
  },
)
