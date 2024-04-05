
const path = require('path');

module.exports = [
  {
    mode: 'development',
    entry: './server/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'serverBundle.js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      fallback: { 
        "url": require.resolve("url/"),
      "path": require.resolve("path-browserify"),
      "util": require.resolve("util/"),
      "stream": require.resolve("stream-browserify"),
      "fs": false,
      "crypto": false,
      "querystring": require.resolve("querystring-es3"),
      "http": false,
      "os": false,
      "net": false,
      "zlib": require.resolve("browserify-zlib"),
      "assert": require.resolve("assert/"),

    },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },
  {
    mode: 'development',
    entry: './client/src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'clientBundle.js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      fallback: { 
        "url": require.resolve("url/"),
      "path": require.resolve("path-browserify"),
      "util": require.resolve("util/"),
      "stream": require.resolve("stream-browserify"),
      "fs": false,
      "crypto": false,
      "querystring": require.resolve("querystring-es3"),
      "http": false,
      "os": false,
      "net": false,
      "zlib": require.resolve("browserify-zlib"),
      "assert": require.resolve("assert/"),

      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
  },
];
