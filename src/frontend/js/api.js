const DB_KEY = "webhub_db_v1";
const SESSION_KEY = "webhub_session_v1";

function nextId(items) {
  return items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1;
}

function nowIso() {
  return new Date().toISOString();
}

function defaultDatabase() {
  return {
    users: [
      {
        id: 1,
        name: "Ana Frontend",
        email: "ana.dev@webhub.dev",
        password: "123456",
        role: "developer",
        title: "Desarrolladora Frontend",
        bio: "Especialista en UI responsive y accesible",
        experienceYears: 4,
        cvUrl: "https://example.com/cv-ana.pdf",
        skills: ["html", "css", "javascript", "node.js", "api rest"],
      },
      {
        id: 2,
        name: "Carlos UX",
        email: "carlos.design@webhub.dev",
        password: "123456",
        role: "developer",
        title: "Diseñador UX/UI",
        bio: "Experto en experiencia de usuario",
        experienceYears: 6,
        cvUrl: "https://example.com/cv-carlos.pdf",
        skills: ["ux", "ui", "figma", "javascript"],
      },
      {
        id: 3,
        name: "Startup Nova",
        email: "contacto@startupnova.com",
        password: "123456",
        role: "company",
        companyDescription: "Startup SaaS para logística",
      },
    ],
    projects: [
      {
        id: 1,
        companyId: 3,
        title: "Portal de clientes B2B",
        description: "Portal web con panel y reportes",
        budget: 3500,
        deadline: "2026-04-15",
        technologyStack: "javascript, node.js, api rest, ux",
        status: "open",
        createdAt: nowIso(),
      },
      {
        id: 2,
        companyId: 3,
        title: "Landing de producto",
        description: "Diseño y maquetación responsive de campaña",
        budget: 1200,
        deadline: "2026-03-20",
        technologyStack: "html, css, ui, figma",
        status: "open",
        createdAt: nowIso(),
      },
    ],
    applications: [
      { id: 1, projectId: 1, developerId: 1, coverLetter: "Puedo integrar APIs", status: "pending", createdAt: nowIso() },
      { id: 2, projectId: 2, developerId: 2, coverLetter: "Especialista en landings", status: "pending", createdAt: nowIso() },
    ],
    messages: [],
    reviews: [
      { id: 1, projectId: 1, reviewerId: 3, reviewedUserId: 1, rating: 5, comment: "Excelente trabajo", createdAt: nowIso() },
      { id: 2, projectId: 2, reviewerId: 3, reviewedUserId: 2, rating: 4, comment: "Muy buen diseño", createdAt: nowIso() },
    ],
    payments: [
      { id: 1, projectId: 1, companyId: 3, developerId: 1, amount: 1500, status: "paid", createdAt: nowIso() },
    ],
    passwordResets: [],
    matchStats: [],
  };
}

function getDb() {
  const raw = localStorage.getItem(DB_KEY);
  if (!raw) {
    const db = defaultDatabase();
    localStorage.setItem(DB_KEY, JSON.stringify(db));
    return db;
  }
  return JSON.parse(raw);
}

function setDb(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function setSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function getCurrentUser() {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

function validatePassword(password) {
  return typeof password === "string" && password.length >= 6;
}

function normalizeKeywords(text) {
  return [...new Set(
    (text || "")
      .toLowerCase()
      .split(/[^a-zA-Z0-9áéíóúñ]+/)
      .filter((token) => token.length > 2)
  )];
}

function findMatchesForProject(projectId) {
  const db = getDb();
  const project = db.projects.find((p) => p.id === Number(projectId));
  if (!project) {
    throw new Error("Proyecto no encontrado");
  }

  const keywords = normalizeKeywords(`${project.title} ${project.description} ${project.technologyStack}`);
  const developers = db.users.filter((u) => u.role === "developer");

  const recommendations = developers
    .map((developer) => {
      const skillTokens = normalizeKeywords((developer.skills || []).join(" "));
      const overlap = keywords.filter((k) => skillTokens.includes(k));
      return { developer, score: overlap.length, overlap };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  recommendations.forEach((entry) => {
    db.matchStats.push({
      id: nextId(db.matchStats),
      projectId: project.id,
      developerId: entry.developer.id,
      score: entry.score,
      matchedKeywords: entry.overlap.join(", "),
      createdAt: nowIso(),
    });
  });

  setDb(db);
  return recommendations.map((entry) => ({
    id: entry.developer.id,
    name: entry.developer.name,
    score: entry.score,
    overlap: entry.overlap,
  }));
}

