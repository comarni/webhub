PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('developer', 'company')),
  avatar_url TEXT DEFAULT '',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS developer_profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL UNIQUE,
  title TEXT,
  bio TEXT,
  location TEXT,
  experience_years INTEGER DEFAULT 0,
  cv_url TEXT,
  portfolio_summary TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS company_profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL UNIQUE,
  company_name TEXT NOT NULL,
  description TEXT,
  website TEXT,
  industry TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS user_skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  skill_id INTEGER NOT NULL,
  years_experience INTEGER DEFAULT 0,
  UNIQUE(user_id, skill_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS portfolio_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  project_url TEXT,
  image_url TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  budget REAL NOT NULL,
  deadline TEXT NOT NULL,
  technology_stack TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  developer_id INTEGER NOT NULL,
  cover_letter TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(project_id, developer_id),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (developer_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sender_id INTEGER NOT NULL,
  receiver_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  reviewer_id INTEGER NOT NULL,
  reviewed_user_id INTEGER NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (reviewed_user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  company_id INTEGER NOT NULL,
  developer_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (company_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (developer_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS password_resets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  used INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS match_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  developer_id INTEGER NOT NULL,
  score INTEGER NOT NULL,
  matched_keywords TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (developer_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT OR IGNORE INTO users (id, name, email, password_hash, role, avatar_url) VALUES
  (1, 'Ana Frontend', 'ana.dev@webhub.dev', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'developer', 'https://i.pravatar.cc/150?img=47'),
  (2, 'Carlos UX', 'carlos.design@webhub.dev', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'developer', 'https://i.pravatar.cc/150?img=12'),
  (3, 'Startup Nova', 'contacto@startupnova.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'company', 'https://i.pravatar.cc/150?img=68');

INSERT OR IGNORE INTO developer_profiles (user_id, title, bio, location, experience_years, cv_url, portfolio_summary) VALUES
  (1, 'Desarrolladora Frontend', 'Especialista en interfaces modernas y accesibles.', 'Madrid, ES', 4, 'https://example.com/cv-ana.pdf', 'E-commerce, dashboards y landing pages.'),
  (2, 'Diseñador UX/UI', 'Diseño centrado en usuario y prototipado en Figma.', 'Barcelona, ES', 6, 'https://example.com/cv-carlos.pdf', 'Diseño de productos SaaS para B2B.');

INSERT OR IGNORE INTO company_profiles (user_id, company_name, description, website, industry) VALUES
  (3, 'Startup Nova', 'Empresa enfocada en soluciones SaaS para logística.', 'https://startupnova.com', 'Logística');

INSERT OR IGNORE INTO skills (id, name) VALUES
  (1, 'html'),
  (2, 'css'),
  (3, 'javascript'),
  (4, 'ux'),
  (5, 'ui'),
  (6, 'figma'),
  (7, 'node.js'),
  (8, 'api rest');

INSERT OR IGNORE INTO user_skills (user_id, skill_id, years_experience) VALUES
  (1, 1, 4),
  (1, 2, 4),
  (1, 3, 4),
  (1, 7, 2),
  (1, 8, 2),
  (2, 4, 6),
  (2, 5, 6),
  (2, 6, 6),
  (2, 3, 3);

INSERT OR IGNORE INTO portfolio_items (user_id, title, description, project_url, image_url) VALUES
  (1, 'Tienda Online Moda', 'Frontend completo para tienda online con carrito.', 'https://example.com/shop', 'https://images.unsplash.com/photo-1557821552-17105176677c'),
  (2, 'Rediseño App SaaS', 'Rediseño UX/UI para plataforma de analítica.', 'https://example.com/saas-ui', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f');

INSERT OR IGNORE INTO projects (id, company_id, title, description, budget, deadline, technology_stack, status) VALUES
  (1, 3, 'Portal de clientes B2B', 'Necesitamos desarrollar un portal web para clientes con panel y reportes.', 3500, '2026-04-15', 'javascript, node.js, api rest, ux', 'open'),
  (2, 3, 'Landing de producto', 'Buscamos diseño y maquetación responsive para campaña de lanzamiento.', 1200, '2026-03-20', 'html, css, ui, figma', 'open');

INSERT OR IGNORE INTO applications (project_id, developer_id, cover_letter, status) VALUES
  (1, 1, 'Puedo cubrir frontend + integración API.', 'pending'),
  (2, 2, 'Tengo experiencia en landings de conversión.', 'pending');

INSERT OR IGNORE INTO reviews (project_id, reviewer_id, reviewed_user_id, rating, comment) VALUES
  (1, 3, 1, 5, 'Excelente comunicación y entregables claros.'),
  (2, 3, 2, 4, 'Gran nivel de diseño y atención al detalle.');

INSERT OR IGNORE INTO payments (project_id, company_id, developer_id, amount, status) VALUES
  (1, 3, 1, 1500, 'paid');
