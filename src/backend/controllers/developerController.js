const { searchDevelopers, listFeaturedDevelopers } = require("../models/developerModel");

async function search(req, res) {
  try {
    const result = await searchDevelopers({
      skill: req.query.skill,
      minRating: req.query.minRating,
      minExperience: req.query.minExperience,
    });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al buscar desarrolladores", error: error.message });
  }
}

async function featured(req, res) {
  try {
    const data = await listFeaturedDevelopers(8);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: "Error al cargar destacados", error: error.message });
  }
}

module.exports = { search, featured };
