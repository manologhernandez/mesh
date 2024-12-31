const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");
require("dotenv").config();

const app = express();

// Middlewares

// Configure CORS options
const corsOptions = {
  origin: "https://www.mesh.com.ph", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"], // Adjust as needed
};

// Use CORS middleware
app.use(cors(corsOptions));

app.use(bodyParser.json());

// Optional: Middleware for URL-encoded data (useful for forms)
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

// For local development
if (process.env.NODE_ENV === "development") {
  // Run Express app locally
  console.log("Running in DEV...");
} else {
  console.log("Running in PROD...");
}

module.exports = app;
