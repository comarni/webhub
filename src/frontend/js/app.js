const STORAGE_KEY = "webhub_uiux_v3";
const SESSION_KEY = "webhub_session_v3";

const state = {
  view: "home",
  dashboardSection: "Inicio",
  selectedRole: "developer",
  authTab: "login",
  chatContactId: null,
  requestFilter: "Pendientes",
  projectFilter: "Todos",
  projectPage: 1,
  talentPage: 1,
  publicProfileId: null,
};

const PAGE_SIZE_PROJECTS = 4;
const PAGE_SIZE_TALENT = 5;

const roleMenus = {
  developer: ["Inicio", "Proyectos disponibles", "Mensajes", "Portfolio", "Solicitudes", "Valoraciones", "Notificaciones", "Configuración"],
  company: ["Inicio", "Mis proyectos", "Buscar desarrolladores", "Mensajes", "Solicitudes recibidas", "Valoraciones", "Notificaciones", "Configuración"],
};

const techOptions = ["html", "css", "javascript", "react", "vue", "node.js", "sql", "ux", "ui", "figma", "api rest"];

function now() {
  return new Date().toISOString();
}

function uid(list) {
  return list.length ? Math.max(...list.map((item) => item.id)) + 1 : 1;
}

function defaultDB() {
  return {
    users: [
      {
        id: 1,
        role: "developer",
        accountStatus: "active",
        name: "Ana Frontend",
        email: "ana.dev@webhub.dev",
        password: "123456",
        title: "Frontend Engineer",
        bio: "Especialista en productos web B2B y rendimiento frontend.",
        location: "Madrid",
        avatar: "https://i.pravatar.cc/100?img=47",
        skills: ["html", "css", "javascript", "react", "api rest"],
        experience: 4,
        availability: "freelance",
        rate: 42,
        visibility: "public",
        contact: {
          phone: "",
          website: "",
          linkedin: "",
          telegram: "",
        },
        rating: 4.8,
        preferences: { newMatch: true, newMessage: true, email: false },
        devProjects: [
          {
            id: 1,
            name: "webhub-ui-kit",
            description: "Sistema de componentes UI para dashboard B2B.",
            repoUrl: "https://github.com/demo/webhub-ui-kit",
            tags: ["css", "javascript", "ui"],
            files: [
              { name: "readme.pdf", size: 182000, type: "application/pdf", preview: "" },
            ],
            createdAt: now(),
          },
        ],
        portfolio: [
          { title: "E-commerce UI", image: "https://images.unsplash.com/photo-1557821552-17105176677c", description: "Rediseño completo del checkout y PDP." },
          { title: "SaaS Dashboard", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", description: "Panel de métricas y reportes para equipo comercial." },
          { title: "Landing Startup", image: "https://images.unsplash.com/photo-1558655146-d09347e92766", description: "Landing de alta conversión para fase pre-seed." },
        ],
      },
      {
        id: 2,
        role: "developer",
        accountStatus: "active",
        name: "Carlos UX",
        email: "carlos.design@webhub.dev",
        password: "123456",
        title: "UX/UI Designer",
        bio: "Diseño de flujos para SaaS y experiencia de onboarding.",
        location: "Barcelona",
        avatar: "https://i.pravatar.cc/100?img=12",
        skills: ["ux", "ui", "figma", "javascript"],
        experience: 6,
        availability: "full-time",
        rate: 55,
        visibility: "public",
        contact: {
          phone: "",
          website: "",
          linkedin: "",
          telegram: "",
        },
        rating: 4.6,
        preferences: { newMatch: true, newMessage: true, email: true },
        devProjects: [],
        portfolio: [
          { title: "Fintech UX", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", description: "Journey completo para banca digital." },
          { title: "Mobile Prototype", image: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3", description: "Prototipo mobile-first y test de usabilidad." },
        ],
      },
      {
        id: 3,
        role: "company",
        accountStatus: "active",
        name: "Startup Nova",
        email: "contacto@startupnova.com",
        password: "123456",
        avatar: "https://i.pravatar.cc/100?img=68",
        bio: "Empresa SaaS para logística y automatización de operaciones.",
        contact: {
          phone: "",
          website: "",
          linkedin: "",
          telegram: "",
        },
        industry: "SaaS Logística",
        companySize: "11-50",
        location: "Valencia",
        rating: 4.7,
        preferences: { newMatch: true, newMessage: true, email: true },
        paymentMethods: [
          { id: 1, brand: "Visa", last4: "4242", exp: "08/28", status: "Activa" },
        ],
      },
    ],
    projects: [
      {
        id: 1,
        companyId: 3,
        title: "Portal de clientes B2B",
        company: "Startup Nova",
        description: "Portal web con onboarding, métricas y reportes descargables.",
        budget: 3500,
        technologies: ["javascript", "react", "api rest", "sql"],
        modality: "remoto",
        type: "Web App",
        deadline: "2026-04-10",
        status: "Publicado",
        createdAt: now(),
      },
      {
        id: 2,
        companyId: 3,
        title: "Landing de campaña",
        company: "Startup Nova",
        description: "Diseño/maquetación de landing de lanzamiento de producto.",
        budget: 1200,
        technologies: ["html", "css", "ui", "figma"],
        modality: "hibrido",
        type: "Landing",
        deadline: "2026-03-20",
        status: "En curso",
        createdAt: now(),
      },
      {
        id: 3,
        companyId: 3,
        title: "UI Kit corporativo",
        company: "Startup Nova",
        description: "Sistema de componentes para producto y marketing.",
        budget: 1800,
        technologies: ["ui", "figma", "css"],
        modality: "remoto",
        type: "Diseño UX/UI",
        deadline: "2026-05-02",
        status: "Borrador",
        createdAt: now(),
      },
      {
        id: 4,
        companyId: 3,
        title: "Módulo de facturación",
        company: "Startup Nova",
        description: "Desarrollo de módulo de facturación con reportes PDF.",
        budget: 2600,
        technologies: ["javascript", "node.js", "sql"],
        modality: "presencial",
        type: "Web App",
        deadline: "2026-05-29",
        status: "Cerrado",
        createdAt: now(),
      },
    ],
    requests: [
      { id: 1, projectId: 1, fromUserId: 1, toUserId: 3, status: "Pendientes", message: "Puedo cubrir frontend y analítica." },
      { id: 2, projectId: 2, fromUserId: 3, toUserId: 2, status: "Aceptadas", message: "Nos interesa tu perfil UX/UI." },
    ],
    reviews: [
      { id: 1, fromUserId: 3, toUserId: 1, rating: 5, comment: "Entrega impecable y excelente comunicación." },
      { id: 2, fromUserId: 1, toUserId: 3, rating: 5, comment: "Brief claro y pagos puntuales." },
      { id: 3, fromUserId: 3, toUserId: 2, rating: 4, comment: "Muy buen criterio de diseño." },
    ],
    messages: [
      { id: 1, fromUserId: 3, toUserId: 1, text: "Hola Ana, ¿puedes empezar esta semana?", attachments: [], read: false, createdAt: now() },
      { id: 2, fromUserId: 1, toUserId: 3, text: "Sí, puedo arrancar el lunes.", attachments: [], read: true, createdAt: now() },
    ],
    payments: [
      { id: 1, projectId: 1, companyId: 3, developerId: 1, amount: 1500, status: "Pagado", createdAt: now() },
    ],
    matches: [
      { id: 1, projectId: 1, developerId: 1, score: 4, createdAt: now() },
      { id: 2, projectId: 2, developerId: 2, score: 3, createdAt: now() },
    ],
    notifications: [
      { id: 1, userId: 3, type: "match", title: "Nuevo match sugerido", description: "Ana Frontend encaja con Portal de clientes B2B.", read: false, createdAt: now() },
      { id: 2, userId: 1, type: "message", title: "Nuevo mensaje", description: "Startup Nova te envió un mensaje.", read: false, createdAt: now() },
    ],
    testimonials: [
      { id: 1, quote: "Redujimos nuestro tiempo de contratación un 40%.", author: "CTO · NovaTech" },
      { id: 2, quote: "Flujos de trabajo claros y talento de calidad.", author: "Product Lead · CloudAxis" },
      { id: 3, quote: "La mensajería y solicitudes aceleran todo el proceso.", author: "CEO · OrbitSoft" },
    ],
  };
}

function getDB() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw);
  const initial = defaultDB();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function setDB(db) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

function setSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function el(selector) {
  return document.querySelector(selector);
}

function showAlert(message, isError = false) {
  const alerts = el("#alerts");
  alerts.innerHTML = `<div class="alert ${isError ? "error" : ""}">${message}</div>`;
  setTimeout(() => {
    alerts.innerHTML = "";
  }, 3200);
}

function openInfoModal(title, htmlContent) {
  el("#infoModalTitle").textContent = title;
  el("#infoModalBody").innerHTML = htmlContent;
  el("#infoModal").classList.remove("hidden");
}

function closeInfoModal() {
  el("#infoModal").classList.add("hidden");
}

function averageRatingForUser(userId, db) {
  const reviews = db.reviews.filter((review) => review.toUserId === userId);
  if (!reviews.length) return 0;
  return reviews.reduce((sum, review) => sum + Number(review.rating), 0) / reviews.length;
}

function userById(userId, db) {
  return db.users.find((user) => user.id === userId);
}

function projectById(projectId, db) {
  return db.projects.find((project) => project.id === Number(projectId));
}

function buildStars(rating) {
  const rounded = Math.round(Number(rating));
  return "★".repeat(Math.max(0, Math.min(5, rounded))) + "☆".repeat(Math.max(0, 5 - rounded));
}

function levelMatch(experience, selectedLevel) {
  if (!selectedLevel) return true;
  if (selectedLevel === "junior") return experience <= 2;
  if (selectedLevel === "mid") return experience >= 3 && experience <= 5;
  return experience >= 6;
}

function createNotification(db, userId, type, title, description) {
  const user = userById(userId, db);
  const allow = user?.preferences;
  const blockByPrefs =
    (type === "match" && allow && !allow.newMatch) ||
    (type === "message" && allow && !allow.newMessage);

  if (blockByPrefs) return;

  db.notifications.unshift({
    id: uid(db.notifications),
    userId,
    type,
    title,
    description,
    read: false,
    createdAt: now(),
  });
}

function unreadNotificationsCount(userId, db) {
  return db.notifications.filter((item) => item.userId === userId && !item.read).length;
}

function getRecommendationsForProject(project, db) {
  const keywords = new Set(`${project.title} ${project.description} ${project.technologies.join(" ")}`.toLowerCase().split(/[^a-z0-9áéíóúñ.]+/).filter(Boolean));

  return db.users
    .filter((user) => user.role === "developer" && user.accountStatus === "active")
    .map((developer) => {
      const overlap = (developer.skills || []).filter((skill) => keywords.has(skill.toLowerCase()));
      return { developer, overlap, score: overlap.length };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

function initHeader() {
  el("#burgerBtn").addEventListener("click", () => {
    const nav = el("#mainNav");
    nav.classList.toggle("open");
    el("#burgerBtn").setAttribute("aria-expanded", String(nav.classList.contains("open")));
  });

  document.querySelectorAll(".nav-link[data-view]").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });

  document.querySelectorAll("[data-view-trigger]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      switchView(button.dataset.viewTrigger);
    });
  });

  el("#globalSearchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    switchView("explore");
    el("#exploreQuery").value = el("#globalSearchInput").value;
    renderExplore();
  });

  el("#notificationsBtn").addEventListener("click", () => {
    const session = getSession();
    if (!session) {
      openAuthModal("login");
      return;
    }
    state.dashboardSection = "Notificaciones";
    switchView("dashboard");
  });
}

