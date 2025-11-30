const express = require("express");
const Internship = require("../models/Internship"); // ✅ import model
const auth = require("../middleware/auth");         // ✅ import auth middleware
const router = express.Router();

// Get all internships
router.get("/", async (req, res) => {
  try {
    const internships = await Internship.findAll();
    res.json({ success: true, data: internships });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get single internship by ID
router.get("/:id", async (req, res) => {
  try {
    const internship = await Internship.findByPk(req.params.id);
    if (!internship) return res.status(404).json({ success: false, message: "Internship not found" });
    res.json({ success: true, data: internship });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Create internship (protected)
router.post("/", auth, async (req, res) => {
  try {
    const internship = await Internship.create(req.body);
    res.json({ success: true, data: internship });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Update internship (protected)
router.put("/:id", auth, async (req, res) => {
  try {
    await Internship.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true, message: "Internship updated" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Delete internship (protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Internship.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: "Internship deleted" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
