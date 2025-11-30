const express = require("express");
const { User, Education, Experience } = require("../models/User");


exports.userRegister = async (req, res) => {
  try {
    const { username, password, name, email, mobile, skills, image, website, education, experience } = req.body;

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
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token, user });
};

