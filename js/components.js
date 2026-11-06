/* ============================================
   FRASEOLOGIA - LOADER DE COMPONENTES
   ============================================
   Carrega header e footer compartilhados em
   TODAS as páginas (templates E home na raiz).

   Melhorias em relação à versão anterior:
   - Sem setTimeout: a inicialização do menu
     acontece assim que o HTML é injetado
     (innerHTML é síncrono, não precisa esperar).
   - Detecta automaticamente se a página está na
     raiz (index.html) ou em /pages/ e ajusta os
     caminhos e links do header.
   - Fallback visível caso o fetch falhe.
   ============================================ */

// Detecta se a página atual está na raiz do site (index.html)
// ou dentro de /pages/ para montar o prefixo de caminhos correto.
const FRASEOLOGIA_NA_RAIZ = !window.location.pathname.includes('/pages/');
const FRASEOLOGIA_BASE = FRASEOLOGIA_NA_RAIZ ? '' : '../';

function loadComponent(id, file) {
  const elemento = document.getElementById(id);
  if (!elemento) return Promise.resolve();

  return fetch(file)
    .then(response => {
      if (!response.ok) throw new Error('Erro ao carregar ' + file);
      return response.text();
    })
    .then(html => {
      elemento.innerHTML = html;

      // Ajusta caminhos do header quando a página está na RAIZ,
      // porque o header.html é escrito com caminhos relativos a /pages/.
      if (id === 'header-placeholder' && FRASEOLOGIA_NA_RAIZ) {
        ajustarCaminhosParaRaiz(elemento);
      }

      // Inicialização imediata (sem setTimeout):
      // o innerHTML acima já é síncrono, os elementos já existem.
      if (id === 'header-placeholder') {

        // HOME: move a seção de boas-vindas para DENTRO do header,
        // fundindo o título (FRASEOLOGIA) e a explicação numa coisa só.
        // Nas páginas internas nada muda (elas não têm .home-intro).
        const header = elemento.querySelector('.header');
        const intro = document.querySelector('.home-intro');
        if (header && intro && !header.contains(intro)) {
          header.appendChild(intro);
        }

        if (typeof destacarMenuAtivo === 'function') destacarMenuAtivo();
        if (typeof loadDarkModePreference === 'function') loadDarkModePreference();
      }
    })
    .catch(error => {
      console.error('Falha ao carregar componente:', error);
      if (id === 'header-placeholder') {
        elemento.innerHTML =
          '<div class="header header-erro">Fraseologia — não foi possível carregar o menu. Atualize a página (F5).</div>';
      }
    });
}

// Reescreve links e imagens do header para funcionarem a partir da raiz:
//   href="pagina.html"          -> href="pages/pagina.html"
//   href="../index.html"        -> href="index.html"
//   src="../assets/..."         -> src="assets/..."
function ajustarCaminhosParaRaiz(header) {
  header.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#')) return;
    if (href.startsWith('../')) {
      a.setAttribute('href', href.replace('../', ''));
    } else if (href.endsWith('.html')) {
      a.setAttribute('href', 'pages/' + href);
    }
  });

  header.querySelectorAll('img[src^="../assets/"]').forEach(img => {
    img.setAttribute('src', img.getAttribute('src').replace('../', ''));
  });
}

async function carregarComponentes() {
  // O header é carregado primeiro para que o menu esteja pronto o quanto antes.
  await loadComponent('header-placeholder', FRASEOLOGIA_BASE + 'components/header.html');
  await loadComponent('footer-placeholder', FRASEOLOGIA_BASE + 'components/footer.html');
}

document.addEventListener('DOMContentLoaded', carregarComponentes);
