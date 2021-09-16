const { Friends, Persons } = require("../models/persons.model");

const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  //
  //Combining the hobbies array of all the people of same age group..
  //   const response = await Friends.aggregate([
  //     {
  //       $group: {
  //         _id: { Age: "$age" },
  //         allHobbies: { $push: "$hobbies" },
  //       },
  //     },
  //   ]);
  //
  //
  //
  //Here we are converting the 2D AllHobbies array to 1D array...
  //   const response = await Friends.aggregate([
  //     {
  //       $unwind: "$hobbies",
  //     },
  //     {
  //       $group: {
  //         _id: { Age: "$age" },
  //         AllHobbies: {
  //           $push: "$hobbies",
  //         },
  //       },
  //     },
  //   ]);
  //
  //
  //
  //Eliminating the duplicates from AllHobbies array...
  //   const response = await Friends.aggregate([
  //     {
  //       $unwind: "$hobbies",
  //     },  //const response = await Friends.find();

  //     {
  //       $group: {
  //         _id: { Age: "$age" },
  //         AllHobbies: {
  //           $addToSet: "$hobbies",
  //         },
  //       },
  //     },
  //   ]);
  //
  //
  //Slicing out the last 2 elements from an examscores array....+n means first n elements....and -n means last n elements...
  //   const response = await Friends.aggregate([
  //     {
  //       $project: {
  //         _id: 0,
  //         name: 1,
  //         examScores: {
  //           $slice: ["$examScores", -2],
  //         },
  //       },
  //     },
  //   ]);
  //
  //
  // Finding out the length of examScores array...actually numbers of Scores
  //   const response = await Friends.aggregate([
  //     {
  //       $project: {
  //         _id: 0,
  //         name: 1,
  //         numScores: {
  //           $size: "$examScores",
  //         },
  //       },
  //     },
  //   ]);
  //
  //
  //Filtering out the scores having value greater than 60.
  // const response = await Friends.aggregate([
  //   {
  //     $project: {
  //       name: 1,
  //       _id: 0,
  //       examScores: {
  //         $filter: {
  //           input: "$examScores",
  //           as: "ele",
  //           cond: { $gt: ["$$ele.score", 60] },
  //         },
  //       },
  //     },
  //   },
  // ]);
  //
  //
  //Fetching the max score among all the subjects for all the students separately..
  // const response = await Friends.aggregate([
  //   {
  //     $unwind: "$examScores",
  //   },
  //   {
  //     $sort: { "examScores.score": -1 },
  //   },
  //   {
  //     $project: {
  //       name: 1,
  //       age: 1,
  //       scores: "$examScores.score",
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: "$name",
  //       scores: { $max: "$scores" },
  //     },
  //   },
  // ]);
  //
  //
  //grouping the data into buckets based upon their age...
  //creating the buckets manually...
  // const response = await Persons.aggregate([
  //   {
  //     $bucket: {
  //       groupBy: "$dob.age",
  //       boundaries: [0, 18, 30, 50, 80, 120],
  //       output: {
  //         numPersons: { $sum: 1 },
  //         averageAge: { $avg: "$dob.age" },
  //       },
  //     },
  //   },
  // ]);
  //
  //MOngodb creates buckets for us using bucket algo.....we just need top provide the field name..
  const response = await Persons.aggregate([
    {
      $bucketAuto: {
        groupBy: "$dob.age",
        buckets: 5,
        output: {
          numPersons: { $sum: 1 },
          averageAge: { $avg: "$dob.age" },
        },
      },
    },
  ]);
  res.status(200).send({ data: response });
});

module.exports = router;
