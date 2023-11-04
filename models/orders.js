const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const articleSchema = new Schema({
  name: String,
  orders: String,
  date: Date,
  YNG: String,
  id: String,
});


// Create a model based on that schema
const Article = mongoose.model("orders", articleSchema);


// export the model
module.exports = Article;