const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({}, { strict: false });

const Movies = mongoose.model("movies", movieSchema);

module.exports = Movies;
