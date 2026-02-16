const express = require("express");
const { getProjects, create, update, apply, myProjects } = require("../controllers/projectController");
const { authenticateToken, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProjects);
router.get("/mine", authenticateToken, myProjects);
router.post("/", authenticateToken, requireRole("company"), create);
router.put("/:id", authenticateToken, requireRole("company"), update);
router.post("/:id/apply", authenticateToken, requireRole("developer"), apply);

module.exports = router;
