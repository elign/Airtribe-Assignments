const { DataTypes, ForeignKeyConstraintError } = require("sequelize");
const sequelize = require("../dbconfig");
const Theatre = require("./TheatreModel");
const Movie = require("./MovieModel");
const Language = require("./MovieLanguageModel");
const ShowFeature = require("./ShowFeatureModel");

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
  show_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  show_time: {
    type: DataTypes.TIME,
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
  show_feature_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ShowFeature,
      key: "feature_id",
    },
  },
});

// //Associations between Show and other models

Show.hasOne(Movie, {
  foreignKey : "movie_id",
  as: "movie",
});
  //Show.belongsTo(Movie, {
//   foreignKey: "movie_id",
//   as: "movie",
// });

// Show.belongsTo(Theatre, {
//   foreignKey: "theatre_id",
//   as: "theatre",
// });

// Show.belongsTo(Language, {
//   foreignKey: "language_id",
//   as: "language",
// });

module.exports = Show;
