const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: './dist',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.png$/, // .png 확장자로 마치는 모든 파일
        loader: 'file-loader',
        options: {
          publicPath: './dist/', // prefix를 아웃풋 경로로 지정
          name: '[name].[ext]?[hash]', // 파일명 형식
        },
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader', // url 로더를 설정한다
          options: {
            publicPath: './dist/', // file-loader와 동일
            name: '[name].[ext]?[hash]', // file-loader와 동일
            limit: 5000 // 5kb 미만 파일만 data url로 처리
          }
        }
      }
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: './index.html',
      hash: true,
    }),
    new CleanWebpackPlugin(),
  ],
  devtool: 'source-map',
  mode: 'development',
};
