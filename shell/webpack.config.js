const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const path = require("path");

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
  });
};
