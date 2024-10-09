const express = require("express");
const router = express.Router();
const Blog = require("../models/blogModel");

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/view/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const currentBlog = await Blog.findOne({ _id: id });

    if (!currentBlog) {
      return res.status(404).json({ message: "Blog not found!" });
    }

    res.status(200).json(currentBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { title, img, location, desc } = req.body;

  const blog = new Blog({
    title,
    img,
    location,
    desc,
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  const { title, img, location, desc } = req.body;
  const id = req.params.id;

  try {
    const currentBlog = await Blog.findOne({ _id: id });

    if (!currentBlog) {
      return res.status(404).json({ message: "Blog not found!" });
    }

    if (title) currentBlog.title = title;
    if (img) currentBlog.img = img;
    if (location) currentBlog.location = location;
    if (desc) currentBlog.desc = desc;

    const updatedBlog = await currentBlog.save();
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const currentBlog = await Blog.findOne({ _id: id });

    if (!currentBlog) {
      return res.status(404).json({ message: "Blog not found!" });
    }

    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog Deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
