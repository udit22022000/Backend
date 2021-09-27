const express = require("express");
const {
  postLogin,
  getLogin,
  postLogout,
  postSignUp,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", postLogin);
router.get("/login", getLogin);
router.post("/logout", postLogout);
router.post("/signup", postSignUp);

module.exports = router;
