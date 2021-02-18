module.exports = {
  setupFiles: ['<rootDir>/config/setup-enzyme.js'],
  modulePaths: ['<rootDir>/src'],
  moduleDirectories: ['node_modules'],
  testRegex: '(\\.(test|spec))\\.((j|t)sx|(t|j)s)$',
  moduleFileExtensions: ['tsx','js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__']
};
