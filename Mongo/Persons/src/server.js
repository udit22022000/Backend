const connect = require("./config/db");

const PersonsController = require("./controllers/persons.controllers");
const PersonsController2 = require("./controllers/persons2.controller");
const FriendsController = require("./controllers/friends.controller");

const express = require("express");
const app = express();

app.use(express.json());
app.use("/persons", PersonsController);
app.use("/persons2", PersonsController2);
app.use("/friends", FriendsController);

const start = async () => {
  await connect();
  app.listen(5000, () => {
    console.log("Listening on port no 5000");
  });
};

module.exports = start;