function switchView(view) {
  const session = getSession();
  if (view === "dashboard" && !session) {
    openAuthModal("login");
    showAlert("Inicia sesión para acceder al dashboard", true);
    return;
  }

  state.view = view;
  document.querySelectorAll(".view").forEach((section) => section.classList.remove("active"));
  el(`#view-${view}`).classList.add("active");

  document.querySelectorAll(".nav-link[data-view]").forEach((item) => {
    item.classList.toggle("active", item.dataset.view === view);
  });

  if (view === "dashboard") renderDashboard();
  if (view === "public-profile") renderPublicProfile();
}

function openPublicProfile(userId) {
  state.publicProfileId = Number(userId);
  switchView("public-profile");
}

function openAuthModal(tab = "login") {
  state.authTab = tab;
  el("#authModal").classList.remove("hidden");
  updateAuthTab();
}

function closeAuthModal() {
  el("#authModal").classList.add("hidden");
}

function updateAuthTab() {
  document.querySelectorAll(".tab").forEach((tabButton) => {
    tabButton.classList.toggle("active", tabButton.dataset.auth === state.authTab);
  });
  el("#loginForm").classList.toggle("active", state.authTab === "login");
  el("#registerForm").classList.toggle("active", state.authTab === "register");
}

function validateInput(input) {
  const field = input.closest(".field");
  if (!field) return true;
  const errorNode = field.querySelector(".error");
  let error = "";

  if (input.validity.valueMissing) error = "Este campo es obligatorio";
  else if (input.type === "email" && input.validity.typeMismatch) error = "Email inválido";
  else if (input.minLength > 0 && input.value.trim().length < input.minLength) {
    error = `Debe tener al menos ${input.minLength} caracteres`;
  }

  if (!error && input.id === "registerConfirmPassword") {
    const password = el("#registerPassword")?.value || "";
    if (input.value !== password) {
      error = "Las contraseñas no coinciden";
    }
  }

  if (errorNode) errorNode.textContent = error;
  input.setAttribute("aria-invalid", String(Boolean(error)));
  return !error;
}

function validateForm(form) {
  return Array.from(form.querySelectorAll("input[required]")).every((input) => validateInput(input));
}

function refreshAuthControls() {
  const session = getSession();
  const loginBtn = el("#loginBtn");
  const registerBtn = el("#registerBtn");
  const logoutBtn = el("#logoutBtn");
  const notificationsBtn = el("#notificationsBtn");

  if (!session) {
    loginBtn.classList.remove("hidden");
    registerBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
    notificationsBtn.classList.add("hidden");
    el("#notificationsCount").textContent = "0";
    return;
  }

  loginBtn.classList.add("hidden");
  registerBtn.classList.add("hidden");
  logoutBtn.classList.remove("hidden");
  notificationsBtn.classList.remove("hidden");

  const db = getDB();
  el("#notificationsCount").textContent = String(unreadNotificationsCount(session.id, db));
}

function initAuth() {
  el("#loginBtn").addEventListener("click", () => openAuthModal("login"));
  el("#registerBtn").addEventListener("click", () => openAuthModal("register"));
  el("#heroCta").addEventListener("click", () => openAuthModal("register"));
  el("#closeAuthModal").addEventListener("click", closeAuthModal);

  el("#authModal").addEventListener("click", (event) => {
    if (event.target.id === "authModal") closeAuthModal();
  });

  document.querySelectorAll(".tab").forEach((tabButton) => {
    tabButton.addEventListener("click", () => {
      state.authTab = tabButton.dataset.auth;
      updateAuthTab();
    });
  });

  document.querySelectorAll(".role-card").forEach((roleCard) => {
    roleCard.addEventListener("click", () => {
      state.selectedRole = roleCard.dataset.role;
      el("#selectedRole").value = state.selectedRole;
      document.querySelectorAll(".role-card").forEach((item) => item.classList.remove("active"));
      roleCard.classList.add("active");
    });
  });

  ["#loginForm", "#registerForm"].forEach((selector) => {
    const form = el(selector);
    form.querySelectorAll("input[required]").forEach((input) => {
      input.addEventListener("input", () => validateInput(input));
    });
  });

  el("#forgotPasswordBtn").addEventListener("click", () => {
    const email = prompt("Introduce tu email para generar token de recuperación (demo):");
    if (!email) return;
    const db = getDB();
    const found = db.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      showAlert("Si el correo existe, recibirás instrucciones");
      return;
    }
    const token = Math.random().toString(36).slice(2, 10).toUpperCase();
    showAlert(`Token demo generado: ${token}`);
  });

  el("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateForm(event.target)) return;

    const db = getDB();
    const payload = Object.fromEntries(new FormData(event.target).entries());
    const user = db.users.find((item) => item.email.toLowerCase() === payload.email.toLowerCase());

    if (!user || user.password !== payload.password || user.accountStatus !== "active") {
      showAlert("Credenciales inválidas o cuenta inactiva", true);
      return;
    }

    setSession({ id: user.id, role: user.role, name: user.name });
    refreshAuthControls();
    closeAuthModal();
    switchView("dashboard");
    showAlert(`Bienvenido, ${user.name}`);
  });

  el("#registerForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateForm(event.target)) return;

    const db = getDB();
    const payload = Object.fromEntries(new FormData(event.target).entries());

    if (payload.password !== payload.confirmPassword) {
      showAlert("Las contraseñas no coinciden", true);
      return;
    }

    const exists = db.users.some((item) => item.email.toLowerCase() === payload.email.toLowerCase());

    if (exists) {
      showAlert("Ese correo ya está registrado", true);
      return;
    }

    const isDeveloper = payload.role === "developer";
    const newUser = {
      id: uid(db.users),
      role: payload.role,
      accountStatus: "active",
      name: payload.name,
      email: payload.email,
      password: payload.password,
      avatar: `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 60) + 1}`,
      bio: "",
      location: "Sin definir",
      preferences: { newMatch: true, newMessage: true, email: false },
      contact: {
        phone: "",
        website: "",
        linkedin: "",
        telegram: "",
      },
      visibility: "public",
      rating: 0,
      ...(isDeveloper
        ? {
            title: "Nuevo talento",
            skills: ["javascript"],
            experience: 1,
            availability: "freelance",
            rate: 35,
            devProjects: [],
            portfolio: [],
          }
        : {
            industry: "Sin definir",
            companySize: "1-10",
            paymentMethods: [],
          }),
    };

    db.users.push(newUser);
    createNotification(db, newUser.id, "system", "Cuenta creada", "Completa tu perfil para mejorar tus recomendaciones.");
    setDB(db);

    setSession({ id: newUser.id, role: newUser.role, name: newUser.name });
    refreshAuthControls();
    closeAuthModal();
    renderHome();
    renderExplore();
    switchView("dashboard");
    showAlert("Cuenta creada correctamente");
  });
}

