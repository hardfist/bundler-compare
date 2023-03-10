const path = require('path');
const htmlPlugin = require('@rspack/plugin-html').default;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const isProd = process.env.NODE_ENV === 'production';
const mode = isProd ? 'production' : 'development';
const ana = process.env.ANA === 'true';
/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  mode,
  context: __dirname,
  entry: { main: './src/index.tsx' },
  devServer: {
    port: 5555,
  },
  plugins: [new htmlPlugin({
    template: './index.html',
    publicPath: '/'
  }), ana && new BundleAnalyzerPlugin()].filter(Boolean), // use js html-plugin here, or use rust html-plugin below
  builtins: {
    minify: isProd,
    // html: [
    //   {
    //     template: './index.html',
    //     publicPath: '/',
    //   },
    // ], // you can use js html-plugin or rust html-plugin
    // progress: {},
    define: { 'process.env.NODE_ENV': JSON.stringify(mode) },
    react: {
      importSource: '@emotion/react', // supports emotion css props
      runtime: 'automatic'
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/, use: [
          {
            builtinLoader: 'sass-loader' // use rust loader
          }
        ],
        type: 'css'
      },
      {
        test: /\.module\.scss$/, use: [
          {
            builtinLoader: 'sass-loader'
          },
        ],
        type: 'css/module'
      },
      { test: /\.less$/, use: [{ loader: require.resolve('less-loader') }], type: 'css' },
      {
        test: /module\.less$/,
        use: [{ loader: require.resolve('less-loader') }],
        type: 'css/module', // native css module
      },
      { test: /\.svg$/, use: [{ loader: require.resolve('./svg-loader.js') }], type: 'jsx' },
    ],
  },
  resolve: { alias: { '@': path.resolve(__dirname, 'src'), bizchars: require.resolve('bizcharts/es/index.js') } },
  output: {
    publicPath: '/',
  },
  infrastructureLogging: {
    debug: false,
  },
  stats: {
    all: false
  }
};
