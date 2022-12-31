module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest'
  }
};
