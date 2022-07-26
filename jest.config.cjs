const { pathsToModuleNameMapper } = require('ts-jest')

module.exports = {
  clearMocks: true,
  coverageProvider: 'v8',
  moduleNameMapper: pathsToModuleNameMapper(
    {
      'controllers/*': ['controllers/*'],
      'domain/*': ['domain/*'],
      'infra/*': ['infra/*'],
      'useCases/*': ['useCases/*'],
    },
    {
      prefix: '<rootDir>/src/',
    },
  ),
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: false,
            decorators: true,
          },
          target: 'es2017',
          keepClassNames: true,
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
        },
        module: {
          type: 'es6',
          noInterop: false,
        },
      },
    ],
  },
}
