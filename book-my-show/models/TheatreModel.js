const { DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");
const City = require("./CityModel");

const Theatre = sequelize.define("theatre", {
  theatre_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  theatre_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  city_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: City,
      key: "city_id",
    },
  },
});

module.exports = Theatre;