function renderHome() {
  const db = getDB();
  const developers = db.users
    .filter((user) => user.role === "developer" && user.accountStatus === "active")
    .map((dev) => ({ ...dev, computedRating: averageRatingForUser(dev.id, db) || dev.rating || 0 }))
    .sort((a, b) => b.computedRating - a.computedRating)
    .slice(0, 3);

  const projects = db.projects.filter((project) => project.status !== "Archivado").slice(0, 4);

  el("#kpiTalents").textContent = String(db.users.filter((item) => item.role === "developer" && item.accountStatus === "active").length);
  el("#kpiProjects").textContent = String(db.projects.filter((item) => item.status !== "Archivado").length);
  el("#kpiMatches").textContent = String(db.matches.length);

  el("#homeTopDevelopers").innerHTML = developers
    .map(
      (dev) => `
      <article class="profile-card" tabindex="0">
        <div class="row">
          <img class="avatar" src="${dev.avatar}" alt="Foto de ${dev.name}" />
          <div>
            <strong>${dev.name}</strong>
            <div class="muted">${dev.title || "Desarrollador"} · ${dev.location || "Remoto"}</div>
          </div>
        </div>
        <div class="chips">${(dev.skills || []).slice(0, 4).map((skill) => `<span class="chip">${skill}</span>`).join("")}</div>
        <p class="rating">${buildStars(dev.computedRating)} ${dev.computedRating.toFixed(1)}</p>
        <button class="btn ghost show-public-profile" data-dev="${dev.id}">Ver portfolio público</button>
      </article>
    `
    )
    .join("");

  el("#homeTrendingProjects").innerHTML = projects
    .map(
      (project) => `
      <article class="project-card">
        <strong>${project.title}</strong>
        <p class="muted">${project.company}</p>
        <p>${project.description}</p>
        <p><strong>€${project.budget}</strong> · ${project.modality} · ${project.type}</p>
        <div class="chips">${project.technologies.map((tech) => `<span class="chip">${tech}</span>`).join("")}</div>
        <button class="btn ghost show-project-detail" data-project="${project.id}">Ver detalles</button>
      </article>
    `
    )
    .join("");

  el("#testimonials").innerHTML = db.testimonials
    .map(
      (item) => `
      <article class="card">
        <p>“${item.quote}”</p>
        <p class="muted">${item.author}</p>
      </article>
    `
    )
    .join("");

  document.querySelectorAll(".show-public-profile").forEach((button) => {
    button.addEventListener("click", () => {
      openPublicProfile(button.dataset.dev);
    });
  });

  document.querySelectorAll(".show-project-detail").forEach((button) => {
    button.addEventListener("click", () => {
      const project = projectById(Number(button.dataset.project), db);
      if (!project) return;
      openInfoModal(
        project.title,
        `<p>${project.description}</p>
         <p><strong>Empresa:</strong> ${project.company}</p>
         <p><strong>Presupuesto:</strong> €${project.budget}</p>
         <p><strong>Modalidad:</strong> ${project.modality}</p>
         <p><strong>Estado:</strong> ${project.status}</p>
         <p><strong>Fecha límite:</strong> ${project.deadline}</p>
         <div class="chips">${project.technologies.map((tech) => `<span class="chip">${tech}</span>`).join("")}</div>`
      );
    });
  });
}

function createTechFilters() {
  el("#techFilters").innerHTML = techOptions
    .map((tech) => `<button type="button" class="tech-toggle" data-tech="${tech}">${tech}</button>`)
    .join("");

  document.querySelectorAll(".tech-toggle").forEach((button) => {
    button.addEventListener("click", () => button.classList.toggle("active"));
  });

  el("#suggestions").innerHTML = techOptions.concat(["dashboard", "landing", "full stack", "escrow", "stripe"])
    .map((entry) => `<option value="${entry}"></option>`)
    .join("");
}

function matchExploreFilters() {
  const query = el("#exploreQuery").value.trim().toLowerCase();
  const level = el("#expLevel").value;
  const budgetMax = Number(el("#budgetRange").value || 0);
  const modality = el("#modality").value;
  const projectType = el("#projectType").value;
  const devLocation = el("#devLocation").value.trim().toLowerCase();
  const availability = el("#availability").value;
  const maxRate = Number(el("#maxRate").value || 0);
  const activeTech = Array.from(document.querySelectorAll(".tech-toggle.active")).map((node) => node.dataset.tech);

  const db = getDB();

  const developers = db.users
    .filter((user) => user.role === "developer" && user.accountStatus === "active")
    .filter((developer) => {
      const textBlob = `${developer.name} ${developer.title || ""} ${(developer.skills || []).join(" ")}`.toLowerCase();
      const queryPass = query ? textBlob.includes(query) : true;
      const levelPass = levelMatch(Number(developer.experience || 0), level);
      const locationPass = devLocation ? String(developer.location || "").toLowerCase().includes(devLocation) : true;
      const availabilityPass = availability ? developer.availability === availability : true;
      const ratePass = maxRate ? Number(developer.rate || 0) <= maxRate : true;
      const techPass = activeTech.length ? activeTech.every((tech) => (developer.skills || []).includes(tech)) : true;
      return queryPass && levelPass && locationPass && availabilityPass && ratePass && techPass;
    })
    .map((dev) => ({ ...dev, computedRating: averageRatingForUser(dev.id, db) || dev.rating || 0 }));

  const projects = db.projects
    .filter((project) => project.status !== "Archivado")
    .filter((project) => {
      const textBlob = `${project.title} ${project.description} ${project.technologies.join(" ")}`.toLowerCase();
      const queryPass = query ? textBlob.includes(query) : true;
      const budgetPass = budgetMax ? Number(project.budget) <= budgetMax : true;
      const modalityPass = modality ? project.modality === modality : true;
      const typePass = projectType ? project.type === projectType : true;
      const techPass = activeTech.length ? activeTech.every((tech) => project.technologies.includes(tech)) : true;
      return queryPass && budgetPass && modalityPass && typePass && techPass;
    });

  return { developers, projects };
}

function renderExplore() {
  const { developers, projects } = matchExploreFilters();

  el("#exploreDevelopers").innerHTML = developers.length
    ? developers
        .map(
          (dev) => `
        <article class="profile-card">
          <div class="row">
            <img class="avatar" src="${dev.avatar}" alt="Foto de ${dev.name}" />
            <div>
              <strong>${dev.name}</strong>
              <div class="muted">${dev.title || "Desarrollador"} · ${dev.experience || 0} años · €${dev.rate || "-"}/h</div>
            </div>
          </div>
          <div class="chips">${(dev.skills || []).slice(0, 6).map((skill) => `<span class="chip">${skill}</span>`).join("")}</div>
          <p class="rating">${buildStars(dev.computedRating)} ${dev.computedRating.toFixed(1)}</p>
          <div class="actions-row">
            <button class="btn ghost view-public-profile" data-dev="${dev.id}">Ver portfolio público</button>
            <button class="btn ghost open-auth">Inicia sesión para contactar</button>
          </div>
        </article>
      `
        )
        .join("")
    : `<div class="empty-state"><p class="muted">No se encontraron desarrolladores.</p><button class="btn primary" id="emptyExploreCta">Publicar proyecto</button></div>`;

  el("#exploreProjects").innerHTML = projects.length
    ? projects
        .map(
          (project) => `
        <article class="project-card">
          <strong>${project.title}</strong>
          <p class="muted">${project.company} · ${project.modality} · ${project.status}</p>
          <p>${project.description}</p>
          <p><strong>€${project.budget}</strong> · ${project.type}</p>
          <div class="chips">${project.technologies.map((tech) => `<span class="chip">${tech}</span>`).join("")}</div>
          <button class="btn ghost open-auth">Inicia sesión para aplicar</button>
        </article>
      `
        )
        .join("")
    : `<div class="empty-state"><p class="muted">No hay proyectos con estos filtros.</p><button class="btn primary" id="emptyExploreProjectCta">Limpiar filtros</button></div>`;

  document.querySelectorAll(".open-auth").forEach((button) => {
    button.addEventListener("click", () => openAuthModal("login"));
  });

  document.querySelectorAll(".view-public-profile").forEach((button) => {
    button.addEventListener("click", () => openPublicProfile(button.dataset.dev));
  });

  const emptyExploreCta = el("#emptyExploreCta");
  if (emptyExploreCta) {
    emptyExploreCta.addEventListener("click", () => openAuthModal("login"));
  }

  const emptyExploreProjectCta = el("#emptyExploreProjectCta");
  if (emptyExploreProjectCta) {
    emptyExploreProjectCta.addEventListener("click", () => {
      el("#clearExploreFilters").click();
    });
  }
}

function renderPublicProfile() {
  const db = getDB();
  const developer = db.users.find((user) => user.id === state.publicProfileId && user.role === "developer");
  const container = el("#publicProfileContent");

  if (!developer) {
    container.innerHTML = `<div class="empty-state"><p class="muted">Developer no encontrado.</p></div>`;
    return;
  }

  const reviews = db.reviews.filter((review) => review.toUserId === developer.id).slice(0, 5);
  const galleryPortfolio = developer.portfolio || [];
  const devProjects = developer.devProjects || [];
  const avgRating = averageRatingForUser(developer.id, db) || developer.rating || 0;

  container.innerHTML = `
    <div class="public-profile-header">
      <div class="row">
        <img class="avatar avatar-lg" src="${developer.avatar}" alt="Foto de ${developer.name}" />
        <div>
          <h3>${developer.name}</h3>
          <p class="muted">${developer.title || "Developer"} · ${developer.location || "Remoto"}</p>
          <p>${developer.bio || "Sin biografía por el momento."}</p>
          <p class="muted">${buildStars(avgRating)} ${avgRating.toFixed(1)} · ${developer.experience || 0} años · €${developer.rate || "-"}/h · ${developer.availability || "-"}</p>
          <div class="chips">${(developer.skills || []).map((skill) => `<span class="chip">${skill}</span>`).join("")}</div>
        </div>
      </div>
    </div>

    <h4>Datos de contacto</h4>
    <div class="grid cols-2">
      <article class="card"><strong>Teléfono</strong><p class="muted">${developer.contact?.phone || "No especificado"}</p></article>
      <article class="card"><strong>Web</strong><p class="muted">${developer.contact?.website || "No especificada"}</p></article>
      <article class="card"><strong>LinkedIn</strong><p class="muted">${developer.contact?.linkedin || "No especificado"}</p></article>
      <article class="card"><strong>Telegram</strong><p class="muted">${developer.contact?.telegram || "No especificado"}</p></article>
    </div>

    <h4>Portfolio visual</h4>
    <div class="gallery">
      ${galleryPortfolio.length
        ? galleryPortfolio
            .map(
              (item) => `
            <button type="button" class="portfolio-preview" data-title="${item.title}" data-desc="${item.description || ""}">
              <img src="${item.image}" alt="Proyecto ${item.title}" />
            </button>
          `
            )
            .join("")
        : `<p class="muted">No hay elementos visuales todavía.</p>`}
    </div>

    <h4>Proyectos tipo repositorio</h4>
    <div class="grid">
      ${devProjects.length
        ? devProjects
            .map(
              (project) => `
            <article class="project-card">
              <strong>${project.name}</strong>
              <p>${project.description}</p>
              <p class="muted">${project.repoUrl ? `<a href="${project.repoUrl}" target="_blank" rel="noopener">Abrir repositorio</a>` : "Sin enlace de repositorio"}</p>
              <div class="chips">${(project.tags || []).map((tag) => `<span class="chip">${tag}</span>`).join("")}</div>
              <h5>Archivos adjuntos</h5>
              <div class="chips">${(project.files || []).length ? (project.files || []).map((file) => `<span class="chip">${file.name}</span>`).join("") : "<span class='muted'>Sin archivos</span>"}</div>
              <div class="public-files">${(project.files || [])
                .filter((file) => file.preview)
                .slice(0, 6)
                .map((file) => `<img src="${file.preview}" alt="${file.name}" />`)
                .join("")}</div>
            </article>
          `
            )
            .join("")
        : `<div class="empty-state"><p class="muted">Este developer aún no publicó proyectos de portfolio.</p></div>`}
    </div>

    <h4>Valoraciones recientes</h4>
    <div class="grid">
      ${reviews.length
        ? reviews
            .map((review) => {
              const from = userById(review.fromUserId, db);
              return `<article class="card"><strong>${from?.name || "Usuario"}</strong><p class="rating">${buildStars(review.rating)}</p><p>${review.comment}</p></article>`;
            })
            .join("")
        : `<p class="muted">Sin reseñas todavía.</p>`}
    </div>
  `;

  document.querySelectorAll(".portfolio-preview").forEach((button) => {
    button.addEventListener("click", () => {
      openInfoModal(button.dataset.title, `<p>${button.dataset.desc || "Sin descripción"}</p>`);
    });
  });
}

