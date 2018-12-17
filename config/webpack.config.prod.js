const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  mode: "production",

  entry: "./src/components/indexlist/IndexList.js",

  output: {
    library: "indexList",
    libraryTarget: "umd",
    filename: "index.js",
    path: path.resolve(__dirname, "../dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        exclude: resolve("node_modules"),
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              strictMath: false,
              noIeCompat: true,
              javascriptEnabled: true,
            }
          }
        ]
      }
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },

  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  },

  node: {
    Buffer: false
  },

  devtool: "source-map",

  performance: {
    hints: "warning"
  },

  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, "../dist"), {
      root: path.resolve(__dirname, "../"), // 设置root
      verbose: true,
    }),
    new MiniCssExtractPlugin({
      filename: "index.css",
      chunkFilename: "index.css",
    }),
  ]
};
