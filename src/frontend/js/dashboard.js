async function loadDeveloperDashboard() {
  const db = getDb();
  const currentUser = getCurrentUser();
  const projectList = document.getElementById("developerProjectList");
  const applications = document.getElementById("developerApplications");
  projectList.innerHTML = "";
  applications.innerHTML = "";

  const openProjects = db.projects.filter((project) => project.status === "open");
  const myApplications = db.applications
    .filter((app) => app.developerId === currentUser.id)
    .map((app) => {
      const project = db.projects.find((p) => p.id === app.projectId);
      return { ...app, title: project?.title || "Proyecto", description: project?.description || "" };
    });

  openProjects.forEach((project) => {
    const wrapper = document.createElement("div");
    wrapper.className = "item";
    wrapper.innerHTML = `
      <strong>${project.title}</strong>
      <p>${project.description}</p>
      <span class="muted">€${project.budget} · ${project.deadline}</span>
      <button data-apply-id="${project.id}">Aplicar</button>
    `;
    projectList.appendChild(wrapper);
  });

  myApplications.forEach((app) => {
    const wrapper = document.createElement("div");
    wrapper.className = "item";
    wrapper.innerHTML = `
      <strong>${app.title}</strong>
      <p>${app.cover_letter || "Sin carta"}</p>
      <span class="muted">Estado: ${app.status}</span>
    `;
    applications.appendChild(wrapper);
  });

  document.querySelectorAll("[data-apply-id]").forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        const projectId = Number(button.dataset.applyId);
        const exists = db.applications.some((a) => a.projectId === projectId && a.developerId === currentUser.id);
        if (exists) {
          throw new Error("Ya aplicaste a este proyecto");
        }
        db.applications.push({
          id: nextId(db.applications),
          projectId,
          developerId: currentUser.id,
          coverLetter: "Estoy interesado en este proyecto.",
          status: "pending",
          createdAt: nowIso(),
        });
        setDb(db);
        showAlert("Aplicación enviada");
        await loadDeveloperDashboard();
      } catch (error) {
        showAlert(error.message, true);
      }
    });
  });
}

async function loadCompanyDashboard() {
  const db = getDb();
  const currentUser = getCurrentUser();
  const container = document.getElementById("companyProjects");
  container.innerHTML = "";
  const projects = db.projects.filter((project) => project.companyId === currentUser.id);

  projects.forEach((project) => {
    const wrapper = document.createElement("div");
    wrapper.className = "item";
    wrapper.innerHTML = `
      <strong>${project.title}</strong>
      <p>${project.description}</p>
      <span class="muted">Estado: ${project.status} · Stack: ${project.technology_stack || "-"}</span>
      <button data-match-id="${project.id}">Generar matches</button>
    `;
    container.appendChild(wrapper);
  });

  document.querySelectorAll("[data-match-id]").forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        const recommendations = findMatchesForProject(Number(button.dataset.matchId));
        const names = recommendations.map((d) => `${d.name} (${d.score})`).join(", ");
        showAlert(names ? `Recomendados: ${names}` : "No hubo coincidencias.");
      } catch (error) {
        showAlert(error.message, true);
      }
    });
  });
}
