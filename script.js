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
});
