const BoxOffice = require("../models/boxoffice.model");

const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  //const boxoffice = await BoxOffice.find({ genre: ["action", "thriller"] });  //here order matters..it will be a hard check...

  // const boxoffice = await BoxOffice.find({    // it will only check the elements...order doesn't matters
  //   genre: { $all: ["action", "thriller"] },
  // });

  res.status(200).send({ data: boxoffice });
});

module.exports = router;
