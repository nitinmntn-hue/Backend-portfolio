const express = require("express");
const userAuth = require('../controllers/authControllers');
const router = express.Router();

// Register user with profile, education, and experience
router.post("/register", userAuth.userRegister);

// Login
router.post("/login", userAuth.userLogin);


module.exports = router;
