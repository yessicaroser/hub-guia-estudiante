/* ================================================
   HUB DI UNLA — Guía del Estudiante
   data.js — Contenido de módulos
   ================================================ */

const HUB_MODULOS = [
  {
    id: 'm1',
    num: '01',
    title: 'Punto de Partida',
    sub: '¿Tengo un proyecto incubable?',
    hColor: '#2a1420',
    chips: ['Diagnóstico de idea', 'Ficha inicial', 'Decisión: continúo / reformulo'],
    preguntas: [
      '¿Qué significa "incubar" en la universidad?',
      '¿Mi idea tiene potencial real?',
      '¿En qué se diferencia de PPP / TIF / proyecto académico?',
      '¿Qué casos me pueden inspirar?'
    ],
    entregables: [
      'Test completado (resultado)',
      'Ficha de idea inicial',
      'Decisión: continúo / reformulo'
    ],
    manual: [
      { cap: 'Cap. 1', texto: '¿Qué es incubar?' },
      { cap: 'Cap. 2', texto: 'Tipologías (PPP, TIF, transición, etc.)' }
    ],
    estructura: [
      { n:'1', label:'Diagnóstico de idea', intro:'Herramienta para evaluar si tu idea tiene viabilidad como proyecto de diseño incubable.', items:['Preguntas de autodiagnóstico guiadas','Matriz de potencial: problema / usuario / solución'] },
      { n:'2', label:'Casos inspiradores', intro:'Ejemplos reales de proyectos incubados en el HUB.', items:['TIF convertidos en emprendimientos','PPP con impacto territorial'] },
      { n:'3', label:'Ficha de idea inicial', intro:'Documento base para iniciar el proceso formal.', items:['Nombre tentativo del proyecto','Descripción en menos de 3 líneas','Problema que resuelve'] },
      { n:'4', label:'Criterios de evaluación', intro:'Qué mira el equipo HUB cuando recibe una idea nueva.', items:['Pertinencia con el campo del diseño','Potencial de desarrollo real','Vinculación con la comunidad'] },
      { n:'5', label:'Próximos pasos', intro:'Qué pasa después de completar este módulo.', items:['Pasar al Módulo 2','Contactar al equipo si tenés dudas','Guardar tu ficha de idea'] }
    ],
    tareas: [
      'Leí el contenido completo del módulo',
      'Completé el diagnóstico inicial de mi idea',
      'Redacté mi ficha de idea inicial (nombre, descripción, problema)',
      'Decidí si continúo o reformulo mi propuesta'
    ],
    pdfs: [
      { nombre: 'Ficha de Idea Inicial', archivo: 'modulo-01-ficha-idea.pdf', paginas: '2 págs' },
      { nombre: 'Guía de Autodiagnóstico', archivo: 'modulo-01-autodiagnostico.pdf', paginas: '4 págs' }
    ]
  },
  {
    id: 'm2',
    num: '02',
    title: 'Elegir el Camino',
    sub: 'Modelo de incubación',
    hColor: '#0f1f2e',
    chips: ['6 modelos disponibles', 'Inicial vs Avanzado', 'Formulario de inscripción'],
    preguntas: [
      '¿Qué diferencia hay entre incubación inicial y avanzada?',
      '¿Qué modelo se adapta mejor a mi proyecto?',
      '¿Puedo cambiar de modelo durante el proceso?'
    ],
    entregables: [
      'Modelo de incubación seleccionado',
      'Justificación de la elección',
      'Formulario de inscripción al modelo'
    ],
    manual: [
      { cap: 'Cap. 3', texto: 'Los 6 modelos de incubación' },
      { cap: 'Cap. 4', texto: 'Criterios de selección y etapas' }
    ],
    estructura: [
      { n:'1', label:'Modelos iniciales (1–3)', intro:'Para proyectos en etapa de exploración o validación académica.', items:['Modelo 1: Concurso','Modelo 2: Convocatorias','Modelo 3: Código Abierto'] },
      { n:'2', label:'Modelos avanzados (4–6)', intro:'Para proyectos con propuesta definida listos para salir al mercado.', items:['Modelo 4: Emprendimiento','Modelo 5: Llave en mano','Modelo 6: Lanzamiento'] },
      { n:'3', label:'Criterios de selección', intro:'Cómo saber cuál te corresponde.', items:['Etapa del proyecto','Tipo de TIF o PPP','Objetivo: académico vs productivo'] },
      { n:'4', label:'Proceso de inscripción', intro:'Cómo formalizás tu elección dentro del HUB.', items:['Completar formulario de modelo','Revisión del equipo (72 hs)','Confirmación y asignación de tutor'] },
      { n:'5', label:'Preguntas frecuentes', intro:'Lo que más consultan los estudiantes al llegar a este punto.', items:['¿Puedo estar en más de un modelo?','¿Qué pasa si mi proyecto cambia de etapa?'] }
    ],
    tareas: [
      'Leí los 6 modelos de incubación disponibles',
      'Identifiqué en qué etapa está mi proyecto (inicial / avanzado)',
      'Elegí el modelo que mejor se adapta a mi situación',
      'Completé el formulario de inscripción al modelo'
    ],
    pdfs: [
      { nombre: 'Los 6 Modelos de Incubación', archivo: 'modulo-02-modelos.pdf', paginas: '6 págs' },
      { nombre: 'Formulario de Inscripción', archivo: 'modulo-02-formulario.pdf', paginas: '3 págs' }
    ]
  },
  {
    id: 'm3',
    num: '03',
    title: 'Construir la Propuesta',
    sub: 'Formulario + pitch',
    hColor: '#062820',
    chips: ['Canvas completo', 'Formulario técnico', 'Pitch (guión o slides)'],
    preguntas: [
      '¿Cuál es mi propuesta de valor?',
      '¿Cómo completo el formulario?',
      '¿Cómo me van a evaluar?',
      '¿Cómo presento el pitch?'
    ],
    entregables: [
      'Canvas completo',
      'Formulario completo + revisado',
      'Autoevaluación (rúbrica)',
      'Pitch (guión o slides)'
    ],
    manual: [
      { cap: 'Cap. 5', texto: 'Propuesta de valor y segmento' },
      { cap: 'Cap. 6', texto: 'Cómo hacer un pitch universitario' }
    ],
    estructura: [
      { n:'1', label:'Canvas (problema → usuario → solución → valor)', intro:'Herramienta central para estructurar tu propuesta de manera visual y clara.', items:['Definición del problema real','Perfil del usuario / destinatario','Propuesta de solución','Valor diferencial del diseño'] },
      { n:'2', label:'Proceso 3 etapas (diagnóstico → preincubación → incubación)', intro:'El recorrido completo que seguirá tu proyecto una vez aceptado.', items:['Etapa 1: diagnóstico y validación de idea','Etapa 2: preincubación y desarrollo de propuesta','Etapa 3: incubación formal y acompañamiento'] },
      { n:'3', label:'Guía del formulario (pregunta por pregunta + ejemplos)', intro:'Explicación detallada de cada campo del formulario técnico.', items:['Ejemplos de respuestas buenas vs mejorables','Consejos para ser claro y concreto','Errores más comunes al completarlo'] },
      { n:'4', label:'Criterios de evaluación (qué buscan + cómo mejorar)', intro:'Qué mira el equipo HUB al revisar tu propuesta.', items:['Claridad del problema identificado','Pertinencia de la solución de diseño','Viabilidad y escalabilidad del proyecto'] },
      { n:'5', label:'Ejemplos (bueno vs mejorable)', intro:'Casos reales anonimizados para entender la diferencia entre una propuesta sólida y una débil.', items:['Propuesta con problema difuso vs bien definido','Pitch sin estructura vs pitch efectivo'] }
    ],
    tareas: [
      'Completé el Canvas de mi propuesta',
      'Llené el formulario técnico del proyecto',
      'Realicé mi autoevaluación con la rúbrica',
      'Preparé el guión o slides para el pitch'
    ],
    pdfs: [
      { nombre: 'Canvas de Propuesta de Valor', archivo: 'modulo-03-canvas.pdf', paginas: '2 págs' },
      { nombre: 'Guía del Formulario Técnico', archivo: 'modulo-03-guia-formulario.pdf', paginas: '8 págs' },
      { nombre: 'Rúbrica de Autoevaluación', archivo: 'modulo-03-rubrica.pdf', paginas: '3 págs' }
    ]
  },
  {
    id: 'm4',
    num: '04',
    title: 'Gestionar el Proyecto',
    sub: 'Timeline · roles · presupuesto',
    hColor: '#0d1e12',
    chips: ['Cronograma', 'Mapa de roles', 'Estimación de costos'],
    preguntas: [
      '¿Cómo construyo un cronograma realista?',
      '¿Cómo defino los roles dentro del equipo?',
      '¿Qué costos tengo que contemplar?'
    ],
    entregables: [
      'Cronograma de trabajo (Gantt o tabla)',
      'Mapa de roles del equipo',
      'Estimación de presupuesto inicial'
    ],
    manual: [
      { cap: 'Cap. 7', texto: 'Gestión de proyectos para diseñadores' },
      { cap: 'Cap. 8', texto: 'Presupuesto y recursos en contexto universitario' }
    ],
    estructura: [
      { n:'1', label:'Timeline del proyecto', intro:'Cómo planificar las etapas de tu proyecto en el tiempo.', items:['Hitos académicos vs hitos de incubación','Plantilla de Gantt adaptada al HUB','Revisiones intermedias con el equipo'] },
      { n:'2', label:'Definición de roles', intro:'Cómo organizar el equipo si trabajás con otras personas.', items:['Roles mínimos: coordinador, diseñador, gestor','Cómo delegar sin perder foco','Documentar responsabilidades'] },
      { n:'3', label:'Estimación de presupuesto', intro:'Cómo calcular los costos reales de tu proyecto.', items:['Materiales y fabricación','Horas de trabajo propias (valor)','Costos de prototipado o testeo'] },
      { n:'4', label:'Herramientas recomendadas', intro:'Qué usan los proyectos del HUB para gestionar.', items:['Notion o Trello para tareas','Google Sheets para presupuesto','Miro para mapas y flujos'] },
      { n:'5', label:'Puntos de control con el HUB', intro:'Momentos clave donde el equipo revisa tu avance.', items:['Entrega de cronograma (semana 2)','Revisión de presupuesto (semana 4)','Presentación de avance (semana 8)'] }
    ],
    tareas: [
      'Armé el cronograma de mi proyecto (Gantt o tabla)',
      'Definí los roles de mi equipo o los propios',
      'Estimé el presupuesto inicial necesario',
      'Identifiqué las herramientas de gestión que voy a usar'
    ],
    pdfs: [
      { nombre: 'Plantilla de Gantt HUB', archivo: 'modulo-04-gantt.pdf', paginas: '1 pág' },
      { nombre: 'Guía de Presupuesto', archivo: 'modulo-04-presupuesto.pdf', paginas: '5 págs' }
    ]
  },
  {
    id: 'm5',
    num: '05',
    title: 'Recursos y Conexiones',
    sub: 'Directorio + financiamiento',
    hColor: '#160f2a',
    chips: ['Directorio de aliados', 'Convocatorias vigentes', 'Plan de conexión'],
    preguntas: [
      '¿A qué fondos puedo aplicar como estudiante UNLa?',
      '¿Quiénes son los aliados del HUB?',
      '¿Cómo me conecto con el ecosistema productivo?'
    ],
    entregables: [
      'Ficha de contactos relevantes',
      'Listado de convocatorias vigentes',
      'Plan de conexión con al menos 1 aliado'
    ],
    manual: [
      { cap: 'Cap. 9',  texto: 'Directorio de aliados y mentores' },
      { cap: 'Cap. 10', texto: 'Financiamiento y convocatorias abiertas' }
    ],
    estructura: [
      { n:'1', label:'Directorio de aliados', intro:'Organizaciones, empresas y referentes vinculados al HUB.', items:['Aliados institucionales (municipios, cámaras)','Empresas del sector productivo regional','Mentores y profesionales disponibles'] },
      { n:'2', label:'Convocatorias abiertas', intro:'Fondos y programas a los que podés aplicar como estudiante universitario.', items:['Subsidios UNLa para proyectos estudiantiles','Fondos nacionales (MINCyT, FONTAR)','Convocatorias privadas y concursos'] },
      { n:'3', label:'Cómo hacer networking efectivo', intro:'Estrategias para conectarte sin que resulte forzado.', items:['Cómo presentar tu proyecto en 1 minuto','Qué preguntar a un potencial aliado','Errores frecuentes al hacer networking'] },
      { n:'4', label:'Recursos digitales', intro:'Plataformas y herramientas útiles para buscar oportunidades.', items:['LinkedIn para proyectos de diseño','Plataformas de financiamiento colectivo','Comunidades de diseño e innovación'] },
      { n:'5', label:'Próximos pasos post-módulo', intro:'Qué hacer después de completar los 5 módulos.', items:['Presentación formal ante el equipo HUB','Firma de acuerdo de incubación','Inicio del acompañamiento personalizado'] }
    ],
    tareas: [
      'Revisé el directorio de aliados del HUB',
      'Identifiqué al menos una convocatoria vigente para mi proyecto',
      'Elaboré mi ficha de contactos relevantes',
      'Definí mi plan de conexión con al menos un aliado'
    ],
    pdfs: [
      { nombre: 'Directorio de Aliados HUB', archivo: 'modulo-05-directorio.pdf', paginas: '10 págs' },
      { nombre: 'Guía de Convocatorias Vigentes', archivo: 'modulo-05-convocatorias.pdf', paginas: '6 págs' },
      { nombre: 'Plantilla Plan de Conexión', archivo: 'modulo-05-plan-conexion.pdf', paginas: '2 págs' }
    ]
  }
];
