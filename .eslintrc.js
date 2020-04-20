module.exports = {
  root: true,
  parser: 'babel-eslint',
  plugins: ['import', 'jsx-a11y', 'react', 'react-hooks'],
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      plugins: ['@typescript-eslint']
    }
  ]
};
