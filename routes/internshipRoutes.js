const express = require("express");
const Internship = require("../models/Internship");
const auth = require("../middleware/auth"); // protect if needed
const router = express.Router();

// Get all internships
router.get("/", async (req, res) => {
  const internships = await Internship.findAll();
  res.json(internships);
});

// Get single internship by ID
router.get("/:id", async (req, res) => {
  const internship = await Internship.findByPk(req.params.id);
  if (!internship) return res.status(404).json({ message: "Internship not found" });
  res.json(internship);
});

// Create internship
router.post("/", auth, async (req, res) => {
  const internship = await Internship.create(req.body);
  res.json(internship);
});

// Update internship
router.put("/:id", auth, async (req, res) => {
  const updated = await Internship.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true, message: "Internship updated", updated });
});

// Delete internship
router.delete("/:id", auth, async (req, res) => {
  await Internship.destroy({ where: { id: req.params.id } });
  res.json({ success: true, message: "Internship deleted" });
});

module.exports = router;
