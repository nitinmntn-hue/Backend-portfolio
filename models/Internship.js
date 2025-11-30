const { DataTypes } = require("sequelize");
const sequelize = require("./index"); // adjust path to your sequelize instance

const Internship = sequelize.define("Internship", {
  company: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE }, // can be null if ongoing
  description: { type: DataTypes.TEXT }
}, {
  tableName: "Internships", // ✅ explicit table name
  timestamps: true          // ✅ adds createdAt & updatedAt
});

module.exports = Internship;

