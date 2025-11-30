const express = require("express");
const auth = require("../middleware/auth");
const userController = require('../controllers/userControllers')
const router = express.Router();

// Get user info (public)
router.get("/:id", userController.getUser);

// Update user info (protected)
router.put("/:id", auth, userController.updateUser);

// Delete education record (protected)
router.delete("/:userId/education/:eduId", auth, userController.deleteEducation);

// Delete experience record (protected)
router.delete("/:userId/experience/:expId", auth, userController.deleteExperience);

module.exports = router;
