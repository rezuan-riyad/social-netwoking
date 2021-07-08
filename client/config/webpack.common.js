// const paths = require("./paths")
const path = require("path")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  // webpack looks to start building the bundle
  entry: [path.resolve(__dirname, "../src") + "/index.js"],
  // where webpack output the assets and bundles
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "[name].bundle.js",
    publicPath: "/",
  },

  resolve: {
    fallback: {
      "path" : require.resolve("path-browserify")
    },
  },

  plugins: [
    /** 
    //Cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies individual files or entire directories, which already exist, to the build directory.
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.src + "/assets",
          to: "assets",
        },
      ],
    }),
    */

    // Generates an HTML file from a template
    new HtmlWebpackPlugin({
      title: "Random Title",
    //  favicon: paths.public + "/favicon.png",
      template: path.resolve(__dirname, "../public") + "/index.html", // template file
      filename: "index.html", // output file
    }),
  ], // end of plugins

  // Determine how modules within the project are treated
  module: {
    rules: [
      // babel-loader transpiles JS/TS files to browser supported features
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      /** 
       * Styles: Inject CSS into the head with source maps
       * style-loader creates `style` nodes from JS strings
       * css-loader translate CSS into commonJS
       * sass-loader compiles Sass into CSS  
       */
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            // importLoaders enables/disables or setups number of loaders applied before CSS-loader
            // default value is 0 (Number), Here 1 loader(sass-loader) is loaded before.
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline" },

    ],
  }, // end of module

}