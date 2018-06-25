const express = require("express");
const router = express.Router();
const houseController = require("../controllers/house.controller");

router.get("/getAll", houseController.getMyHouses);
router.post("/", houseController.addNewHouse);
router.post("/:houseId", houseController.editHouse);
router.get("/", houseController.wuzzup);
router.delete("/:houseId", houseController.removeHouse);
module.exports = router;
