const express = require("express");
const router = express.Router();

const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

// CRUD operations for post...
// create a post
router.post("/", async (req, res) => {
  const post = await Post.create(req.body);
  return res.status(201).json({ post });
});

//get all posts..
router.get("/", async (req, res) => {
  const post = await Post.find()
    .populate("user_id")
    .populate("tag_ids")
    .lean()
    .exec();

  return res.status(200).json({ post });
});

//get single post..
router.get("/:id", async (req, res) => {
  const post = await Post.find({ _id: req.params.id })
    .populate("user_id")
    .populate("tag_ids")
    .lean()
    .exec();

  return res.status(201).json({ post });
});

//update a single post..
router.patch("/:id", async (req, res) => {
  const post = await Post.updateOne({ _id: req.params.id }, { $set: req.body });
  return res.status(201).json({ post });
});

//delete a single post..
router.delete("/:id", async (req, res) => {
  const post = await Post.deleteOne({ _id: req.params.id });
  return res.status(200).json({ post });
});

//get comments for a particular posts..
router.get("/:id/comments", async (req, res) => {
  const comment = await Comment.find({ post_id: req.params.id }).lean().exec();
  const post = await Post.find({ _id: req.params.id }).lean().exec();
  return res.status(200).json({ post, comment });
});

module.exports = router;
