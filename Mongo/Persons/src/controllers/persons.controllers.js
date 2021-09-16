const { Persons, Friends } = require("../models/persons.model");

const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  //
  //
  // const response = await Persons.find({ "dob.age": { $gt: 60 } }).explain();   //description of how mongodb is fetching the results..
  //
  //
  // In-detailed description of this query and how the output was returned...check the execution time after and before adding dob.age field as index...to add dob.age field as index..add it to the schema variable...
  // const response = await Persons.find({ "dob.age": { $gt: 60 } }).explain(
  //   "executionStats"
  // );
  //
  //
  // Dropping an index....here we are dropping dob.age...
  // Persons.collection.dropIndex({ "dob.age": 1, gender: 1 }, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
  //
  //
  // Dropping an index named gender
  // Persons.collection.dropIndex({ gender: 1 }, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
  //
  //
  //
  //View all the indexes in the collection
  // Persons.collection
  //   .getIndexes({ full: true })
  //   .then((indexes) => {
  //     console.log("indexes:", indexes);
  //   })
  //   .catch(console.error);
  //
  //
  // COMPOUND INDEXES...indexes are to be created in the schema file..
  //
  //Note: if stage is IXSCAN, it means it is using indexScan...
  // const response = await Persons.find({
  //   "dob.age": 25,
  //   gender: "male",
  // }).explain("executionStats");
  //
  //
  //Here it will be IXSCAN since dob.age is sorted...
  // const response = await Persons.find({
  //   "dob.age": 35,
  // }).explain("executionStats");
  //
  //
  //Here it will be COLLSCAN since gender is sorted only in a particular age group...in the index named { "dob.age": 1, gender: 1 }
  // const response = await Persons.find({
  //   gender: "male",
  // }).explain("executionStats");
  //
  //
  //Here again mongo db is using IXSCAN for both find and sort...since data is alraedy sorted so it is using IXSCAN ...WE can say that IXSCAN is used for both finding and sorting...
  //IXSCAN is not only needed to speed up the query but also to sort...
  // const response = await Persons.find({
  //   "dob.age": 35,
  // })
  //   .sort({ gender: 1 })
  //   .explain("executionStats");
  //
  //Creating our own unique index...like _id field, which mongodb automatically created for us...eg. Email, Phone_no
  //Refer schema file----to see the create index code...
  // const response = await Persons.find({
  //   email: "abigail.clark@example.com",
  // }).count();
  //
  //
  // const response = await Persons.find({
  //   "dob.age": { $gt: 60 },
  //   gender: "male",
  // }).explain();
  //
  //
  //
  //USING AGGREGATION FRAMEWORK.......SECTION - 12
  //takes an array because we define a series of steps...first step...fetch entire data from the collection and after that operations steps..
  //every step is a document...
  //just like find method ..aggregate method returns a cursor...
  //$match is similar to find..
  //$group helps to group our data by single or multiple fields...
  //
  //
  // const response = await Persons.aggregate([
  //   {
  //     $match: {
  //       gender: "female",
  //     },
  //   },
  //   {
  //     $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } },
  //   },
  // ]);
  //
  //
  // const response = await Persons.aggregate([
  //   {
  //     $match: {
  //       gender: "female",
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: { state: "$location.state" },
  //       totalPersons: { $sum: 1 },
  //     },
  //   },
  //   {
  //     $sort: {
  //       totalPersons: -1,
  //     },
  //   },
  // ]);
  //
  //
  // $project works in the same way as projection works in the find method...
  // we can create new fields here..
  // const response = await Persons.aggregate([
  //   {
  //     $project: {
  //       _id: 0,
  //       gender: 1,
  //       fullName: { $concat: ["$name.first", " ", "$name.last"] },
  //     },
  //   },
  // ]);
  //
  //
  // const response = await Persons.aggregate([
  //   {
  //     $project: {
  //       _id: 0,
  //       gender: 1,
  //       fullName: {
  //         $concat: [
  //           { $toUpper: { $substrCP: ["$name.first", 0, 1] } },
  //           {
  //             $substrCP: [
  //               "$name.first",
  //               1,
  //               { $subtract: [{ $strLenCP: "$name.first" }, 1] },
  //             ],
  //           },
  //           " ",
  //           { $toUpper: { $substrCP: ["$name.last", 0, 1] } },
  //           {
  //             $substrCP: [
  //               "$name.last",
  //               1,
  //               {
  //                 $subtract: [{ $strLenCP: "$name.last" }, 1],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     },
  //   },
  // ]);
  //
  //
  //
  const response = await Persons.aggregate([
    {
      $project: {
        _id: 0,
        name: 1,
        birthdate: {
          $toDate: "$dob.date",
        },
        age: "$dob.age",
      },
    },

    {
      $group: {
        _id: { birthYear: { $isoWeekYear: "$birthdate" } },
        numPersons: { $sum: 1 },
      },
    },
    {
      $sort: { numPersons: 1 },
    },
  ]);

  res.status(200).send({ data: response });
});

module.exports = router;
