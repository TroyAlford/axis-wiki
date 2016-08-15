import babel       from 'rollup-plugin-babel'
import commonjs    from 'rollup-plugin-commonjs'
import json        from 'rollup-plugin-json'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace     from 'rollup-plugin-replace'
import uglify      from 'rollup-plugin-uglify'

const PRODUCTION = (process.env.NODE_ENV || 'development') === 'production'

const plugins = [
  json(),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  babel({
    babelrc: false,
    exclude: [
      'node_modules/**',
      '**/*.json',
    ],
    plugins: ['transform-object-rest-spread', 'lodash'],
    presets: ['es2015-rollup', 'stage-0', 'react', 'jest'],
  }),
  nodeResolve({
    browser: true,
    jsnext: true,
    main: true,
    preferBuiltins: false,
  }),
  commonjs({
    ignoreGlobal: true,
    include: ['node_modules/**'],
  }),
]

if (PRODUCTION) {
  plugins.push(uglify())
}

export default {
  entry: 'source/application/Application.js',
  exports: 'none',
  external: ['react', 'react-dom', 'react-router'],
  globals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
  },
  plugins,
  targets: [{
    dest: 'build/js/bundle.js',
    format: 'iife',
    sourceMap: true,
    sourceMapFile: '/js/bundle.js',
  }],
  treeshake: true,
}
