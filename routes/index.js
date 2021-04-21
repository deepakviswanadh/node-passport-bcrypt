const express = require("express");
const router = express.Router();
const auth = require("../config/auth");

// @route   GET /
// @desc    Get home page
// @access  public
router.get("/", (req, res) => {
  res.render("welcome");
});

// @route   GET /dashboard
// @desc    Get dashboard
// @access  private
router.get("/dashboard", auth.isLoggedin, (req, res) => {
  res.render("dashboard", { name: req.user.name });
});

module.exports = router;
