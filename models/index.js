const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  "roommatesdev",
  "roommatesdev",
  "roommatesdev",
  {
    "dialect": "postgres",
    "dialectOptions": {
      "multipleStatements": true
    },
    "host": "localhost",
    "port": 5432,
    "pool": {
      "max": 10,
      "min": 0
    }
  }
);

const db = {
  sequelize,
  Sequelize,
  Users: sequelize.import('./user')
};

module.exports = db;
