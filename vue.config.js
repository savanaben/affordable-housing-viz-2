const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/affordable-housing-viz-2/' : '/',
  configureWebpack: {
    externals: {
      jquery: 'jQuery',
    },
  },
});


