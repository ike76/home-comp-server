const { User } = require("../models/user.model");
const mongoose = require("mongoose");

const arrayMove = require("array-move");

exports.editUserPrefs = async (req, res) => {
  console.log("user controller before edit:", req.user);
  const user = await User.findByIdAndUpdate(req.user._id, {
    homeAttributes: ["1", "2", "3"]
  });
  console.log("user controller after edit:", user);
  res.send("ok");
};

exports.addAttributes = async (req, res) => {
  const { newAttributes } = req.body;
  console.log("newAttributes", newAttributes);

  const user = await User.findById(req.user._id);
  newAttributes.forEach(attribute => {
    user.homeAttributes.push(attribute);
  });
  user.save().then(user => res.json(user));
};

exports.editAttribute = async (req, res) => {
  const { changedAttribute } = req.body;
  attrId = changedAttribute.id;
  const user = await User.findById(req.user._id);
  const newHomeAttributes = user.homeAttributes.map(attr => {
    if (attr.id === changedAttribute.id) {
      return changedAttribute;
    }
    return attr;
  });
  user.homeAttributes = newHomeAttributes;
  user.save().then(user => res.json(user));
};

exports.deleteAttribute = async (req, res) => {
  const { attrId } = req.params;
  const user = await User.findById(req.user._id);
  const attrIndex = user.homeAttributes.findIndex(attr => attr.id === attrId);
  console.log("the attrIndex is", attrIndex);
  if (attrIndex > -1) {
    user.homeAttributes.splice(attrIndex, 1);
  }
  user.save().then(user => res.json(user));
};

exports.moveAttribute = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { i, delta } = req.body;
  console.log("user", user.email);
  console.log("i", i);
  console.log("delta", delta);
  const newHomeAttributes = arrayMove(user.homeAttributes, i, i + delta);
  user.homeAttributes = newHomeAttributes;
  user
    .save()
    .then(user => {
      res.status(200).json(user.homeAttributes);
    })
    .catch(err => console.log(err));
};

exports.editUser = (req, res) => {
  const userId = req.user._id;
  console.log("user controller user is:", req.user);
  res.send("ok");
};

exports.getUserInfo = (req, res) => {
  const userId = req.user._id;
  console.log("get user info user is", req.user);
  res.json(req.user);
};
