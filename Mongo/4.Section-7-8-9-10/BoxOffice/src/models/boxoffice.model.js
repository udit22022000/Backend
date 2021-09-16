const mongoose = require("mongoose");

const boxofficeSchema = new mongoose.Schema({}, { strict: false });

const BoxOffice = mongoose.model("boxoffices", boxofficeSchema);

module.exports = BoxOffice;
