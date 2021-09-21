const express = require("express");
const router = express.Router();

const Comment = require("../models/comment.model");

//create a comment
router.post("/", async (req, res) => {
  const comment = await Comment.create(req.body);
  return res.status(201).json({ comment });
});

//get all comments..
router.get("/", async (req, res) => {
  const comment = await Comment.find().populate("post_id").lean().exec();
  return res.status(200).json({ comment });
});

//get a single comment..
router.get("/:id", async (req, res) => {
  const comment = await Comment.find({ _id: req.params.id })
    .populate("post_id")
    .lean()
    .exec();
  return res.status(200).json({ comment });
});

//update a single comment..
router.patch("/:id", async (req, res) => {
  const comment = await Comment.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );

  return res.status(201).json({ comment });
});

//delete a single comment...
router.delete("/:id", async (req, res) => {
  const comment = await Comment.deleteOne({ _id: req.params.id });
  return res.status(200).json({ comment });
});

module.exports = router;
