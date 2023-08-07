const { DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");
const Language = require("./MovieLanguageModel");

const Movie = sequelize.define("Movie", {
  movie_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  movie_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  dimension: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  language: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Language,
      key: "language_id",
    },
  },
});

module.exports = Movie;
