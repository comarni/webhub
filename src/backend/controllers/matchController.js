const { findProjectById } = require("../models/projectModel");
const { recommendDevelopersForProject } = require("../models/matchModel");
const { notifyMatchFound } = require("../services/n8nService");

async function recommend(req, res) {
  try {
    const projectId = Number(req.params.projectId);
    const project = await findProjectById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    const recommendations = await recommendDevelopersForProject(project);
    if (recommendations.length > 0) {
      await notifyMatchFound({ project, recommendations });
    }

    return res.json({ projectId, recommendations });
  } catch (error) {
    return res.status(500).json({ message: "Error al generar recomendaciones", error: error.message });
  }
}

module.exports = { recommend };
