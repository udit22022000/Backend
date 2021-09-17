const express = require("express");
const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/facebook", {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    tag_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tag",
        required: false,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);
const Post = mongoose.model("post", postSchema);
const Comment = mongoose.model("comment", commentSchema);
const Tag = mongoose.model("tag", tagSchema);

const app = express();
app.use(express.json());

//CRUD operations for users
//Create a user
app.post("/users", async (req, res) => {
  const user = await User.create(req.body);

  res.status(201).json({ user });
});

//get all users.
app.get("/users", async (req, res) => {
  const user = await User.find().lean().exec();
  return res.status(200).send({ user });
});

//get a single user
app.get("/users/:id", async (req, res) => {
  const user = await User.find({ _id: req.params.id });

  res.status(201).send({ user });
});

//update a single user..
app.patch("/users/:id", async (req, res) => {
  const user = await User.updateOne({ _id: req.params.id }, { $set: req.body });
  res.status(201).json({ user });
});

//delete a single user..
app.delete("/users/:id", async (req, res) => {
  const user = await User.deleteOne({ _id: req.params.id });
  res.status(200).json({ user });
});

//CRUD operations for Tags..

//create a tag..
app.post("/tags", async (req, res) => {
  const tag = await Tag.create(req.body);
  return res.status(201).json({ tag });
});

//get all tags...
app.get("/tags", async (req, res) => {
  const tag = await Tag.find().lean().exec();
  return res.status(200).json({ tag });
});

//get a single tag..
app.get("/tags/:id", async (req, res) => {
  const tag = await Tag.find({ _id: req.params.id }).lean().exec();
  return res.status(200).json({ tag });
});

//update a tag..
app.patch("/tags/:id", async (req, res) => {
  const tag = await Tag.updateOne({ _id: req.params.id }, { $set: req.body });
  res.status(201).send({ tag });
});

//delete a tag..
app.delete("/tags/:id", async (req, res) => {
  const tag = await Tag.deleteOne({ _id: req.params.id });
  res.status(200).send({ tag });
});

// CRUD operations for post...
// create a post
app.post("/posts", async (req, res) => {
  const post = await Post.create(req.body);
  return res.status(201).json({ post });
});

//get all posts..
app.get("/posts", async (req, res) => {
  const post = await Post.find()
    .populate("user_id")
    .populate("tag_ids")
    .lean()
    .exec();

  return res.status(200).json({ post });
});

//get single post..
app.get("/posts/:id", async (req, res) => {
  const post = await Post.find({ _id: req.params.id })
    .populate("user_id")
    .populate("tag_ids")
    .lean()
    .exec();

  return res.status(201).json({ post });
});

//update a single post..
app.patch("/posts/:id", async (req, res) => {
  const post = await Post.updateOne({ _id: req.params.id }, { $set: req.body });
  return res.status(201).json({ post });
});

//delete a single post..
app.delete("/posts/:id", async (req, res) => {
  const post = await Post.deleteOne({ _id: req.params.id });
  return res.status(200).json({ post });
});

//CRUD for comment...
//create a comment
app.post("/comments", async (req, res) => {
  const comment = await Comment.create(req.body);
  return res.status(201).json({ comment });
});

//get all comments..
app.get("/comments", async (req, res) => {
  const comment = await Comment.find().populate("post_id").lean().exec();
  return res.status(200).json({ comment });
});

//get a single comment..
app.get("/comments/:id", async (req, res) => {
  const comment = await Comment.find({ _id: req.params.id })
    .populate("post_id")
    .lean()
    .exec();
  return res.status(200).json({ comment });
});

//get comments for a particular posts..
app.get("/posts/:id/comments", async (req, res) => {
  const comment = await Comment.find({ post_id: req.params.id }).lean().exec();
  const post = await Post.find({ _id: req.params.id }).lean().exec();
  return res.status(200).json({ post, comment });
});

//update a single comment..
app.patch("/comments/:id", async (req, res) => {
  const comment = await Comment.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );

  return res.status(201).json({ comment });
});

//delete a single comment...
app.delete("/comments/:id", async (req, res) => {
  const comment = await Comment.deleteOne({ _id: req.params.id });
  return res.status(200).json({ comment });
});

app.listen(5000, async () => {
  await connect();
  console.log("Listening to port number 5000");
});
