const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const Dotenv = require("dotenv-webpack");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "grupo7",
    projectName: "greetingcard",
    webpackConfigEnv,
    argv,
    outputSystemJS: false,
  });

  return merge(defaultConfig, {
    plugins: [
      new Dotenv({
        path: `./.env.${webpackConfigEnv.NODE_ENV || 'development'}`, // Caminho para o seu arquivo .env
        systemvars: true, // Permite que variáveis do sistema (como NODE_ENV) sejam acessadas
        safe: false, // Não falha se o arquivo .env não existir
      }),
    ],
    // Adicione outras modificações se necessário
  });
};
