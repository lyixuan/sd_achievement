const path = require('path');

module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          components: path.join(__dirname, './src/components'),
          utils: path.join(__dirname, 'src/utils/'),
          services: path.join(__dirname, 'src/services/'),
        },
      },
    ],
  ],
};
