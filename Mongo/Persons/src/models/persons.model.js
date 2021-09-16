const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({}, { strict: false });
const friendsSchema = new mongoose.Schema({}, { strict: false });

///contactsSchema.index({ "dob.age": -1 }); //creating an index field for age and sorted it in  descending order...

//contactsSchema.index({ "dob.age": 1, gender: 1 }); //creating a combined index( Compound Index..)...here order matters..it determines how the indexes are going to get created..eg 30-Male, 30-female, 31-Male..
//
//contactsSchema.index({ email: 1 }, { unique: true }); //craeting unique index...for the given field in that collection...
//
//storing specific index values...here we are storing dob's of only male candidates...like this we can save hard disk space..
// contactsSchema.index(
//   { "dob.age": 1 },
//   { partialFilterExpression: { gender: "male" } }
// );
const Persons = mongoose.model("contacts", contactsSchema);
const Friends = mongoose.model("friends", friendsSchema);

module.exports = { Persons, Friends };