function initExploreEvents() {
  el("#applyExploreFilters").addEventListener("click", renderExplore);
  el("#clearExploreFilters").addEventListener("click", () => {
    ["#exploreQuery", "#expLevel", "#budgetRange", "#modality", "#projectType", "#devLocation", "#availability", "#maxRate"].forEach((selector) => {
      const node = el(selector);
      if (node) node.value = "";
    });
    document.querySelectorAll(".tech-toggle.active").forEach((button) => button.classList.remove("active"));
    renderExplore();
  });
}

function calcProfileProgress(user) {
  const checks = user.role === "developer"
    ? [Boolean(user.avatar), Boolean(user.title), Boolean(user.bio), Boolean(user.location), (user.skills || []).length >= 3, Number(user.rate || 0) > 0]
    : [Boolean(user.avatar), Boolean(user.bio), Boolean(user.industry), Boolean(user.companySize), Boolean(user.location)];

  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

function renderSidebar(user) {
  const menu = roleMenus[user.role] || [];
  const progress = calcProfileProgress(user);

  el("#sidebarMenu").innerHTML = `
    <div class="side-user">
      <img class="avatar" src="${user.avatar || "https://i.pravatar.cc/100?img=9"}" alt="Avatar de ${user.name}" />
      <div>
        <strong>${user.name}</strong>
        <div class="muted">${user.role === "developer" ? "Desarrollador" : "Empresa"}</div>
      </div>
    </div>
    <p class="muted">Perfil ${progress}% completo</p>
    <progress max="100" value="${progress}"></progress>
    <div class="side-menu">
      ${menu.map((item) => `<button class="side-item ${state.dashboardSection === item ? "active" : ""}" data-side="${item}">${item}</button>`).join("")}
    </div>
  `;

  document.querySelectorAll(".side-item").forEach((button) => {
    button.addEventListener("click", () => {
      state.dashboardSection = button.dataset.side;
      state.projectPage = 1;
      state.talentPage = 1;
      renderDashboard();
    });
  });
}

function renderMetrics(user, db) {
  const activeProjects = user.role === "company"
    ? db.projects.filter((project) => project.companyId === user.id && ["Publicado", "En curso", "Borrador"].includes(project.status)).length
    : db.projects.filter((project) => ["Publicado", "En curso"].includes(project.status)).length;

  const messages = db.messages.filter((message) => message.fromUserId === user.id || message.toUserId === user.id).length;
  const rating = averageRatingForUser(user.id, db) || user.rating || 0;

  el("#metrics").innerHTML = `
    <article class="card metric"><strong>${activeProjects}</strong><span class="muted">Proyectos activos</span></article>
    <article class="card metric"><strong>${messages}</strong><span class="muted">Mensajes</span></article>
    <article class="card metric"><strong>${rating.toFixed(1)}</strong><span class="muted">Puntuación media</span></article>
  `;
}

function renderQuickActions(user) {
  const actions = user.role === "developer"
    ? [
        { label: "Ver proyectos", section: "Proyectos disponibles" },
        { label: "Abrir mensajes", section: "Mensajes" },
        { label: "Solicitudes", section: "Solicitudes" },
        { label: "Ajustes", section: "Configuración" },
      ]
    : [
        { label: "Crear proyecto", section: "Mis proyectos" },
        { label: "Buscar talento", section: "Buscar desarrolladores" },
        { label: "Solicitudes", section: "Solicitudes recibidas" },
        { label: "Ajustes", section: "Configuración" },
      ];

  el("#quickActions").innerHTML = `
    <h3>Accesos rápidos</h3>
    ${actions.map((item) => `<button class="btn ghost quick-action" data-go="${item.section}">${item.label}</button>`).join("")}
  `;

  document.querySelectorAll(".quick-action").forEach((button) => {
    button.addEventListener("click", () => {
      state.dashboardSection = button.dataset.go;
      renderDashboard();
    });
  });
}

function renderDeveloperProfile(user, db) {
  const reviews = db.reviews.filter((item) => item.toUserId === user.id).slice(0, 4);
  const portfolio = user.portfolio || [];

  return `
    <h3>Perfil del desarrollador</h3>
    <div class="row">
      <img class="avatar" src="${user.avatar}" alt="Foto de ${user.name}" />
      <div>
        <strong>${user.name}</strong>
        <div class="muted">${user.title || "Full Stack Developer"} · ${user.location || "Remoto"}</div>
      </div>
    </div>
    <p>${user.bio || "Añade una biografía en Configuración para mejorar conversiones."}</p>
    <p class="muted">Disponibilidad: ${user.availability || "-"} · Tarifa: €${user.rate || "-"}/h</p>
    <p class="muted">Contacto: ${user.contact?.phone || "sin teléfono"} · ${user.contact?.website || "sin web"}</p>
    <h4>Habilidades</h4>
    <div class="chips">${(user.skills || []).map((skill) => `<span class="chip">${skill}</span>`).join("")}</div>

    <h4>Portfolio</h4>
    <div class="gallery">
      ${portfolio.length
        ? portfolio
            .map((item, index) => `<button class="portfolio-item" type="button" data-portfolio="${index}"><img src="${item.image}" alt="Proyecto ${item.title}" /></button>`)
            .join("")
        : `<div class="empty-state"><p class="muted">Aún no tienes portfolio cargado.</p><button class="btn primary quick-go-config">Completar perfil</button></div>`}
    </div>

    <h4>Reseñas</h4>
    <div class="grid">
      ${reviews
        .map((review) => {
          const from = userById(review.fromUserId, db);
          return `<article class="card"><strong>${from?.name || "Usuario"}</strong><p class="rating">${buildStars(review.rating)}</p><p>${review.comment}</p></article>`;
        })
        .join("") || `<p class="muted">Sin reseñas todavía.</p>`}
    </div>

    <button class="btn primary" id="proposeCollabBtn">Proponer colaboración</button>
  `;
}

function renderCompanyProfile(user, db) {
  const projects = db.projects.filter((project) => project.companyId === user.id && project.status !== "Archivado");
  const hires = db.payments.filter((payment) => payment.companyId === user.id).length;
  const rating = averageRatingForUser(user.id, db) || user.rating || 0;

  return `
    <h3>Perfil de empresa</h3>
    <div class="row">
      <img class="avatar" src="${user.avatar}" alt="Logo de ${user.name}" />
      <div>
        <strong>${user.name}</strong>
        <div class="muted">${user.industry || "Tecnología"} · ${user.companySize || "-"} · ${user.location || "Remoto"}</div>
      </div>
    </div>
    <p>${user.bio || "Completa la descripción de la empresa desde Ajustes."}</p>
    <p class="muted">Contacto: ${user.contact?.phone || "sin teléfono"} · ${user.contact?.website || "sin web"}</p>

    <h4>Proyectos activos/publicados</h4>
    <div class="grid">
      ${projects.length
        ? projects
            .slice(0, 3)
            .map((project) => `<article class="project-card"><strong>${project.title}</strong><p>${project.description}</p><p class="muted">${project.status} · €${project.budget}</p></article>`)
            .join("")
        : `<div class="empty-state"><p class="muted">Aún no tienes proyectos.</p><button class="btn primary quick-go-projects">Crear proyecto</button></div>`}
    </div>

    <h4>Estadísticas</h4>
    <p class="muted">Puntuación media: ${rating.toFixed(1)} · Contrataciones: ${hires}</p>
  `;
}

function renderRequests(user, db) {
  const tabs = ["Enviadas", "Recibidas", "Pendientes", "Aceptadas", "Rechazadas"];
  const requests = db.requests.filter((request) => request.fromUserId === user.id || request.toUserId === user.id);

  const filtered = requests.filter((request) => {
    if (state.requestFilter === "Pendientes") return request.status === "Pendientes";
    if (state.requestFilter === "Aceptadas") return request.status === "Aceptadas";
    if (state.requestFilter === "Rechazadas") return request.status === "Rechazadas";
    if (state.requestFilter === "Enviadas") return request.fromUserId === user.id && request.status === "Pendientes";
    if (state.requestFilter === "Recibidas") return request.toUserId === user.id && request.status === "Pendientes";
    return true;
  });

  return `
    <h3>Solicitudes</h3>
    <div class="request-tabs">
      ${tabs.map((tab) => `<button class="btn ghost request-tab ${state.requestFilter === tab ? "active" : ""}" data-tab="${tab}">${tab}</button>`).join("")}
    </div>

    <div class="grid">
      ${filtered.length
        ? filtered
            .map((request) => {
              const project = projectById(request.projectId, db);
              const otherId = request.fromUserId === user.id ? request.toUserId : request.fromUserId;
              const other = userById(otherId, db);
              return `
                <article class="request-card">
                  <strong>${other?.name || "Usuario"}</strong>
                  <p class="muted">Proyecto: ${project?.title || "Sin proyecto"}</p>
                  <p>${request.message}</p>
                  <p><span class="chip">${request.status}</span></p>
                  <div class="actions-row">
                    <button class="btn primary accept-request" data-request="${request.id}">Aceptar</button>
                    <button class="btn ghost reject-request" data-request="${request.id}">Rechazar</button>
                    <button class="btn ghost more-info-request" data-request="${request.id}">Pedir más info</button>
                  </div>
                </article>
              `;
            })
            .join("")
        : `<div class="empty-state"><p class="muted">No hay solicitudes en esta categoría.</p><button class="btn primary quick-go-projects">Ir a proyectos</button></div>`}
    </div>
  `;
}

function renderSearchPanel(user, db) {
  if (user.role !== "company") return `<p class="muted">Panel exclusivo para empresas.</p>`;

  const developers = db.users.filter((candidate) => candidate.role === "developer" && candidate.accountStatus === "active");
  const start = (state.talentPage - 1) * PAGE_SIZE_TALENT;
  const pageData = developers.slice(start, start + PAGE_SIZE_TALENT);
  const totalPages = Math.max(1, Math.ceil(developers.length / PAGE_SIZE_TALENT));

  return `
    <h3>Buscar desarrolladores</h3>
    <form class="grid cols-4" id="companySearchForm">
      <div class="field"><label>ID de usuario</label><input name="developerId" type="number" min="1" placeholder="Ej: 12" /></div>
      <div class="field"><label>Skill</label><input name="skill" placeholder="javascript" /></div>
      <div class="field"><label>Rating mínimo</label><input name="minRating" type="number" min="1" max="5" /></div>
      <div class="field"><label>Experiencia mínima</label><input name="minExperience" type="number" min="0" /></div>
      <div class="field"><label>Tarifa máx €/h</label><input name="maxRate" type="number" min="0" /></div>
      <div class="field"><label>Disponibilidad</label><select name="availability"><option value="">Todas</option><option value="freelance">Freelance</option><option value="full-time">Full-time</option><option value="part-time">Part-time</option></select></div>
      <div class="field"><label>Ubicación</label><input name="location" placeholder="Madrid" /></div>
      <div class="field"><label>&nbsp;</label><button class="btn primary" type="submit">Buscar</button></div>
    </form>

    <div id="companySearchResults" class="grid">
      ${pageData
        .map(
          (dev) => `
          <article class="profile-card">
            <strong>${dev.name}</strong>
            <p class="muted">${dev.title || "Developer"} · ${dev.experience || 0} años · ${dev.location || "-"}</p>
            <p class="muted">Tarifa: €${dev.rate || "-"}/h · ${dev.availability || "-"}</p>
            <div class="chips">${(dev.skills || []).map((skill) => `<span class="chip">${skill}</span>`).join("")}</div>
            <button class="btn ghost propose-btn" data-dev="${dev.id}">Proponer colaboración</button>
          </article>
        `
        )
        .join("")}
    </div>

    <div class="pagination">
      <button class="btn ghost page-talent" data-step="-1" ${state.talentPage <= 1 ? "disabled" : ""}>Anterior</button>
      <span class="muted">Página ${state.talentPage} de ${totalPages}</span>
      <button class="btn ghost page-talent" data-step="1" ${state.talentPage >= totalPages ? "disabled" : ""}>Siguiente</button>
    </div>
  `;
}

function renderDeveloperPortfolio(user) {
  const projects = user.devProjects || [];

  return `
    <h3>Portfolio tipo proyectos</h3>
    <p class="muted">Crea proyectos como repositorios y adjunta archivos locales para presentarlos.</p>

    <form id="devRepoForm" class="grid cols-3">
      <input name="name" placeholder="Nombre del proyecto" required />
      <input name="repoUrl" placeholder="URL repositorio (opcional)" />
      <input name="tags" placeholder="tags: react,sql,api" />
      <textarea name="description" placeholder="Descripción del proyecto" required></textarea>
      <input name="files" type="file" multiple />
      <button class="btn primary" type="submit">Crear proyecto portfolio</button>
    </form>

    <div class="grid">
      ${projects.length
        ? projects
            .map(
              (project) => `
            <article class="project-card">
              <strong>${project.name}</strong>
              <p>${project.description}</p>
              <p class="muted">${project.repoUrl ? `<a href="${project.repoUrl}" target="_blank" rel="noopener">Repositorio</a>` : "Sin repositorio enlazado"}</p>
              <div class="chips">${(project.tags || []).map((tag) => `<span class="chip">${tag}</span>`).join("")}</div>
              <div class="chips">${(project.files || []).map((file) => `<span class="chip">${file.name}</span>`).join("") || "<span class='muted'>Sin archivos</span>"}</div>
              ${(project.files || [])
                .filter((file) => file.preview)
                .slice(0, 3)
                .map((file) => `<img src="${file.preview}" alt="${file.name}" style="max-width:120px;border-radius:10px;border:1px solid #dce4ff;margin-right:6px;" />`)
                .join("")}
            </article>
          `
            )
            .join("")
        : `<div class="empty-state"><p class="muted">No has creado proyectos portfolio todavía.</p></div>`}
    </div>
  `;
}

function renderProjectsPanel(user, db) {
  const statuses = ["Todos", "Borrador", "Publicado", "En curso", "Cerrado", "Archivado"];
  const baseProjects = user.role === "company"
    ? db.projects.filter((project) => project.companyId === user.id)
    : db.projects.filter((project) => ["Publicado", "En curso"].includes(project.status));

  const filtered = state.projectFilter === "Todos"
    ? baseProjects
    : baseProjects.filter((project) => project.status === state.projectFilter);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE_PROJECTS));
  state.projectPage = Math.min(state.projectPage, totalPages);
  const start = (state.projectPage - 1) * PAGE_SIZE_PROJECTS;
  const pageData = filtered.slice(start, start + PAGE_SIZE_PROJECTS);

  return `
    <h3>${user.role === "company" ? "Mis proyectos" : "Proyectos disponibles"}</h3>

    <div class="request-tabs">
      ${statuses.map((status) => `<button class="btn ghost project-status ${state.projectFilter === status ? "active" : ""}" data-status="${status}">${status}</button>`).join("")}
    </div>

    ${
      user.role === "company"
        ? `
        <form id="createProjectForm" class="grid cols-3">
          <input name="title" placeholder="Título" required />
          <input name="budget" type="number" min="100" placeholder="Presupuesto" required />
          <input name="modality" placeholder="remoto/presencial/hibrido" required />
          <textarea name="description" placeholder="Descripción" required></textarea>
          <input name="technologies" placeholder="javascript,react,sql" required />
          <input name="type" placeholder="Tipo de proyecto" required />
          <button class="btn primary" type="submit">Crear proyecto</button>
        </form>
      `
        : ""
    }

    <div class="grid">
      ${pageData.length
        ? pageData
            .map((project) => {
              const recommendations = getRecommendationsForProject(project, db);
              return `
                <article class="project-card">
                  <strong>${project.title}</strong>
                  <p>${project.description}</p>
                  <p><strong>€${project.budget}</strong> · ${project.modality} · <span class="chip">${project.status}</span></p>
                  <div class="chips">${project.technologies.map((tech) => `<span class="chip">${tech}</span>`).join("")}</div>

                  ${
                    user.role === "developer"
                      ? `<button class="btn primary apply-project" data-project="${project.id}">Aplicar</button>`
                      : `<div class="actions-row">
                          <button class="btn ghost show-match" data-project="${project.id}">Ver matches (${recommendations.length})</button>
                          <button class="btn ghost change-status" data-project="${project.id}" data-next="Publicado">Publicar</button>
                          <button class="btn ghost change-status" data-project="${project.id}" data-next="En curso">Pausar/En curso</button>
                          <button class="btn ghost change-status" data-project="${project.id}" data-next="Cerrado">Cerrar</button>
                          <button class="btn ghost change-status" data-project="${project.id}" data-next="Archivado">Archivar</button>
                          <button class="btn primary register-payment" data-project="${project.id}">Registrar pago</button>
                          <button class="btn ghost show-project-detail" data-project="${project.id}">Ver detalles</button>
                        </div>`
                  }
                </article>
              `;
            })
            .join("")
        : `<div class="empty-state"><p class="muted">No hay proyectos en este estado.</p><button class="btn primary reset-project-filters">Ver todos</button></div>`}
    </div>

    <div class="pagination">
      <button class="btn ghost page-project" data-step="-1" ${state.projectPage <= 1 ? "disabled" : ""}>Anterior</button>
      <span class="muted">Página ${state.projectPage} de ${totalPages}</span>
      <button class="btn ghost page-project" data-step="1" ${state.projectPage >= totalPages ? "disabled" : ""}>Siguiente</button>
    </div>
  `;
}

