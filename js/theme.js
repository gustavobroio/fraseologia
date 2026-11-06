/* ============================================
   FRASEOLOGIA - TEMA (ANTI-FLASH)
   ============================================
   Este arquivo é carregado de forma SÍNCRONA no
   <head> de TODAS as páginas (antes do CSS).

   Por isso o tema escuro é aplicado ANTES da
   primeira renderização — eliminando a "piscada"
   entre páginas.

   A classe é aplicada no <html> (documentElement),
   que já existe quando o <head> é interpretado
   (diferente do <body>, que ainda não existe).

   IMPORTANTE: não adicionar nada pesado aqui.
   Este arquivo deve permanecer mínimo.
   ============================================ */

(function () {
  try {
    if (localStorage.getItem('fraseologia-darkmode') === 'true') {
      document.documentElement.classList.add('dark-mode');
    }
  } catch (e) {
    /* localStorage indisponível (ex: modo privado restrito) — segue com tema claro */
  }
})();
