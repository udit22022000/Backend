const connect = require("./config/db");

const boxofficeController = require("./controllers/boxoffice.controllers");

const express = require("express");
const app = express();

app.use(express.json());
app.use("/users", boxofficeController);

const start = async () => {
  await connect();
  app.listen(5000, () => {
    console.log("Listening on port no 5000");
  });
};

module.exports = start;
