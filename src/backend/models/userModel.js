const { getDb } = require("../config/db");

async function createUser({ name, email, passwordHash, role }) {
  const db = getDb();
  const result = await db.run(
    `INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)`,
    [name, email, passwordHash, role]
  );

  if (role === "developer") {
    await db.run(
      `INSERT INTO developer_profiles (user_id, title, bio, experience_years, cv_url) VALUES (?, '', '', 0, '')`,
      [result.lastID]
    );
  } else {
    await db.run(
      `INSERT INTO company_profiles (user_id, company_name, description, website) VALUES (?, ?, '', '')`,
      [result.lastID, name]
    );
  }

  return result.lastID;
}

async function findUserByEmail(email) {
  const db = getDb();
  return db.get(`SELECT * FROM users WHERE email = ?`, [email]);
}

async function findUserById(id) {
  const db = getDb();
  return db.get(`SELECT id, name, email, role, created_at FROM users WHERE id = ?`, [id]);
}

async function saveResetToken(userId, token, expiresAt) {
  const db = getDb();
  await db.run(
    `INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)`,
    [userId, token, expiresAt]
  );
}

async function findResetToken(token) {
  const db = getDb();
  return db.get(`SELECT * FROM password_resets WHERE token = ?`, [token]);
}

async function updatePassword(userId, passwordHash) {
  const db = getDb();
  await db.run(`UPDATE users SET password_hash = ? WHERE id = ?`, [passwordHash, userId]);
}

async function markResetTokenUsed(tokenId) {
  const db = getDb();
  await db.run(`UPDATE password_resets SET used = 1 WHERE id = ?`, [tokenId]);
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  saveResetToken,
  findResetToken,
  updatePassword,
  markResetTokenUsed,
};
