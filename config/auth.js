module.exports = {
  isLoggedin: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "need to login to view the resource");
    res.redirect("/users/login");
  },
};
