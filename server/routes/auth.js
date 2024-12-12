const express = require("express");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
const router = express.Router();
const authTools = require("../helpers/auth/authTools");

// Supabase initialization
const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

// Routes
// Validate Email Route
router.post("/validate_email", async (req, res) => {
  const { email } = req.body;

  if (!email || !authTools.validateEmailString(email)) {
    return res.status(400).json({ message: "Please input a valid email." });
  }

  var collegeDetails = null;

  try {
    collegeDetails = await authTools.validateEmailCollege(email, supabase);
    if (!collegeDetails) {
      return res.status(401).json({ message: "Email is unsupported." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }

  try {
    if (!(await authTools.validateEmailAttempts(email, supabase))) {
      return res
        .status(403)
        .json({ message: "Email has been used more than twice." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }

  try {
    const { data, error } = await authTools.sendOtp(email, supabase);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json({ message: "Email supported", data: collegeDetails });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

// Validate OTP Route
router.post("/validate_otp", async (req, res) => {
  const { otp, email } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required." });
  }

  try {
    const { data, error } = await authTools.verifyOtp(email, otp, supabase);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    await authTools.incrementEmailAttempts(email, supabase);

    res.status(200).json({ message: "OTP Validated!", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

// Resend OTP Route
router.post("/resend_otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const { error } = await authTools.resendOtp(email, supabase);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json({ message: "OTP Resent!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

// Signup Route
router.post("/signup", async (req, res) => {
  const { username, password, degree, subtopics, uuid, college } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  // Create user with fake @meshuser.xyz email, then delete original university email
  try {
    const { data, error } = await authTools.createUser(
      username,
      password,
      degree,
      subtopics,
      college,
      supabase
    );

    if (error) {
      if (error.code == "user_already_exists") {
        return res.status(400).json({ message: "Username already exists" });
      }
      return res
        .status(500)
        .json({ message: "Internal server error.", error: error.message });
    }

    const { err } = await authTools.deleteUser(uuid, supabase);
    if (err) {
      throw new Error(err.message);
    }

    var responseData = {
      session: {
        token: data.session.access_token,
      },
    };

    res.status(201).json({ message: "Signup successful!", data: responseData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

// Rollback Signup Route
router.post("/rollback", async (req, res) => {
  const { uuid, email } = req.body;

  if (!uuid) {
    return res.status(400).json({ message: "UUID is required." });
  }

  try {
    const { error } = await authTools.deleteUser(uuid, supabase);

    if (error) {
      throw new Error(error.message);
    }

    await authTools.decrementEmailAttempts(email, supabase);

    res.status(200).json({ message: "Rollback successful!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const { data, error } = await authTools.loginUser(
      username,
      password,
      supabase
    );

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    var responseData = {
      session: {
        token: data.session.access_token,
      },
    };

    res.status(200).json({ message: "Login successful!", data: responseData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

module.exports = router;
