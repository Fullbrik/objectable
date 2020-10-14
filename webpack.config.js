path = require('path');

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /^((?!spec).)*\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: "index.js",
    path: path.resolve('./dist'),
    library: 'Objectable',
    libraryTarget: 'var'
  },
};
