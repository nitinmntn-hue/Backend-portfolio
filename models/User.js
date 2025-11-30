const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const User = sequelize.define("User", {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false }, // hashed password

  // Profile fields
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  mobile: { type: DataTypes.STRING },
  skills: { type: DataTypes.JSON }, // store array of skills
  image: { type: DataTypes.STRING }, // URL or file path
  website: { type: DataTypes.STRING }
});

// Education table
const Education = sequelize.define("Education", {
  schoolCollege: { type: DataTypes.STRING },
  boardUniversity: { type: DataTypes.STRING },
  year: { type: DataTypes.STRING },
});


// Experience table
const Experience = sequelize.define("Experience", {
  company: { type: DataTypes.STRING },
  joiningDate: { type: DataTypes.DATE },
  leftDate: { type: DataTypes.DATE },
  totalExperience: { type: DataTypes.STRING },
  post: { type: DataTypes.STRING },
});

// Relations
User.hasMany(Education, { onDelete: "CASCADE" });
Education.belongsTo(User);

User.hasMany(Experience, { onDelete: "CASCADE" });
Experience.belongsTo(User);

module.exports = { User, Education, Experience };
