module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['react-native-paper/babel'],
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@components': './components',
          '@screens': './screens',
          '@hooks': './hooks',
          '@services': './services',
        },
      },
    ],
  ],
};
