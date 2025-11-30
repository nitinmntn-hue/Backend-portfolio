const express = require("express");
const cors = require("cors");
const sequelize = require("./models/index");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require('./routes/authRoutes');
const internshipRoutes = require("./routes/internshipRoutes");

const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/internships", internshipRoutes);


sequelize.sync().then(() => console.log("Database synced"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
