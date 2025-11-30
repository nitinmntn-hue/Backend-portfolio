const express = require("express");
const { Message } = require("../models/Message"); // Sequelize model
const auth = require("../middleware/auth");
const router = express.Router();

// Post new contact message (public)
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, content } = req.body;

    if (!name || !email || !content) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const message = await Message.create({ name, email, subject, content });
    res.json({ success: true, message: "Message received!", data: message });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
// Get all messages (admin only)
router.post("/all", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const messages = await Message.findAll();
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
