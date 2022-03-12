import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/index.ts',
  output: [
    { file: './dist/app.js' },
    { file: './dist/app.min.js', plugins: [terser()] },
  ],
  watch: {},
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'es2015',
        },
      },
    }),
  ],
};
