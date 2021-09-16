const express = require("express");
const mongoose = require("mongoose");

const app = express();

const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017", {
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

app.listen(3050, async () => {
  await connect();
  console.log("listening on port no 3050");
});
