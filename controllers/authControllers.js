const bcrypt = require("bcryptjs");
const { User, Education, Experience } = require("../models/User");
const jwt = require("jsonwebtoken");

exports.userRegister = async (req, res) => {
  try {
    let { username, password, name, email, mobile, skills, image, website, education, experience } = req.body;

    // If username is missing, use email
    if (!username) {
      username = email;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      name,
      email,
      mobile,
      skills,
      image,
      website
    });

    // Add education records
    if (education && education.length > 0) {
      for (const edu of education) {
        await Education.create({ ...edu, UserId: user.id });
      }
    }

    // Add experience records
    if (experience && experience.length > 0) {
      for (const exp of experience) {
        await Experience.create({ ...exp, UserId: user.id });
      }
    }

    res.json({ success: true, message: "User registered successfully", user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const userData = user.toJSON();
    delete userData.password;

    res.json({ success: true, token, user: userData });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
