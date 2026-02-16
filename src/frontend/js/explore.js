function renderItem(container, html) {
  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = html;
  container.appendChild(div);
}

async function loadExplore() {
  const db = getDb();
  const developers = db.users.filter((u) => u.role === "developer");
  const projects = db.projects.filter((p) => p.status === "open");

  const data = {
    developers: developers
      .map((dev) => {
        const devReviews = db.reviews.filter((r) => r.reviewedUserId === dev.id);
        const avg = devReviews.length
          ? devReviews.reduce((sum, r) => sum + Number(r.rating), 0) / devReviews.length
          : 0;
        return {
          ...dev,
          avg_rating: avg,
          title: dev.title || "Sin título",
        };
      })
      .sort((a, b) => Number(b.avg_rating) - Number(a.avg_rating))
      .slice(0, 6),
    projects: projects.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))).slice(0, 10),
  };

  const featuredContainer = document.getElementById("featuredDevelopers");
  const projectContainer = document.getElementById("publicProjects");
  featuredContainer.innerHTML = "";
  projectContainer.innerHTML = "";

  data.developers.forEach((dev) => {
    renderItem(
      featuredContainer,
      `<strong>${dev.name}</strong><br />
       ${dev.title || "Sin título"}<br />
       <span class="muted">Experiencia: ${dev.experience_years} años · Rating: ${Number(dev.avg_rating).toFixed(1)}</span>`
    );
  });

  data.projects.forEach((project) => {
    renderItem(
      projectContainer,
      `<strong>${project.title}</strong><br />
       ${project.description}<br />
       <span class="muted">Presupuesto: €${project.budget} · Límite: ${project.deadline}</span>`
    );
  });
}
