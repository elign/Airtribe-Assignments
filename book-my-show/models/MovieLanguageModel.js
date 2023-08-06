const { DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

const MovieLanguage = sequelize.define("MovieLanguage", {
  language_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  language: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

module.exports = MovieLanguage;