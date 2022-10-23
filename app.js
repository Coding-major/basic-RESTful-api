const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { schema } = require("joi/lib/types/object");
const _ = require("lodash");
const { rest } = require("lodash");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = new mongoose.Schema (
  {
    title: String,
    content: String
  }
)

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")

.get((req, res) => {
  Article.find((err, foundArticles) => {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err)
    }
  })
})

.post(function(req, res) {
  // console.log(req.body.title);
  // console.log(req.body.content);
  const newArticle = new Article(
    {
      title: req.body.title,
      content:req.body.content
    }
  )

  newArticle.save(function(err) { 
    if(!err) {
      res.send("successfully added")
    } else {
      res.send(err)
    }
  })
  
})

.delete((req, res)=> {
  Article.deleteMany(function (err) {
   if (!err) {
     res.send("successfully deleted")
   } else {
     res.send(err)
   }
  })
})
app.get("/articles", )

app.post("/articles", )

app.delete("/articles", )

app.listen(3000, function() {
  console.log("successful at 3000")
})