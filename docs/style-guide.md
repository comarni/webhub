# Guía de estilo UI

## Paleta

- Fondo: `#f4f7ff`
- Superficie principal: `#ffffff`
- Texto principal: `#141b34`
- Texto secundario: `#64748b`
- Borde: `#dce4ff`
- Primario azul: `#355cff`
- Acento violeta: `#7a4dff`
- Éxito: `#10b981`
- Error: `#ef4444`

## Tipografía

- Fuente base: **Inter**
- Pesos: 400 / 500 / 600 / 700 / 800
- Escala:
  - H1: 2rem–3rem fluido
  - H2: 1.5rem
  - Body: 0.95rem–1rem
  - Caption: 0.8rem–0.9rem

## Componentes reutilizables

- Botones:
  - `btn primary`
  - `btn ghost`
  - `btn danger`
- Tarjetas: `card`, `profile-card`, `project-card`, `request-card`
- Navegación: `nav-link`, `side-item`
- Chips: `chip`
- Formularios: `field`, `error`
- Feedback: `alert`, `match-badge`
- Layout: `grid`, `cols-2/3/4`, `container`

## Interacciones

- Hover sutil en tarjetas y botones (`transform + shadow`).
- Transiciones en navegación y paneles.
- Feedback inmediato con `alerts`.
- Badge animado para nuevos matches.

## Accesibilidad

- Contraste alto entre texto y fondos.
- Labels explícitos en campos.
- `aria-label` en botones críticos.
- `aria-live` en alertas.
- Cierre modal con tecla `Escape`.
