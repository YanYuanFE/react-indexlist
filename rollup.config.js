import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs';

export default {
    moduleName: 'ReactIndexList',
    input: 'src/components/indexlist/index.js',
    external: ['react', 'react-dom', 'prop-types', 'better-scroll'],
    globals: {
        react: 'React',
        "react-dom": "ReactDOM",
        "prop-types": "PropTypes",
        "better-scroll": "BScroll"
    },
    output: [{
        name: 'IndexList',
        format: 'es',
        file: 'es/index.js'
    }, {
        name: 'IndexList',
        format: 'umd',
        file: 'lib/index.js'
    }],
    plugins: [
        resolve(),
        babel({
            exclude: '**/node_modules/**',
            runtimeHelpers: true
        }),
        commonjs(),
        postcss({
            extract: true,
            extensions: ['.less']
        })
    ]
}