const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Internship = sequelize.define("Internship", {
  company: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE }, // can be null if ongoing
  description: { type: DataTypes.TEXT },
});

module.exports = Internship;
