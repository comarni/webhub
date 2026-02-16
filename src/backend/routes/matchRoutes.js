const express = require("express");
const { recommend } = require("../controllers/matchController");
const { authenticateToken, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/project/:projectId/recommendations", authenticateToken, requireRole("company"), recommend);

module.exports = router;
