const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const applicationRoutes = require("./routes/applicationRoutes");
const cors = require("cors");
dotenv.config();

const app = express();

// To understand json
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Authentication routes
app.use("/api/auth", authRoutes);

// Application routes
app.use("/api/applications", applicationRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("ApplyTrack Backend is Running");
});

// Protected test route
app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({
        message: "You accessed a protected route!",
        user: req.user
    });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});