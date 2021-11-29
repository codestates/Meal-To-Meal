const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
<<<<<<< HEAD
    database: 'MtoM_local',
=======
    database: 'mealtomeal',
>>>>>>> 7127e4e1850dc1f384657f66b561f3dc646fb425
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD_RDS,
    database: process.env.DATABASE_NAME_RDS,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql',
  },
};
