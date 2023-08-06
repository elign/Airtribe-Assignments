const { DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

const City = sequelize.define("city", {
  city_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  city_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});


module.exports = City;
