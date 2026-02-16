const { getDb } = require("../config/db");

async function createProject({ companyId, title, description, budget, deadline, technologyStack }) {
  const db = getDb();
  const result = await db.run(
    `INSERT INTO projects (company_id, title, description, budget, deadline, technology_stack, status)
     VALUES (?, ?, ?, ?, ?, ?, 'open')`,
    [companyId, title, description, budget, deadline, technologyStack]
  );
  return result.lastID;
}

async function listOpenProjects() {
  const db = getDb();
  return db.all(
    `SELECT p.*, u.name AS company_name
     FROM projects p
     JOIN users u ON u.id = p.company_id
     WHERE p.status = 'open'
     ORDER BY p.created_at DESC`
  );
}

async function listCompanyProjects(companyId) {
  const db = getDb();
  return db.all(`SELECT * FROM projects WHERE company_id = ? ORDER BY created_at DESC`, [companyId]);
}

async function listDeveloperApplications(developerId) {
  const db = getDb();
  return db.all(
    `SELECT a.*, p.title, p.description, p.budget, p.deadline
     FROM applications a
     JOIN projects p ON p.id = a.project_id
     WHERE a.developer_id = ?
     ORDER BY a.created_at DESC`,
    [developerId]
  );
}

async function findProjectById(projectId) {
  const db = getDb();
  return db.get(`SELECT * FROM projects WHERE id = ?`, [projectId]);
}

async function updateProject(projectId, companyId, payload) {
  const db = getDb();
  const { title, description, budget, deadline, technologyStack, status } = payload;
  await db.run(
    `UPDATE projects
     SET title = ?, description = ?, budget = ?, deadline = ?, technology_stack = ?, status = ?
     WHERE id = ? AND company_id = ?`,
    [title, description, budget, deadline, technologyStack, status, projectId, companyId]
  );
}

async function applyToProject(projectId, developerId, coverLetter) {
  const db = getDb();
  const existing = await db.get(
    `SELECT id FROM applications WHERE project_id = ? AND developer_id = ?`,
    [projectId, developerId]
  );

  if (existing) {
    throw new Error("Ya aplicaste a este proyecto");
  }

  await db.run(
    `INSERT INTO applications (project_id, developer_id, cover_letter, status)
     VALUES (?, ?, ?, 'pending')`,
    [projectId, developerId, coverLetter]
  );
}

module.exports = {
  createProject,
  listOpenProjects,
  listCompanyProjects,
  listDeveloperApplications,
  findProjectById,
  updateProject,
  applyToProject,
};
