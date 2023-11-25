module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // 'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          // This needs to be mirrored in tsconfig.json
          routes: './src/routes',
          screens: './src/screens',
          components: './src/components',
          hooks: './src/hooks',
          img: './src/img',
          themes: './src/themes',
        },
      },
    ],
  ],
};
