const express = require("express");
const awsServerlessExpress = require("aws-serverless-express");

const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");
const { expressjwt: jwt } = require("express-jwt");
require("dotenv").config();

const app = express();

// Middlewares
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

module.exports = app;

// AWS Lambda stuff
const server = awsServerlessExpress.createServer(app);
exports.handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context);
};
