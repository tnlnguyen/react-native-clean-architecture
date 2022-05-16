module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            /**
             * Regular expression is used to match all files inside `./src` directory and map each `.src/folder/[..]` to `~folder/[..]` path
             */
            '~Src': './src',
            '~Assets': './src/Assets',
            '~Base': './src/Base',
            '~Containers': './src/Containers',
            '~Core': './src/Core',
            '~Locales': './src/Locales',
            '~Store': './src/Store',
            '~Config': './src/Config',
            '~i18n': './src/i18n',

          },
          extensions: [
            '.ios.js',
            '.android.js',
            '.js',
            '.jsx',
            '.json',
            '.tsx',
            '.ts',
            '.native.js',
          ],
        },
      ],
    ],
  };
};
