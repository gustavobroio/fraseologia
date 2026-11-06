// ============================================
// FRASEOLOGIA - Funções Globais
// ============================================
// O tema escuro em si (aplicação ANTI-FLASH no
// carregamento) vive em js/theme.js, incluído
// no <head> de cada página. Aqui ficam apenas as
// interações do usuário.
// ============================================

// Alterna Dark Mode
// A classe fica no <html> (mesmo lugar onde o
// theme.js a aplica no carregamento).
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark-mode');
  const isDark = document.documentElement.classList.contains('dark-mode');
  localStorage.setItem('fraseologia-darkmode', isDark);

  const btn = document.getElementById('darkModeToggle');
  if (btn) {
    btn.textContent = isDark ? '☀️' : '🌙';
  }

  mostrarToast(isDark ? 'Modo escuro ativado' : 'Modo claro ativado', 'info');
}

// Sincroniza o ícone do botão com a preferência salva.
// A classe no <html> já foi aplicada pelo theme.js.
function loadDarkModePreference() {
  const saved = localStorage.getItem('fraseologia-darkmode');
  const btn = document.getElementById('darkModeToggle');
  if (btn) {
    btn.textContent = saved === 'true' ? '☀️' : '🌙';
  }
}

// ============================================
// MENU ATIVO
// ============================================
function destacarMenuAtivo() {
  const links = document.querySelectorAll(".nav-menu a");
  links.forEach(link => link.classList.remove("active"));

  let paginaAtual = window.location.pathname.split("/").pop();
  paginaAtual = paginaAtual.split("?")[0].split("#")[0];

  // Na home (raiz do site), destaca o link "Início".
  const naHome = paginaAtual === "" || paginaAtual === "index.html";

  const linkAtivo = Array.from(links).find(link => {
    const href = link.getAttribute("href") || "";
    if (naHome) return href.endsWith("index.html");
    return href === paginaAtual;
  });

  if (linkAtivo) {
    linkAtivo.classList.add("active");
  }
}

// ============================================
// COPIAR TEXTO (helper compartilhado)
// ============================================
async function copiarTexto(texto) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    // Fallback para contextos sem Clipboard API
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    document.body.removeChild(textarea);
    return ok;
  }
}

// ============================================
// COPIAR LOG
// ============================================
async function copiarLog() {
  const logDiv = document.getElementById('Log');
  const texto = logDiv?.innerText || '';

  if (!texto.trim() || texto.includes('Clique em')) {
    mostrarToast('⚠️ Gere um log antes de copiar!', 'warning');
    return;
  }

  const ok = await copiarTexto(texto);
  mostrarToast(ok ? '📋 Log copiado!' : '❌ Erro ao copiar log', ok ? 'success' : 'error');
}

// ============================================
// LIMPAR FORMULÁRIO
// ============================================
function limparFormulario() {
  // Não inclui inputs do tipo range (ex.: slider de tamanho da senha),
  // cujo valor não faz sentido ser "limpo".
  const inputs = document.querySelectorAll('input:not([type="button"]):not([type="submit"]):not([type="range"]), textarea, select');

  inputs.forEach(input => {
    if (input.id) input.value = '';
  });

  // Nem toda página tem bloco de log (ex.: home e gerador de senha),
  // por isso o guard para não quebrar o atalho Ctrl+L nelas.
  const log = document.getElementById('Log');
  if (log) {
    log.innerHTML = 'Clique em "Gerar Log" para começar';
  }

  mostrarToast('🧹 Formulário limpo!', 'info');
}

// ============================================
// TOAST
// ============================================
function mostrarToast(msg, tipo = 'info') {
  const existente = document.querySelector('.toast-message');
  if (existente) existente.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = msg;

  const cores = {
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#17a2b8'
  };

  toast.style.backgroundColor = cores[tipo] || '#333';

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ============================================
// ATALHOS
// ============================================
function configurarAtalhos() {
  document.addEventListener('keydown', (e) => {

    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (typeof window.gerarLog === 'function') {
        window.gerarLog();
      }
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
      e.preventDefault();
      limparFormulario();
    }
  });
}

// ============================================
// CTRL+C — COPIA O RESULTADO (regra global)
// ============================================
// Se NADA estiver selecionado, Ctrl+C copia direto o
// resultado da página (log gerado ou senha do gerador).
// Se o usuário selecionou algum texto (na página ou dentro
// de um campo), o navegador mantém o comportamento normal
// de cópia — a regra nunca atrapalha o Ctrl+C do dia a dia.
function configurarCopiarComCtrlC() {
  document.addEventListener('keydown', (e) => {
    if (!(e.ctrlKey || e.metaKey)) return;
    if (e.key !== 'c' && e.key !== 'C') return;

    // 1) Texto selecionado na página → cópia normal do navegador.
    const selecao = window.getSelection ? String(window.getSelection()) : '';
    if (selecao.length > 0) return;

    // 2) Texto selecionado dentro de um campo → cópia normal.
    const ativo = document.activeElement;
    if (ativo && (ativo.tagName === 'INPUT' || ativo.tagName === 'TEXTAREA')) {
      const inicio = ativo.selectionStart;
      const fim = ativo.selectionEnd;
      if (inicio !== null && fim !== null && fim > inicio) return;
    }

    // 3) Páginas de fraseologia: copia o log gerado.
    const log = document.getElementById('Log');
    if (log) {
      const texto = log.innerText || '';
      if (texto.trim() && !texto.includes('Clique em')) {
        e.preventDefault();
        copiarTexto(texto).then(ok => {
          mostrarToast(ok ? '📋 Log copiado com Ctrl+C!' : '❌ Erro ao copiar log',
                        ok ? 'success' : 'error');
        });
      }
      return; // log vazio/não gerado: deixa o Ctrl+C normal
    }

    // 4) Gerador de senha: copia o resultado exibido.
    const saida = document.getElementById('passwordOutput');
    if (saida && saida.value.trim()) {
      e.preventDefault();
      copiarTexto(saida.value).then(ok => {
        mostrarToast(ok ? '📋 Resultado copiado com Ctrl+C!' : '❌ Erro ao copiar resultado',
                      ok ? 'success' : 'error');
      });
    }
  });
}

// ============================================
// VALIDAÇÃO
// ============================================
function validarCamposObrigatorios() {
  const campos = document.querySelectorAll('[required]');
  let erro = false;

  campos.forEach(campo => {
    if (!campo.value.trim()) {
      erro = true;
      campo.style.borderColor = '#dc3545';
      campo.style.boxShadow = '0 0 0 2px rgba(220,53,69,0.3)';

      setTimeout(() => {
        campo.style.borderColor = '';
        campo.style.boxShadow = '';
      }, 2000);
    }
  });

  if (erro) {
    mostrarToast('⚠️ Preencha os campos obrigatórios!', 'warning');
    return false;
  }

  return true;
}

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  configurarAtalhos();
  configurarCopiarComCtrlC();
  loadDarkModePreference();
  destacarMenuAtivo();
});
