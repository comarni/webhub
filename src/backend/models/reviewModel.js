const { getDb } = require("../config/db");

async function addReview({ projectId, reviewerId, reviewedUserId, rating, comment }) {
  const db = getDb();
  await db.run(
    `INSERT INTO reviews (project_id, reviewer_id, reviewed_user_id, rating, comment)
     VALUES (?, ?, ?, ?, ?)`,
    [projectId, reviewerId, reviewedUserId, rating, comment]
  );
}

async function listReviewsForUser(userId) {
  const db = getDb();
  return db.all(
    `SELECT r.*, u.name AS reviewer_name
     FROM reviews r
     JOIN users u ON u.id = r.reviewer_id
     WHERE reviewed_user_id = ?
     ORDER BY r.created_at DESC`,
    [userId]
  );
}

module.exports = { addReview, listReviewsForUser };
