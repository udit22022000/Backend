const Users = require("../models/boxoffice.model");

const express = require("express");
const Mongoose = require("mongoose");

const router = express.Router();

/*
UPDATING A DOCUMENT...
There are always 2 steps behind update....first of all find the document using some filter and secondly change the data within it...
*/

router.get("/", async (req, res) => {
  const users = await Users.find();

  res.status(200).send({ data: users });
});

router.patch("/", async (req, res) => {
  //
  //
  //
  // const response = await Users.updateOne(
  //   { _id: "60c090b9e74635b4fb5c9807" },
  //   {
  //     $set: {
  //       hobbies: [
  //         { title: "Sports", frequency: 5 },
  //         { title: "Cooking", frequency: 3 },
  //         { title: "Hiking", frequency: 1 },
  //       ],
  //     },
  //   }
  // );
  //
  //
  //
  // const response = await Users.updateMany(
  //   { "hobbies.title": "Sports" },
  //   { $set: { isSporty: true } }
  // );
  //
  // $set is used to update multiple fields...
  // const response = await Users.updateOne(
  //   { _id: "60c090b9e74635b4fb5c9807" },
  //   { $set: { age: 40, phone: 234721642 } }
  // );
  //
  //
  // incrementing age by 2...and changing the phone number....
  // const response = await Users.updateOne(
  //   { name: "Manuel" },
  //   { $inc: { age: 2 }, $set: { phone: 27328742, isSporty: false } }
  // );
  //
  //
  //we are not allowed to perform 2 different operations on same field...Here we are incrementing age and afterwards updating age to 30...it will throw an error...
  // const response = await Users.updateOne(
  //   { name: "Manuel" },
  //   { $inc: { age: 2 }, $set: { age: 30 } }
  // );
  //
  //
  //Using $min, $max and $mul....
  //$min only changes the value if new value is less than the present value..
  // will change the age of chris to 35 if the present age of chris is greater than 35...
  // const response = await Users.updateOne(
  //   { name: "Chris" },
  //   { $min: { age: 35 } }
  // );
  //
  //
  //$max only changes the value if new value is more than the present value..
  // will change the age of chris to 38 if the present age of chris is less than 38...
  // const response = await Users.updateOne(
  //   { name: "Chris" },
  //   { $max: { age: 38 } }
  // );
  //
  //
  //
  //$mul simply multiplies the attribute's present value with the given number....
  // const response = await Users.updateOne(
  //   { name: "Chris" },
  //   { $mul: { age: 1.2 } }
  // );
  //
  //
  //Getting Rid of fields...
  //removing the phone numbers of those with isSporty as true...
  // const response = await Users.updateMany(
  //   { isSporty: true },
  //   { $unset: { phone: "" } }
  // );
  //
  //
  //Renaming fields...Here we are renaming age to totalAge
  //const response = await Users.updateMany({}, { $rename: { age: "totalAge" } });
  //
  //
  // If the document with name Maria is not available..Mongo will create one with that name and insert the provided fields into it...for this we will be using upsert..
  // const response = await Users.updateOne(
  //   { name: "Maria" },
  //   {
  //     $set: {
  //       age: 29,
  //       hobbies: [{ title: "Good Food", frequency: 3 }],
  //       isSporty: true,
  //     },
  //   },
  //   {
  //     upsert: true,
  //   }
  // );
  //
  //
  //
  //Adding a field named highFrequency to the filtered embedded documents...
  // const response = await Users.updateMany(
  //   { hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } } },
  //   { $set: { "hobbies.$.highFrequency": true } }
  // );
  //
  //
  //Adding a field named goodFrequency to the filtered embedded documents...
  // const response = await Users.updateMany(
  //   { "hobbies.frequency": { $gt: 2 } },
  //   { $set: { "hobbies.$.goodFrequency": true } } //here $ means first matching element...
  // );
  //
  //
  //Updating all array elements...
  // const response = await Users.updateMany(
  //   { totalAge: { $gt: 30 } },
  //   { $inc: { "hobbies.$[].frequency": -1 } } //here $[] simply means update the frequency of all the embedded documents...$[] basically means forEach...where $ gives first matching element and [] gives all the remaining ones..
  // );
  //
  //
  //Finding and updating specific data..
  //
  // const response = await Users.updateMany(
  //   { "hobbies.frequency": { $gt: 2 } },
  //   { $set: { "hobbies.$[el].goodFrequency": true } },
  //   { arrayFilters: [{ "el.frequency": { $gt: 2 } }] }
  // );
  //
  //
  //
  //Pushing elements to an array....
  //pushing a single element..
  // const response = await Users.updateOne(
  //   { name: "Maria" },
  //   { $push: { hobbies: { title: "Sports", frequency: 2 } } }
  // );
  //
  //
  //pushing multiple elements to an array and specifying the order in which they should be pushed..should also be pushed in descending order of frequency..
  //
  // const response = await Users.updateOne(
  //   { name: "Maria" },
  //   {
  //     $push: {
  //       hobbies: {
  //         $each: [
  //           { title: "Foody", frequency: 7 },
  //           { title: "Cycling", frequency: 10 },
  //         ],
  //         $sort: { frequency: -1 },
  //       },
  //     },
  //   }
  // );
  //
  //Removing elements from an array...
  //
  // removing sports element from hobbies array of maria...
  // const response = await Users.updateOne(
  //   { name: "Maria" },
  //   { $pull: { hobbies: { title: "Sports" } } }
  // );
  //
  //removing last element from an array...
  //
  // const response = await Users.updateOne(
  //   { name: "Chris" },
  //   { $pop: { hobbies: 1 } }
  // );
  //
  //pushing element to an array using addToSet...using this we can't push an element that already exist in an array..
  //
  // const response = await Users.updateOne(
  //   { name: "Maria" },
  //   { $addToSet: { hobbies: { title: "Foody", frequency: 7 } } }
  // );
  //
  //
  res.status(200).send({ data: response });
});

router.delete("/", async (req, res) => {
  //
  // const response = await Users.deleteOne({ name: "Chris" });
  //
  //deleting the documents which doesn't have totalAge and is isSporty is true...
  // const response = await Users.deleteMany({
  //   totalage: { $exists: false },
  //   isSporty: true,
  // });
  //
  //Deleting all entries in a collection...
  //const response = await Users.deleteMany({})
  //
  //Droping a collection...
  //const response = await Mongoose.connection.db.dropCollection("users");
  //
  //
  // Droping a database...
  //const response = await Mongoose.connection.db.dropDatabase();
  res.status(200).send({ data: response });
});

module.exports = router;
