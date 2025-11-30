const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Message = sequelize.define("Message", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false }
});

module.exports = Message;