function renderRatingsPanel(user, db) {
  const reviews = db.reviews.filter((review) => review.toUserId === user.id || review.fromUserId === user.id);
  const toMe = db.reviews.filter((review) => review.toUserId === user.id);
  const avg = toMe.length ? toMe.reduce((sum, item) => sum + Number(item.rating), 0) / toMe.length : 0;

  return `
    <h3>Valoraciones y reputación</h3>
    <p class="muted">Puntuación media actual: <strong>${avg.toFixed(1)}</strong></p>

    <form id="newReviewForm" class="grid cols-3">
      <input type="number" name="toUserId" min="1" placeholder="ID usuario evaluado" required />
      <input type="number" name="rating" min="1" max="5" placeholder="Puntuación (1-5)" required />
      <input name="comment" placeholder="Comentario" required />
      <button class="btn primary" type="submit">Guardar valoración</button>
    </form>

    <div class="grid">
      ${reviews.length
        ? reviews
            .map((review) => {
              const from = userById(review.fromUserId, db);
              const to = userById(review.toUserId, db);
              return `<article class="card"><p><strong>${from?.name || "Usuario"}</strong> → <strong>${to?.name || "Usuario"}</strong></p><p class="rating">${buildStars(review.rating)} (${review.rating})</p><p>${review.comment}</p></article>`;
            })
            .join("")
        : `<p class="muted">No hay valoraciones aún.</p>`}
    </div>
  `;
}

