import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs';

export default {
    // moduleName: 'ReactIndexList',
    input: 'src/components/indexlist/index.js',
    external: ['react', 'react-dom', 'better-scroll'],
    output: [{
        name: 'IndexList',
        format: 'es',
        file: 'es/index.js',
        globals: {
            react: 'React',
            "better-scroll": "BScroll"
        },
    }, {
        name: 'IndexList',
        format: 'umd',
        file: 'lib/index.js',
        globals: {
            react: 'React',
            "better-scroll": "BScroll"
        },
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
