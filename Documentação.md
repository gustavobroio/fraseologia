# DOCUMENTO OFICIAL DE EVOLUÇÃO DO PROJETO FRASEOLOGIA

Versão: Junho/2026

Autor: Gustavo Broio

Objetivo deste documento:

Este documento tem como objetivo registrar o estado atual do projeto Fraseologia, seus objetivos, arquitetura, problemas conhecidos, limitações técnicas, necessidades operacionais e o roadmap completo de evolução.

O documento foi criado para que qualquer desenvolvedor, IA (DeepSeek, ChatGPT, Claude, Gemini, Copilot, etc.) ou colaborador consiga entender rapidamente:

- O propósito do sistema.
- O contexto operacional.
- As decisões tomadas até o momento.
- Os problemas atuais.
- As melhorias planejadas.
- As prioridades futuras.

Este documento deve ser considerado o guia principal para a evolução do projeto.

---

# 1. O QUE É O FRASEOLOGIA

O Fraseologia é uma ferramenta interna desenvolvida para equipes de Field Service.

Seu principal objetivo é automatizar a criação de logs padronizados utilizados em chamados.

O sistema surgiu de uma necessidade operacional real.

Antes de sua criação:

- Cada técnico escrevia os logs manualmente.
- Os textos possuíam variações entre analistas.
- Existiam erros de digitação.
- Existiam esquecimentos de procedimentos importantes.
- Havia perda de produtividade.

Após a criação do sistema:

- O usuário escolhe a fraseologia.
- Preenche os campos necessários.
- O sistema gera automaticamente o texto.
- O usuário copia e cola no chamado.

Resultado:

- Mais padronização.
- Mais velocidade.
- Menos erros.
- Melhor experiência operacional.

---

# 2. OBJETIVO PRINCIPAL DO PROJETO

O objetivo principal do Fraseologia NÃO é ser um projeto visual ou tecnológico.

O objetivo principal é:

Padronizar processos operacionais.

O foco da ferramenta é:

✅ Agilidade

✅ Padronização

✅ Redução de retrabalho

✅ Redução de erros

✅ Produtividade

---

# 3. EVOLUÇÃO DO PROJETO

O projeto começou como:

```text
Gerador de fraseologias.
```

Hoje o projeto está evoluindo para:

```text
Portal de produtividade para Field Service.
```

Ou seja.

O sistema não deve mais ser visto apenas como um gerador de logs.

Ele pode se tornar uma central operacional contendo:

- Fraseologias
- Gerador de senha
- Endereços
- Links rápidos
- Favoritos
- Procedimentos
- Ferramentas internas
- Módulo de Rollout

---

# 4. TECNOLOGIAS UTILIZADAS

Atualmente o sistema utiliza:

- HTML
- CSS
- JavaScript Vanilla
- LocalStorage

Não utiliza:

- React
- Angular
- Vue
- Node
- Banco de dados
- Backend

É uma aplicação estática.

Isso foi uma escolha proposital para manter:

- Simplicidade
- Facilidade de manutenção
- Facilidade de implantação

---

# 5. ESTRUTURA ATUAL

```text
Fraseologia/
│
├── assets/
│
├── css/
│   └── style.css
│
├── favoritos/
│
├── js/
│   └── main.js
│
├── pages/
│   ├── agendamento.html
│   ├── cancelamento.html
│   ├── deploy_terceiro.html
│   ├── devolucao_estoque.html
│   ├── encerramento.html
│   ├── endereco.html
│   ├── gerador_de_senha.html
│   ├── inicio_atendimento.html
│   ├── pendente_estoque.html
│   ├── pendente_fornecedor.html
│   ├── pendente_usuario.html
│   ├── solicitacao_computador.html
│   ├── solicitacao_periferico.html
│   ├── substituicao.html
│   └── tentativa_contato.html
│
├── README.md
└── .gitignore
```

---

# 6. FUNCIONALIDADES EXISTENTES

## Fraseologias

Existem diversas páginas responsáveis por gerar textos operacionais.

Exemplos:

- Início de Atendimento
- Tentativa de Contato
- Agendamento
- Encerramento
- Cancelamento
- Endereço
- Solicitações
- Estoque
- Deploy Terceiro

