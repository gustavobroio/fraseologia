# 📋 Changelog — Fraseologia

---

## 🆕 v2.2 — Ajustes solicitados pela equipe (Novembro/2026)

1. **Módulo Rollout removido 100% da interface** — submenu "Rollout ▾" do menu,
   card "Em breve" da home, função `initRolloutSubmenu()` (JS) e todo o CSS do
   submenu. Não resta mais nenhuma referência a Rollout no site.
2. **Home enxuta** — na página inicial o menu antigo do header fica oculto
   (classe `pagina-home` no `<body>`); a navegação passa a ser feita apenas pelo
   menu em blocos (grid de cards). Nas páginas internas o menu do header
   permanece exatamente como era.
3. **Sem amarelo no menu** — removido o destaque do item "Gerador de Senha"
   (classe `destaque` e todo o seu CSS), que agora é um item comum do menu.
4. **Gerador de senha com fluxo de reset:**
   - novo campo **Usuário do colaborador** — aceita LanID (`C12345Q`), SMP
     (`SMP1234`) ou `nome.sobrenome`;
   - novo campo **Técnico responsável** com lista editável: é possível adicionar
     e remover técnicos (rotatividade da equipe), e a lista fica salva no
     navegador (`localStorage`, chave `fraseologia-tecnicos`);
   - ao gerar, o resultado sai no formato
     `USUARIO - SENHA GERADA - TEC RESPONSAVEL`, pronto para copiar e colar
     no chamado;
   - "Copiar senha" passou a ser **"Copiar resultado"** (copia a linha completa).
5. **Ctrl+L no gerador** — o atalho de limpar não zera mais o slider de tamanho
   da senha (inputs do tipo `range` ficam de fora da limpeza).
6. **Home: header e boas-vindas viraram uma coisa só** — a seção que explicava o
   sistema (com o título duplicado "📋 Fraseologia") foi integrada ao próprio
   header: logos + título FRASEOLOGIA + explicação + atalhos num único bloco.
7. **Nova regra global: Ctrl+C copia o resultado** — em qualquer página de
   fraseologia, se nada estiver selecionado, Ctrl+C copia direto o log gerado
   (no gerador de senha, copia o resultado exibido). Se houver texto
   selecionado, o navegador mantém a cópia normal — a regra não interfere
   no Ctrl+C comum.
8. **Correção: campo da senha no modo escuro** — o estilo inline do gerador
   ainda usava `body.dark-mode`, mas desde a v2.1 a classe fica no `<html>`;
   o seletor morto fazia o campo ficar claro no tema escuro. Corrigido para
   `html.dark-mode`.

---

## v2.1 — Correção de bugs + refatoração + home

**Data:** Novembro/2026
**Escopo desta versão:** correção de bugs + refatoração de manutenção + página inicial.

Esta versão atende às **Prioridades 1, 3 e 4** do roadmap oficial (`Documentação.md`):
redução de duplicação, publicação correta e correção de problemas de UX.

---

## ✅ Correções de bugs

1. **Piscada ao trocar de páginas (Problema nº4 do roadmap) — ELIMINADA.**
   - Causa raiz: o script inline de dark-mode rodava no `<head>` tentando acessar
     `document.body`, que ainda não existe nessa fase → `TypeError` → o tema nunca
     era aplicado no carregamento (confirmado em teste: a classe não aparecia).
   - Adicionalmente, `inicio_atendimento.html` tinha um `<script>` no lugar de
     `</script>`, fundindo dois scripts num bloco com erro de sintaxe.
   - Solução: novo arquivo `js/theme.js`, incluído no `<head>` de todas as páginas,
     aplicando a classe `dark-mode` direto no `<html>` ANTES do primeiro render.

2. **5 páginas renderizavam sem CSS nenhum** — `cancelamento`, `devolucao_estoque`,
   `encerramento`, `inicio_atendimento` e `pendente_fornecedor` não tinham o
   `<link rel="stylesheet">`. Agora todas as páginas têm o head completo e idêntico
   (CSS, favicon, tema).

3. **Texto de código órfão visível no gerador de senha** — restos de um script antigo
   (`})();`) eram exibidos no topo da página. Removidos.

4. **Favicon ausente em 5 páginas** — padronizado em todas (e na nova home).

5. **`</head>` / `<body>` ausentes** em algumas páginas (estrutura HTML quebrada,
   aceita apenas pela tolerância do navegador). Normalizados.

6. **Atalho Ctrl+L quebrava em páginas sem bloco de log** (home, gerador de senha)
   — `limparFormulario()` agora verifica se o elemento existe antes de usá-lo.

7. **Botão fantasma no header** — o `.menu-toggle` chamava `toggleMenu()`, função
   que não existe em nenhum arquivo (clicar gerava erro no console). Removido;
   quando o menu hambúrguer de fato for implementado (Problema nº6), entra no lugar.

