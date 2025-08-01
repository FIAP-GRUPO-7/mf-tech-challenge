const { merge } = require("webpack-merge");
const webpack = require("webpack");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const Dotenv = require("dotenv-webpack");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "grupo7",
    projectName: "extractlist",
    webpackConfigEnv,
    argv,
    outputSystemJS: false,
  });

  return merge(defaultConfig, {
    plugins: [
      new Dotenv({
        path: `./.env.${webpackConfigEnv.NODE_ENV || "development"}`,
        systemvars: true,
        safe: false,
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
    ],
  });
};
