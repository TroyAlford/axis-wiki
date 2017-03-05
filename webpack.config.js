/* eslint-disable */
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

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

const library = 'axis-wiki'
const filename = PRODUCTION ? `${library}.min.js` : `${library}.js`

const PLACEHOLDER = 'PLACEHOLDER'

const uglify = new webpack.optimize.UglifyJsPlugin({ minimize: true })

const bundle = {
  entry: PLACEHOLDER,
  module: {
    loaders: [{
      test:    /\.js$/,
      loader:  'babel-loader',
      exclude: /node_modules/,
    }],
  },
  output: {
    filename: PLACEHOLDER,
    library,
    path:     PLACEHOLDER,
    libraryTarget:  'umd',
    umdNamedDefine: true,
  },
}

const serverSideModules = fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce((mods, mod) => Object.assign(mods, { [mod]: `commonjs ${mod}` }))

const ConfigPlugin = new webpack.DefinePlugin({
  'process.env': VARIABLES.reduce((o, key) => {
    o[key] = JSON.stringify(process.env[key] || false)
    return o
  }, {})
})

module.exports = [
  Object.assign({}, bundle, {
    /* Main JS Bundle */
    devtool: SOURCEMAP ? 'inline-source-map' : 'none',
    entry: `${__dirname}/source/application/Application.js`,
    externals: {
      'React': 'React',
      'react': 'React',
      'react-dom': 'ReactDOM',
      'react-router': 'ReactRouter',
    },
    output: Object.assign({}, bundle.output, {
      filename: 'application.js',
      path: `${__dirname}/build/js`,
    }),
    plugins: PRODUCTION ? [ConfigPlugin, uglify] : [ConfigPlugin],
  }),

  Object.assign({}, bundle, {
    /* Dependencies JS Bundle */
    entry: `${__dirname}/vendor/dependencies.js`,
    output: Object.assign({}, bundle.output, {
      filename: 'dependencies.js',
      path: `${__dirname}/build/js`,
    }),
    plugins: PRODUCTION ? [uglify] : [],
  }),

  // Object.assign({}, bundle, {
  //   /* Server */
  //   entry: `${__dirname}/server/server.js`,
  //   externals: serverSideModules,
  //   output: {
  //     filename: 'server.js',
  //     path: `${__dirname}/build/server`,
  //   },
  //   plugins: PRODUCTION ? [uglify] : [],
  //   target: 'node',
  // })
]
