/* ================================================
   HUB DI UNLA — Guía del Estudiante
   state.js — Gestión de progreso con localStorage
   ================================================ */

const HUB_STORAGE_KEY = 'hub_guia_progreso_v1';

const HubState = (() => {

  // --- CARGAR ---
  function load() {
    try {
      const raw = localStorage.getItem(HUB_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Validar estructura por si cambió la versión
        if (parsed.modules && parsed.modules.length === HUB_MODULOS.length) {
          return parsed;
        }
      }
    } catch(e) { console.warn('HUB: Error al leer localStorage', e); }
    return _fresh();
  }

  // --- ESTADO INICIAL ---
  function _fresh() {
    return {
      version: 1,
      lastVisit: Date.now(),
      lastModule: 0,
      modules: HUB_MODULOS.map((m, i) => ({
        id: m.id,
        unlocked: i === 0,
        completed: false,
        tasks: new Array(m.tareas.length).fill(false),
        openedAt: null,
        completedAt: null
      }))
    };
  }

  // --- GUARDAR ---
  function save(state) {
    try {
      state.lastVisit = Date.now();
      localStorage.setItem(HUB_STORAGE_KEY, JSON.stringify(state));
    } catch(e) { console.warn('HUB: Error al guardar localStorage', e); }
  }

  // --- RESET ---
  function reset() {
    try { localStorage.removeItem(HUB_STORAGE_KEY); } catch(e) {}
    return _fresh();
  }

  // --- GETTERS ---
  function isUnlocked(state, idx) { return state.modules[idx]?.unlocked || false; }
  function isCompleted(state, idx) { return state.modules[idx]?.completed || false; }
  function tasksDone(state, idx)   { return state.modules[idx]?.tasks.every(t => t) || false; }
  function tasksCount(state, idx)  { return state.modules[idx]?.tasks.filter(t => t).length || 0; }
  function totalProgress(state) {
    let total = 0, done = 0;
    HUB_MODULOS.forEach((m, i) => {
      total += m.tareas.length;
      done  += tasksCount(state, i);
    });
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }
  function modulesCompleted(state) {
    return state.modules.filter(m => m.completed).length;
  }

  // --- ACTIONS ---
  function toggleTask(state, modIdx, taskIdx) {
    if (isCompleted(state, modIdx)) return state; // bloqueado si ya completó
    state.modules[modIdx].tasks[taskIdx] = !state.modules[modIdx].tasks[taskIdx];
    save(state);
    return state;
  }

  function completeModule(state, modIdx) {
    if (!tasksDone(state, modIdx)) return { state, ok: false, msg: 'Completá todas las tareas primero.' };
    state.modules[modIdx].completed = true;
    state.modules[modIdx].completedAt = Date.now();
    // Desbloquear siguiente
    if (modIdx + 1 < HUB_MODULOS.length) {
      state.modules[modIdx + 1].unlocked = true;
    }
    save(state);
    return { state, ok: true };
  }

  function markOpened(state, modIdx) {
    if (!state.modules[modIdx].openedAt) {
      state.modules[modIdx].openedAt = Date.now();
      save(state);
    }
    state.lastModule = modIdx;
    save(state);
    return state;
  }

  return { load, save, reset, isUnlocked, isCompleted, tasksDone, tasksCount, totalProgress, modulesCompleted, toggleTask, completeModule, markOpened };

})();
