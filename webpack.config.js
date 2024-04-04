const path = require('path');

module.exports = [
  {
    mode: 'development',
    entry: './server/index.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'serverBundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Add .jsx to the extensions
      },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          include: [path.resolve(__dirname, 'server')],
          use: {
            loader: 'babel-loader',
          },

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
      },
    module: {
      rules: [
        { test: /\.ts$/, use: 'ts-loader' },
        {
          test: /\.jsx$/,
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
            exclude: /node_modules/,
            include: [path.resolve(__dirname, 'client'), path.resolve(__dirname, 'src'), path.resolve(__dirname, 'client/src'),],
            use: ['style-loader', 'css-loader'],
        },
          
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ],
          }
      ],
    },

  },
];