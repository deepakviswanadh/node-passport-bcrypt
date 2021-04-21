const express = require("express"),
  passport = require("passport"),
  expressLayouts = require("express-ejs-layouts"),
  database = require("./database/db"),
  expressSession = require("express-session"),
  connectFlash = require("connect-flash");
const app = express();
require("./config/passport")(passport);

//layout engine
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

//express-session

app.use(
  expressSession({
    secret: "login",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//database
database();

//routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

//server
const port = process.env.PORT || 5000;
app.listen(port, process.env.IP, () => {
  console.log(`server running on port ${port}`);
});
