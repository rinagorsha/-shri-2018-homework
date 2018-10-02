const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'development';

  return ({
    entry: [
      './src/js/index.js',
      './src/styl/main.styl',
      './src/pug/index.pug',
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(styl|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: isProduction,
                sourceMap: !isProduction,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !isProduction,
              },
            },
            {
              loader: 'stylus-loader',
              options: {
                compress: isProduction,
                sourceMap: !isProduction,
              },
            },
          ],
        },
        {
          test: /\.pug$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].html',
                context: 'src/pug/',
              },
            },
            {
              loader: 'pug-html-loader',
              options: {
                pretty: true,
              },
            },
          ],
        },
        {
          test: /\.(jpg|jpeg|png|svg|ico|gif)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                context: 'src/',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new CleanPlugin(['dist/'], {
        verbose: true,
        dry: false,
      }),
    ],
    devServer: {
      open: true,
    },
  })
};
