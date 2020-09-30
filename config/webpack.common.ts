/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Configuration, DefinePlugin } from 'webpack';
import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';

const PreloadWebpackPlugin = require('preload-webpack-plugin');

const context = path.resolve(__dirname, '..');
const srcPath = path.resolve(__dirname, '../src');
const outputPath = path.resolve(__dirname, '../dist');

function getSrcChildPath(childPath: string): string {
  const normalized = childPath.startsWith('/') ? childPath : `/${childPath}`;
  return path.resolve(srcPath, normalized);
}

const commonConfig: Configuration = {
  entry: ['./src/index.tsx'],
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'ts-loader', options: { transpileOnly: true, context } },
          {
            loader: 'babel-loader',
            options: { presets: [['react-app', { flow: false, typescript: true }]] },
          },
        ],
      },
      {
        test: /\.(bmp|gif|jpe?g|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'media/images/[ext]/[name].[ext]',
          esModule: false,
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader?prefix=fonts/',
        options: {
          name: 'media/fonts/[name].[ext]',
          esModule: false,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: [srcPath, 'node_modules'],
    alias: {
      '@type': getSrcChildPath('types'),
      '@hoc': getSrcChildPath('hoc'),
      '@contexts': getSrcChildPath('contexts'),
      '@hooks': getSrcChildPath('hooks'),
      '@atoms': getSrcChildPath('components/atoms'),
      '@molecules': getSrcChildPath('components/molecules'),
      '@organisms': getSrcChildPath('components/organisms'),
      '@templates': getSrcChildPath('components/templates'),
      '@pages': getSrcChildPath('pages'),
      '@utils': getSrcChildPath('utils'),
      '@fonts': getSrcChildPath('assets/fonts'),
      '@svg': getSrcChildPath('assets/svg'),
      '@styles': getSrcChildPath('assets/styles'),
      'src/@systems': getSrcChildPath('@systems'),
      '@img': getSrcChildPath('assets/images'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'ρπ | React app boilerplate: TS, webpack, and CSS in JS',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
    new DefinePlugin({ __DEV__: process.env.NODE_ENV === 'development' }),
    new PreloadWebpackPlugin({ rel: 'preload', include: 'initial' }),
    new Dotenv({ path: './.env', systemvars: true, expand: true }),
  ],
  output: {
    path: outputPath,
    publicPath: '/',
    filename: 'js/app.js',
    chunkFilename: 'js/[name]-[hash].js',
  },
};

export default commonConfig;
