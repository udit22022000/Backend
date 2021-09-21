const express = require("express");
const router = express.Router(); //we will only inmport router...since we only need that...

const User = require("../models/user.model");

//CRUD operations for users
//Create a user
router.post("/", async (req, res) => {
  const user = await User.create(req.body);

  res.status(201).json({ user });
});

//get all users.
router.get("/", async (req, res) => {
  const page = +req.query.page || 1;
  const size = +req.query.limit || 10;

  const offset = (page - 1) * size;
  const totalPages = await User.find({ male: { $eq: "Male" } })
    .countDocuments()
    .exec();
  const user = await User.find().skip(offset).limit(size).lean().exec();

  return res.status(200).send({ user });
});

//get a single user
router.get("/:id", async (req, res) => {
  const user = await User.find({ _id: req.params.id });

  res.status(201).send({ user });
});

//update a single user..
router.patch("/:id", async (req, res) => {
  const user = await User.updateOne({ _id: req.params.id }, { $set: req.body });
  res.status(201).json({ user });
});

//delete a single user..
router.delete("/:id", async (req, res) => {
  const user = await User.deleteOne({ _id: req.params.id });
  res.status(200).json({ user });
});

module.exports = router;
