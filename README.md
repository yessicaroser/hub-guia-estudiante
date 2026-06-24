# HUB DI UNLa — Guía del Estudiante
## Estructura del proyecto

```
hub-guia-estudiante/
│
├── pages/
│   └── guia-estudiante.html     ← Página principal de la plataforma
│
├── css/
│   └── guia.css                 ← Estilos globales (variables, componentes)
│
├── js/
│   ├── data.js                  ← Contenido de los 5 módulos (editable)
│   ├── state.js                 ← Lógica de progreso con localStorage
│   └── ui.js                    ← Lógica de interfaz (nodos, modal, tareas)
│
└── assets/
    ├── pdfs/                    ← PDFs descargables por módulo
    │   ├── modulo-01-ficha-idea.pdf
    │   ├── modulo-01-autodiagnostico.pdf
    │   ├── modulo-02-modelos.pdf
    │   ├── modulo-02-formulario.pdf
    │   ├── modulo-03-canvas.pdf
    │   ├── modulo-03-guia-formulario.pdf
    │   ├── modulo-03-rubrica.pdf
    │   ├── modulo-04-gantt.pdf
    │   ├── modulo-04-presupuesto.pdf
    │   ├── modulo-05-directorio.pdf
    │   ├── modulo-05-convocatorias.pdf
    │   └── modulo-05-plan-conexion.pdf
    │
    └── images/                  ← Imágenes de la plataforma
```

---

## Cómo editar el contenido de los módulos

Todo el contenido está centralizado en **`js/data.js`**.
Cada módulo tiene:
- `preguntas` → Tab "Preguntas clave"
- `entregables` → Tab "Entregable"
- `manual` → Tab "Del manual" (capítulos)
- `estructura` → Tab "Estructura" (acordeón)
- `tareas` → Checkboxes del resumen de tareas
- `pdfs` → Archivos descargables

Para agregar un PDF nuevo:
```js
pdfs: [
  { nombre: 'Nombre visible', archivo: 'nombre-archivo.pdf', paginas: '3 págs' }
]
```

---

## Sistema de progreso (localStorage)

- **Clave de storage:** `hub_guia_progreso_v1`
- El progreso persiste entre sesiones mientras el estudiante use el mismo navegador
- El botón "Reiniciar progreso" en el nav limpia el storage
- Para migrar a Firebase en el futuro: reemplazar `state.js` manteniendo la misma API pública

---

## Dependencias externas (CDN)

- Tailwind CSS: `https://cdn.tailwindcss.com`
- Font Awesome 6.5: `https://cdnjs.cloudflare.com`
- Google Fonts Inter: `https://fonts.googleapis.com`

No requieren instalación — funcionan desde GitHub Pages sin build step.
