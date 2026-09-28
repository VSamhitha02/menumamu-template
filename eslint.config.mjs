// import { defineConfig, globalIgnores } from 'eslint/config'
// import nextVitals from 'eslint-config-next/core-web-vitals'
// import nextTs from 'eslint-config-next/typescript'
// import prettier from 'eslint-config-prettier/flat'

// const eslintConfig = defineConfig([
//   ...nextVitals,
//   ...nextTs,
//   prettier,
//   {
//     rules: {
//       semi: ['error'],
//       '@next/next/no-img-element': 'error',
//       'react/no-unescaped-entities': 'off',
//       '@next/next/no-page-custom-font': 'off',
//     },
//   },
//   // Override default ignores of eslint-config-next.
//   globalIgnores([
//     // Default ignores of eslint-config-next:
//     '.next/**',
//     'out/**',
//     'build/**',
//     'next-env.d.ts',
//   ]),
// ])

// export default eslintConfig

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@next/next/no-img-element': 'error',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
]

export default eslintConfig
