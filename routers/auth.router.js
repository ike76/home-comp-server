const express = require("express");
const passport = require("passport");
const router = express.Router();

const authController = require("../controllers/auth.controller");

const localAuth = passport.authenticate("local", { session: false });
const jwtAuth = passport.authenticate("jwt", { session: false });

router.post("/signup", authController.signUp);
router.post("/signin", localAuth, authController.signIn);
router.post("/signout", authController.signOut);
router.post("/refresh", jwtAuth, authController.refresh);
module.exports = router;
