const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
const { checkSupabaseConnection } = require("./config/superbase");

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


app.get("/health/supabase", async (req, res) => {
    try {
        await checkSupabaseConnection();

        res.status(200).json({
            success: true,
            message: "Supabase connection successful!",
        });
    } catch (error) {
        console.error("Supabase connection error:", error.message);

        res.status(503).json({
            success: false,
            message: "Supabase connection failed",
        });
    }
});

module.exports = app;