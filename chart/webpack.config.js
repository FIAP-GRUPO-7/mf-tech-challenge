const { merge } = require("webpack-merge");
const webpack = require("webpack");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "grupo7",
    projectName: "chart", // Altere para o nome correto em outros microfrontends
    webpackConfigEnv,
    argv,
    outputSystemJS: true, // IMPORTANTE para funcionar com System.import
  });

  return merge(defaultConfig, {
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
    ],
  });
};
