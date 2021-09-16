const express = require("express");
const mongoose = require("mongoose");

const app = express();

const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/TestDB", {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
    default: "Male",
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema); //make sure database name is in singular...

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await User.find().lean().exec();
  res.send(users);
});

app.get("/user/:id", async (req, res) => {
  const users = await User.find({ _id: req.params.id });

  res.send(users);
});

app.post("/users", async (req, res) => {
  const user = await User.create(req.body);

  res.status(201).send(user);
});

app.patch("/user/:id", async (req, res) => {
  const user = await User.updateOne({ _id: req.params.id }, { $set: req.body });

  res.send(user);
});

app.delete("/user/:id", async (req, res) => {
  const user = await User.deleteOne({ _id: req.params.id });

  res.send(user);
});

app.listen(3050, async () => {
  await connect();
  console.log("listening on port no 3050");
});
