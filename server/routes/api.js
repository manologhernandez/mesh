const express = require("express");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
const router = express.Router();

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

// Get subtopics route
router.get("/subtopics", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("subtopic")
      .select(
        "id, name, icon, description, subtopic_rules(order, title, description)"
      );

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({ data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

// Get course groups route
router.get("/course_groups", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("course_group")
      .select("id, name, icon, description");

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({ data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

// Get post route
router.get("/post", async (req, res) => {
  const uuid = req.query.id;

  if (!uuid) {
    return res.status(400).json({ message: "Post id required" });
  }

  try {
    const { data, error } = await supabase
      .from("post")
      .select(
        "uuid, title, text, author_username, created_at, is_censored, is_promoted, college(id, short_name, color), subtopic(id, name, description, icon, subtopic_rules(order, title, description)), course_group(id, name, description)"
      )
      .eq("uuid", uuid);

    if (error) {
      throw new Error(error.message);
    }

    if (data.length > 0) {
      return res
        .status(200)
        .json({ message: "Post retrieved.", data: data[0] });
    } else {
      return res.status(404).json({ message: "Post does not exist" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

// Create post route
router.post("/create_post", async (req, res) => {
  const {
    college,
    courseGroup,
    subtopic,
    title,
    isCensorPost,
    isPromotePost,
    post,
    author,
    attachment,
  } = req.body;

  if (!college || !title || !post || !subtopic || !author) {
    return res
      .status(400)
      .json({ message: "Post details are incomplete/invalid." });
  }

  try {
    const { data, error } = await supabase
      .from("post")
      .insert({
        title: title,
        text: post,
        author_username: author,
        subtopic_id: parseInt(subtopic),
        course_group_id: parseInt(courseGroup),
        college_id: parseInt(college),
        is_censored: Boolean(isCensorPost),
        is_promoted: Boolean(isPromotePost),
      })
      .select("uuid");
    if (error) {
      throw new Error(error.message);
    }

    res.status(200).json({ message: "Post created", id: data[0].uuid });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

module.exports = router;
