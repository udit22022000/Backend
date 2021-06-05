const express = require("express");
const path = require("path");

const app = express();

//setup static and middleware...
//app.use is used for setting up the middleware....
//things those are static ...that server doesn't need to tweek...generally we create one folder called public and place all our static resources over there...
//user can have 20000 static files...we can just dump it over in that public folder...and tell express the location of that folder with the help of a middleware...

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
});

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000....");
});
