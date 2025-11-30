const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Project = sequelize.define("Project", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  techStack: { type: DataTypes.JSON },
  link: { type: DataTypes.STRING }
});

module.exports = Project;
