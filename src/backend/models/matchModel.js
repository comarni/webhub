const { getDb } = require("../config/db");

function normalizeKeywords(text) {
  return [...new Set(
    (text || "")
      .toLowerCase()
      .split(/[^a-zA-Z0-9áéíóúñ]+/)
      .filter((token) => token.length > 2)
  )];
}

async function recommendDevelopersForProject(project) {
  const db = getDb();
  const keywords = normalizeKeywords(
    `${project.title} ${project.description} ${project.technology_stack || ""}`
  );

  const developers = await db.all(
    `SELECT
      u.id,
      u.name,
      dp.title,
      dp.experience_years,
      GROUP_CONCAT(s.name, ' ') AS skill_text
    FROM users u
    JOIN developer_profiles dp ON dp.user_id = u.id
    LEFT JOIN user_skills us ON us.user_id = u.id
    LEFT JOIN skills s ON s.id = us.skill_id
    WHERE u.role = 'developer'
    GROUP BY u.id`
  );

  const scored = developers
    .map((dev) => {
      const skillTokens = normalizeKeywords(dev.skill_text || "");
      const overlap = keywords.filter((k) => skillTokens.includes(k));
      const score = overlap.length;
      return { ...dev, score, overlap };
    })
    .filter((dev) => dev.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  for (const dev of scored) {
    await db.run(
      `INSERT INTO match_stats (project_id, developer_id, score, matched_keywords)
       VALUES (?, ?, ?, ?)`,
      [project.id, dev.id, dev.score, dev.overlap.join(", ")]
    );
  }

  return scored;
}

module.exports = { recommendDevelopersForProject };
