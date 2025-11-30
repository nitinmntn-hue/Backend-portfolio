const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

// Post new contact message
router.post("/", async (req, res) => {
  const message = await Message.create(req.body);
  res.json({ success: true, message: "Message received!" });
});

// Get all messages
router.get("/", async (req, res) => {
  const messages = await Message.findAll();
  res.json(messages);
});

module.exports = router;
