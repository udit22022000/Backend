const express = require("express");

const { body, validationResult } = require("express-validator");

const User = require("../models/user.model");
const router = express.Router();

// we are using express-validator..for detecting the errors in express level..not letting mongoose to do that for us...if mongoose throws an error...the app will crash..
// to learn express validator in detail...visit express validator docs...
// In router...everything in between route path and the callback function are considered to be middlewares...
// applyling middlewares for validations...isLength is a function to check the length and withMessage is to write a custom message ie to be thrown id validation is not fulfilled...
// we are chaning middlewares...
// to pass a custom validator...use custom function...it takes a function as input...to get the access of the value inside it...pass a parametr to it..
// there are many other validators like express...eg validators(to learn more about it..open docs..)
router.post(
  "/",
  body("id").isLength({ min: 1 }).withMessage("id is required"),
  body("first_name").isLength({ min: 1 }).withMessage("first-name is required"),
  body("last_name").isLength({ min: 1 }).withMessage("last_name is required"),
  body("email")
    .notEmpty()
    .withMessage("email can not be empty")
    .isEmail()
    .withMessage("it has to be a valid one"),
  body("pincode")
    .isLength({ min: 6, max: 6 })
    .withMessage("pincode is invalid"),
  body("gender").isLength({ min: 3 }).withMessage("gender is required"),
  body("age")
    .custom((value) => {
      if (value < 18) {
        throw new Error("age is required and should be greater than 18");
      }
      return true;
    })
    .isLength({ min: 1 })
    .withMessage("age is required"),

  body("email").custom((value) => {
    var filter = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
    if (!value || !value.trim().length) {
      throw new Error("Email is required");
    } else if (filter.test(value)) {
      throw new Error("invalid email id");
    }
    return true;
  }),
  async (req, res) => {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    //if there is any error...will return 400 response...or else we will move further...
    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: errors.array(),
      });
    }

    const items = await User.create(req.body);
    return res.status(201).send({ items });
  }
);

module.exports = router;
