import tsconfigRaw from './tsconfig.build.json' assert { type: 'json' };

export default {
  entry: './src/index.ts',
  target: 'node16',
  experiments: {
    outputModule: true,
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'module',
    chunkFormat: 'module',
    environment: {
      module: true,
    }
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      'node_modules',
      'src',
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',  // Remove this if you're not using JSX
          target: 'es2020',  // Syntax to compile to (see options below for possible values),,
          tsconfigRaw,
        },
      },
    ],
  },
};

