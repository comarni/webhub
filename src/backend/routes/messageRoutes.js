const express = require("express");
const { send, conversation } = require("../controllers/messageController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authenticateToken);
router.post("/", send);
router.get("/conversations/:otherUserId", conversation);

module.exports = router;
