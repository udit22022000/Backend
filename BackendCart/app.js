const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const authRouter = require("./routes/auth");

const User = require("./models/user");

const MONGODB_URI = "mongodb://127.0.0.1:27017/productCart";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Creating session storage
const store = new mongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
app.use(
  session({
    secret: "My secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((ele) => {
      req.user = ele;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRouter);
app.use("/shop", shopRouter);
app.use(authRouter);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
