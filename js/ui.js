/* ================================================
   HUB DI UNLA — Guía del Estudiante
   ui.js — Lógica de interfaz
   ================================================ */

const HubUI = (() => {

  let state = HubState.load();
  let curMod = state.lastModule || 0;
  let toastTimer = null;

  /* ================================================
     INICIALIZACIÓN
  ================================================ */
  function init() {
    run_entry_animation();
    update_nodes();
    update_global_progress();
    bind_keyboard();

    // Restaurar posición si el estudiante había avanzado
    const lastMod = state.lastModule || 0;
    if (HubState.isUnlocked(state, lastMod) && lastMod > 0) {
      show_toast(`Bienvenido de nuevo. Continuás en el Módulo ${HUB_MODULOS[lastMod].num}.`, true);
    }
  }

  /* ================================================
     ANIMACIÓN DE ENTRADA EN CADENA
  ================================================ */
  function run_entry_animation() {
    // Centro
    setTimeout(() => {
      const nc = document.getElementById('hub-nc');
      if (nc) nc.classList.add('drawn');
      setTimeout(() => {
        ['hub-nc-dot','hub-ncs1','hub-ncs2','hub-ncs3','hub-ncl1','hub-ncl2','hub-ncl3'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.style.opacity = id === 'hub-nc-dot' ? '0.9' : '0.5';
        });
      }, 300);
    }, 400);

    // Líneas y nodos en cadena
    [700, 950, 1200, 1450, 1700].forEach((delay, i) => {
      setTimeout(() => {
        const l = document.getElementById(`hub-l${i+1}`);
        if (l) l.classList.add('drawn');
      }, delay);
      setTimeout(() => {
        const n = document.getElementById(`hub-n${i+1}`);
        if (n) n.classList.add('drawn');
      }, delay + 200);
    });

    // Actualizar visual después de animar
    setTimeout(() => update_nodes(), 2200);
  }

  /* ================================================
     NODOS — ACTUALIZAR VISUAL
  ================================================ */
  function update_nodes() {
    HUB_MODULOS.forEach((m, i) => {
      const n    = document.getElementById(`hub-n${i+1}`);
      const t    = document.getElementById(`hub-t${i+1}`);
      const lk   = document.getElementById(`hub-lk${i+1}`);
      const l    = document.getElementById(`hub-l${i+1}`);
      const d    = document.getElementById(`hub-d${i+1}`);
      const ring = document.getElementById(`hub-ring${i+1}`);
      if (!n) return;

      // Limpiar clases
      n.classList.remove('hub-node--active','hub-node--done','hub-node--locked');
      t.classList.remove('hub-label--show');
      lk.classList.remove('hub-label--show');
      l.classList.remove('hub-line--active','hub-line--done','hub-line--locked');
      d.classList.remove('hub-dot--active','hub-dot--done','hub-dot--locked');
      ring.classList.remove('hub-ring--show');

      if (!HubState.isUnlocked(state, i)) {
        n.classList.add('hub-node--locked');
        lk.classList.add('hub-label--show');
        l.classList.add('hub-line--locked');
        d.classList.add('hub-dot--locked');
      } else if (HubState.isCompleted(state, i)) {
        n.classList.add('hub-node--done');
        t.classList.add('hub-label--show');
        l.classList.add('hub-line--done');
        d.classList.add('hub-dot--done');
        ring.classList.add('hub-ring--show');
      } else if (i === curMod) {
        n.classList.add('hub-node--active');
        t.classList.add('hub-label--show');
        l.classList.add('hub-line--active');
        d.classList.add('hub-dot--active');
      } else {
        t.classList.add('hub-label--show');
      }
    });
    update_global_progress();
  }

  /* ================================================
     BARRA DE PROGRESO GLOBAL
  ================================================ */
  function update_global_progress() {
    const pct = HubState.totalProgress(state);
    const completed = HubState.modulesCompleted(state);
    const fill = document.getElementById('hub-progress-fill');
    const pctEl = document.getElementById('hub-progress-pct');
    const compEl = document.getElementById('hub-modules-completed');
    if (fill)   fill.style.width = pct + '%';
    if (pctEl)  pctEl.textContent = pct + '%';
    if (compEl) compEl.textContent = `${completed} / ${HUB_MODULOS.length} módulos completados`;
  }

  /* ================================================
     CLICK EN NODO
  ================================================ */
  function click_node(idx) {
    if (!HubState.isUnlocked(state, idx)) {
      const prev = idx > 0 ? `Completá el Módulo ${HUB_MODULOS[idx-1].num} primero.` : '';
      show_toast('🔒 Módulo bloqueado. ' + prev, false);
      return;
    }
    curMod = idx;
    state = HubState.markOpened(state, idx);
    update_nodes();
    const hint = document.getElementById('hub-hint');
    if (hint) hint.classList.add('hub-hint--off');
    open_content(idx);
  }
  window.hubClickNode = click_node; // exponer para onclick inline en SVG

  /* ================================================
     MODAL CONTENIDO
  ================================================ */
  function open_content(idx) {
    const m = HUB_MODULOS[idx];
    document.getElementById('hub-mhdr').style.background    = m.hColor;
    document.getElementById('hub-mhdr-num').textContent     = 'Módulo ' + m.num;
    document.getElementById('hub-mhdr-title').textContent   = m.title;
    document.getElementById('hub-mhdr-sub').textContent     = m.sub;
    document.getElementById('hub-mchips').innerHTML = m.chips.map(c =>
      `<span class="hub-chip hub-chip--light">${c}</span>`).join('');

    render_tabs(idx, 0);

    const btnPrev = document.getElementById('hub-btn-prev');
    const btnNext = document.getElementById('hub-btn-next');
    btnPrev.disabled = idx === 0 || !HubState.isUnlocked(state, idx-1);
    btnNext.disabled = idx === 4 || !HubState.isUnlocked(state, idx+1);
    btnNext.textContent = idx === 4 ? '✓ Último módulo' : 'Siguiente →';

    document.getElementById('hub-ov-content').classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function render_tabs(idx, tabIdx) {
    const m = HUB_MODULOS[idx];
    const TABS  = ['preguntas','entregable','manual','estructura','material'];
    const TLBL  = ['Preguntas clave','Entregable','Del manual','Estructura','Material'];

    document.getElementById('hub-mtabs').innerHTML = TABS.map((t, i) =>
      `<button class="hub-tab${i === tabIdx ? ' is-active' : ''}"
        onclick="HubUI.renderTabs(${idx},${i})">${TLBL[i]}</button>`
    ).join('');

    let html = '';

    if (tabIdx === 0) {
      html = `<ul class="flex flex-col gap-3">
        ${m.preguntas.map(p => `
          <li class="flex gap-3 text-sm text-white/80 leading-relaxed">
            <span class="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0 mt-2"></span>${p}
          </li>`).join('')}
      </ul>`;
    } else if (tabIdx === 1) {
      html = m.entregables.map(e => `
        <div class="flex gap-3 items-start p-3 rounded-lg bg-teal-900/20 border border-teal-700/30 mb-2">
          <i class="fas fa-check-circle text-teal-400 mt-0.5 flex-shrink-0"></i>
          <p class="text-sm text-white/80">${e}</p>
        </div>`).join('');
    } else if (tabIdx === 2) {
      html = m.manual.map(c => `
        <div class="border-l-2 border-teal-500 pl-4 mb-3">
          <span class="text-xs text-white/30 block mb-1">${c.cap}</span>
          <p class="text-sm text-white/75">${c.texto}</p>
        </div>`).join('');
    } else if (tabIdx === 3) {
      html = `<p class="text-xs text-white/40 mb-4 leading-relaxed">Expandí cada punto para ver el detalle.</p>` +
        m.estructura.map(e => `
          <div class="hub-acord-item">
            <button class="hub-acord-trigger" onclick="HubUI.toggleAcord(this)">
              <span class="hub-acord-num">${e.n}</span>
              <span class="hub-acord-label">${e.label}</span>
              <i class="fas fa-chevron-down hub-acord-arrow"></i>
            </button>
            <div class="hub-acord-body">
              <p>${e.intro}</p>
              <ul>${e.items.map(it => `<li>${it}</li>`).join('')}</ul>
            </div>
          </div>`).join('');
    } else if (tabIdx === 4) {
      // Material descargable
      html = `<p class="text-xs text-white/40 mb-4 leading-relaxed">PDFs disponibles para este módulo. Los archivos se agregan a medida que el contenido es publicado por el equipo HUB.</p>` +
        m.pdfs.map(pdf => `
          <a href="../assets/pdfs/${pdf.archivo}" 
             download="${pdf.nombre}"
             class="material-card mb-2 block"
             onclick="HubUI.trackDownload('${m.id}','${pdf.archivo}')">
            <div class="material-icon"><i class="fas fa-file-pdf"></i></div>
            <div class="material-info">
              <p class="material-name">${pdf.nombre}</p>
              <p class="material-meta">PDF · ${pdf.paginas}</p>
            </div>
            <i class="fas fa-download material-download"></i>
          </a>`).join('');
    }

    document.getElementById('hub-mbody').innerHTML = html;
    document.getElementById('hub-mbody').scrollTop = 0;
  }

  function nav_mod(dir) {
    const next = curMod + dir;
    if (next < 0 || next > 4 || !HubState.isUnlocked(state, next)) return;
    curMod = next;
    state = HubState.markOpened(state, next);
    update_nodes();
    open_content(next);
  }

  function try_close_content() {
    document.getElementById('hub-ov-content').classList.remove('is-open');
    open_tasks(curMod);
  }

  /* ================================================
     MODAL TAREAS
  ================================================ */
  function open_tasks(idx) {
    const m = HUB_MODULOS[idx];
    document.getElementById('hub-task-title').textContent = m.title;
    document.getElementById('hub-task-sub').textContent   = m.sub;
    render_tasks(idx);
    document.getElementById('hub-ov-tasks').classList.add('is-open');
  }

  function render_tasks(idx) {
    const m     = HUB_MODULOS[idx];
    const mod_s = state.modules[idx];
    const done  = HubState.tasksCount(state, idx);
    const total = m.tareas.length;
    const allDone = HubState.tasksDone(state, idx);
    const completed = HubState.isCompleted(state, idx);

    document.getElementById('hub-task-count').textContent = `${done} / ${total}`;
    document.getElementById('hub-task-fill').style.width  = `${Math.round((done/total)*100)}%`;

    document.getElementById('hub-task-list').innerHTML = m.tareas.map((t, i) => `
      <div class="task-item${mod_s.tasks[i] ? ' is-checked' : ''}"
           onclick="HubUI.toggleTask(${idx},${i})">
        <div class="task-cb"><i class="fas fa-check"></i></div>
        <p class="task-text">${t}</p>
      </div>`).join('');

    const msg = document.getElementById('hub-task-msg');
    const btn = document.getElementById('hub-btn-complete');

    if (completed) {
      msg.textContent = '✓ Módulo completado. El siguiente ya está disponible.';
      msg.className = 'text-xs text-teal-400 text-center leading-relaxed';
      btn.textContent = 'Módulo completado ✓';
      btn.className = 'hub-btn hub-btn--primary w-full justify-center opacity-60 cursor-default';
      btn.onclick = null;
    } else if (allDone) {
      msg.textContent = '¡Todas las tareas listas! Podés completar el módulo y avanzar.';
      msg.className = 'text-xs text-teal-400 text-center leading-relaxed';
      btn.textContent = 'Completar módulo y desbloquear siguiente →';
      btn.className = 'hub-btn hub-btn--primary w-full justify-center';
      btn.onclick = () => complete_module(idx);
    } else {
      const remaining = total - done;
      msg.textContent = `Te ${remaining === 1 ? 'falta 1 tarea' : `faltan ${remaining} tareas`} para desbloquear el siguiente módulo.`;
      msg.className = 'text-xs text-white/40 text-center leading-relaxed';
      btn.textContent = 'Completar módulo';
      btn.className = 'hub-btn hub-btn--primary w-full justify-center opacity-40 cursor-not-allowed';
      btn.onclick = null;
    }
  }

  function toggle_task(modIdx, taskIdx) {
    state = HubState.toggleTask(state, modIdx, taskIdx);
    render_tasks(modIdx);
    update_global_progress();
  }

  function complete_module(modIdx) {
    const result = HubState.completeModule(state, modIdx);
    state = result.state;
    if (!result.ok) { show_toast('⚠️ ' + result.msg, false); return; }
    close_tasks();
    update_nodes();
    if (modIdx + 1 < HUB_MODULOS.length) {
      show_toast(`🎉 ¡Módulo ${HUB_MODULOS[modIdx].num} completado! Módulo ${HUB_MODULOS[modIdx+1].num} desbloqueado.`, true);
    } else {
      show_toast('🎉 ¡Recorrido completo! Bien hecho.', true);
    }
  }

  function close_tasks() {
    document.getElementById('hub-ov-tasks').classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function go_back_to_content() {
    document.getElementById('hub-ov-tasks').classList.remove('is-open');
    open_content(curMod);
  }

  /* ================================================
     ACORDEÓN
  ================================================ */
  function toggleAcord(btn) {
    const wasOpen = btn.classList.contains('is-open');
    document.querySelectorAll('.hub-acord-trigger.is-open').forEach(b => b.classList.remove('is-open'));
    if (!wasOpen) btn.classList.add('is-open');
  }

  /* ================================================
     TOAST
  ================================================ */
  function show_toast(msg, ok) {
    const t = document.getElementById('hub-toast');
    if (!t) return;
    t.textContent = msg;
    t.className = 'hub-toast' + (ok ? ' is-success' : '') + ' is-visible';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.classList.remove('is-visible'); }, 3500);
  }

  /* ================================================
     TRACKING (placeholder para analytics futura)
  ================================================ */
  function trackDownload(modId, archivo) {
    console.log(`[HUB] Descarga: ${archivo} (${modId})`);
  }

  /* ================================================
     RESET (útil para testing)
  ================================================ */
  function reset_progress() {
    if (!confirm('¿Reiniciar todo el progreso? Esta acción no se puede deshacer.')) return;
    state = HubState.reset();
    curMod = 0;
    update_nodes();
    show_toast('Progreso reiniciado.', false);
  }

  /* ================================================
     TECLADO
  ================================================ */
  function bind_keyboard() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (document.getElementById('hub-ov-tasks')?.classList.contains('is-open'))   close_tasks();
        else if (document.getElementById('hub-ov-content')?.classList.contains('is-open')) try_close_content();
      }
    });
  }

  // Exponer métodos públicos
  return {
    init,
    renderTabs: render_tabs,
    toggleAcord,
    toggleTask: toggle_task,
    navMod: nav_mod,
    tryCloseContent: try_close_content,
    closeTasks: close_tasks,
    goBackToContent: go_back_to_content,
    resetProgress: reset_progress,
    trackDownload,
    showToast: show_toast
  };

})();

// Auto-inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => HubUI.init());
