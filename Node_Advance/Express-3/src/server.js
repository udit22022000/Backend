const express = require("express");
const connect = require("./config/db");
const app = express();

const start = async () => {
  await connect();
  app.listen(2500, () => {
    console.log("listening to port no 2500");
  });
};

module.exports = start;
