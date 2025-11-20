// script.js - interações mínimas: salvar progresso, login demo e sidebar toggle

document.addEventListener('DOMContentLoaded', () => {
  // ---------- login demo ----------
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      if (!nome || !email) return alert('Preencha nome e e-mail');
      // salvar usuário no localStorage (demo)
      localStorage.setItem('codify_user', JSON.stringify({ nome, email }));
      // redirecionar para painel
      window.location.href = 'painel.html';
    });
  }

  // ---------- painel ----------
  if (document.getElementById('welcome')) {
    const user = JSON.parse(localStorage.getItem('codify_user') || '{}');
    if (user && user.nome) {
      document.getElementById('welcome').textContent = `Bem-vindo, ${user.nome}!`;
    } else {
      document.getElementById('welcome').textContent = `Bem-vindo!`;
    }
    updateAllProgressDisplays();
    // logout btn
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('codify_user');
        // opcional: limpar progresso também?
        // localStorage.removeItem('codify_progress');
        window.location.href = 'index.html';
      });
    }
  }

  // ---------- marcar capítulos (em páginas de linguagem) ----------
  const checkboxes = document.querySelectorAll('.mark-read');
  checkboxes.forEach(cb => {
    // set initial
    const key = cb.getAttribute('data-chapter-key');
    if (key) {
      const progress = JSON.parse(localStorage.getItem('codify_progress') || '{}');
      if (progress[key]) cb.checked = true;
    }
    cb.addEventListener('change', () => {
      const key = cb.getAttribute('data-chapter-key');
      const progress = JSON.parse(localStorage.getItem('codify_progress') || '{}');
      if (cb.checked) progress[key] = true;
      else delete progress[key];
      localStorage.setItem('codify_progress', JSON.stringify(progress));
      updateAllProgressDisplays();
    });
  });

  // ---------- sidebar toggle ----------
  const toggleSidebar = document.getElementById('toggleSidebar');
  if (toggleSidebar) {
    const sidebar = document.getElementById('sidebar');
    toggleSidebar.addEventListener('click', () => {
      if (!sidebar) return;
      sidebar.classList.toggle('collapsed');
      toggleSidebar.textContent = sidebar.classList.contains('collapsed') ? 'Abrir' : 'Recolher';
    });
  }

  // ---------- helper: update progress bars ----------
  function updateAllProgressDisplays() {
    const progress = JSON.parse(localStorage.getItem('codify_progress') || '{}');
    const keys = Object.keys(progress);
    // for demo: count html chapters marked (they use prefix html-)
    const htmlCount = keys.filter(k => k.startsWith('html-')).length;
    const totalHtml = 6; // ajuste conforme capítulos reais
    const htmlPercent = Math.round((htmlCount / totalHtml) * 100);
    const progressHtml = document.getElementById('progress-html');
    const htmlStatus = document.getElementById('html-status');
    if (progressHtml) progressHtml.style.width = (htmlPercent || 0) + '%';
    if (htmlStatus) htmlStatus.textContent = (htmlPercent || 0) + '% concluído';

    // JS
    const jsCount = keys.filter(k => k.startsWith('js-')).length;
    const totalJs = 6;
    const jsPercent = Math.round((jsCount / totalJs) * 100);
    const progressJs = document.getElementById('progress-js');
    const jsStatus = document.getElementById('js-status');
    if (progressJs) progressJs.style.width = (jsPercent || 0) + '%';
    if (jsStatus) jsStatus.textContent = (jsPercent || 0) + '% concluído';

    // PHP
    const phpCount = keys.filter(k => k.startsWith('php-')).length;
    const totalPhp = 6;
    const phpPercent = Math.round((phpCount / totalPhp) * 100);
    const progressPhp = document.getElementById('progress-php');
    const phpStatus = document.getElementById('php-status');
    if (progressPhp) progressPhp.style.width = (phpPercent || 0) + '%';
    if (phpStatus) phpStatus.textContent = (phpPercent || 0) + '% concluído';
  }

});
