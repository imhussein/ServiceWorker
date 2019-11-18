const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(express.json());
const fs = require("fs");

app.use(express.static(__dirname));

app.get("/login", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/home", function(req, res) {
  res.sendFile(__dirname + "/home.html");
});

app.get("/api", function(req, res) {
  fs.readFile(__dirname + "/posts.json", { encoding: "utf-8" }, (err, data) => {
    res.status(200).json({
      data: JSON.parse(data)
    });
  });
});

app.post("/", function(req, res) {
  fs.readFile(__dirname + "/posts.json", { encoding: "utf-8" }, function(
    err,
    posts
  ) {
    if (!err) {
      let data = JSON.parse(posts);
      let lastIndex = data[data.length - 1];
      let id = lastIndex["id"];
      data.push({
        id: id + 1,
        title: req.body.value
      });
      fs.writeFile(__dirname + "/posts.json", JSON.stringify(data), function(
        err
      ) {
        if (err) {
          console.log(err);
        }
        res.status(200).json({
          title: req.body.value
        });
      });
    }
  });
});

app.get("/posts/:id", function(req, res) {
  fs.readFile(__dirname + "/posts.json", { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.log(err);
    }

    let posts = JSON.parse(data);
    let filtered = posts.filter(post => post.id != req.params.id);
    fs.writeFile(__dirname + "/posts.json", JSON.stringify(filtered), err => {
      if (err) {
        console.log(err);
      }
      res.status(200);
    });
  });
});

app.listen(3000, () => {
  console.log("Server Connected");
});
