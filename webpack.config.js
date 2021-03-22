const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const tsConfig = require('./tsconfig.json');
const webpack = require('webpack');

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
  const _path = path.dirname(filepath).replace(/[\\/]/g, '/').replace(`/${targetLabelFolder}`, '');
  return {
    parentFolderPath: _path,
    parentFolderName: _path.split('/').pop(),
  };
}

/**
 * Set the first character of the string to lower
 * @param {string} str: string to convert
 */
function lowerCaseFirstLetter(str) {
  return str[0].toLowerCase() + str.substr(1);
}

// Replacing the import of hte files for the target label files
function InlineImportsLabelResolver(props) {
  /**
   * @param { { fileParentFolderPath: { alias: labelAlias } } } alias: contains the map for target label files which need to be replaced
   */
  const alias = Object.keys(props).reduce((acc, __path__) => {
    if (!__path__.includes('src')) return acc;

    let [folderPath, filePath] = __path__.split('@#@');
    folderPath = folderPath.replace('./src/', '');

    return Object.assign(acc, {
      [folderPath]: Object.assign({}, acc[folderPath], { [filePath]: props[__path__] }),
    });
  }, {});
  const aliasFoldersPath = Object.keys(alias);

  // resolve the import of the files ( original import to target label file import )
  return new (function (source, target) {
    this.source = source || 'resolve';
    this.target = target || 'resolve';

    this.apply = function (resolver) {
      var target = resolver.ensureHook(this.target);
      resolver
        .getHook(this.source)
        .tapAsync('InlineImportsLabelResolver', function (request, resolveContext, callback) {
          if (!request.path.includes('node_modules')) {
            const targetAliasesKey = aliasFoldersPath.find((aliasFolderPath) => {
              return (
                request.path.search(new RegExp(`(${aliasFolderPath.replace(/\//g, '\\\\')}|${aliasFolderPath})$`)) !==
                -1
              );
            });
            const targetAliases = targetAliasesKey ? alias[targetAliasesKey] : false;

            if (targetAliasesKey && targetAliases && targetAliases[request.request]) {
              var obj = Object.assign({}, request, {
                request: targetAliases[request.request],
              });
              return resolver.doResolve(target, obj, null, resolveContext, callback);
            }
          }

          callback();
        });
    };
  })();
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
  glob.sync('./src/assets/*').forEach((file) => {
    const absolutePath = path.join(__dirname, file);

    if (fs.lstatSync(absolutePath).isDirectory() && /^\_[^(default)].*/.test(file) && file !== targetLabelFolder) {
      excludeAssets.push(file);
    }
  });

  let targetLabelLocaleAlias = {};
  let targetLabelConfigsAlias = {};
  let targetLabelComponentsAlias = {};
  let targetLabelComponentsKeys = [];
  let targetLabelPrototypesAlias = []; // enums , interfaces, models
  let targetLabelTsConfigAlias = [];
  let targetLabelEnvAlias = [];
  let targetLabelUtilsAlias = [];
  let componentsFilepaths = [];

  let stylesFilenames = [];
  let labelFilenames = [];
  let prototypesFilenames = [];
  let environmentFilenames = [];
  let localeFilenames = [];
  let utilsFilenames = [];

  // Generate map to replace files for different domain
  if (targetLabel) {
    environmentFilenames = glob.sync(`./src/env/${targetLabelFolder}/*`);
    stylesFilenames = glob.sync(`./src/scss/${targetLabelFolder}/**/*.scss`);
    labelFilenames = glob.sync(`./src/domain/${targetLabelFolder}/**/*.*`);
    prototypesFilenames = glob.sync(`./src/domain/${targetLabelFolder}/!(data)/**/*.*`);
    localeFilenames = glob.sync(`./src/locale/${targetLabel ? `${targetLabelFolder}/` : ''}*.js`);
    utilsFilenames = glob.sync(`./src/utils/**/${targetLabelFolder}/*.*`);

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
      const { parentFolderPath, parentFolderName } = fileParentFolder(filePath, targetLabelFolder);

      if (filePath.match(/(components)/g).length > 1) {
        switch (extension) {
          case 'scss':
            return Object.assign(acc, {
              [`${parentFolderPath}@#@./${filename}.${extension}`]: `../../${targetLabelFolder}/components/${parentFolderName}/${basename}`,
            });
          case 'ts':
            return Object.assign(acc, {
              [`${parentFolderPath}@#@./${filename}`]: `../../${targetLabelFolder}/components/${parentFolderName}/${filename}`,
            });
          default:
            switch (fileType) {
              case 'config':
              case 'locale':
                return Object.assign(acc, {
                  [`${parentFolderPath}@#@./${filename}`]: `../../${targetLabelFolder}/components/${parentFolderName}/${filename}`,
                });
              default:
                // FOR CHILDE COMPONENTS OF PAGE TYPE COMPONENT
                return Object.assign(acc, {
                  [`${parentFolderPath.replace(
                    `/${parentFolderName}`,
                    '',
                  )}@#@./${parentFolderName}/${filename}`]: `../${targetLabelFolder}/components/${parentFolderName}/${filenamePrefix}${filename}`,
                });
            }
        }
      } else {
        switch (extension) {
          case 'scss':
            return Object.assign(acc, {
              [`${parentFolderPath}@#@./${filename}.${extension}`]: `./${targetLabelFolder}/${basename}`,
            });
          case 'ts':
            return Object.assign(acc, {
              [`${parentFolderPath}@#@./${filename}`]: `./${targetLabelFolder}/${filename}`,
            });
          default:
            switch (fileType) {
              case 'config':
              case 'locale':
                return Object.assign(acc, {
                  [`${parentFolderPath}@#@./${filename}`]: `./${targetLabelFolder}/${filename}`,
                });
              default:
                // ONLY FOR PAGE TYPE COMPONENT REPLACEMENT
                return Object.assign(acc, {
                  [`${parentFolderPath.replace(
                    `/${parentFolderName}`,
                    '',
                  )}@#@./${parentFolderName}/${filename}`]: `./${parentFolderName}/${targetLabelFolder}/${filenamePrefix}${filename}`,
                });
            }
        }
      }
    }, {});

    targetLabelComponentsKeys = Object.keys(targetLabelComponentsAlias);

    // console.log(componentsFilepaths, targetLabelComponentsAlias);
    // return;

    targetLabelConfigsAlias = labelFilenames.reduce((acc, filePath) => {
      const exceptions = ['routers.config.ts'];
      const extensions = ['tsx', 'ts', 'js'];
      const { filename, extension, basename } = filePathDestructor(filePath);
      const file = extensions.includes(extension) ? filename : basename;
      const { parentFolderPath, parentFolderName } = fileParentFolder(filePath);

      if (exceptions.includes(basename)) {
        switch (basename) {
          case 'routers.config.ts':
            return Object.assign(acc, {
              [`@routers`]: path.join(__dirname, `/src/domain/${targetLabelFolder}/${basename}`),
            });
          default:
            return acc;
        }
      } else if (parentFolderName === targetLabelFolder) {
        return Object.assign(acc, {
          [`./_default/${file}`]: `./${targetLabelFolder}/${file}`,
        });
      } else {
        return Object.assign(acc, {
          [`./_default/${parentFolderName}/${file}`]: `./${targetLabelFolder}/${parentFolderName}/${file}`,
        });
      }
    }, {});

    targetLabelPrototypesAlias = prototypesFilenames.reduce((acc, filePath) => {
      const extensions = ['tsx', 'ts', 'js'];
      const { filename, extension, basename } = filePathDestructor(filePath);
      const file = extensions.includes(extension) ? filename : basename;
      const _path = filePath.replace(new RegExp(`.*${targetLabelFolder}\/(.+)\/([^\/]+)\/?$`), '$1');
      const { parentFolderPath } = fileParentFolder(filePath, targetLabelFolder);

      return Object.assign(acc, {
        [`./${file}`]: path.join(__dirname, `src/domain/${targetLabelFolder}/${_path}/${file}`),
      });
    }, {});

    targetLabelUtilsAlias = utilsFilenames.reduce((acc, filePath) => {
      const extensions = ['tsx', 'ts', 'js'];
      const { filename, extension, basename } = filePathDestructor(filePath);
      const file = extensions.includes(extension) ? filename : basename;
      const _path = filePath.replace(new RegExp(`.*/utils\/(.+)\/${targetLabelFolder}.*`), '$1');
      const { parentFolderPath } = fileParentFolder(filePath, targetLabelFolder);

      return Object.assign(acc, {
        [`./${file}`]: path.join(__dirname, `src/utils/${_path}/${targetLabelFolder}/${file}`),
      });
    }, {});

    // console.log(targetLabelUtilsAlias, utilsFilenames)

    targetLabelEnvAlias = environmentFilenames
      .map((filePath) => {
        const extensions = ['ts'];
        const { filename, extension, basename } = filePathDestructor(filePath);
        return extensions.includes(extension) ? filename : basename;
      })
      .reduce(
        (acc, file) =>
          Object.assign(acc, {
            [`./${file}`]: `./${targetLabelFolder}/${file}`,
          }),
        {},
      );

    targetLabelLocaleAlias = localeFilenames.reduce((acc, filePath) => {
      const { parentFolderPath } = fileParentFolder(filePath, targetLabelFolder);
      const { filename } = filePathDestructor(filePath);

      return Object.assign(acc, {
        [`./locale/${filename}`]: `./locale/${targetLabelFolder}/${filename}`,
      });
    }, {});

    // console.log(targetLabelLocaleAlias, localeFilenames);
    // return;

    targetLabelTsConfigAlias = stylesFilenames.map((filePath) => {
      const { filename } = filePathDestructor(filePath);
      return filename;
    });

    // console.log(targetLabelConfigsScss);
    // return
  }

  targetLabelTsConfigAlias = Object.keys(tsConfig.compilerOptions.paths).reduce((acc, pathKey) => {
    const _filename = targetLabelTsConfigAlias.find((el) => pathKey.includes(el));
    let _path = tsConfig.compilerOptions.paths[pathKey][0].replace('/*', '');
    if (_filename) {
      _path = _path.replace(_filename, `${targetLabelFolder}/${_filename}`);
    }
    return Object.assign(acc, { [pathKey.replace('/*', '')]: path.resolve(__dirname, 'src/', _path) });
  }, {});

  return {
    stats: {
      moduleAssets: false,
      children: false,
      colors: true,
      logging: 'warn',
    },
    context: path.join(__dirname, 'src'),
    entry: {
      presets: ['@babel/polyfill'],
      main: ['react-hot-loader/patch', './index.tsx'],
    },
    output: {
      path: __dirname + '/dist/browser',
      filename: '[name].[hash].bundle.js',
    },
    mode: 'development',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json', '.sass', '.scss', '.css'],
      plugins: [
        InlineImportsLabelResolver({
          ...targetLabelComponentsAlias,
        }),
      ],
      alias: {
        'react-dom': '@hot-loader/react-dom',
        ...targetLabelEnvAlias,
        ...targetLabelTsConfigAlias,
        ...targetLabelLocaleAlias,
        ...targetLabelConfigsAlias,
        ...targetLabelPrototypesAlias,
        ...targetLabelUtilsAlias,
      },
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
            {
              loader: 'css-loader',
              options: {
                url: false,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                additionalData: (content, loaderContext) => {
                  let newContent = content;

                  if (targetLabel) {
                    const { resourcePath, rootContext } = loaderContext;
                    const { filename } = filePathDestructor(resourcePath);

                    stylesFilenames.forEach((labelScssFilePath) => {
                      const { filename } = filePathDestructor(labelScssFilePath);
                      const relativePath = path
                        .relative(
                          path.dirname(resourcePath),
                          path.join(rootContext, `scss/${targetLabelFolder}/${filename}`),
                        )
                        .replace(/[\\/]/g, '/');
                      newContent = newContent.replace(`~/${filename}`, relativePath);
                    });

                    const componentFile = componentsFilepaths.find((filePath) => {
                      const { filenamePrefix, filename: _filename, extension } = filePathDestructor(filePath);
                      const { parentFolderPath } = fileParentFolder(filePath, targetLabelFolder);
                      const { parentFolderPath: resourceFolderPath } = fileParentFolder(
                        resourcePath,
                        targetLabelFolder,
                      );

                      return (
                        filenamePrefix &&
                        (resourceFolderPath.includes(parentFolderPath.replace('./src/', '').replace(/\//g, '\\')) ||
                          resourceFolderPath.includes(parentFolderPath.replace('./src/', ''))) &&
                        _filename === filename &&
                        extension === 'scss'
                      );
                    });

                    if (componentFile) {
                      const { filenamePrefix, basename } = filePathDestructor(componentFile);
                      const idx = componentsFilepaths.indexOf(componentFile),
                        dir = path
                          .dirname(targetLabelComponentsAlias[targetLabelComponentsKeys[idx]])
                          .replace(/^[..(\\|\/)]+/, ''),
                        from = componentFile,
                        to = componentFile
                          .replace(dir, dir.replace(new RegExp(`${targetLabelFolder}/?`), ''))
                          .replace(basename, basename.replace(filenamePrefix, '')),
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
                    // removeDimensions: true,
                    reusePaths: true,
                    removeOffCanvasPaths: true,
                    removeStyleElement: true,
                    removeScriptElement: true,
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
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    !env.PRODUCTION
                      ? {
                          modules: false,
                        }
                      : {
                          targets: {
                            node: 'current',
                          },
                        },
                  ],
                  '@babel/preset-react',
                  '@babel/preset-typescript',
                ],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.PrefetchPlugin(path.join(__dirname, 'src/utils/hooks'), './index.ts'),
      new webpack.DefinePlugin(
        Object.keys(env).reduce(
          (acc, key) =>
            Object.assign(acc, {
              [`process.env.${key}`]: JSON.stringify(env[key]),
            }),
          {},
        ),
      ),
      new CopyPlugin({
        patterns: [
          {
            from: 'assets/_default/**/*',
            flatten: true,
            to: 'assets/',
            globOptions: {
              ignore: [...excludeAssets.map((asset) => `**/${asset}/**`)],
            },
          },
          {
            from: 'assets/(img|svg)/*',
            to({ context, absoluteFilename }) {
              return `${path
                .relative(context, absoluteFilename)
                .replace(/[\\/]/g, '/')
                .replace(new RegExp(`(img|svg)/`), '')}`;
            },
            globOptions: {
              ignore: [...excludeAssets.map((asset) => `**/${asset}/**`)],
            },
          },
          {
            from: `assets/${targetLabelFolder}/(img|svg)/**/*`,
            to({ context, absoluteFilename }) {
              return `${path
                .relative(context, absoluteFilename)
                .replace(/[\\/]/g, '/')
                .replace(new RegExp(`${targetLabelFolder}/(img|svg)/`), '')}`;
            },
            // flatten: true,
            force: true,
          },
          {
            from: `files/${targetLabelFolder}/**/*`,
            to: 'files/',
            flatten: true,
            force: true,
            noErrorOnMissing: true,
          },
        ],
      }),
      new CaseSensitivePathsPlugin(),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
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
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*', '!server.js'],
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: !!env.PRODUCTION ? 'server.html' : 'index.html',
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
