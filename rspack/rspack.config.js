const path = require('path');
const htmlPlugin = require('@rspack/plugin-html').default;
const { transform } = require('@svgr/core');

async function svgLoader(content) {
  const callback = this.async();
  const filePath = this.resourcePath;

  transform(
    content,
    {},
    {
      filePath,
      caller: {
        previousExport: null,
      },
    },
  ).then((componentCode) => {
    callback(null, componentCode);
  });
}

const isProd = process.env.NODE_ENV === 'production';
const mode = isProd ? 'production' : 'development';

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
  })], // use js html-plugin here, or use rust html-plugin below
  builtins: {
    minify: isProd,
    // html: [
    //   {
    //     template: './index.html',
    //     publicPath: '/',
    //   },
    // ], // you can use js html-plugin or rust html-plugin
    progress: {},
    define: { 'process.env.NODE_ENV': JSON.stringify(mode) },
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
      { test: /\.svg$/, use: [{ loader: svgLoader }], type: 'jsx' },
    ],
  },
  resolve: { alias: { '@': path.resolve(__dirname, 'src'), bizchars: require.resolve('bizcharts/es/index.js') } },
  output: {
    publicPath: '/',
  },
  infrastructureLogging: {
    debug: false,
  },
};
