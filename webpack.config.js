const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: [
    './scss/main.scss',
    './src/main.js'
  ],

  output: {
    path: __dirname,
    filename: 'dist/bundle.js',
  },

  resolve: {
    modules: [
      path.resolve('./src/'),
      'node_modules',
    ],
    extensions: ['.js'],
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          MiniCssExtractPlugin.loader,
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? './dist/[name].css' : './dist/[name].[hash].css',
      chunkFilename: devMode ? './dist/[id].css' : './dist/[id].[hash].css',
    }),
  ],

  externals: {
    'vue': 'Vue',
    'lodash' : '_',
    'gsap': 'GreenSockGlobals'
  }
};
