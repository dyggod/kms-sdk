import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
import json from '@rollup/plugin-json';
import pkg from './package.json';

export default {
  input: path.resolve(__dirname, 'src/index.js'),
  output: {
    file: pkg.main,
    format: 'umd',
    name: 'kms-sdk-node',
    globals: {
      axios: 'axios',
    },
  },
  plugins: [
    resolve({ preferBuiltins: true }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
    }),
    json(),
  ],
};
