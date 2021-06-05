const http = require("http");

const server = http.createServer((req, res) => {
  // console.log(req.method)
  const url = req.url;
  // home page
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" }); //adding metadata to the response object....status code, content type[ mime types or media type] that we are passing ...browser will treat the content based upon our content type that we pass....
    res.write("<h2>home page</h2>"); //body content
    res.end(); //ending the communication
  }
  // about page
  else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>about page</h1>");
    res.end();
  }
  // 404
  else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>page not found</h1>");
    res.end();
  }
});

server.listen(5000);

/*
What is mime type?
Read about request and response object ...
*/
