const localStartegy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = (passport) => {
  passport.use(
    new localStartegy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          let user = await User.findOne({ email: email });
          if (!user)
            return done(null, false, { message: "email is not registered" });
          let match = await bcrypt.compare(password, user.password);
          if (!match)
            return done(null, false, { message: "incorrect password" });
          return done(null, user);
        } catch (err) {
          console.log(err.message);
          return done(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
