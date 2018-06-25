const { User } = require("../models/user.model");
const JWT = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRY } = require("../config");
const bcrypt = require("bcryptjs");
const ObjectId = require("mongoose").Types.ObjectId;

const signToken = user => {
  return JWT.sign(
    {
      iss: "iketown",
      sub: user,
      iat: new Date().getTime(),
      expiresIn: JWT_EXPIRY
    },
    JWT_SECRET
  );
};

exports.signUp = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(user => res.json(user))
    .catch(err => res.err(err));
};

exports.signIn = (req, res) => {
  // local strategy already done
  console.log("signing in", req.user);
  const token = signToken(req.user);
  console.log("token is", token);
  res.status(200).json({ authToken: token });
};

exports.signOut = (req, res) => {
  res.redirect("/");
};

exports.refresh = (req, res) => {
  console.log("refreshing token", req.user);
  const token = signToken(req.user);
  res.status(200).json({ authToken: token });
};
