const express = require("express");
const connect = require("./config/db");

//controllers..
const userController = require("./controllers/user.controller");
const postController = require("./controllers/post.controller");
const tagConroller = require("./controllers/tag.controller");
const commentController = require("./controllers/comment.controller");

const app = express();

app.use(express.json());
app.use("/users", userController);
app.use("/comments", commentController);
app.use("/tags", tagConroller);
app.use("/posts", postController);

app.listen(5000, async () => {
  await connect();
  console.log("Listening to port number 5000");
});
