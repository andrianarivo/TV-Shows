const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: { index: path.resolve(__dirname, "src", "index.js") },
  devServer: {
    static: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
  ],
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  optimization: {
    runtimeChunk: "single",
  },
  output: {
    path: path.resolve(__dirname, "build"),
  },
};

