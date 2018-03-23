import webpack from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

const vendors = ['react', 'react-dom'];
const isProduction = process.env.NODE_ENV === 'production';

export default {
  name: 'client',
  mode: isProduction ? 'production' : 'development',
  target: 'web',
  entry: {
    bundle: './entry.js',
    vendors,
  },
  context: path.join(__dirname, 'src'),

  stats: {
    // Disable the verbose output on build
    children: false,
  },

  devtool: isProduction ? false : 'inline-cheap-module-eval-source-map',

  output: {
    path: path.join(__dirname, 'target', 'build'),
    filename: '[name].js',
    chunkFilename: '[name].js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        // Custom common chunk
        bundle: {
          name: 'commons',
          chunks: 'all',
          minChunks: 3,
          reuseExistingChunk: false,
        },
        // Customer vendor
        vendors: {
          chunks: 'initial',
          name: 'vendors',
          test: 'vendors',
        },
        // Merge all the CSS into one file
        styles: {
          name: 'styles',
          test: /\.s?css$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
  profile: false,

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    new OptimizeCSSAssetsPlugin(),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
        removeComments: true,
      },
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'index.html'),
    }),
  ],
};
