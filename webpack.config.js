const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const autoprefixer = require('autoprefixer');
const postcssCssToBemCss = require('postcss-css-to-bem-css');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return ({
    entry: [
      './src/styles/common.styl',
      './src/index.tsx',
      './public/index.html',
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
        },
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
                plugins: [
                  autoprefixer({
                    browsers: ['ie >= 11', 'last 4 version'],
                  }),
                  postcssCssToBemCss({
                    sourceNaming: 'origin',
                    targetNaming: 'react',
                  }),
                ],
              },
            },
            {
              loader: 'stylus-loader',
              options: {
                import: [
                  path.join(__dirname, 'src/styles/colors.styl'),
                  path.join(__dirname, 'src/styles/vars.styl'),
                ],
                compress: isProduction,
                sourceMap: !isProduction,
              },
            },
          ],
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].html',
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
      new CheckerPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new CleanPlugin(['dist/'], {
        verbose: true,
        dry: false,
      }),
      new CopyWebpackPlugin([
        'public/*.png',
        'public/*.jpg',
        'public/*.json',
      ]),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    devServer: {
      open: true,
    },
  });
};
