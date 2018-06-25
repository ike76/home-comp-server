"use strict";
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { JWT_EXPIRY, JWT_SECRET } = require("../config");

const createAuthToken = function(user) {
  return jwt.sign({ user }, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY,
    algorithm: "HS256"
  });
};

const localAuth = passport.authenticate("local", { session: false });
