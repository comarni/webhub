const express = require("express");
const { create, byProject } = require("../controllers/paymentController");
const { authenticateToken, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, requireRole("company"), create);
router.get("/project/:projectId", authenticateToken, byProject);

module.exports = router;
