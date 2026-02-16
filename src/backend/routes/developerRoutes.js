const express = require("express");
const { search, featured } = require("../controllers/developerController");
const { authenticateToken, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/featured", featured);
router.get("/search", authenticateToken, requireRole("company"), search);

module.exports = router;
