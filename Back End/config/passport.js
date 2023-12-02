var LocalStrategy = require("passport-local").Strategy;
var User = require("../model/user");

module.exports = {
  setupPassport: function (passport) {
    passport.serializeUser(function (user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
      try {
        const user = await User.findById(id);
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    });

    passport.use(
      "local-signup",
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
          passReqToCallback: true,
        },
        async function (req, username, password, done) {
          try {
            const retuser = await User.findOne({ email: username });
            if (retuser) {
              return done(null, false);
            }
            var newUser = new User();
            newUser.email = username;
            newUser.password = newUser.generateHash(password);
            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;
            newUser.mobileNum = req.body.mobileNum;
            newUser.dateOfBirth = req.body.dob;
            newUser.gender = req.body.gender;
            newUser.rating = 0;
            newUser.bio = "";
            newUser.isVerified = false;
            newUser.status = "yet to start";
            newUser.save();
            newUser.rideCompleted = 0;
            return done(null, newUser);
          } catch (error) {
            return done(null, error);
          }
        }
      )
    );
    passport.use(
      "local-login",
      new LocalStrategy(
        {
          // by default, local strategy uses username and password, we will override with email
          //   usernameField: "email",
          //   passwordField: "password",
          passReqToCallback: true, // allows us to pass back the entire request to the callback
        },
        async function (req, username, password, done) {
          // callback with email and password from our form
          // find a user whose email is the same as the forms email
          // we are checking to see if the user trying to login already exists
          try {
            const retuser = await User.findOne({ email: username });
            if (!retuser) {
              return done(null, false);
            }
            if (!retuser.validPassword(password))
              // Wrong password
              return done(null, false);

            return done(null, retuser);
          } catch (error) {
            console.log("edfad");
            return done(error);
          }
        }
      )
    );
  },
};
