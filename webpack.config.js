const webpack = require('webpack')
const path = require('path')

const project_root = path.resolve("./")
const javascripts_root = project_root + "/src"

module.exports = {
  context: javascripts_root,
  entry: ["./dev.ts"],
//   output: {
//     path: project_root + "/dist",
//     filename: "./kento.js"
//   },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  devServer: {
    contentBase: __dirname,
    hot: true,
    inline: true,
    port: 3000,
    host: 'localhost',
  },
  module: {
    loaders: [
      {
        test: /\.(js|ts)(x)?$/,
        exclude: [/node_modules/],
        loader: "ts-loader"
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
}
