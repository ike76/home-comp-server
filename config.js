require("dotenv").config();

exports.PORT = 8080;
exports.CLOUDINARY_URL =
  "cloudinary://785168849222268:2UZoBuaVETf3ElpxCpUcxZATAAg@homecomp";
exports.DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://localhost/homecomp2";
exports.JWT_SECRET = "blahblahblah";
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || 60 * 60 * 24 * 7;