function getConversationUnreadCount(currentUserId, contactId, db) {
  return db.messages.filter((message) => message.fromUserId === contactId && message.toUserId === currentUserId && !message.read).length;
}

function renderChatPanel(user, db) {
  const contacts = db.users.filter((candidate) => candidate.id !== user.id && candidate.accountStatus === "active");
  if (!state.chatContactId && contacts.length) state.chatContactId = contacts[0].id;

  const selected = userById(state.chatContactId, db);
  const conversation = db.messages.filter(
    (message) =>
      (message.fromUserId === user.id && message.toUserId === state.chatContactId) ||
      (message.fromUserId === state.chatContactId && message.toUserId === user.id)
  );

  conversation.forEach((message) => {
    if (message.toUserId === user.id) {
      message.read = true;
    }
  });
  setDB(db);

  return `
    <h3>Mensajería interna</h3>
    <div class="chat">
      <div class="chat-list">
        ${contacts
          .map((contact) => {
            const unread = getConversationUnreadCount(user.id, contact.id, db);
            return `
              <button class="message-preview ${state.chatContactId === contact.id ? "active" : ""}" type="button" data-contact="${contact.id}">
                <div class="row">
                  <img class="avatar" src="${contact.avatar}" alt="Avatar de ${contact.name}" />
                  <div>
                    <strong>${contact.name}</strong>
                    <div class="muted">${contact.role === "developer" ? contact.title || "Developer" : contact.industry || "Empresa"}</div>
                  </div>
                  ${unread ? `<span class="count-badge">${unread}</span>` : ""}
                </div>
              </button>
            `;
          })
          .join("")}
      </div>

      <div class="chat-view">
        <div class="card">
          <strong>${selected ? selected.name : "Selecciona contacto"}</strong>
          <div class="chat-messages">
            ${conversation.length
              ? conversation
                  .map(
                    (message) => `
                  <div class="bubble ${message.fromUserId === user.id ? "me" : "other"}">
                    ${message.text}
                    ${message.attachments?.length ? `<div class="muted">Adjunto: ${message.attachments[0]}</div>` : ""}
                  </div>
                `
                  )
                  .join("")
              : `<p class="muted">Sin mensajes. Inicia la conversación.</p>`}
          </div>
        </div>

        <form class="chat-form" id="chatForm">
          <input name="text" placeholder="Escribe un mensaje" required />
          <input name="attachment" placeholder="Enlace adjunto (opcional)" />
          <button class="btn primary" type="submit">Enviar</button>
        </form>
      </div>
    </div>
  `;
}

function renderNotificationsPanel(user, db) {
  const notifications = db.notifications.filter((item) => item.userId === user.id);

  return `
    <h3>Centro de notificaciones</h3>
    <div class="actions-row"><button class="btn ghost" id="markNotificationsRead">Marcar todo como leído</button></div>
    <div class="grid">
      ${notifications.length
        ? notifications
            .map(
              (item) => `
              <article class="card ${item.read ? "" : "notif-unread"}">
                <p><strong>${item.title}</strong></p>
                <p>${item.description}</p>
                <p class="muted">${new Date(item.createdAt).toLocaleString()}</p>
                <p class="muted">Estado: ${item.read ? "Leída" : "No leída"}</p>
              </article>
            `
            )
            .join("")
        : `<div class="empty-state"><p class="muted">No hay notificaciones.</p></div>`}
    </div>
  `;
}

function renderSettingsPanel(user) {
  const methods = user.paymentMethods || [];

  return `
    <h3>Ajustes de cuenta</h3>

    <form id="profileForm" class="grid cols-2">
      <div class="field"><label>Nombre</label><input name="name" value="${user.name}" required /></div>
      <div class="field"><label>Ubicación</label><input name="location" value="${user.location || ""}" /></div>
      <div class="field"><label>Biografía</label><textarea name="bio">${user.bio || ""}</textarea></div>
      <div class="field"><label>Avatar (URL)</label><input name="avatar" value="${user.avatar || ""}" /></div>
      <div class="field"><label>Teléfono</label><input name="phone" value="${user.contact?.phone || ""}" /></div>
      <div class="field"><label>Web</label><input name="website" value="${user.contact?.website || ""}" /></div>
      <div class="field"><label>LinkedIn</label><input name="linkedin" value="${user.contact?.linkedin || ""}" /></div>
      <div class="field"><label>Telegram</label><input name="telegram" value="${user.contact?.telegram || ""}" /></div>
      ${
        user.role === "developer"
          ? `
            <div class="field"><label>Tarifa €/h</label><input type="number" name="rate" min="0" value="${user.rate || 0}" /></div>
            <div class="field"><label>Disponibilidad</label><select name="availability"><option value="freelance" ${user.availability === "freelance" ? "selected" : ""}>Freelance</option><option value="full-time" ${user.availability === "full-time" ? "selected" : ""}>Full-time</option><option value="part-time" ${user.availability === "part-time" ? "selected" : ""}>Part-time</option></select></div>
          `
          : `
            <div class="field"><label>Sector</label><input name="industry" value="${user.industry || ""}" /></div>
            <div class="field"><label>Tamaño</label><input name="companySize" value="${user.companySize || ""}" /></div>
          `
      }
      <button class="btn primary" type="submit">Guardar perfil</button>
    </form>

    <article class="card">
      <h4>Restablecer contraseña</h4>
      <form id="resetPasswordForm" class="grid cols-3">
        <input type="password" name="currentPassword" placeholder="Contraseña actual" required />
        <input type="password" name="newPassword" placeholder="Nueva contraseña" minlength="6" required />
        <input type="password" name="confirmNewPassword" placeholder="Repetir nueva contraseña" minlength="6" required />
        <button class="btn ghost" type="submit">Actualizar contraseña</button>
      </form>
    </article>

    <article class="card">
      <h4>Preferencias de notificación</h4>
      <form id="preferencesForm" class="grid cols-3">
        <label><input type="checkbox" name="newMatch" ${user.preferences?.newMatch ? "checked" : ""} /> Nuevos matches</label>
        <label><input type="checkbox" name="newMessage" ${user.preferences?.newMessage ? "checked" : ""} /> Nuevos mensajes</label>
        <label><input type="checkbox" name="email" ${user.preferences?.email ? "checked" : ""} /> Email</label>
        <button class="btn ghost" type="submit">Guardar preferencias</button>
      </form>
    </article>

    ${
      user.role === "company"
        ? `
          <article class="card">
            <h4>Métodos de pago</h4>
            <div class="grid">
              ${methods.length
                ? methods.map((method) => `<p>💳 ${method.brand} **** ${method.last4} · exp ${method.exp} · ${method.status}</p>`).join("")
                : `<p class="muted">No hay métodos de pago.</p>`}
            </div>
            <form id="paymentMethodForm" class="grid cols-3">
              <input name="brand" placeholder="Marca (Visa/Mastercard)" required />
              <input name="last4" placeholder="Últimos 4 dígitos" minlength="4" maxlength="4" required />
              <input name="exp" placeholder="MM/AA" required />
              <button class="btn primary" type="submit">Añadir método</button>
            </form>
          </article>
        `
        : `
          <article class="card">
            <h4>Privacidad</h4>
            <form id="privacyForm" class="grid cols-2">
              <label><input type="radio" name="visibility" value="public" ${user.visibility !== "private" ? "checked" : ""} /> Perfil público</label>
              <label><input type="radio" name="visibility" value="private" ${user.visibility === "private" ? "checked" : ""} /> Perfil privado</label>
              <button class="btn ghost" type="submit">Guardar privacidad</button>
            </form>
          </article>
        `
    }

    <article class="card">
      <h4>Eliminar cuenta</h4>
      <p class="muted">La cuenta se marcará como inactiva (soft delete).</p>
      <button class="btn danger" id="deleteAccountBtn">Eliminar cuenta</button>
    </article>
  `;
}

function renderDashboardPanel(user, db) {
  const section = state.dashboardSection;

  if (section === "Inicio") return user.role === "developer" ? renderDeveloperProfile(user, db) : renderCompanyProfile(user, db);
  if (section === "Proyectos disponibles" || section === "Mis proyectos") return renderProjectsPanel(user, db);
  if (section === "Buscar desarrolladores") return renderSearchPanel(user, db);
  if (section === "Mensajes") return renderChatPanel(user, db);
  if (section === "Solicitudes" || section === "Solicitudes recibidas") return renderRequests(user, db);
  if (section === "Portfolio") return renderDeveloperPortfolio(user, db);
  if (section === "Valoraciones") return renderRatingsPanel(user, db);
  if (section === "Notificaciones") return renderNotificationsPanel(user, db);
  if (section === "Configuración") return renderSettingsPanel(user);

  return `<p class="muted">Selecciona una sección.</p>`;
}

