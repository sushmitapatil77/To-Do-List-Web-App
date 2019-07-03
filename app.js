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

app.get("/", function(req, res) {
  let day = date.getDate();
  res.render('list', {
    listTitle: day,
    newItem: tasks
  });
});

app.post("/", function(req, res) {
  let task = req.body.task;
  if(task==="" && req.body.list == "add"){
    return false;
  }
  if (req.body.list == "add") {
    tasks.push(task);
    res.redirect("/");
  }
  else if(req.body.list == "delete"){
    tasks.pop(task);
    res.redirect("/");
  }
});

app.listen(process.env.PORT || 3000, function(req, res) {
  console.log("Server is running on port 3000");
});
