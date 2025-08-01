const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "grupo7";

  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    entry: path.resolve(__dirname, "src/root-config.ts"),
    output: {
      filename: "grupo7-root-config.js",
      libraryTarget: "system",
      publicPath: "/",
    },
    optimization: {
      minimize: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src/index.ejs"),
        inject: false,
        filename: "index.html",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === "true",
        },
      }),
      new CopyPlugin({
        patterns: [
          { from: "src/globals.css", to: "globals.css" },
          { from: "src/favicon64px.ico", to: "favicon64px.ico" },
        ],
      }),
    ],
  });
};
