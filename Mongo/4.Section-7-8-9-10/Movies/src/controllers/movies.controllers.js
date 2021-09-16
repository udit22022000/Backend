const Movies = require("../models/movies.model");

const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  // FILTERS
  //const movies = await Movies.findOne(); //will return the first matching document
  //const movies = await Movies.find();      //will return all documents
  //const movies = await Movies.find({ name: "The Last Ship" });
  //const movies = await Movies.find({ runtime: 60 }); //default operator is equal to...
  //const movies = await Movies.find({ runtime: { $eq: 60 } }); //this  command and above command will return same output..
  //
  //
  //
  //COMPARISON OPERATORS - 1
  //https://docs.mongodb.com/manual/reference/operator/query-comparison/
  //const movies = await Movies.find({ runtime: { $ne: 60 } });
  //const movies = await Movies.find({ runtime: { $ne: 60 } });
  //const movies = await Movies.find({ runtime: { $lt: 40 } });
  //const movies = await Movies.find({ runtime: { $gt: 40 } });
  //COMPARISON OPERATORS - 2
  //
  //
  //const movies = await Movies.find({ "rating.average": { $gt: 7 } }); //since it's multi-level..so we need to use double quotes..
  //const movies = await Movies.find({ genres: "Drama" }); //here genres is an array...equaity operator checks weather there is drama in a genres array or not..
  //const movies = await Movies.find({ genres: ["Drama"] }); //to check weather genre array contains only Drama.....exact equlaity check...
  //
  //
  //
  //COMPARISON OPERATORS - 3
  //const movies = await Movies.find({ runtime: { $in: [30, 42] } }); //looking for 2 discrete values for any particular key...Here, runtime can be 30 or 42..
  //const movies = await Movies.find({ runtime: { $nin: [30, 42, 60] } }); //runtime other than 30, 40 and 60
  //
  //
  //
  //LOGICAL OPERATORS - 1
  //https://docs.mongodb.com/manual/reference/operator/query-logical/
  //
  //const movies = await Movies.find({ "rating.average": { $lt: 30 } }).count();   //using count...
  //
  //
  //   const movies = await Movies.find({
  //     $or: [{ "rating.average": { $lt: 5 } }, { "rating.average": { $gt: 9.3 } }],
  //   });
  //
  //
  //   const movies = await Movies.find({
  //     $nor: [
  //       { "rating.average": { $lt: 5 } },
  //       { "rating.average": { $gt: 9.3 } },
  //     ],
  //   });
  //
  //
  //   const movies = await Movies.find({
  //     $and: [{ "rating.average": { $gt: 9 } }, { genres: "Drama" }],
  //   });
  //
  //
  //const movies = await Movies.find({ runtime: { $not: { $eq: 60 } } }).count();
  //
  //
  // ELEMENT OPERATORS...
  // Refer to  Notes-Section-7
  //
  //
  //EVALUATION OPERATORS..
  //RegEx
  //const movies = await Movies.find({ summary: { $regex: /musical/ } }); //searching for a text snippet in a sentence...here we are searching for musical in a sentence..but not the efficient way of searching...
  //
  //EXPRESSION OPERATOR...
  // Refer to  Notes-Section-7
  //
  //const movies = await Movies.find().count(); //count returns no of documents a cursor can return...
  //
  //
  //SORTING ...
  //const movies = await Movies.find().sort({ "rating.average": 1, runtime: -1 }).sort({}); // 1 means ascending and -1 means descending...in case rating.average is same..then those will be sorted by runtime in descending
  //
  // Skipping and limiting results..here we are skiping first 100 results...and then displaying just next 10 documents with the help of limit...
  // Most importantly : -- order doesn't matter here...whatever be the order..monodb will sort first..then skip and then limit...
  //
  // const movies = await Movies.find()
  //   .sort({ "rating.average": 1, runtime: -1 })
  //   .skip(100)
  //   .limit(10);
  //
  //
  //
  //SHAPE THE DATA -- PROJECTION...
  // field's with 1 will only be displayed...if we want to exclude the _id..just assign 0 to it...since id's are always included..
  // Projection can't be used with embedded documents...
  //
  // const movies = await Movies.find(
  //   {},
  //   { name: 1, genres: 1, runtime: 1, rating: 1, _id: 0 }
  // );
  //
  //
  //
  // using projection in array items...
  //
  //const movies = await Movies.find({genres: "Drama", {"genres.$":1}})
  //
  //const movies = await Movies.find({genres: "Drama", {"genres.$":1}})
  //watch lec-102 and lec-103....udemy...maximillian...mongodb..
  res.status(200).send({ data: movies });
});

module.exports = router;
