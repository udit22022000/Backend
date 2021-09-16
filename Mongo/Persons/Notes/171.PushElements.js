//contactData Database .... Friends Collection...

db.friends.aggregate([
  { $group: { _id: { age: "$age" }, allHobbies: { $push: "$hobbies" } } },
]);

// pulling out an element from an array...
// unwind flattens the array by repeating the document with different elements of an array......
db.friends.aggregate([
  {
    $unwind: "$hobbies",
  },
]);

// to stop duplictae values to be pushed into an array...use $addToSet in place of $push

db.friends.aggregate([
  { $group: { _id: { age: "$age" }, allHobbies: { $addToSet: "$hobbies" } } },
]);

//Using projection with an array...

db.friends.aggregate([
  { $project: { _id: 0, examScore: { $slice: ["$examScores", 1] } } }, //slicing first element from an array///
]);

db.friends.aggregate([
  { $project: { _id: 0, examScore: { $slice: ["$examScores", -2] } } }, // slicing second last////
]);

db.friends.aggregate([
  { $project: { _id: 0, examScore: { $slice: ["$examScores", 2, 1] } } }, // slice one element starting from position 2nd..
]);

//Getting the length of an array...
db.friends.aggregate([
  { $project: { _id: 0, numScores: { $size: "$examScores" } } },
]);

//using filter operator...
db.friends.aggregate([
  {
    $project: {
      _id: 0,
      score: {
        $filter: {
          input: "$examScores",
          as: "sc",
          cond: { $gt: ["$$sc.score", 60] },
        },
      },
    },
  },
]);
