const express = require("express");
const router = express.Router();

const Tag = require("../models/tag.model");

//CRUD operations for Tags..
//create a tag..
router.post("/", async (req, res) => {
  const tag = await Tag.create(req.body);
  return res.status(201).json({ tag });
});

//get all tags...
router.get("/", async (req, res) => {
  const tag = await Tag.find().lean().exec();
  return res.status(200).json({ tag });
});

//get a single tag..
router.get("/:id", async (req, res) => {
  const tag = await Tag.find({ _id: req.params.id }).lean().exec();
  return res.status(200).json({ tag });
});

//update a tag..
router.patch("/:id", async (req, res) => {
  const tag = await Tag.updateOne({ _id: req.params.id }, { $set: req.body });
  res.status(201).send({ tag });
});

//delete a tag..
router.delete("/:id", async (req, res) => {
  const tag = await Tag.deleteOne({ _id: req.params.id });
  res.status(200).send({ tag });
});

module.exports = router;
