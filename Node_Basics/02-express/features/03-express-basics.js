const express = require("express");
const app = express(); //creating a server instance...with bunch of cool methods...

//this callback function will be invoked everytime the user is sending the get request...
//it is preferred to set the status code manually....so that we have more control over the things...

app.get("/", (req, res) => {
  console.log("user hit the resource");
  res.status(200).send("Home Page");
});

app.get("/about", (req, res) => {
  res.status(200).send("About Page");
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>resource not found</h1>");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});

// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen
