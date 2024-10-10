import antfu from '@antfu/eslint-config'

export default antfu(
  {
    stylistic: true,
    markdown: true,
    typescript: true,
    vue: true,

    ignores: ['**/.vitepress', '**/old'],
  },
  {
    files: ['**/*.ts'],
    rules: {},
  },
  {
    files: ['**/*.vue'],
    rules: {},
  },
  {
    files: ['**/*.test.*'],
    rules: {
      'test/consistent-test-it': ['error', { fn: 'test', withinDescribe: 'test' }],
    },
  },
)
