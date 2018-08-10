module.exports = {
  'extends': 'plugin:vue/essential',
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2017,
    sourceType: 'module',
    allowImportExportEverywhere: true
  },
  rules: {
    'vue/valid-v-bind': 'off',
    'vue/mustache-interpolation-spacing': 'warning'
  }
}
