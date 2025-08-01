const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");

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
    entry: "./src/root-config.ts",
    output: {
      filename: "grupo7-root-config.js",
      libraryTarget: "system",
      publicPath: "/",
    },
  });
};
