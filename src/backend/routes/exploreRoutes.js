const express = require("express");
const { publicExplore } = require("../controllers/exploreController");

const router = express.Router();

router.get("/", publicExplore);

module.exports = router;
