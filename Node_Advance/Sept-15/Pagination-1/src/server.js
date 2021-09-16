const express = require("express");

const app = express();

const connect = require("./configs/db");

app.listen(2345, async function () {
  await connect();
  console.log("listening to port no 2345");
});
