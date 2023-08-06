const { DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");
const Theatre = require("./TheatreModel");
const Movie = require("./MovieModel");
const Language = require("./MovieLanguageModel");

const Show = sequelize.define("Show", {
  show_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Movie,
      key: "movie_id",
    },
  },
  theatre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Theatre,
      key: "theatre_id",
    },
  },
  show_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  show_language_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Language,
      key: "language_id",
    },
  },
});

//Associations between Show and other models

Show.belongsTo(Movie, {
  foreignKey: "movie_id",
  as: "movie",
});

Show.belongsTo(Theatre, {
  foreignKey: "theatre_id",
  as: "theatre",
});

Show.belongsTo(Language, {
  foreignKey: "language_id",
  as: "language",
});

module.exports = Show;