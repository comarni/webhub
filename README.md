# WebHub

Plataforma web para conectar **empresas** con **desarrolladores/diseñadores web**.

## Stack

- Frontend: HTML5, CSS3, JavaScript (ES6+) puro.
- Backend: Node.js + Express (API REST).
- Base de datos: SQLite (SQL).
- Automatizaciones: n8n (webhooks).

## Estructura

```text
/src
  /frontend
    /html
      index.html
    /css
      styles.css
    /js
      api.js
      auth.js
      explore.js
      dashboard.js
      app.js
  /backend
    server.js
    /routes
    /controllers
    /models
    /middleware
    /config
    /services
  /database
    schema.sql
/automations
  new-project-email.json
  match-found-email.json
  activity-stats.json
package.json
.env.example
README.md
```

## Funcionalidades incluidas

- Registro y login con roles (`developer`, `company`).
- Recuperación de contraseña (token demo).
- Dashboard por rol.
- Publicación, edición y aplicación a proyectos.
- Búsqueda de desarrolladores por skill/rating/experiencia.
- Matching automático por palabras clave.
- Mensajería interna.
- Valoraciones bidireccionales.
- Registro de pagos.
- Vista pública de exploración (sin login).
- Hooks de automatización n8n.

## Prototipo UI/UX (modo estático)

- Entrada visual principal sin servidor: `webhub.html`
- Entregables de diseño:
  - `docs/wireframes.md`
  - `docs/prototype-flows.md`
  - `docs/style-guide.md`
  - `docs/layout-composition.md`

Para revisar solo la interfaz (sin backend), abre directamente `webhub.html` en el navegador.

## Instalación

1. Instala dependencias:

```bash
npm install
```

2. Crea archivo de entorno:

```bash
copy .env.example .env
```

3. Edita `.env`:

- `JWT_SECRET`: clave segura.
- `PORT`: puerto backend (default `4000`).
- `DB_PATH`: ruta del SQLite (`./src/database/webhub.db`).
- `N8N_WEBHOOK_NEW_PROJECT`, `N8N_WEBHOOK_MATCH_FOUND`, `N8N_WEBHOOK_ACTIVITY`: URLs de webhooks de n8n.

4. Ejecuta:

```bash
npm run dev
```

5. Abre en navegador:

- `http://localhost:4000` (frontend + API en mismo servidor)

## Configuración de base de datos SQL

- El backend ejecuta automáticamente `src/database/schema.sql` al iniciar.
- Incluye tablas y datos demo:
  - `users`
  - `developer_profiles`
  - `company_profiles`
  - `skills`
  - `user_skills`
  - `portfolio_items`
  - `projects`
  - `applications`
  - `messages`
  - `reviews`
  - `payments`
  - `password_resets`
  - `match_stats`

## Endpoints API REST principales

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/projects`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `POST /api/projects/:id/apply`
- `GET /api/projects/mine`
- `GET /api/developers/search`
- `GET /api/developers/featured`
- `POST /api/messages`
- `GET /api/messages/conversations/:otherUserId`
- `POST /api/reviews`
- `GET /api/reviews/user/:userId`
- `POST /api/payments`
- `GET /api/payments/project/:projectId`
- `GET /api/match/project/:projectId/recommendations`
- `GET /api/explore`

## Conectar flujos n8n

1. Importa los JSON de `/automations` en n8n.
2. Activa cada workflow.
3. Copia las URLs Webhook de producción en `.env`:
   - `N8N_WEBHOOK_NEW_PROJECT`
   - `N8N_WEBHOOK_MATCH_FOUND`
   - `N8N_WEBHOOK_ACTIVITY`
4. Reinicia backend.

## Despliegue

### Opción A: servidor propio (recomendado para app completa)

1. Despliega Node.js backend (Render, Railway, VPS, etc.).
2. Configura variables `.env` en el entorno.
3. Usa almacenamiento persistente para SQLite o cambia a MySQL/PostgreSQL.

### Opción B: GitHub Pages (solo frontend)

GitHub Pages no ejecuta backend Node.js, por lo que:

1. Publica `/src/frontend` como sitio estático.
2. En `src/frontend/js/api.js`, actualiza `API_BASE` a la URL pública del backend desplegado.
3. Sube el backend a un proveedor separado (Render/Railway/VPS).

## Próximos pasos recomendados

- Migrar SQLite a PostgreSQL para producción.
- Añadir subida real de CV/portfolio (S3/Cloudinary).
- Integrar pasarela de pagos real (Stripe/PayPal).
- Añadir tests de API e integración.
