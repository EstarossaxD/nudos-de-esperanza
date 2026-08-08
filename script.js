/* =============================================================
   NUDOS DE ESPERANZA — script.js
   Maneja: modal de apoyo (con pestanas Bolivia / Internacional),
   copiar numero de cuenta, y menu movil.
   ============================================================= */

function openApoyo(event, tab) {
  if (event) event.preventDefault();
  var modal = document.getElementById('apoyoModal');
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (tab) switchTab(tab);
}

function closeApoyo() {
  var modal = document.getElementById('apoyoModal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function switchTab(tab) {
  var tabs = document.querySelectorAll('.tab-btn');
  var panels = document.querySelectorAll('.tab-panel');
  tabs.forEach(function (btn) {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  panels.forEach(function (panel) {
    panel.classList.toggle('active', panel.dataset.tab === tab);
  });
}

function copyToClipboard(text, btn) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function () {
      var original = btn.textContent;
      btn.textContent = 'Copiado ✓';
      setTimeout(function () { btn.textContent = original; }, 1600);
    });
  }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeApoyo();
});

/* -------------------------------------------------------------
   CARRUSEL DE FOTOS ("hilos que se deslizan")
   No hay que tocar esta funcion para agregar mas fotos: solo se
   copian mas bloques ".carrusel-item" dentro de ".carrusel-track"
   en el HTML. Esta funcion:
   1) duplica una sola vez el set de fotos, para que el bucle sea
      continuo y sin cortes (la animacion viaja de 0% a -50%);
   2) calcula la duracion de la animacion segun el ancho total de
      las fotos, para que la velocidad de deslizamiento se sienta
      siempre igual sin importar cuantas imagenes haya.
   ------------------------------------------------------------- */
function debounce(fn, wait) {
  var t;
  return function () {
    var args = arguments;
    clearTimeout(t);
    t = setTimeout(function () { fn.apply(null, args); }, wait);
  };
}

function initCarruseles() {
  var pixelesPorSegundo = 42;
  document.querySelectorAll('[data-carrusel]').forEach(function (carrusel) {
    var track = carrusel.querySelector('.carrusel-track');
    if (!track || track.dataset.clonado) return;

    var itemsOriginales = Array.prototype.slice.call(track.children);
    if (itemsOriginales.length === 0) return;

    // Duplicamos el set de fotos una sola vez: con el original + la copia
    // seguida, un desplazamiento de -50% conecta perfectamente con el inicio.
    itemsOriginales.forEach(function (item) {
      var copia = item.cloneNode(true);
      copia.setAttribute('aria-hidden', 'true');
      copia.querySelectorAll('img').forEach(function (img) { img.removeAttribute('id'); });
      track.appendChild(copia);
    });
    track.dataset.clonado = 'true';

    function ajustarVelocidad() {
      var anchoDeUnSet = track.scrollWidth / 2;
      var duracion = Math.max(anchoDeUnSet / pixelesPorSegundo, 10);
      track.style.setProperty('--carrusel-duration', duracion + 's');
    }

    ajustarVelocidad();
    window.addEventListener('resize', debounce(ajustarVelocidad, 200));

    // Si alguna foto tarda en cargar, recalculamos para que el bucle
    // quede parejo una vez que todas las imagenes tienen su tamaño real.
    track.querySelectorAll('img').forEach(function (img) {
      if (!img.complete) img.addEventListener('load', debounce(ajustarVelocidad, 150));
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () { switchTab(btn.dataset.tab); });
  });

  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.topnav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      copyToClipboard(btn.dataset.copy, btn);
    });
  });

  initCarruseles();
});
