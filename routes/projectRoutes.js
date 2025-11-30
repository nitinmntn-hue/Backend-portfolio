const express = require("express");
const Project = require("../models/projects"); // ✅ import your Project model
const auth = require("../middleware/auth");   // ✅ import your auth middleware
const router = express.Router();

// Get all projects (public)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Create a new project (requires auth)
router.post("/:userId", auth, async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, UserId: req.params.userId });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Update a project (requires auth)
router.put("/:userId/:id", auth, async (req, res) => {
  try {
    await Project.update(req.body, {
      where: { id: req.params.id, UserId: req.params.userId }
    });
    res.json({ success: true, message: "Project updated" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Delete a project (requires auth)
router.delete("/:userId/:id", auth, async (req, res) => {
  try {
    await Project.destroy({
      where: { id: req.params.id, UserId: req.params.userId }
    });
    res.json({ success: true, message: "Project deleted" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
