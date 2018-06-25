"use strict";
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JwtStrategy } = require("passport-jwt");

const { User } = require("../models/user.model");
const { JWT_SECRET } = require("../config");

const localStrategy = new LocalStrategy(
  {
    usernameField: "email" // sign in w email, not username
  },
  (email, password, done) => {
    let user;
    User.findOne({ email })
      .then(userFromPromise => {
        user = userFromPromise;
        console.log("user", user);
        if (!user) {
          return Promise.reject({
            reason: "LoginError",
            message: "Incorrect email or password 1"
          });
        }
        return user.validatePassword(password);
      })
      .then(isValid => {
        console.log("it is valid", isValid);
        if (!isValid) {
          return Promise.reject({
            reason: "LoginError",
            message: "Incorrect email or password 2"
          });
        }
        return done(null, user);
      })
      .catch(err => {
        if (err.reason === "LoginError") {
          return done(null, false, err);
        }
        return done(err, false);
      });
  }
);

const headerExtractor = req => {
  let token = null;
  if (req && req.headers) {
    token = req.headers.jwtauth;
  }
  console.log("token from strategy", token);
  return token;
};

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: headerExtractor,
    algorithms: ["HS256"]
  },
  function(payload, done) {
    User.findById(payload.sub, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
    // const user = await User.findById(payload.sub)
    // done(null, user);
  }
);

module.exports = { localStrategy, jwtStrategy };
