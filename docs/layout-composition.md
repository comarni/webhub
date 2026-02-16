# Composición de layouts por dispositivo

## Desktop (>= 1100px)

- Header en 3 columnas: logo, buscador, navegación + CTAs.
- Home con hero en 2 columnas.
- Grids: 3 columnas para perfiles/steps, 2 columnas para proyectos.
- Dashboard en split: sidebar (270px) + contenido principal flexible.
- Chat en 2 paneles: contactos + conversación.

## Tablet (861px - 1099px)

- Header conserva buscador completo.
- Grids de filtros pasan de 4 a 2 columnas.
- Dashboard colapsa a 1 columna (sidebar arriba).
- Tarjetas mantienen densidad media y espaciado cómodo.

## Mobile (<= 860px)

- Header con menú burger y buscador en segunda fila.
- Navegación principal desplegable (`nav.open`).
- Hero, cards y grids en una sola columna.
- KPI cards en stack vertical.
- Chat en una sola columna (contactos arriba, chat abajo).
- Formularios simplificados con botones full-width.

## Principios aplicados

- Mobile-first en interacción táctil (targets grandes, spacing, feedback).
- Reuso de componentes en todos los breakpoints.
- Jerarquía visual consistente (títulos, métricas, CTAs).
- Transiciones suaves y no intrusivas.
