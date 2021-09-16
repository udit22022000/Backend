const { Persons, Friends } = require("../models/persons.model");

const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  //
  //
  // const response = await Persons.aggregate([
  //   {
  //     $match: { gender: "female" },
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
  // const response = await Persons.aggregate([
  //   {
  //     $match: { "dob.age": { $gt: 50 } },
  //   },
  //   {
  //     $group: {
  //       _id: "$gender",
  //       count: { $sum: 1 },
  //       avg_age: { $avg: "$dob.age" },
  //     },
  //   },
  //   {
  //     $sort: {
  //       count: -1,
  //     },
  //   },
  // ]);
  //
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
  //               { $subtract: [{ $strLenCP: "$name.last" }, 1] },
  //             ],
  //           },
  //         ],
  //       },
  //     },
  //   },
  //   {
  //     $limit: 5,
  //   },
  // ]);
  //
  //
  // const response = await Persons.aggregate([
  //   {
  //     $project: {
  //       _id: 0,
  //       age: "$dob.age",
  //       birthdate: {
  //         $convert: {
  //           input: "$dob.date",
  //           to: "date",
  //           onError: 0.0,
  //           onNull: 0.0,
  //         },
  //       },
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: {
  //         birthYear: { $isoWeekYear: "$birthdate" },
  //       },
  //       totalPersons: { $sum: 1 },
  //     },
  //   },
  //   {
  //     $sort: { totalPersons: -1 },
  //   },
  // ]);
  res.status(200).send({ data: response });
});

module.exports = router;
