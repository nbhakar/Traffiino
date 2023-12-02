var router = require("express").Router();
var passport = require("passport");

// process the signup form
router.post(
  "/",
  passport.authenticate("local-signup", {
    successRedirect: "/loginUser", // redirect to the secure profile section
    failureRedirect: "/registerUser", // redirect back to the signup page if there is an error
    failureFlash: true, // allow flash messages
  })
);

module.exports = router;
