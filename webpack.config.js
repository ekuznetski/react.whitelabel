const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs');
const glob = require('glob')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = (_env, arguments) => {
  const env = { PRODUCTION: false, LABEL: null, ..._env };
  const targetLabel = env.LABEL && env.LABEL.length && env.LABEL.toLowerCase();
  const targetLabelAssetFolder = targetLabel ? `_${targetLabel}` : '_default';
  const excludeAssets = [];

  // Generate exclude assets paths
  fs.readdirSync(path.join(__dirname, 'src/assets')).forEach((file) => {
    const absolutePath = path.join(__dirname, 'src/assets', file);

    if (fs.lstatSync(absolutePath).isDirectory() && /^\_[^(default)].*/.test(file) && file !== targetLabelAssetFolder) {
      excludeAssets.push(file);
    }
  });

  // Generate env object to pass to React
  const targetLabelEnvPath = path.join(__dirname, `src/domain/${targetLabelAssetFolder}/env.config.json`);
  if (fs.existsSync(targetLabelEnvPath)) {
    const data = fs.readFileSync(targetLabelEnvPath);
    const json = data && JSON.parse(data);
    if (json) {
      const _env = Object.assign({}, json, env, { LABEL: targetLabel || 'default' });
      fs.writeFileSync(targetLabelEnvPath, JSON.stringify(_env, null, 2));
    }
  }

  const _targetLabelCustomizationScssFiles = ['theme.scss', 'variables.scss'];
  let targetLabelConfigsDomainAlias = {};
  let targetLabelConfigsComponentsAlias = {};
  let targetLabelConfigsScss = [];

  // Generate map to replace files for different domain
  if (targetLabel) {
    const domainFilenames = fs.readdirSync(`./src/domain/${targetLabelAssetFolder}`);
    const componentFilepaths = glob.sync(`./src/components/**/*.{tsx,ts,js,scss}`).filter((filePath) => filePath.includes(`/${targetLabelAssetFolder}`))
        
    targetLabelConfigsComponentsAlias = componentFilepaths.filter((filePath) => {
      const basename = path.basename(filePath);
      const filename = basename.match(/([^\\/]*)\.(\w+)$/)[1]
      const extension = basename.match(/([^\\/]*)\.(\w+)$/)[2]
      //filter out scss files when there's also a tsx file since its already imported and doesnt need an alias
      return (!componentFilepaths.find((cpath) =>
        path.basename(cpath) === `${filename}.tsx`) || extension !== 'scss')
    })
    .reduce(
        (acc, filePath) => {
          const basename = path.basename(filePath);
          const filename = basename.match(/([^\\/]*)\.(\w+)$/)[1]
          const extension = basename.match(/([^\\/]*)\.(\w+)$/)[2]
          switch(extension){
            case 'scss':
              return Object.assign(acc, {[`./${filename}.${extension}`]: `./${targetLabelAssetFolder}/${filename}.${extension}`})
            case 'tsx':
            default:
              return Object.assign(acc, {[`./${filename[0].toLowerCase()}${filename.slice(1)}/${filename}`]: 
              `./${filename[0].toLowerCase()}${filename.slice(1)}/${targetLabelAssetFolder}/${filename}`})
          }},
        {});

    targetLabelConfigsDomainAlias = domainFilenames
      .filter((file) => _targetLabelCustomizationScssFiles.every((scssFileName) => file !== scssFileName))
      .map((file) => {
        const extension = ['tsx', 'ts', 'js'];
        var fileMeta = file.match(/([^\\/]*)\.(\w+)$/);
        return extension.includes(fileMeta[2]) ? fileMeta[1] : fileMeta[0];
      })
      .reduce(
        (acc, file) => Object.assign(acc, { [`./_default/${file}`]: `./${targetLabelAssetFolder}/${file}` }),
        {},
      );

    targetLabelConfigsScss = domainFilenames.filter(
      (file) => !_targetLabelCustomizationScssFiles.every((scssFileName) => file !== scssFileName),
    );
  }
  return {
    context: path.join(__dirname, 'src'),
    entry: ['react-hot-loader/patch', './index.tsx'],
    output: {
      path: __dirname + '/dist',
      filename: '[name].[hash].bundle.js',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    mode: 'development',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json', '.sass', '.scss', '.css'],
      alias: {
        'react-dom': '@hot-loader/react-dom',
        ...targetLabelConfigsDomainAlias,
        ...targetLabelConfigsComponentsAlias,
      },
      plugins: [new TsconfigPathsPlugin()],
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            { loader: MiniCssExtractPlugin.loader, options: { hmr: !env.PRODUCTION } },
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                additionalData: (content, loaderContext) => {
                  let newContent = content;

                  if (targetLabel) {
                    const { resourcePath, rootContext } = loaderContext;

                    _targetLabelCustomizationScssFiles.forEach((scssFileName) => {
                      if (targetLabelConfigsScss.includes(scssFileName)) {
                        const fileName = scssFileName.split('.').slice(0, -1).join('.');
                        const relativePath = path
                          .relative(
                            path.dirname(resourcePath),
                            path.join(rootContext, `domain/${targetLabelAssetFolder}/${fileName}`),
                          )
                          .replace(/[\\/]/g, '/');
                        newContent = newContent.replace(`~/${fileName}`, relativePath);
                      }
                    });
                  }

                  return newContent;
                },
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                svgoConfig: {
                  plugins: {
                    removeViewBox: false,
                  },
                },
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader',
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                experimentalWatchApi: true,
              },
            },
          ],
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: `locale/${targetLabel ? `${targetLabelAssetFolder}/` : ''}*.json`,
            to: 'locale/',
            flatten: true,
            transform(content, absolutePath) {
              const _context = {};
              if (targetLabel) {
                const name = path.basename(absolutePath);
                const data = fs.readFileSync(path.join(__dirname, `src/locale/${name}`));
                const json = data && JSON.parse(data);
                if (json) {
                  Object.assign(_context, json);
                }
              }
              Object.assign(_context, JSON.parse(content));
              return JSON.stringify(_context, null, 2);
            },
          },
          {
            from: 'assets/**/*',
            flatten: true,
            to: 'assets/',
            globOptions: {
              ignore: [
                ...excludeAssets.map((asset) => `**/${asset}/**`),
                ...(targetLabel ? [`**/${targetLabelAssetFolder}/**`] : []),
              ],
            },
          },
          {
            from: `assets/${targetLabelAssetFolder}/**/*`,
            to: 'assets/',
            flatten: true,
            force: true,
          },
        ],
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*', '!server.js'],
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: !!env.PRODUCTION ? 'server.html' : 'index.html',
      }),
      new CaseSensitivePathsPlugin(),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
    ],
    devServer: {
      contentBase: __dirname + '/dist',
      compress: true,
      hot: true,
      historyApiFallback: true,
      port: 4200,
      watchContentBase: true,
      progress: true,
      clientLogLevel: 'warning',
    },
  };
};
