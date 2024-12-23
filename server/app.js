const express = require("express");
const awsServerlessExpress = require("aws-serverless-express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");
const { expressjwt: jwt } = require("express-jwt");
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

// app.use(
//   jwt({
//     secret: process.env.JWT_SECRET, // Replace with your JWT secret key
//     algorithms: ["HS256"], // Specify the algorithm used to sign the token
//     credentialsRequired: true, // Reject requests without a token
//   }).unless({ path: ["/auth/login"] })
// );

// app.use((err, req, res, next) => {
//   if (err.name === "UnauthorizedError") {
//     return res.status(401).json({ error: "Invalid or missing token" });
//   }
//   next(err);
// });

// Optional: Middleware for URL-encoded data (useful for forms)
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

// For local development
if (process.env.NODE_ENV === "development") {
  // Run Express app locally
  console.log("Running in DEV...");
  module.exports = app;
} else {
  console.log("Running in PROD...");
  // For Lambda environment, use aws-serverless-express
  const server = awsServerlessExpress.createServer(app);
  module.exports.handler = (event, context) => {
    return awsServerlessExpress.proxy(server, event, context);
  };
}
