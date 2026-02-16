const express = require("express");
const { create, byUser } = require("../controllers/reviewController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/user/:userId", byUser);
router.post("/", authenticateToken, create);

module.exports = router;
