const { getDb } = require("../config/db");

async function sendMessage({ senderId, receiverId, content }) {
  const db = getDb();
  await db.run(
    `INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)`,
    [senderId, receiverId, content]
  );
}

async function getConversation(userA, userB) {
  const db = getDb();
  return db.all(
    `SELECT * FROM messages
     WHERE (sender_id = ? AND receiver_id = ?)
        OR (sender_id = ? AND receiver_id = ?)
     ORDER BY created_at ASC`,
    [userA, userB, userB, userA]
  );
}

module.exports = { sendMessage, getConversation };
