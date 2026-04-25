import baseConfig from '@thyi/eslint-config'

export default [
  ...baseConfig,
  {
    rules: {
      'new-line-per-chained-call': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
    },
  },
]
