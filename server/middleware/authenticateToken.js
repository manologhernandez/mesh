require("dotenv").config();

const authenticateToken = (supabaseClient) => {
  return async (req, res, next) => {
    // Get the Authorization header
    const authHeader = req.headers["authorization"];

    // Ensure the header exists and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing or invalid token" });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    // Verify the token
    try {
      const {
        data: { user },
        error,
      } = await supabaseClient.auth.getUser(token);

      if (error) {
        throw new Error(error.message);
      }

      req.user = user; // Attach payload to the request object for later use
      next();
    } catch (err) {
      console.log(err);
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
  };
};

module.exports = authenticateToken;
