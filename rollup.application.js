import babel       from 'rollup-plugin-babel'
import commonjs    from 'rollup-plugin-commonjs'
import json        from 'rollup-plugin-json'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace     from 'rollup-plugin-replace'
import uglify      from 'rollup-plugin-uglify'

const PRODUCTION = (process.env.NODE_ENV || 'development') === 'production'
const ENVIRONMENT = JSON.stringify(PRODUCTION ? 'production' : 'development')

const EXTERNALS = {
  'react': 'React',
  'react-dom': 'ReactDOM',
}

const plugins = [
  json(),
  replace({ 'process.env.NODE_ENV': ENVIRONMENT }),
  babel({
    babelrc: false,
    exclude: ['node_modules/**', '**/*.json'],
    plugins: ['transform-object-rest-spread', 'lodash'],
    presets: ['es2015-rollup', 'react', 'jest'],
  }),
  commonjs({
    ignoreGlobal: false,
    include: ['node_modules/**'],
  }),
  nodeResolve({
    browser: true,
    jsnext: true,
    main: true,
    preferBuiltins: false,
    skip: Object.keys(EXTERNALS),
  }),
]

if (PRODUCTION) {
  plugins.push(uglify())
}

export default {
  entry: 'source/application/Application.js',
  exports: 'none',
  external: Object.keys(EXTERNALS),
  globals: EXTERNALS,
  plugins,
  targets: [{
    dest: 'build/js/application.js',
    format: 'iife',
    sourceMap: false, //!PRODUCTION,
    sourceMapFile: 'build/js/application.js',
  }],
  treeshake: true,
}
