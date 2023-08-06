const { Sequelize } = require('sequelize');

// Replace 'database', 'username', and 'password' with your actual database credentials
const sequelize = new Sequelize('bookmyshow', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;