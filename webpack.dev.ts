import webpack from "webpack";
import merge from "webpack-merge";
import path from "path";
import base from "./webpack.config";
import HtmlWebpackPlugin from "html-webpack-plugin";

const port = process.env.PORT ? Number.parseInt(process.env.PORT) : 8080;
console.log(`port: ${port}`);
const config: webpack.Configuration = merge.smart(base, {
  mode: "development",
  target: "web",
  entry: [
    `webpack-dev-server/client?http://localhost:${port}`,
    path.join(__dirname, "src/index.tsx"),
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  devtool: "#@inline-source-map",
  module: {
    rules: [],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html"),
    }),
  ],
  optimization: {
    namedModules: true,
  },
  devServer: {
    port,
    publicPath: `http://localhost:${port}`,
    contentBase: path.join(__dirname, "dist"),
    hot: true,
  },
});

export default config;
