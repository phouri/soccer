module.exports = {
  devServer: {
    proxy: 'http://localhost:4567',
  },
  baseUrl: process.env.NODE_ENV === 'production' ? '/static/' : '/',
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
}
