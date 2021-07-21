const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  eslint: {
    dirs: ['pages'], // Only run ESLint on the 'pages'
  },
  env: {
    HOST_API: process.env.HOST_API,
    PORT: process.env.PORT,
    IS_DEV: process.env.IS_DEV,
  },
};
