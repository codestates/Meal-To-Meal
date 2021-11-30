const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'mealtomeal',
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
      underscored: true,
      freezeTableName: true,
    },
    timezone: '+09:00',
    dialectOptions: {
      timezone: '+09:00',
    },
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD_RDS,
    database: process.env.DATABASE_NAME_RDS,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql',
    define: {
      underscored: true,
      freezeTableName: true,
    },
  },
};
