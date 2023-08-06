const { DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

const ShowFeature = sequelize.define("ShowFeature", {
  feature_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  feature: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

module.exports = ShowFeature;
