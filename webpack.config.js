/* eslint-disable */
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

dotenv.config()

const VARIABLES = [
  'APPLICATION_NAME',
  'FB_APP_ID',
  'FB_PERMISSIONS',
  'MEDIA_EXTENSIONS',
  'MEDIA_PIXELS_LARGE',
  'MEDIA_PIXELS_SMALL',
]

const ENVIRONMENT = process.env.NODE_ENV
const PRODUCTION = ENVIRONMENT === 'production'
const SOURCEMAP = process.env.SOURCEMAP

module.exports = {
  devtool: SOURCEMAP ? 'source-map' : 'none',
  mode: ENVIRONMENT,
  /* Main JS Bundle */
  entry: {
    application: `${__dirname}/source/Application.js`,
  },
  module: {
    rules: [{
      test: /\.(woff2?|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000',
      options: {
        name: '../css/assets/[name].[ext]',
      },
    }, {
      test: /\.(gif|jpe?g|bmp|png)$/,
      loader: 'file-loader',
      options: {
        name: '../css/assets/[name].[ext]',
      },
    }, {
      test: /\.s?css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader'],
      }),
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  optimization: {
    minimize: PRODUCTION,
    splitChunks: { chunks: 'async' },
  },
  output: {
    chunkFilename: 'application.[name].js',
    library: 'axis-wiki',
    libraryTarget: 'umd',
    path: `${__dirname}/build/js`,
    publicPath: '/js/',
    umdNamedDefine: true,
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({ allChunks: true, filename: '../css/[name].chunks.css' }),
    new webpack.DefinePlugin({
      'process.env': VARIABLES.reduce((replacementMap, key) => ({
        ...replacementMap,
        [key]: JSON.stringify(process.env[key] || false)
      }), { NODE_ENV: JSON.stringify(ENVIRONMENT) })
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  resolve: {
    extensions: ['.css', '.js', '.scss'],
    alias: {
      '@components': path.resolve(__dirname, 'source', 'components'),
      '@config': path.resolve(__dirname, 'config', 'config'),
      '@models': path.resolve(__dirname, 'models'),
      '@source': path.resolve(__dirname, 'source'),
      '@styles': path.resolve(__dirname, 'styles'),
      '@utils': path.resolve(__dirname, 'utility'),
    }
  },
}
