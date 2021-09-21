const express = require("express");
const connect = require("./config/db");
const userConroller = require("./controllers/user.controller");
const app = express();

app.use(express.json());
app.use("/users", userConroller);

const start = async () => {
  await connect();
  app.listen(2500, () => {
    console.log("listening to port no 2500");
  });
};

module.exports = start;
