import commonjs    from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace     from 'rollup-plugin-replace'
import uglify      from 'rollup-plugin-uglify'
import { includes } from 'lodash'

const NODE_ENV = (process.env.NODE_ENV || 'development').toLowerCase()
const ENVIRONMENT = includes(['production', 'development'], NODE_ENV) ? NODE_ENV : 'development'

const plugins = [
  replace({
    /* Minify React, based on ENV */
    'process.env.NODE_ENV': JSON.stringify(ENVIRONMENT),
    /* Fix react-router */
    "import React from 'react'": "import * as React from 'react'",
    /* Fix mathjs */
    "var util = require('util');": '',
  }),

  nodeResolve({
    browser: true,
    jsnext: true,
    main: true,
    preferBuiltins: false,
  }),

  commonjs({
    include: ['node_modules/**'],
    namedExports: {
      'node_modules/react/react.js': [
        'createClass',
        'createElement',
        'Children',
        'Component',
        'isValidElement',
        'PropTypes',
      ],
      'node_modules/react-dom/react-dom.js': [
        'render',
      ],
    }
  }),

]

if (ENVIRONMENT === 'production') {
  plugins.push(uglify())
}

export default {
  entry: 'vendor/dependencies.js',
  exports: 'none',
  plugins,
  targets: [{
    dest: 'build/js/dependencies.js',
    format: 'iife',
    sourceMap: (ENVIRONMENT !== 'production'),
    sourceMapFile: 'build/js/dependencies.js',
  }],
  treeshake: true,

  moduleContext: {
    'node_modules/whatwg-fetch/fetch.js': 'window'
  },
  // onwarn: warning => {
  //   if (warning.code === 'THIS_IS_UNDEFINED') return;
  // },
}