function registerDashboardEvents(user, db) {
  const profileForm = el("#profileForm");
  if (profileForm) {
    profileForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.target).entries());
      const me = userById(user.id, db);
      me.name = payload.name.trim();
      me.location = payload.location.trim();
      me.bio = payload.bio.trim();
      me.avatar = payload.avatar.trim() || me.avatar;
      me.contact = {
        phone: payload.phone || "",
        website: payload.website || "",
        linkedin: payload.linkedin || "",
        telegram: payload.telegram || "",
      };
      if (me.role === "developer") {
        me.rate = Number(payload.rate || 0);
        me.availability = payload.availability;
      } else {
        me.industry = payload.industry || me.industry;
        me.companySize = payload.companySize || me.companySize;
      }
      setDB(db);
      setSession({ id: me.id, role: me.role, name: me.name });
      refreshAuthControls();
      renderHome();
      renderExplore();
      renderDashboard();
      showAlert("Perfil actualizado");
    });
  }

  const preferencesForm = el("#preferencesForm");
  if (preferencesForm) {
    preferencesForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      const me = userById(user.id, db);
      me.preferences = {
        newMatch: data.has("newMatch"),
        newMessage: data.has("newMessage"),
        email: data.has("email"),
      };
      setDB(db);
      showAlert("Preferencias guardadas");
    });
  }

  const privacyForm = el("#privacyForm");
  if (privacyForm) {
    privacyForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.target).entries());
      const me = userById(user.id, db);
      me.visibility = payload.visibility;
      setDB(db);
      showAlert("Privacidad actualizada");
    });
  }

  const paymentMethodForm = el("#paymentMethodForm");
  if (paymentMethodForm) {
    paymentMethodForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.target).entries());
      if (!/^\d{4}$/.test(payload.last4)) {
        showAlert("Los últimos 4 dígitos no son válidos", true);
        return;
      }

      const me = userById(user.id, db);
      me.paymentMethods = me.paymentMethods || [];
      me.paymentMethods.push({
        id: uid(me.paymentMethods),
        brand: payload.brand,
        last4: payload.last4,
        exp: payload.exp,
        status: "Activa",
      });
      setDB(db);
      renderDashboard();
      showAlert("Método de pago añadido");
    });
  }

  const deleteAccountBtn = el("#deleteAccountBtn");
  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener("click", () => {
      const confirm1 = confirm("¿Seguro que quieres eliminar tu cuenta?");
      if (!confirm1) return;
      const confirm2 = confirm("Esta acción desactivará tu cuenta. ¿Confirmas?");
      if (!confirm2) return;

      const me = userById(user.id, db);
      me.accountStatus = "inactive";
      setDB(db);
      clearSession();
      refreshAuthControls();
      switchView("home");
      showAlert("Cuenta desactivada", true);
    });
  }

  const createProjectForm = el("#createProjectForm");
  if (createProjectForm) {
    createProjectForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.target).entries());
      const project = {
        id: uid(db.projects),
        companyId: user.id,
        company: user.name,
        title: payload.title,
        description: payload.description,
        budget: Number(payload.budget),
        technologies: String(payload.technologies).split(",").map((item) => item.trim().toLowerCase()).filter(Boolean),
        modality: payload.modality.toLowerCase(),
        type: payload.type,
        deadline: "2026-07-15",
        status: "Borrador",
        createdAt: now(),
      };
      db.projects.unshift(project);
      setDB(db);
      state.projectFilter = "Todos";
      state.projectPage = 1;
      renderHome();
      renderExplore();
      renderDashboard();
      showAlert("Proyecto creado en estado Borrador");
    });
  }

  const resetPasswordForm = el("#resetPasswordForm");
  if (resetPasswordForm) {
    resetPasswordForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.target).entries());
      const me = userById(user.id, db);

      if (payload.currentPassword !== me.password) {
        showAlert("La contraseña actual no es correcta", true);
        return;
      }

      if (!payload.newPassword || payload.newPassword.length < 6) {
        showAlert("La nueva contraseña debe tener al menos 6 caracteres", true);
        return;
      }

      if (payload.newPassword !== payload.confirmNewPassword) {
        showAlert("Las nuevas contraseñas no coinciden", true);
        return;
      }

      me.password = payload.newPassword;
      setDB(db);
      event.target.reset();
      showAlert("Contraseña actualizada correctamente");
    });
  }

  document.querySelectorAll(".project-status").forEach((button) => {
    button.addEventListener("click", () => {
      state.projectFilter = button.dataset.status;
      state.projectPage = 1;
      renderDashboard();
    });
  });

  document.querySelectorAll(".page-project").forEach((button) => {
    button.addEventListener("click", () => {
      state.projectPage += Number(button.dataset.step);
      renderDashboard();
    });
  });

  document.querySelectorAll(".reset-project-filters").forEach((button) => {
    button.addEventListener("click", () => {
      state.projectFilter = "Todos";
      state.projectPage = 1;
      renderDashboard();
    });
  });

  document.querySelectorAll(".change-status").forEach((button) => {
    button.addEventListener("click", () => {
      const project = projectById(button.dataset.project, db);
      if (!project) return;
      project.status = button.dataset.next;
      setDB(db);
      renderHome();
      renderExplore();
      renderDashboard();
      showAlert(`Estado actualizado a ${project.status}`);
    });
  });

  document.querySelectorAll(".show-match").forEach((button) => {
    button.addEventListener("click", () => {
      const project = projectById(button.dataset.project, db);
      if (!project) return;
      const recommendations = getRecommendationsForProject(project, db);
      if (!recommendations.length) {
        showAlert("No se encontraron matches", true);
        return;
      }

      const top = recommendations[0];
      db.matches.unshift({
        id: uid(db.matches),
        projectId: project.id,
        developerId: top.developer.id,
        score: top.score,
        createdAt: now(),
      });

      createNotification(db, user.id, "match", "Nuevo match sugerido", `${top.developer.name} coincide con ${project.title}.`);
      createNotification(db, top.developer.id, "match", "Nueva oportunidad detectada", `${project.company} publicó ${project.title}.`);
      setDB(db);

      el("#matchBadge").classList.remove("hidden");
      refreshAuthControls();
      showAlert(`Match: ${top.developer.name} (score ${top.score})`);
    });
  });

  document.querySelectorAll(".register-payment").forEach((button) => {
    button.addEventListener("click", () => {
      const amountText = prompt("Importe a registrar (€):", "1000");
      if (!amountText) return;
      const amount = Number(amountText);
      if (!amount || amount <= 0) {
        showAlert("Importe inválido", true);
        return;
      }
      const project = projectById(button.dataset.project, db);
      if (!project) return;

      const acceptedRequest = db.requests.find((request) => request.projectId === project.id && request.status === "Aceptadas");
      const developerId = acceptedRequest ? acceptedRequest.fromUserId : 1;

      db.payments.unshift({
        id: uid(db.payments),
        projectId: project.id,
        companyId: user.id,
        developerId,
        amount,
        status: "Pagado",
        createdAt: now(),
      });

      createNotification(db, developerId, "payment", "Pago registrado", `${project.company} registró un pago de €${amount}.`);
      setDB(db);
      refreshAuthControls();
      showAlert("Pago registrado");
      renderDashboard();
    });
  });

  document.querySelectorAll(".apply-project").forEach((button) => {
    button.addEventListener("click", () => {
      const project = projectById(button.dataset.project, db);
      if (!project) return;

      const exists = db.requests.some((request) => request.projectId === project.id && request.fromUserId === user.id);
      if (exists) {
        showAlert("Ya aplicaste a este proyecto", true);
        return;
      }

      db.requests.unshift({
        id: uid(db.requests),
        projectId: project.id,
        fromUserId: user.id,
        toUserId: project.companyId,
        status: "Pendientes",
        message: `Aplicación a ${project.title}`,
      });

      createNotification(db, project.companyId, "request", "Nueva solicitud", `${user.name} aplicó a ${project.title}.`);
      setDB(db);
      refreshAuthControls();
      state.dashboardSection = "Solicitudes";
      renderDashboard();
      showAlert("Solicitud enviada");
    });
  });

  document.querySelectorAll(".request-tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.requestFilter = button.dataset.tab;
      renderDashboard();
    });
  });

  document.querySelectorAll(".accept-request").forEach((button) => {
    button.addEventListener("click", () => {
      const request = db.requests.find((item) => item.id === Number(button.dataset.request));
      if (!request) return;
      request.status = "Aceptadas";

      const project = projectById(request.projectId, db);
      if (project) {
        project.status = "En curso";
        db.matches.unshift({
          id: uid(db.matches),
          projectId: project.id,
          developerId: request.fromUserId,
          score: 5,
          createdAt: now(),
        });
      }

      createNotification(db, request.fromUserId, "match", "Tu solicitud fue aceptada", `Ya puedes conversar sobre ${project?.title || "el proyecto"}.`);
      createNotification(db, request.toUserId, "system", "Match activado", `Se activó un canal con ${userById(request.fromUserId, db)?.name || "talento"}.`);
      setDB(db);
      refreshAuthControls();
      renderDashboard();
      showAlert("Solicitud aceptada y match generado");
    });
  });

  document.querySelectorAll(".reject-request").forEach((button) => {
    button.addEventListener("click", () => {
      const request = db.requests.find((item) => item.id === Number(button.dataset.request));
      if (!request) return;
      request.status = "Rechazadas";
      createNotification(db, request.fromUserId, "request", "Solicitud rechazada", "Puedes aplicar a otros proyectos." );
      setDB(db);
      refreshAuthControls();
      renderDashboard();
      showAlert("Solicitud rechazada", true);
    });
  });

  document.querySelectorAll(".more-info-request").forEach((button) => {
    button.addEventListener("click", () => {
      const request = db.requests.find((item) => item.id === Number(button.dataset.request));
      if (!request) return;
      request.status = "Pendientes";
      request.message = `${request.message} · Se solicitó información adicional.`;
      createNotification(db, request.fromUserId, "request", "Se solicita más info", "Actualiza tu propuesta para continuar." );
      setDB(db);
      renderDashboard();
      showAlert("Se solicitó más información al candidato");
    });
  });

  const companySearchForm = el("#companySearchForm");
  if (companySearchForm) {
    companySearchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.target).entries());
      const wantedId = Number(payload.developerId || 0);

      const result = db.users
        .filter((candidate) => candidate.role === "developer" && candidate.accountStatus === "active")
        .filter((candidate) => {
          const passId = wantedId ? candidate.id === wantedId : true;
          const passSkill = payload.skill ? (candidate.skills || []).join(" ").toLowerCase().includes(payload.skill.toLowerCase()) : true;
          const passRating = payload.minRating ? (averageRatingForUser(candidate.id, db) || 0) >= Number(payload.minRating) : true;
          const passExperience = payload.minExperience ? Number(candidate.experience || 0) >= Number(payload.minExperience) : true;
          const passRate = payload.maxRate ? Number(candidate.rate || 0) <= Number(payload.maxRate) : true;
          const passAvailability = payload.availability ? candidate.availability === payload.availability : true;
          const passLocation = payload.location ? String(candidate.location || "").toLowerCase().includes(payload.location.toLowerCase()) : true;
          return passId && passSkill && passRating && passExperience && passRate && passAvailability && passLocation;
        });

      el("#companySearchResults").innerHTML = result.length
        ? result
            .map(
              (candidate) => `
              <article class="profile-card">
                <strong>${candidate.name}</strong>
                <p class="muted">${candidate.title || "Developer"} · ${candidate.experience || 0} años · €${candidate.rate || "-"}/h</p>
                <p class="muted">${candidate.location || "-"} · ${candidate.availability || "-"}</p>
                <div class="chips">${(candidate.skills || []).map((skill) => `<span class="chip">${skill}</span>`).join("")}</div>
                <button class="btn ghost propose-btn" data-dev="${candidate.id}">Proponer colaboración</button>
              </article>
            `
            )
            .join("")
        : `<div class="empty-state"><p class="muted">No hay resultados para esta búsqueda.</p></div>`;

      document.querySelectorAll(".propose-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const developerId = Number(button.dataset.dev);
          createNotification(db, developerId, "request", "Nueva propuesta de colaboración", `${user.name} te envió una propuesta directa.`);
          setDB(db);
          refreshAuthControls();
          showAlert("Propuesta enviada");
        });
      });
    });
  }

  document.querySelectorAll(".page-talent").forEach((button) => {
    button.addEventListener("click", () => {
      state.talentPage += Number(button.dataset.step);
      renderDashboard();
    });
  });

  document.querySelectorAll(".message-preview").forEach((button) => {
    button.addEventListener("click", () => {
      state.chatContactId = Number(button.dataset.contact);
      renderDashboard();
    });
  });

  const chatForm = el("#chatForm");
  if (chatForm) {
    chatForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!state.chatContactId) return;
      const payload = Object.fromEntries(new FormData(event.target).entries());

      db.messages.push({
        id: uid(db.messages),
        fromUserId: user.id,
        toUserId: state.chatContactId,
        text: payload.text,
        attachments: payload.attachment ? [payload.attachment] : [],
        read: false,
        createdAt: now(),
      });

      createNotification(db, state.chatContactId, "message", "Nuevo mensaje", `${user.name} te escribió.`);
      setDB(db);
      refreshAuthControls();
      event.target.reset();
      renderDashboard();
    });
  }

  const newReviewForm = el("#newReviewForm");
  if (newReviewForm) {
    newReviewForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.target).entries());
      const toUserId = Number(payload.toUserId);
      const rating = Number(payload.rating);
      if (rating < 1 || rating > 5) {
        showAlert("La puntuación debe estar entre 1 y 5", true);
        return;
      }
      if (!userById(toUserId, db)) {
        showAlert("Usuario evaluado no encontrado", true);
        return;
      }

      db.reviews.unshift({
        id: uid(db.reviews),
        fromUserId: user.id,
        toUserId,
        rating,
        comment: payload.comment,
      });

      createNotification(db, toUserId, "review", "Nueva valoración recibida", `${user.name} dejó una valoración.`);
      setDB(db);
      renderHome();
      renderExplore();
      renderDashboard();
      showAlert("Valoración guardada");
    });
  }

  const markNotificationsRead = el("#markNotificationsRead");
  if (markNotificationsRead) {
    markNotificationsRead.addEventListener("click", () => {
      db.notifications
        .filter((item) => item.userId === user.id)
        .forEach((item) => {
          item.read = true;
        });
      setDB(db);
      refreshAuthControls();
      renderDashboard();
      showAlert("Notificaciones marcadas como leídas");
    });
  }

  document.querySelectorAll(".show-project-detail").forEach((button) => {
    button.addEventListener("click", () => {
      const project = projectById(button.dataset.project, db);
      if (!project) return;
      openInfoModal(
        project.title,
        `<p>${project.description}</p>
         <p><strong>Estado:</strong> ${project.status}</p>
         <p><strong>Presupuesto:</strong> €${project.budget}</p>
         <p><strong>Modalidad:</strong> ${project.modality}</p>
         <p><strong>Tipo:</strong> ${project.type}</p>
         <div class="chips">${project.technologies.map((tech) => `<span class="chip">${tech}</span>`).join("")}</div>`
      );
    });
  });

  const devRepoForm = el("#devRepoForm");
  if (devRepoForm) {
    devRepoForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.target).entries());
      const me = userById(user.id, db);
      const filesInput = event.target.querySelector('input[name="files"]');
      const selectedFiles = Array.from(filesInput?.files || []);

      const attachments = [];
      for (const file of selectedFiles.slice(0, 8)) {
        let preview = "";
        if (file.type.startsWith("image/") && file.size <= 450000) {
          preview = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result || ""));
            reader.onerror = () => reject(new Error("No se pudo leer archivo"));
            reader.readAsDataURL(file);
          }).catch(() => "");
        }
        attachments.push({
          name: file.name,
          type: file.type,
          size: file.size,
          preview,
        });
      }

      me.devProjects = me.devProjects || [];
      me.devProjects.unshift({
        id: uid(me.devProjects),
        name: payload.name,
        description: payload.description,
        repoUrl: payload.repoUrl || "",
        tags: String(payload.tags || "").split(",").map((tag) => tag.trim().toLowerCase()).filter(Boolean),
        files: attachments,
        createdAt: now(),
      });

      setDB(db);
      event.target.reset();
      renderDashboard();
      showAlert("Proyecto de portfolio creado");
    });
  }

  document.querySelectorAll(".portfolio-item").forEach((button) => {
    button.addEventListener("click", () => {
      const me = userById(user.id, db);
      const item = me?.portfolio?.[Number(button.dataset.portfolio)];
      if (!item) return;
      openInfoModal(item.title, `<img src="${item.image}" alt="${item.title}" style="width:100%;border-radius:12px;margin-bottom:10px;" /><p>${item.description}</p>`);
    });
  });

  document.querySelectorAll(".quick-go-config").forEach((button) => {
    button.addEventListener("click", () => {
      state.dashboardSection = "Configuración";
      renderDashboard();
    });
  });

  document.querySelectorAll(".quick-go-projects").forEach((button) => {
    button.addEventListener("click", () => {
      state.dashboardSection = user.role === "company" ? "Mis proyectos" : "Proyectos disponibles";
      renderDashboard();
    });
  });

  const proposeCollabBtn = el("#proposeCollabBtn");
  if (proposeCollabBtn) {
    proposeCollabBtn.addEventListener("click", () => {
      showAlert("Propuesta enviada correctamente");
    });
  }
}

