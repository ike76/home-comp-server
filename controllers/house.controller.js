const { House } = require("../models/house.model");
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

exports.getMyHouses = async (req, res) => {
  console.log("getmyhouses user is", req.user.email);
  const houses = await House.find({ adminId: req.user._id });
  res.json(houses);
};

exports.addNewHouse = (req, res, next) => {
  console.log("req.body", req.body);
  const newHouse = new House({
    location: req.body.location,
    attributes: req.body.attributes || { price: 0 },
    adminId: req.user._id
  });
  console.log("newHouse", newHouse);
  newHouse
    .save()
    .then(house => {
      res.json(house);
    })
    .catch(err => {
      err.status = 400;
      next(err);
      console.error(err);
    });
};

exports.editHouse = (req, res) => {
  console.log("edit house", req.body);
  const { homeKey, updateObj } = req.body;
  const newKey = Object.keys(updateObj)[0];
  const newValue = updateObj[newKey];
  console.log("update is", newKey, newValue);

  House.findById(req.params.houseId)
    .then(house => {
      if (!house) res.status(200).send("house not found");
      if (homeKey === "location")
        house.location = { ...house.locations, ...updateObj };
      if (homeKey === "attributes")
        house.attributes = {
          ...house.attributes,
          [newKey]: { ...house.attributes[newKey], ...newValue }
        };
      console.log("house", house);
      return house.save();
    })
    .then(upHouse => res.json(upHouse));
};

exports.removeHouse = async (req, res) => {
  console.log("current user", req.user);
  const house = await House.findById(req.params.houseId);
  house.adminId = null;
  await house.save();
  const houses = await House.find({ adminId: req.user._id });
  res.json(houses);
};

exports.wuzzup = (req, res) => {
  res.json(req.user);
};
