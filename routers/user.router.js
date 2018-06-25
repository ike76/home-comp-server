const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/userinfo", userController.getUserInfo);
router.post("/attributes", userController.addAttributes);
router.post("/editAttribute", userController.editAttribute);
router.post("/deleteAttribute/:attrId", userController.deleteAttribute);
router.post("/moveAttribute", userController.moveAttribute);
module.exports = router;