8. **`.gitignore` em UTF-16** — não era lido corretamente pelo git (por isso o
   arquivo de favoritos pessoais escapou para o repositório). Reescrito em UTF-8.

9. **Removido o arquivo `favoritos_08_06_2026. html.html`** — exportação de bookmarks
   pessoais commitada por acidente. ⚠️ Ver a nota de segurança abaixo.

10. **Estouro horizontal no mobile (375px)** — três causas, todas pré-existentes:
    - `grid-column: span 2` inline/por classe em `tentativa_contato`,
      `substituicao` e `pendente_fornecedor` criava uma coluna implícita no grid
      de coluna única → substituído por `grid-column: 1 / -1` (idiomático, ocupa a
      linha inteira em qualquer largura);
    - `h1` dos cards em `display: flex` não quebrava títulos longos
      ("Computador/periféricos") → adicionado `flex-wrap` + `overflow-wrap`;
    - rede de segurança no CSS mobile para futuros `span 2`.
    Resultado: **as 16 páginas agora cabem em 375px sem scroll horizontal.**

11. **Botão fixo de dark mode cobria conteúdo no fim do scroll** — adicionado
    espaço de respiro (`padding-bottom`) ao `body` para que o rodapé e a última
    fileira de cards da home nunca fiquem sob o botão.

## 🔧 Refatoração (Prioridade nº1 — manutenção)

- **Dark-mode deixou de ser duplicado:** eram ~22 linhas de script inline repetidas
  em cada uma das 15 páginas. Agora é **1 linha** por página (`theme.js`).
- **`components.js` reescrito:**
  - Fim do `setTimeout(100)` — a inicialização do menu ocorre imediatamente após a
    injeção do HTML (que é síncrona). Era a causa dos "problemas de carregamento".
  - Detecta sozinho se a página está na raiz ou em `/pages/` e ajusta caminhos —
    o mesmo header.html funciona na home e nos templates.
  - Mensagem visível de fallback caso o header não carregue.
- **Um único lugar para mudar o menu:** continua sendo `components/header.html`
  (agora com link "🏠 Início" no topo). Qualquer alteração reflete em todas as páginas.
- **`main.js`:** toggle de tema no `<html>` (mesmo alvo do theme.js), ícone do botão
  sincronizado após o carregamento do header, guard no limpar.

## 🎨 Consistência visual (sem mudar o visual)

- `select` agora tem o mesmo estilo de campos no tema claro (antes só funcionava
  no escuro — campos de seleção apareciam com cara de "sem estilo").
- Textareas padronizadas: `resize: vertical` + altura mínima/máxima iguais em todas
  as páginas (Problema nº5 — solução simples; o auto-grow fica como evolução futura).

## 🏠 Nova home (`index.html`)

- Página inicial na raiz do site: boas-vindas, atalhos de teclado e grid com os
  15 templates + gerador de senha em destaque + card "Rollout — em breve".
- Resolve o 404 da raiz do site (antes só era possível acessar `/pages/...` direto).

## 🚀 Deploy

- O README anterior apontava para `fraseologia-eight.vercel.app`, que retorna
  `404 DEPLOYMENT_NOT_FOUND` (deployment inexistente/removido).
- Com o `index.html` na raiz, basta reimportar o repositório no Vercel
  (Add New → Project → repositório `Fraseologia` → Deploy). Nenhuma configuração
  extra é necessária: é um site 100% estático.

---

## 🚨 Nota de segurança (importante)

O arquivo de favoritos removido contina bookmarks pessoais e ficou público no
histórico do GitHub enquanto esteve no repositório. Recomenda-se:

1. `git rm "favoritos_08_06_2026. html.html"` ao commitar esta versão (a pasta
   entregue já vem sem ele);
2. Remover o arquivo do histórico: `git filter-repo --path "favoritos_08_06_2026. html.html" --invert-paths`
   (ou usar o BFG) e forçar o push;
3. Se algum favorito continha links internos sensíveis, avaliar o impacto.

---

## 📁 Estrutura após esta versão

```text
Fraseologia/
├── assets/images/
├── components/          # header.html e footer.html (única fonte do menu)
├── css/style.css
├── js/
│   ├── theme.js         # NOVO — tema anti-flash (1 linha por página)
│   ├── main.js          # funções globais (toggle, toasts, atalhos, validação)
│   └── components.js    # loader do header/footer (sem setTimeout)
├── pages/               # 15 templates + gerador de senha
├── index.html           # NOVO — home com grid de templates
├── Documentação.md      # roadmap oficial (renomeado p/ renderizar no GitHub)
├── CHANGES.md           # este changelog
├── README.md
└── .gitignore           # UTF-8 válido
```
