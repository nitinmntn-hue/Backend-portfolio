const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./models/index");

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact_info", contactRoutes);
app.use("/api/internships", internshipRoutes);

// Database sync
sequelize
  .sync() // ✅ no force, keeps existing data
  .then(() => console.log("✅ Database synced"))
  .catch((err) => console.error("❌ Database sync failed:", err));

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
