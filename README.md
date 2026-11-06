# 📋 Fraseologia

**Sistema de templates para atendimento Field Services** – geração rápida de logs padronizados no dia a dia da equipe de suporte.

![Status do Projeto](https://img.shields.io/badge/status-em%20produ%C3%A7%C3%A3o-brightgreen)
![Versão](https://img.shields.io/badge/vers%C3%A3o-2.2-blue)
![License](https://img.shields.io/badge/license-MIT-red)

---

## 🚀 Sobre o projeto

O **Fraseologia** foi desenvolvido para otimizar o atendimento da equipe **Field Services da Serasa Experian**, permitindo a geração de logs padronizados com poucos cliques. O sistema reúne templates para as situações mais comuns do dia a dia, garantindo agilidade e consistência nas respostas.

---

## ✨ Funcionalidades

- ✅ **Página inicial** com menu em blocos (grid de acesso rápido aos templates)
- ✅ **15+ templates** para diferentes cenários de atendimento
- ✅ **Modo Claro / Escuro** com persistência local e **sem piscada** entre páginas
- ✅ **Gerador de senha** com fluxo de reset: usuário do colaborador + técnico
  responsável (lista editável) e resultado pronto no formato do chamado
- ✅ **Validação de campos obrigatórios**
- ✅ **Menu ativo** com destaque visual
- ✅ **Atalhos de teclado** (`Ctrl+Enter` para gerar log, `Ctrl+C` para copiar o
  resultado e `Ctrl+L` para limpar)
- ✅ **Responsivo** (funciona em desktop e mobile)
- ✅ **Copiar log** com um clique
- ✅ **Paleta híbrida** (Tivit + Serasa Experian)

---

## 🗂️ Estrutura do projeto

```text
Fraseologia/
├── assets/images/        # logotipos e favicon
├── components/           # header e footer compartilhados (única fonte do menu)
├── css/style.css         # estilos (claro + escuro)
├── js/
│   ├── theme.js          # tema anti-flash (incluído no <head> de cada página)
│   ├── main.js           # funções globais (toggle, toasts, atalhos, validação)
│   └── components.js     # carrega header/footer em qualquer página
├── pages/                # 15 templates de fraseologia + gerador de senha
├── index.html            # página inicial
├── Documentação.md       # documento oficial de evolução e roadmap
├── CHANGES.md            # changelog da versão atual
└── .gitignore
```

### Como adicionar uma nova fraseologia

1. Duplique uma página existente em `pages/` (ex.: `agendamento.html`);
2. Ajuste título, campos e a função `window.gerarLog` da nova página;
3. Adicione o item no menu em **um único lugar**: `components/header.html`;
4. (Opcional) Adicione um card na home: `index.html`.

Pronto — o novo item aparece em **todas** as páginas automaticamente.

---

## 🛠️ Tecnologias

HTML, CSS e JavaScript puro (sem frameworks, sem build). Aplicação 100% estática —
qualquer hospedagem de arquivos estáticos serve.

---

## 🌐 Deploy (Vercel)

1. Faça push deste repositório para o GitHub;
2. No Vercel: **Add New → Project → importe o repositório `Fraseologia`**;
3. Nenhuma configuração extra é necessária (framework: *Other* / estático);
4. Após o deploy, a home fica disponível na URL raiz do projeto.

---

## 📖 Documentação

- [`Documentação.md`](Documentação.md) — propósito, contexto operacional, problemas
  conhecidos e roadmap oficial de evolução;
- [`CHANGES.md`](CHANGES.md) — o que mudou nas versões 2.1 e 2.2.
