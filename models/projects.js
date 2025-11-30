const { DataTypes } = require("sequelize");
const sequelize = require("./index"); // adjust path to your sequelize instance

const Project = sequelize.define("Project", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  team: {
    type: DataTypes.JSON, // store array or object of team members
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  techStack: {
    type: DataTypes.JSON, // store array of technologies
    allowNull: true
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "Projects",   // ✅ explicit table name
  timestamps: true         // ✅ adds createdAt & updatedAt
});

module.exports = Project;
