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
router.get("/subtopics", async (req, res) => {
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

// Get a subtopic route
router.get("/subtopic", authenticateToken(supabase), async (req, res) => {
  const id = req.query.id;
  try {
    const { data, error } = await supabase
      .from("subtopic")
      .select(
        "id, name, icon, description, subtopic_rule(order, title, description)"
      )
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    if (data.length < 1) {
      return res.status(404).json({ message: "Subtopic not found." });
    }

    return res.status(200).json({ data: data[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

// Get all course group route
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

// Get a course group route
router.get("/course_group", authenticateToken(supabase), async (req, res) => {
  const id = req.query.id;
  try {
    const { data, error } = await supabase
      .from("course_group")
      .select("id, name, icon, description")
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    if (data.length < 1) {
      return res.status(404).json({ message: "Course group not found." });
    }

    return res.status(200).json({ data: data[0] });
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
router.get("/posts", authenticateToken(supabase), async (req, res) => {
  var offset = req.query.offset;
  var limit = req.query.limit;
  var sortBy = req.query.sortBy;

  const user = req.user;
  const userId = user.id;
  const collegeFilter = req.query.college;
  const courseGroupFilter = req.query.courseGroup;
  const subtopicFilter = req.query.subtopic;
  const userFilter = req.query.user;
  const searchString = req.query.search;

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
      total_reactions:post_reaction!inner(count),
      total_comments:comment!inner(count)
      `
      )
      .eq("post_reaction.user_id", userId)
      .range(from, to);

    if (collegeFilter) {
      query = query.in("college_id", collegeFilter.split(","));
    }

    if (courseGroupFilter) {
      query = query.in("course_group_id", courseGroupFilter.split(","));
    }

    if (subtopicFilter) {
      query = query.in("subtopic_id", subtopicFilter.split(","));
    }

    if (userFilter) {
      query = query.in("author_username", userFilter.split(","));
    }

    if (searchString) {
      var searchQuery = "";
      searchString.split(" ").forEach((word) => {
        searchQuery += `'${word}' | `;
      });
      searchQuery += searchString.replaceAll(" ", "+");
      query = query.textSearch("fts", searchQuery);
    }

    if (sortBy == "desc") {
      query = query.order("created_at", { ascending: false });
    } else if (sortBy == "asc") {
      query = query.order("created_at", { ascending: true });
    } else {
      query = query.order("impressions", {
        ascending: false,
        nullsFirst: false,
      });
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

// Get threadlines route
router.get("/threadlines", authenticateToken(supabase), async (req, res) => {
  const user = req.user;
  const userId = user.id;

  try {
    const from = 0;
    const to = 4;

    const { data, error } = await supabase
      .from("post")
      .select(`uuid, title, is_censored, attachment, college( color)`)
      .range(from, to)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    if (data.length > 0) {
      return res.status(200).json({ message: "Threadlines retrieved.", data });
    } else {
      return res.status(404).json({ message: "No threadlines found" });
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

// Get a specific post's comments
// TODO: Add advanced comment filtering
router.get("/comment", authenticateToken(supabase), async (req, res) => {
  const postUuid = req.query.postUuid;
  const user = req.user;
  const userId = user.id;

  if (!postUuid) {
    return res.status(400).json({ message: "Post id required" });
  }

  try {
    const { data: comments, error } = await supabase
      .from("comment")
      .select(
        `id, post_uuid, author, text, created_at, reply_to, college(color),
        user_has_reacted:comment_reaction(created_at),
        total_reactions:comment_reaction!inner(count)`
      )
      .eq("post_uuid", postUuid)
      .eq("comment_reaction.user_id", userId)
      .order("created_at", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    console.log("comments:", comments);

    // Step 2: Build a nested comment tree and track the latest reply date
    const commentMap = {};
    const rootComments = [];

    // Map all comments by ID
    comments.forEach((comment) => {
      commentMap[comment.id] = {
        ...comment,
        replies: [],
        latest_reply_at: comment.created_at,
      };
    });

    // Organize comments into a tree structure and update latest reply timestamps
    comments.forEach((comment) => {
      if (comment.reply_to === null) {
        // Root comment
        rootComments.push(commentMap[comment.id]);
      } else {
        // Reply to another comment
        const parent = commentMap[comment.reply_to];
        if (parent) {
          parent.replies.push(commentMap[comment.id]);

          // Update the parent's latest reply timestamp if this reply is newer
          if (new Date(comment.created_at) > new Date(parent.latest_reply_at)) {
            parent.latest_reply_at = comment.created_at;
          }
        }
      }
    });

    // Step 3: Sort root comments by latest reply timestamp (descending)
    rootComments.sort(
      (a, b) => new Date(b.latest_reply_at) - new Date(a.latest_reply_at)
    );

    return res.status(200).json({
      message: "Comments retrieved.",
      data: rootComments,
      count: comments.length,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

// Comment to a post route
router.post("/comment", authenticateToken(supabase), async (req, res) => {
  const { postUuid, text, replyTo } = req.body;
  const user = req.user;
  const username = user.email.split("@")[0];
  const college = user.user_metadata.college.id;

  if (!postUuid || !text) {
    return res
      .status(400)
      .json({ message: "Comment details are incomplete/invalid." });
  }

  try {
    const { error } = await supabase.from("comment").insert({
      post_uuid: postUuid,
      author: username,
      author_college_id: college,
      text: text,
      reply_to: replyTo ? parseInt(replyTo) : null,
    });

    if (error) {
      throw new Error(error.message);
    }

    res.status(200).json({ message: "Comment uploaded" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

// React to a comment route
router.post("/react_comment", authenticateToken(supabase), async (req, res) => {
  const { reaction, commentId } = req.body;
  const user = req.user;

  if (!commentId || !reaction) {
    return res
      .status(400)
      .json({ message: "Post reaction details are incomplete/invalid." });
  }

  try {
    const { error } = await supabase.from("comment_reaction").insert({
      user_id: user.id,
      comment_id: commentId,
      reaction_type: reaction,
    });

    if (error) {
      throw new Error(error.message);
    }

    res.status(200).json({ message: "Comment liked." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

// Remove react to a comment route
router.delete(
  "/react_comment",
  authenticateToken(supabase),
  async (req, res) => {
    const { commentId } = req.body;
    const user = req.user;

    if (!commentId) {
      return res
        .status(400)
        .json({ message: "Comment reaction details are incomplete/invalid." });
    }

    try {
      const { error } = await supabase
        .from("comment_reaction")
        .delete()
        .eq("comment_id", commentId)
        .eq("user_id", user.id);

      if (error) {
        throw new Error(error.message);
      }

      res.status(200).json({ message: "Comment unliked." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error.", error: error.message });
    }
  }
);

module.exports = router;
