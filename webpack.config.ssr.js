const nodeExternals = require('webpack-node-externals');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
const _config = require('./webpack.config');

module.exports = (_env = {}, arguments) => {
  Object.assign(_env, { PRODUCTION: true });
  const config = _config(_env, arguments);
  const configModule = config.module;
  const configResolve = config.resolve;
  const configPlugins = config.plugins;

  return {
    stats: 'errors-only',
    context: path.join(__dirname, 'src'),
    entry: './server.tsx',
    externals: [nodeExternals()],
    mode: 'development',
    target: 'node',
    resolve: configResolve,
    output: {
      path: __dirname + '/dist',
      filename: 'server.js',
    },
    module: configModule,
    plugins: [
      ...configPlugins.slice(0, -2),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'advanced',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  };
};
