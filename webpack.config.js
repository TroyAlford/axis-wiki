/* eslint-disable */
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

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

const uglify = new webpack.optimize.UglifyJsPlugin({ minimize: true })
const ConfigPlugin = new webpack.DefinePlugin({
  'process.env': VARIABLES.reduce((replacementMap, key) => ({
    ...replacementMap,
    [key]: JSON.stringify(process.env[key] || false)
  }), { NODE_ENV: JSON.stringify(ENVIRONMENT) })
})
const HoistPlugin = new webpack.optimize.ModuleConcatenationPlugin()

const bundle = {
  module: {
    rules: [{
      test: /\.(woff2?|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000',
    }, {
      test: /\.s?css$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  output: {
    library: 'axis-wiki',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  plugins: [ConfigPlugin, HoistPlugin, PRODUCTION && uglify].filter(Boolean),
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
  }
}

module.exports = [{
  ...bundle,
  /* Main JS Bundle */
  devtool: SOURCEMAP ? 'inline-source-map' : 'none',
  entry: `${__dirname}/source/Application.js`,
  externals: {
    'React': 'React',
    'react': 'React',
    'ReactDOM': 'ReactDOM',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
  },
  output: {
    ...bundle.output,
    filename: 'application.js',
    path: `${__dirname}/build/js`,
  },
}, {
  ...bundle,
  entry: `${__dirname}/vendor/dependencies.js`,
  output: {
    ...bundle.output,
    filename: 'dependencies.js',
    path: `${__dirname}/build/js`,
  },
}]