---

## Dark Mode

O usuário pode alternar entre:

- Tema Claro
- Tema Escuro

A preferência fica salva no LocalStorage.

---

## Sistema de Toast

Mensagens rápidas informam:

- Sucesso
- Erro
- Avisos
- Informações

---

## Validação

Campos obrigatórios são validados antes da geração do log.

---

## Atalhos

Existem atalhos de teclado.

Exemplo:

Ctrl + Enter

para gerar logs.

---

## Gerador de Senha

O gerador de senha foi uma das funcionalidades mais elogiadas internamente.

Possui:

- Tamanho configurável
- Letras maiúsculas
- Números
- Símbolos
- Indicador visual de segurança
- Cópia automática

Essa funcionalidade deve continuar sendo expandida.

---

# 7. PONTOS FORTES DO PROJETO

## Layout consolidado

O layout atual já é amplamente conhecido pelo time.

Os usuários sabem exatamente onde encontrar as informações.

Não existe necessidade de alterar drasticamente a interface.

---

## Simplicidade

A ferramenta é intuitiva.

O fluxo é simples:

```text
Selecionar página
↓
Preencher
↓
Gerar
↓
Copiar
```

---

## Velocidade

Poucos cliques.

Pouco tempo de treinamento.

---

## Utilidade real

O sistema resolve uma necessidade operacional concreta.

Não se trata apenas de um projeto de estudo.

---

## Gerador de Senha

É considerado um diferencial importante.

Foi muito bem recebido pela gestão.

---

# 8. PRINCIPAL PROBLEMA ATUAL

# PROBLEMA Nº 1

# MANUTENÇÃO

Este é disparado o maior problema existente hoje.

Atualmente praticamente todas as páginas possuem:

- Header
- Menu
- Footer
- Dark Mode
- Badge de versão

duplicados.

Exemplo:

agendamento.html

possui praticamente o mesmo menu existente em:

encerramento.html

que possui praticamente o mesmo menu existente em:

cancelamento.html

e assim por diante.

---

## Consequências

Se uma nova fraseologia for criada:

É necessário alterar o menu em todas as páginas.

Se um item mudar de nome:

É necessário alterar o menu em todas as páginas.

Se um link mudar:

É necessário alterar o menu em todas as páginas.

Isso aumenta:

- Tempo de manutenção.
- Possibilidade de erro.
- Inconsistência.

---

## Objetivo

Reduzir drasticamente a duplicação de código.

Meta:

```text
Alterar uma única vez
↓
Refletir em todas as páginas
```

---

## O que deve ser estudado

Possíveis abordagens:

- Componentização
- Menu compartilhado
- Header compartilhado
- Footer compartilhado
- Inclusão dinâmica via JavaScript

O objetivo é reduzir manutenção.

---

# PROBLEMA Nº 2

# GITHUB

Atualmente o projeto precisa ser preparado para versionamento correto.

Objetivo:

Subir o projeto de maneira organizada no GitHub.

---

## Benefícios

- Controle de versão.
- Backup.
- Histórico.
- Facilidade para futuras integrações.
- Base para deploy no Vercel.

---

# PROBLEMA Nº 3

# DEPLOY

O sistema atualmente roda localmente.

Objetivo:

Publicar em produção no Vercel.

Exemplo:

```text
https://fraseologia.vercel.app
```

---

## Benefícios

Atualização centralizada.

Todos utilizam a mesma versão.

Não será necessário compartilhar arquivos.

Novas funcionalidades ficam disponíveis imediatamente.

---

# PROBLEMA Nº 4

# PISCADA ENTRE PÁGINAS

Existe uma piscada visual durante a troca de páginas.

Duração:

Milissegundos.

Mas é perceptível.

E visualmente incomoda.

---

## Possíveis causas

### Hipótese 1

Dark Mode sendo aplicado após a página ser renderizada.

Fluxo suspeito:

```text
Página abre
↓
Tema claro aparece
↓
JavaScript executa
↓
Tema escuro é ativado
```

---

### Hipótese 2

Recarregamento de imagens.

---

### Hipótese 3

Recarregamento completo de elementos repetidos.

---

## Objetivo

Eliminar completamente essa piscada.

---

