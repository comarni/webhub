const { getDb } = require("../config/db");

async function createPayment({ projectId, companyId, developerId, amount, status }) {
  const db = getDb();
  await db.run(
    `INSERT INTO payments (project_id, company_id, developer_id, amount, status)
     VALUES (?, ?, ?, ?, ?)`,
    [projectId, companyId, developerId, amount, status || "pending"]
  );
}

async function listPaymentsByProject(projectId) {
  const db = getDb();
  return db.all(`SELECT * FROM payments WHERE project_id = ? ORDER BY created_at DESC`, [projectId]);
}

module.exports = { createPayment, listPaymentsByProject };
