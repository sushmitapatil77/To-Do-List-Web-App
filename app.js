//jshint esversion:6
// Require all necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let tasks = [];
let worktasks = [];

app.get("/", function(req, res) {
  let day = date.getDate();
  res.render('list', {
    listTitle: day,
    newItem: tasks
  });
});

app.post("/", function(req, res) {
  let task = req.body.task;
  if (req.body.list == "Work List") {
    worktasks.push(task);
    res.redirect("/work");
  } else {
    tasks.push(task);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render('list', {
    listTitle: "Work List",
    newItem: worktasks
  });
});

app.post("/work", function(req, res) {
  let worktask = req.body.worktask;
  worktasks.push(worktask);
  res.redirect("/");
});


app.get("/about", function(req, res) {
  res.render("about");
});
app.listen(process.env.PORT || 3000, function(req, res) {
  console.log("Server is running on port 3000");
});
