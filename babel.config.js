module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['react-native-paper/babel'],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@components': './components',
          '@screens': './screens',
          '@hooks': './hooks',
        },
      },
    ],
  ],
};