# PROBLEMA Nº 5

# TEXTAREAS

Foi identificado um comportamento inconsistente.

Alguns campos de observação permitem expansão ilimitada.

Outros permitem apenas uma expansão parcial.

Isso gera inconsistência na experiência.

---

## Objetivo

Todos os textareas devem se comportar da mesma forma.

---

## Avaliar

### Opção 1

```css
resize: vertical;
```

---

### Opção 2

Auto Grow.

Quando o usuário digita:

```text
Campo cresce automaticamente.
```

Essa é atualmente a opção preferida.

---

# PROBLEMA Nº 6

# MENU HAMBÚRGUER

Desejo futuro.

Importante:

O menu atual NÃO deve ser removido.

O time está acostumado com ele.

O menu hambúrguer será um complemento.

Não substituirá a navegação principal.

---

## Objetivo

Criar um espaço para recursos auxiliares.

Exemplo:

```text
☰

Links Rápidos

Ferramentas

Favoritos

Documentação

Sobre
```

---

# PROBLEMA Nº 7

# BUSCA GLOBAL

Com o crescimento do sistema, localizar páginas ficará mais difícil.

Objetivo:

Adicionar um mecanismo de busca.

---

## Exemplo

Usuário digita:

```text
agenda
```

Resultado:

```text
Agendamento
```

---

Usuário digita:

```text
encerr
```

Resultado:

```text
Encerramento
```

---

Usuário digita:

```text
deploy
```

Resultado:

```text
Páginas do Rollout
```

---

## Benefícios

- Mais velocidade.
- Melhor escalabilidade.
- Melhor experiência.

---

# PROBLEMA Nº 8

# ROLLOUT

O submenu já existe.

Porém as páginas ainda não foram criadas.

Hoje existem apenas placeholders.

---

## Páginas planejadas

### Início Deploy

---

### Encerramento Deploy

---

### Agendamento e Configuração da Máquina

---

### Encerramento Rollout

---

### Encerramento de Configuração FY27

---

### Notebook Deploy Finalizado FY27

---

### Notebook em Processo de Deploy FY27

---

## Requisitos

Todas devem seguir:

- Mesmo layout.
- Mesmo padrão visual.
- Mesmo Dark Mode.
- Mesmo comportamento do restante do sistema.

---

# VISÃO FUTURA

O Fraseologia deve evoluir para uma plataforma única para Field Service.

Objetivo final:

```text
Fraseologias
+
Gerador de Senha
+
Links Rápidos
+
Favoritos
+
Endereços
+
Rollout
+
Ferramentas Operacionais
```

Tudo centralizado.

Tudo acessível em poucos cliques.

Tudo hospedado online.

---

# ROADMAP OFICIAL

## PRIORIDADE 1

Resolver manutenção.

```text
Reduzir duplicação
Centralizar elementos compartilhados
Facilitar evolução do projeto
```

---

## PRIORIDADE 2

Subir o projeto corretamente no GitHub.

```text
Versionamento
Backup
Preparação para deploy
```

---

## PRIORIDADE 3

Publicar no Vercel.

```text
URL pública
Atualizações centralizadas
Distribuição simplificada
```

---

## PRIORIDADE 4

Corrigir problemas de UX.

```text
Eliminar piscada
Padronizar textareas
Melhorar consistência visual
```

---

## PRIORIDADE 5

Criar Menu Hambúrguer.

```text
Links rápidos
Ferramentas
Documentação
Favoritos
```

---

## PRIORIDADE 6

Implementar Busca Global.

```text
Busca instantânea
Navegação rápida
Escalabilidade
```

---

## PRIORIDADE 7

Desenvolver módulo completo de Rollout.

```text
Todas as páginas
Templates
Automações
Fluxos FY27
```

---

# CONCLUSÃO

O Fraseologia já atingiu seu objetivo principal:

Padronizar logs e aumentar a produtividade.

O foco agora não deve ser criar dezenas de novas funcionalidades imediatamente.

A prioridade é:

1. Tornar o sistema fácil de manter.
2. Tornar o sistema fácil de publicar.
3. Tornar o sistema fácil de evoluir.

Após isso, novas funcionalidades poderão ser adicionadas com muito mais segurança e velocidade.
