const {
  createProject,
  listOpenProjects,
  listCompanyProjects,
  listDeveloperApplications,
  findProjectById,
  updateProject,
  applyToProject,
} = require("../models/projectModel");
const { notifyNewProject, notifyActivity } = require("../services/n8nService");

async function getProjects(req, res) {
  try {
    const projects = await listOpenProjects();
    return res.json(projects);
  } catch (error) {
    return res.status(500).json({ message: "Error al listar proyectos", error: error.message });
  }
}

async function create(req, res) {
  try {
    const { title, description, budget, deadline, technologyStack } = req.body;
    if (!title || !description || !budget || !deadline) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const projectId = await createProject({
      companyId: req.user.id,
      title,
      description,
      budget,
      deadline,
      technologyStack,
    });

    const project = await findProjectById(projectId);
    await notifyNewProject(project);
    await notifyActivity({ action: "project_created", userId: req.user.id, projectId });

    return res.status(201).json({ message: "Proyecto creado", project });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear proyecto", error: error.message });
  }
}

async function update(req, res) {
  try {
    const projectId = Number(req.params.id);
    await updateProject(projectId, req.user.id, req.body);
    const project = await findProjectById(projectId);
    return res.json({ message: "Proyecto actualizado", project });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar proyecto", error: error.message });
  }
}

async function apply(req, res) {
  try {
    const projectId = Number(req.params.id);
    const { coverLetter } = req.body;
    await applyToProject(projectId, req.user.id, coverLetter || "");
    await notifyActivity({ action: "project_applied", userId: req.user.id, projectId });
    return res.status(201).json({ message: "Aplicación enviada" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function myProjects(req, res) {
  try {
    if (req.user.role === "company") {
      const projects = await listCompanyProjects(req.user.id);
      return res.json(projects);
    }
    const applications = await listDeveloperApplications(req.user.id);
    return res.json(applications);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener tus proyectos", error: error.message });
  }
}

module.exports = { getProjects, create, update, apply, myProjects };
