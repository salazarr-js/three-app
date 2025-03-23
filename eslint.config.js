import antfu from '@antfu/eslint-config'

export default antfu(
  {
    stylistic: true,
    markdown: true,
    typescript: true,
    vue: true,

    ignores: ['**/*.js'],
  },
  {
    files: ['**/*.ts'],
    rules: {
      'antfu/if-newline': ['off'],
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'perfectionist/sort-imports': ['error', {
        type: 'natural',
        internalPattern: ['^~/.+'],
        partitionByComment: true,
        partitionByNewLine: true,
        newlinesBetween: 'ignore',
        // tsconfigRootDir: '.',
        groups: [
          ['builtin-type', 'external-type'],
          ['builtin', 'external'],
          ['@slzr-type', 'internal-type'],
          ['@slzr', 'internal'],
          ['@/-type', 'parent-type', 'sibling-type', 'index-type'],
          ['@/', 'parent', 'sibling', 'index'],
          ['side-effect', 'side-effect-style'],
          'object',
          'unknown',
        ],
        customGroups: {
          value: {
            '@/': ['^@/'],
            '@slzr': ['^@slzr/.+']
          },
          type: {
            '@/': ['^@/'],
            '@slzr-type': ['^@slzr/.+']
          }
        }
      }],
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
    files: ['**/*.json'],
    rules: {
      'jsonc/sort-keys': 'off', // TODO: improve [package.json]
    },
  },
  {
    files: ['**/*.test.*'],
    rules: {
      'test/consistent-test-it': ['error', { fn: 'test', withinDescribe: 'test' }],
    },
  },
)
