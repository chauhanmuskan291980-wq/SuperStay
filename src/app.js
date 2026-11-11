const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// Security middleware
app.use(helmet());

// Enable cross-origin requests
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "SuperStay API is running!",
    });
});

module.exports = app;