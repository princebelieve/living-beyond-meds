const express = require("express");
const router = express.Router();
const Story = require("../models/Story");
const { protect, adminOnly } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

// Configure multer for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/stories");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const types = /jpeg|jpg|png|gif|mp4|webm/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = types.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error("Only images and videos are allowed"));
  },
});

// GET all stories (public)
router.get("/", async (req, res) => {
  try {
    const stories = await Story.find({ published: true }).sort({
      createdAt: -1,
    });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single story (public)
router.get("/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ error: "Story not found" });
    res.json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create story (admin only)
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("media"),
  async (req, res) => {
    try {
      const { title, excerpt, content, type, videoUrl } = req.body;
      const mediaUrl = req.file ? `/uploads/stories/${req.file.filename}` : "";

      const story = new Story({
        title,
        excerpt,
        content,
        type: type || "story",
        videoUrl,
        image: mediaUrl,
        thumbnail: mediaUrl,
      });

      await story.save();
      res.status(201).json(story);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

// PUT update story (admin only)
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("media"),
  async (req, res) => {
    try {
      const story = await Story.findById(req.params.id);
      if (!story) return res.status(404).json({ error: "Story not found" });

      const { title, excerpt, content, type, videoUrl, published, featured } =
        req.body;
      const mediaUrl = req.file
        ? `/uploads/stories/${req.file.filename}`
        : story.image;

      story.title = title || story.title;
      story.excerpt = excerpt || story.excerpt;
      story.content = content || story.content;
      story.type = type || story.type;
      story.videoUrl = videoUrl || story.videoUrl;
      story.image = mediaUrl;
      story.thumbnail = mediaUrl;
      if (published !== undefined) story.published = published;
      if (featured !== undefined) story.featured = featured;

      await story.save();
      res.json(story);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

// DELETE story (admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) return res.status(404).json({ error: "Story not found" });
    res.json({ message: "Story deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
