const express = require("express");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
const multer = require("multer");
const router = express.Router();
const crypto = require("crypto");
const authenticateToken = require("../middleware/authenticateToken");

// Multer Configuration with File Size Limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(
        new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed.")
      );
    }
    cb(null, true);
  },
});

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
router.get("/subtopics", authenticateToken(supabase), async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("subtopic")
      .select(
        "id, name, icon, description, subtopic_rule(order, title, description)"
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
router.get("/course_groups", authenticateToken(supabase), async (req, res) => {
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

// Get a college route
router.get("/college", authenticateToken(supabase), async (req, res) => {
  const id = req.query.id;
  try {
    const { data, error } = await supabase
      .from("college")
      .select("*")
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    if (data.length < 1) {
      return res.status(404).json({ message: "College not found." });
    }

    return res.status(200).json({ data: data[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

// Get all colleges route
router.get("/colleges", authenticateToken(supabase), async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("college")
      .select("id, name, short_name, color")
      .order("short_name", { ascending: true });

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

// Get a specific post route
router.get("/post", authenticateToken(supabase), async (req, res) => {
  const uuid = req.query.id;
  const user = req.user;
  const userId = user.id;

  if (!uuid) {
    return res.status(400).json({ message: "Post id required" });
  }

  try {
    const { data, error } = await supabase
      .from("post")
      .select(
        `uuid, title, text, author_username, created_at, is_censored, is_promoted, attachment, 
        college(id, short_name, color), 
        subtopic(id, name, description, icon, subtopic_rule(order, title, description)), 
        course_group(id, name, description), 
        user_has_reacted:post_reaction(created_at),
        total_reactions:post_reaction!inner(count)`
      )
      .eq("uuid", uuid)
      .eq("post_reaction.user_id", userId);
    // .eq("post_reaction.reaction_type", "like");

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

// Get all posts route
// Todo: add suport for filterng and sorting
router.get("/posts", authenticateToken(supabase), async (req, res) => {
  var offset = req.query.offset;
  var limit = req.query.limit;
  var sortBy = req.query.sortBy;
  const user = req.user;
  const userId = user.id;
  var collegeFilter = req.query.college;

  if (collegeFilter) {
    collegeFilter = collegeFilter.split(",");
  }

  // set defaults
  if (!offset) {
    offset = 0;
  }

  if (!limit) {
    limit = 5;
  }

  if (!sortBy) {
    sortBy = "desc";
  }

  try {
    const from = offset * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("post")
      .select(
        `uuid, title, text, author_username, created_at, is_censored, is_promoted, attachment, 
      college(id, short_name, color), 
      subtopic(id, name), 
      course_group(id, name),
      user_has_reacted:post_reaction(created_at),
      total_reactions:post_reaction!inner(count)`
      )
      .eq("post_reaction.user_id", userId)
      .range(from, to)
      .order("created_at", { ascending: sortBy == "asc" });

    if (collegeFilter) {
      query = query.in("college_id", collegeFilter);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    if (data.length > 0) {
      return res.status(200).json({ message: "Posts retrieved.", data });
    } else {
      return res.status(404).json({ message: "No posts found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

// Create post route
router.post("/create_post", authenticateToken(supabase), async (req, res) => {
  const {
    courseGroup,
    subtopic,
    title,
    isCensorPost,
    isPromotePost,
    post,
    attachment,
  } = req.body;

  const user = req.user;

  if (!title || !post || !subtopic) {
    return res
      .status(400)
      .json({ message: "Post details are incomplete/invalid." });
  }

  const username = user.email.split("@")[0];
  const college = user.user_metadata.college.id;

  try {
    const { data, error } = await supabase
      .from("post")
      .insert({
        title: title,
        text: post,
        author_username: username,
        subtopic_id: parseInt(subtopic),
        course_group_id: parseInt(courseGroup),
        college_id: college,
        is_censored: Boolean(isCensorPost),
        is_promoted: Boolean(isPromotePost),
        attachment: attachment,
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

// React to a post route
router.post("/react_post", authenticateToken(supabase), async (req, res) => {
  const { postUuid, reaction } = req.body;
  const user = req.user;

  if (!postUuid || !reaction) {
    return res
      .status(400)
      .json({ message: "Post reaction details are incomplete/invalid." });
  }

  try {
    const { error } = await supabase.from("post_reaction").insert({
      post_uuid: postUuid,
      user_id: user.id,
      reaction_type: reaction,
    });

    if (error) {
      throw new Error(error.message);
    }

    res.status(200).json({ message: "Post liked." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

// Remove react to a post route
router.delete("/react_post", authenticateToken(supabase), async (req, res) => {
  const { postUuid } = req.body;
  const user = req.user;

  if (!postUuid) {
    return res
      .status(400)
      .json({ message: "Post reaction details are incomplete/invalid." });
  }

  try {
    const { error } = await supabase
      .from("post_reaction")
      .delete()
      .eq("post_uuid", postUuid)
      .eq("user_id", user.id);

    if (error) {
      throw new Error(error.message);
    }

    res.status(200).json({ message: "Post unliked." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

// Upload file route
// Endpoint to Handle File Upload
router.post(
  "/upload",
  authenticateToken(supabase),
  upload.single("file"),
  async (req, res) => {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file attached" });
    }

    try {
      // generate random filename
      const fileExtension = file.originalname.split(".").pop(); // Extract file extension
      const randomName = crypto.randomBytes(16).toString("hex"); // Generate random 16-byte string
      const filename = `${randomName}.${fileExtension}`;

      // upload file
      const { data, error } = await supabase.storage
        .from("uploads") // Replace with your bucket name
        .upload(`user/${filename}`, file.buffer, {
          cacheControl: "3600",
          upsert: false, // Set to true if you want to overwrite existing files
          contentType: file.mimetype,
        });

      if (error) {
        throw error;
      }

      // Generate the public URL of the uploaded file
      const publicUrl = supabase.storage
        .from("uploads")
        .getPublicUrl(`user/${filename}`).data.publicUrl;

      res.status(200).json({
        message: "File uploaded successfully",
        url: publicUrl,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
