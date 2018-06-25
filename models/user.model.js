const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = Schema({
  firstName: String,
  lastName: String,
  // userName: String,
  email: { type: String, lowercase: true, required: true },
  password: {
    type: String,
    required: true
  },
  homeAttributes: [{}]
});

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;
    next();
  } catch (e) {
    next(e);
    console.log(e);
  }
});

UserSchema.methods.validatePassword = async function(password) {
  try {
    const theyMatch = await bcrypt.compare(password, this.password); // returns a boolean
    console.log("do they match?", theyMatch);
    return theyMatch;
  } catch (e) {
    console.log("errrrror");
    throw new Error(e);
  }
};

const User = mongoose.model("User", UserSchema);
module.exports = { User };
