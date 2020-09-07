import { Configuration, Plugin } from 'webpack';
import 'webpack-dev-server';
import WebpackCompression from 'compression-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const isLocalBuild = /local/i.test(process.env.BUILD_ENV);

const compressionPlugin = new WebpackCompression({
  filename(info) {
    return `${info.path}${info.query}`;
  },
  algorithm: 'brotliCompress',
  test: /\.js(\.gz)?(\?.*)?$/,
  minRatio: 1,
  exclude: /(service-worker|sw)\.js$/,
});

const copyPlugin = new CopyWebpackPlugin({ patterns: [{ from: 'public' }] });

const swPlugin = new WorkboxPlugin.GenerateSW({
  swDest: 'sw.js',
  clientsClaim: true,
  skipWaiting: true,
});

const terser = new TerserPlugin({
  cache: true,
  parallel: true,
  sourceMap: false,
  terserOptions: { output: { comments: false } },
});

function getPlugins(): Plugin[] {
  const plugins = [copyPlugin, swPlugin];
  if (!isLocalBuild) {
    plugins.push(compressionPlugin);
  }
  return plugins;
}

const prodConfig: Configuration = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [terser],
  },
  plugins: getPlugins(),
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
  },
};

export default prodConfig;
