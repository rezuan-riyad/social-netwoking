const paths = require("./paths")
const webpack = require("webpack")
const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")

module.exports = merge(common, {
  // Set the mode to development or production
  mode: "development",

  // Control how source maps are generated
  devtool: "inline-source-map",

  // Spin up a server for quick development
  devServer: {
    https: true,
    historyApiFallback: true,
    contentBase: paths.build, // where to serve content from
    open: true, //open the browser after server had been started
    compress: true,
    hot: true,
    port: 8080,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  cache: false,
  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
})