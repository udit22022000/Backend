const mongoose = require("mongoose");

/*
Creating a schema for a collection with the help of mongoose.Schema... 
*/
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

/*
1. Creating a model with the help of mongoose.model.....mongoose.model accepts 2 things...model name and model schema...

2. What mongoose does is...it takes the model name ...converts it to lower case and pluralises it...and searches in the database that weather there is any 
collection with similar name or not..if there is then it just adds that document to that collection or else it creates a new 4
collection with that name and adds the document over there... 

3. We will use this Model to add data to the mongodb collection...by creating an instance of this collection...and passing 
a js object to that instance

*/
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
