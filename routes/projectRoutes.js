const express = require("express");
const Project = require("../models/projects");
const router = express.Router();

// Get all projects
router.get("/", async (req, res) => {
  const projects = await Project.findAll();
  res.json(projects);
});

// Create project
router.post("/", async (req, res) => {
  const project = await Project.create(req.body);
  res.json(project);
});

// Update project
router.put("/:id", async (req, res) => {
  await Project.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true, message: "Project updated" });
});

// Delete project
router.delete("/:id", async (req, res) => {
  await Project.destroy({ where: { id: req.params.id } });
  res.json({ success: true, message: "Project deleted" });
});

module.exports = router;
