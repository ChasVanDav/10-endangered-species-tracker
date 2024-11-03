module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // This line tells Jest to use Babel for .js and .jsx files
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'], // Include .jsx in module file extensions
    testEnvironment: 'jsdom',
  };
  