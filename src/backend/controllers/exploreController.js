const { listOpenProjects } = require("../models/projectModel");
const { listFeaturedDevelopers } = require("../models/developerModel");

async function publicExplore(req, res) {
  try {
    const [developers, projects] = await Promise.all([
      listFeaturedDevelopers(6),
      listOpenProjects(),
    ]);

    return res.json({ developers, projects: projects.slice(0, 10) });
  } catch (error) {
    return res.status(500).json({ message: "Error en explorar", error: error.message });
  }
}

module.exports = { publicExplore };
