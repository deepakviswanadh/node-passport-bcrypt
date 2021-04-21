const express = require("express");
const router = express.Router();
const brcypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

// @route   GET /users/login
// @desc    Get login page
// @access  public
router.get("/login", (req, res) => {
  res.render("login");
});

// @route   GET /users/register
// @desc    Get users page
// @access  public
router.get("/register", (req, res) => {
  res.render("register");
});

// @route   POST /users/register
// @desc    User register
// @access  public
router.post("/register", async (req, res) => {
  let { name, email, password, password2 } = req.body;
  let errors = [];
  if (!name || !email || !password || !password) {
    errors.push({ msg: "fill all the fields" });
  } else if (password.length < 6) {
    errors.push({ msg: "password length too short" });
  } else if (password !== password2) {
    errors.push({ msg: "passwords dont match" });
  }
  if (errors.length > 0) {
    return res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    try {
      let user = await User.findOne({ email: email });
      if (user) {
        errors.push({ msg: "email already exists" });
        return res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        user = new User({ name, email, password });
        let salt = await brcypt.genSalt(10);
        user.password = await brcypt.hash(password, salt);
        await user.save();
        req.flash("success_msg", "registration successfull");
        return res.redirect("/users/login");
      }
    } catch (err) {
      console.log(err.message);
    }
  }
});

// @route   POST /users/login
// @desc    User login
// @access  public

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// @route   GET /logout
// @desc    Get home page
// @access  public
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "logout successful");
  return res.redirect("/users/login");
});
module.exports = router;
