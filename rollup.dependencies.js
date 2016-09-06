import commonjs    from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace     from 'rollup-plugin-replace'
import uglify      from 'rollup-plugin-uglify'

const PRODUCTION = (process.env.NODE_ENV || 'development') === 'production'
const ENVIRONMENT = JSON.stringify(PRODUCTION ? 'production' : 'development')

const plugins = [
  replace({
    'process.env.NODE_ENV': ENVIRONMENT
  }),
  nodeResolve({
    browser: true,
    jsnext: false,
    main: true,
    preferBuiltins: true,
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
  entry: 'vendor/dependencies.js',
  exports: 'none',
  plugins,
  targets: [{
    dest: 'build/js/dependencies.js',
    format: 'iife',
    sourceMap: true,
    sourceMapFile: '/js/dependencies.js',
  }],
  treeshake: false,
}