function renderDashboard() {
  const session = getSession();
  if (!session) return;

  const db = getDB();
  const user = userById(session.id, db);
  if (!user || user.accountStatus !== "active") {
    clearSession();
    refreshAuthControls();
    switchView("home");
    showAlert("Tu sesión ya no es válida", true);
    return;
  }

  const allowed = roleMenus[user.role] || [];
  if (!allowed.includes(state.dashboardSection)) {
    state.dashboardSection = "Inicio";
  }

  el("#dashboardTitle").textContent = `Hola, ${user.name}`;
  el("#dashboardSubtitle").textContent = user.role === "developer"
    ? "Gestiona tu perfil, solicitudes, mensajes y reputación."
    : "Publica proyectos, encuentra talento y supervisa contrataciones.";

  renderSidebar(user);
  renderMetrics(user, db);
  renderQuickActions(user);
  el("#dashboardPanel").innerHTML = renderDashboardPanel(user, db);

  const hasUnreadMatch = db.notifications.some((item) => item.userId === user.id && item.type === "match" && !item.read);
  el("#matchBadge").classList.toggle("hidden", !hasUnreadMatch);

  registerDashboardEvents(user, db);
}

function initGlobalEvents() {
  el("#logoutBtn").addEventListener("click", () => {
    clearSession();
    refreshAuthControls();
    state.dashboardSection = "Inicio";
    switchView("home");
    showAlert("Sesión cerrada");
  });

  el("#closeInfoModal").addEventListener("click", closeInfoModal);
  el("#infoModal").addEventListener("click", (event) => {
    if (event.target.id === "infoModal") closeInfoModal();
  });

  document.querySelectorAll("[data-info]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const key = link.dataset.info;
      if (key === "contacto") {
        openInfoModal("Contacto", `<p>Escríbenos a <strong>soporte@webhub.dev</strong> o usa el chat del dashboard.</p>`);
      }
      if (key === "terminos") {
        openInfoModal("Términos", `<p>Este prototipo muestra términos resumidos. Para producción, añade versión legal completa con aceptación explícita.</p>`);
      }
      if (key === "privacidad") {
        openInfoModal("Privacidad", `<p>Los datos se almacenan en localStorage en esta demo. En producción, aplica cifrado, consentimiento y políticas RGPD.</p>`);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAuthModal();
      closeInfoModal();
    }
  });

  el("#backToExploreBtn").addEventListener("click", () => {
    switchView("explore");
  });

  document.querySelectorAll(".open-auth").forEach((button) => {
    button.addEventListener("click", () => openAuthModal("login"));
  });
}

function boot() {
  initHeader();
  initAuth();
  initExploreEvents();
  createTechFilters();
  initGlobalEvents();
  renderHome();
  renderExplore();
  refreshAuthControls();

  const session = getSession();
  if (session) {
    switchView("dashboard");
  }
}

boot();
