import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import stylistic from '@stylistic/eslint-plugin';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      // 缩进使用 2 个空格
      '@stylistic/indent': ['error', 2],
      // 使用单引号
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      // 语句末尾需要分号
      '@stylistic/semi': ['error', 'always'],
      // 逗号后面需要空格
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      // 对象字面量的大括号内需要空格
      '@stylistic/object-curly-spacing': ['error', 'always'],
      // 数组括号内不需要空格
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      // 箭头函数的箭头前后需要空格
      '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
      // 关键字前后需要空格
      '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
      // 函数括号前的空格
      '@stylistic/space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }],
      // 块语句前需要空格
      '@stylistic/space-before-blocks': ['error', 'always'],
      // 操作符周围需要空格
      '@stylistic/space-infix-ops': 'error',
      // 逗号风格
      '@stylistic/comma-style': ['error', 'last'],
      // 行尾不允许有空格
      '@stylistic/no-trailing-spaces': 'error',
      // 文件末尾需要换行
      '@stylistic/eol-last': ['error', 'always'],
      // 最大连续空行数
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@typescript-eslint/no-explicit-any': 'off'
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
