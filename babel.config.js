const plugins = [
  'optional-require',
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ['./src/'],
      alias: {
        '@theme': './src/theme',
        '@interfaces': './src/interfaces',
        '@components': './src/components',
        '@styles': './src/styles',
        '@screens': './src/screens',
        '@routers': './src/routers',
        '@services': './src/services',
        '@utils': './src/utils',
        '@store': './src/store',
        '@actions': './src/actions',
      },
      extensions: ['.js', '.jsx', '.es', '.es6', '.mjs', '.ts', '.tsx'],
    },
  ],
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins,
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
