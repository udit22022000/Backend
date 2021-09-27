const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.postSignUp = (req, res, next) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        res.send({
          status: "user already exist",
        });
      } else {
        return bcrypt.hash(password, 12);
      }
    })
    .then((hashedPassword) => {
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
        cart: { items: [] },
      });

      user.save().then(() =>
        res.send({
          status: "User Created Successfully",
        })
      );
    });
};

exports.postLogin = (req, res, next) => {
  User.findOne({ name: req.body.name })
    .then((ele) => {
      req.session.isLoggedIn = true;
      req.session.user = ele;
      req.session.save((err) => {
        console.log(err);
        res.send({
          response: "Logged in successfully",
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// using the sesson cookie that we have set while logging in...
exports.getLogin = (req, res, next) => {
  res.send({
    isLoggedIn: req.session.isLoggedIn,
    userDetails: req.session.user,
  });
};

//clearing the session while logging out....
exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.send({ response: "Logout Successful" });
  });
};
