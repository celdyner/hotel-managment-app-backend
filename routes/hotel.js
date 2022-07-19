const express = require("express");
const router = express.Router();

const { createHotel, getHotels } = require("../controllers/hotel");

router.get("/", getHotels);

router.post("/create", createHotel);

module.exports = router;
