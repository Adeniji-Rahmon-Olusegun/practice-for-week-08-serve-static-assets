const http = require('http');
const fs = require("fs");


let imageEx = ["dog.png", "dog.jpg"];
let styling = ["application.css"];

let homepage = fs.readFileSync("index.html", "utf-8");

const server = http.createServer((req, res) => {
  // Your code here

  console.log(req.method, req.url);

  let urlToken = req.url.split("/");

  if (req.method === "GET" && req.url === "/") {

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");

    return res.end(homepage);
  }

  if (req.method === "GET" && urlToken[1] === "static" && urlToken[2] === "images" && imageEx.includes(urlToken[3])) {
    let image = fs.readFileSync(`./assets/images/${urlToken[3]}`);

    let extension = urlToken[3].split(".")[1];

    if (extension === "jpg") {
      res.setHeader("Content-Type", "images/jpeg")
    } else if (extension === "png") {
      res.setHeader("Content-Type", "images/png")
    }

    res.write(image);
    res.end()
  }

  if (req.method === "GET" && urlToken[1] === "static" && urlToken[2] === "css" && styling.includes(urlToken[3])) {
    let css = fs.readFileSync(`./assets/css/${urlToken[3]}`);

    let extension = urlToken[3].split(".")[1];

    if (extension === "css") {
      res.setHeader("Content-Type", "text/css")
    } 

    res.write(css);
    res.end()
  }
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));