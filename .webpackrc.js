const path = require('path');
export default {
  entry: 'src/index.js',
  extraBabelPlugins: [['import', { libraryName: 'antd-mobile', style: 'css' }]],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    utils: path.resolve(__dirname, 'src/utils/'),
    services: path.resolve(__dirname, 'src/services/'),
    container: path.resolve(__dirname, 'src/container/'),
  },
  ignoreMomentLocale: true,
  // theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  disableDynamicImport: false,
  publicPath: '/',
  hash: true,
  define: {
    'process.env.API_TYPE': process.env.API_TYPE,
  },
};
