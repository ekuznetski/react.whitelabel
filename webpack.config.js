const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

/**
 * Return filepath/filename destructed to { filename, extension, basename }
 * @param {string} filepath; path to the file or filename
 */
function filePathDestructor(filepath) {
  return path
    .basename(filepath)
    .match(/(?<basename>(?<filenamePrefix>\+?)(?<filename>([^\\/\.]*\.?(?<fileType>[^\\/]*)))\.(?<extension>\w+)$)/)
    .groups;
}

/**
 * Return file parent folder name
 * @param {string} filepath; path to the file or filename
 * @param {string} targetLabelFolder; target label folder name
 */
function fileParentFolder(filepath, targetLabelFolder) {
  return path.dirname(filepath).replace(`/${targetLabelFolder}`, '').split('/').pop();
}

/**
 * Set the first character of the string to lower
 * @param {string} str: string to convert
 */
function lowerCaseFirstLetter(str) {
  return str[0].toLowerCase() + str.substr(1);
}

module.exports = (_env, arguments) => {
  const env = {
    PRODUCTION: false,
    LABEL: null,
    ..._env,
  };
  const targetLabel = env.LABEL && env.LABEL.length && env.LABEL.toLowerCase();
  const targetLabelFolder = targetLabel ? `_${targetLabel}` : '_default';
  const excludeAssets = [];

  // Generate exclude assets paths
  fs.readdirSync(path.join(__dirname, 'src/assets')).forEach((file) => {
    const absolutePath = path.join(__dirname, 'src/assets', file);

    if (fs.lstatSync(absolutePath).isDirectory() && /^\_[^(default)].*/.test(file) && file !== targetLabelFolder) {
      excludeAssets.push(file);
    }
  });

  // Generate env object to pass to React
  const targetLabelEnvPath = path.join(__dirname, `src/domain/${targetLabelFolder}/env.config.json`);
  if (fs.existsSync(targetLabelEnvPath)) {
    const data = fs.readFileSync(targetLabelEnvPath);
    const json = data && JSON.parse(data);
    if (json) {
      const _env = Object.assign({}, json, env, {
        LABEL: targetLabel || 'default',
      });
      fs.writeFileSync(targetLabelEnvPath, JSON.stringify(_env, null, 2));
    }
  }

  const _targetLabelCustomizationScssFiles = ['theme.scss', 'variables.scss'];
  let targetLabelLocaleAlias = {};
  let targetLabelConfigsAlias = {};
  let targetLabelComponentsAlias = {};
  let targetLabelComponentsKeys = [];
  let targetLabelConfigsScss = [];
  let componentsFilepaths = [];

  // Generate map to replace files for different domain
  if (targetLabel) {
    const domainFilenames = fs.readdirSync(`./src/domain/${targetLabelFolder}`);
    const localeFilenames = glob.sync(`./src/locale/${targetLabel ? `${targetLabelFolder}/` : ''}*.js`);

    const componentsExtensionToHandle = ['tsx', 'ts', 'js', 'scss'];
    componentsFilepaths = glob
      .sync(`./src/components/**/!(index).{${componentsExtensionToHandle.toString()}}`)
      .filter((filePath) => filePath.includes(`/${targetLabelFolder}`))
      .filter((filePath, idx, originalArr) => {
        const { filename, extension } = filePathDestructor(filePath);
        // Filter out .scss if .tsx file with the same name presented
        return extension === 'scss'
          ? !originalArr.some((componentPath) => componentPath.includes(`/${filename}.tsx`))
          : true;
      });

    targetLabelComponentsAlias = componentsFilepaths.reduce((acc, filePath) => {
      const { filenamePrefix, fileType, filename, extension, basename } = filePathDestructor(filePath);
      const folderName = fileParentFolder(filePath, targetLabelFolder);

      if (filePath.match(/(components)/g).length > 1) {
        switch (extension) {
          case 'scss':
            return Object.assign(acc, {
              [`./${filename}.${extension}`]: `../../${targetLabelFolder}/components/${folderName}/${basename}`,
            });
          case 'ts':
            return Object.assign(acc, {
              [`./${filename}`]: `../../${targetLabelFolder}/components/${folderName}/${filename}`,
            });
          default:
            switch (fileType) {
              case 'config':
                return Object.assign(acc, {
                  [`./${filename}`]: `../../${targetLabelFolder}/components/${folderName}/${filename}`,
                });
              default:
                // FOR CHILDE COMPONENTS OF PAGE TYPE COMPONENT
                return Object.assign(acc, {
                  [`./${folderName}/${filename}`]: `../${targetLabelFolder}/components/${folderName}/${filenamePrefix}${filename}`,
                });
            }
        }
      } else {
        switch (extension) {
          case 'scss':
            return Object.assign(acc, {
              [`./${filename}.${extension}`]: `./${targetLabelFolder}/${basename}`,
            });
          case 'ts':
            return Object.assign(acc, {
              [`./${filename}`]: `./${targetLabelFolder}/${filename}`,
            });
          default:
            switch (fileType) {
              case 'config':
                return Object.assign(acc, {
                  [`./${filename}`]: `./${targetLabelFolder}/${filename}`,
                });
              default:
                // ONLY FOR PAGE TYPE COMPONENT REPLACEMENT
                return Object.assign(acc, {
                  [`./${folderName}/${filename}`]: `./${folderName}/${targetLabelFolder}/${filenamePrefix}${filename}`,
                });
            }
        }
      }
    }, {});

    targetLabelComponentsKeys = Object.keys(targetLabelComponentsAlias);

    // console.log(componentsFilepaths, targetLabelComponentsAlias);
    // return;

    targetLabelConfigsAlias = domainFilenames
      .filter((file) => _targetLabelCustomizationScssFiles.every((scssFileName) => file !== scssFileName))
      .map((filePath) => {
        const extensions = ['tsx', 'ts', 'js'];
        const { filename, extension, basename } = filePathDestructor(filePath);
        return extensions.includes(extension) ? filename : basename;
      })
      .reduce(
        (acc, file) =>
          Object.assign(acc, {
            [`./_default/${file}`]: `./${targetLabelFolder}/${file}`,
          }),
        {},
      );

    targetLabelLocaleAlias = localeFilenames
      .map((filePath) => {
        const { filename } = filePathDestructor(filePath);
        return filename;
      })
      .reduce(
        (acc, file) =>
          Object.assign(acc, {
            [`./locale/${file}`]: `./locale/${targetLabelFolder}/${file}`,
          }),
        {},
      );

    // console.log(targetLabelLocaleAlias, localeFilenames);
    // return;

    targetLabelConfigsScss = domainFilenames.filter(
      (file) => !_targetLabelCustomizationScssFiles.every((scssFileName) => file !== scssFileName),
    );

    // console.log(targetLabelComponentsAlias);
  }

  return {
    stats: 'minimal',
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
        ...targetLabelLocaleAlias,
        ...targetLabelConfigsAlias,
        ...targetLabelComponentsAlias,
      },
      plugins: [new TsconfigPathsPlugin()],
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: !env.PRODUCTION,
              },
            },
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                additionalData: (content, loaderContext) => {
                  let newContent = content;

                  if (targetLabel) {
                    const { resourcePath, rootContext } = loaderContext;
                    const { filename } = filePathDestructor(resourcePath);

                    _targetLabelCustomizationScssFiles.forEach((scssFileName) => {
                      if (targetLabelConfigsScss.includes(scssFileName)) {
                        const { filename } = filePathDestructor(scssFileName);
                        const relativePath = path
                          .relative(
                            path.dirname(resourcePath),
                            path.join(rootContext, `domain/${targetLabelFolder}/${filename}`),
                          )
                          .replace(/[\\/]/g, '/');
                        newContent = newContent.replace(`~/${filename}`, relativePath);
                      }
                    });

                    const componentFile = componentsFilepaths.find((filePath) => {
                      const { filenamePrefix, filename: _filename, extension } = filePathDestructor(filePath);
                      return filenamePrefix && _filename === filename && extension === 'scss';
                    });

                    if (componentFile) {
                      const idx = componentsFilepaths.indexOf(componentFile),
                        from = componentFile,
                        to = componentFile.replace(
                          targetLabelComponentsAlias[targetLabelComponentsKeys[idx]].slice(2),
                          targetLabelComponentsKeys[idx].slice(2),
                        ),
                        _import = `@import '${path.relative(from, to).replace(/[\\/]/g, '/').slice(3)}';`;

                      if (newContent.indexOf(_import) == -1) newContent = _import + newContent;
                    }
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
                    removeUselessStrokeAndFill: false,
                    removeViewBox: false,
                    prefixIds: false,
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
          // {
          //   from: `locale/${targetLabel ? `${targetLabelFolder}/` : ''}*.json`,
          //   to: 'locale/',
          //   flatten: true,
          //   transform(content, absolutePath) {
          //     const _context = {};
          //     if (targetLabel) {
          //       const name = path.basename(absolutePath);
          //       const data = fs.readFileSync(path.join(__dirname, `src/locale/${name}`));
          //       const json = data && JSON.parse(data);
          //       if (json) {
          //         Object.assign(_context, json);
          //       }
          //     }
          //     Object.assign(_context, JSON.parse(content));
          //     return JSON.stringify(_context, null, 2);
          //   },
          // },
          {
            from: 'assets/**/*',
            flatten: true,
            to: 'assets/',
            globOptions: {
              ignore: [
                ...excludeAssets.map((asset) => `**/${asset}/**`),
                ...(targetLabel ? [`**/${targetLabelFolder}/**`] : []),
              ],
            },
          },
          {
            from: `assets/${targetLabelFolder}/**/*`,
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
