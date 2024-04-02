const path = require('path');

module.exports = {
  mode: 'development',
  entry: './server/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: { 
    "path": require.resolve("path-browserify"),
    "fs": false,
    "crypto": require.resolve("crypto-browserify"),
    "assert": require.resolve("assert"),
    "process": require.resolve("process"),
    "url": require.resolve("url"),
    "stream": require.resolve("stream-browserify"),
    "os": require.resolve("os-browserify"),
    "zlib": require.resolve("browserify-zlib"),
    "tls": require.resolve("tls-browserify"),
    "net": require.resolve("net-browserify"),
    "querystring": require.resolve("querystring-es3"),
    "http": require.resolve("stream-http"),
    "aws-sdk": require.resolve("aws-sdk"),
    "nock": require.resolve("nock"),
    "child_process": false,
    "mock-aws-s3": require.resolve("mock-aws-s3"),
    "https": require.resolve("https-browserify"),
    "timers": require.resolve("timers-browserify"),
    "constants": require.resolve("constants-browserify"),

  }
  }
};