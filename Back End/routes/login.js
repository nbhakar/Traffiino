var router = require("express").Router();
var passport = require("passport");

// process the login form
router.post(
  "/",
  passport.authenticate("local-login", {
    successRedirect: "/", // redirect to the secure profile section
    failureRedirect: "/loginUser", // redirect back to the signup page if there is an error
    failureFlash: true, // allow flash messages
  })
);

module.exports = router;
