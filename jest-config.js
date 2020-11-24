const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const paths = pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src' });

//TODO fix this and use it instead of manually declaring paths in package.json
module.exports = {
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    ...paths,
  },
};
