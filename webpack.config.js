const path = require('path');

module.exports = [
  {
    mode: 'development',
    entry: './server/index.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'serverBundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          include: [path.resolve(__dirname, 'server')],
          use: {
            loaders: 'babel-loader',
          },
        },
      ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
      },
  },
  {
    mode: 'development',
    entry: './client/src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'clientBundle.js',
    },
    module: {
      rules: [
        { test: /\.ts$/, use: 'ts-loader' },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          include: [path.resolve(__dirname, 'client'), path.resolve(__dirname, 'src'), path.resolve(__dirname, 'client/src'), ],
          use: {
            loaders: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
          },
        },
        {
            test: /\.css$/,
            exclude: /node_modules/,
            include: [path.resolve(__dirname, 'client'), path.resolve(__dirname, 'src'), path.resolve(__dirname, 'client/src'),],
            use: ['style-loader', 'css-loader'],
        },
          
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loaders: 'file-loader',
              },
            ],
          }
      ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
      },
  },
];