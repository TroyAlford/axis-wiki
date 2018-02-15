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

const ConfigPlugin = new webpack.DefinePlugin({
  'process.env': VARIABLES.reduce((replacementMap, key) => ({
    ...replacementMap,
    [key]: JSON.stringify(process.env[key] || false)
  }), { NODE_ENV: JSON.stringify(ENVIRONMENT) })
})
const HoistPlugin = new webpack.optimize.ModuleConcatenationPlugin()
const UglifyPlugin = new webpack.optimize.UglifyJsPlugin({ minimize: true, sourceMap: SOURCEMAP })

const bundle = {
  devtool: SOURCEMAP ? 'source-map' : 'none',
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
  output: {
    library: 'axis-wiki',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  plugins: [
    ConfigPlugin,
    HoistPlugin,
    PRODUCTION && UglifyPlugin
  ].filter(Boolean),
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
  entry: {
    application: `${__dirname}/source/Application.js`,
  },
  externals: {
    'mobx-react': 'mobx-react',
    'mobx-state-tree': 'mobx-state-tree',
    'mobx': 'mobx',
    'react-dom': 'react-dom',
    'react-router-dom': 'react-router-dom',
    'react': 'react',
  },
  output: {
    ...bundle.output,
    chunkFilename: 'application.[name].js',
    filename: '[name].js',
    path: `${__dirname}/build/js`,
    publicPath: '/js/'
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'application', filename: 'application.js' }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
    new ExtractTextPlugin({ allChunks: true, filename: '../css/[name].chunks.css' }),
    ...bundle.plugins,
  ],
}, {
  ...bundle,
  entry: `${__dirname}/vendor/dependencies.js`,
  output: {
    ...bundle.output,
    filename: 'dependencies.js',
    path: `${__dirname}/build/js`,
  },
}]
