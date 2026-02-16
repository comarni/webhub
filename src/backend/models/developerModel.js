const { getDb } = require("../config/db");

async function searchDevelopers({ skill, minRating, minExperience }) {
  const db = getDb();
  const rows = await db.all(
    `SELECT
      u.id,
      u.name,
      dp.title,
      dp.bio,
      dp.experience_years,
      COALESCE(AVG(r.rating), 0) AS avg_rating,
      GROUP_CONCAT(s.name, ', ') AS skills
    FROM users u
    JOIN developer_profiles dp ON dp.user_id = u.id
    LEFT JOIN user_skills us ON us.user_id = u.id
    LEFT JOIN skills s ON s.id = us.skill_id
    LEFT JOIN reviews r ON r.reviewed_user_id = u.id
    WHERE u.role = 'developer'
    GROUP BY u.id
    ORDER BY avg_rating DESC, dp.experience_years DESC`
  );

  return rows.filter((dev) => {
    const passSkill = skill ? (dev.skills || "").toLowerCase().includes(skill.toLowerCase()) : true;
    const passRating = minRating ? Number(dev.avg_rating) >= Number(minRating) : true;
    const passExp = minExperience ? Number(dev.experience_years) >= Number(minExperience) : true;
    return passSkill && passRating && passExp;
  });
}

async function listFeaturedDevelopers(limit = 6) {
  const db = getDb();
  return db.all(
    `SELECT
      u.id,
      u.name,
      dp.title,
      dp.experience_years,
      COALESCE(AVG(r.rating), 0) AS avg_rating
    FROM users u
    JOIN developer_profiles dp ON dp.user_id = u.id
    LEFT JOIN reviews r ON r.reviewed_user_id = u.id
    WHERE u.role = 'developer'
    GROUP BY u.id
    ORDER BY avg_rating DESC, dp.experience_years DESC
    LIMIT ?`,
    [limit]
  );
}

module.exports = { searchDevelopers, listFeaturedDevelopers };
