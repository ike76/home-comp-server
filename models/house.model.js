const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const houseSchema = Schema({
  adminId: { type: Schema.Types.ObjectId, ref: "User" },
  location: {
    address: String,
    formatted_address: String,
    zip: String,
    lat: Number,
    lng: Number
  },
  attributes: {}
});

const House = mongoose.model("House", houseSchema);
module.exports = { House };
