const http = require("http");

//both the parameters req and res that we have mentioned inside the callback function are giant objects..
//req represents the incoming request from client...and res is response that we are sending to the client...
console.log("OUTSIDE");
const server = http.createServer((req, res) => {
  //console.log(req);
  console.log("INSIDE");
  if (req.url === "/") {
    res.write("Welcome to our homepage");
    res.end();
    return;
  }
  if (req.url === "/about") {
    res.end("Here is our history");
    return;
  }
  res.write(`
  <h1>OOPS...</h1>
  <p>Not able to find the page u are looking for</p>`);
  res.end();
  return;
});

server.listen(5000);
