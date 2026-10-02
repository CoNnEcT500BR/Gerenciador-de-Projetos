# Documentação Visual do Projeto

## 1. Visão Geral

Este projeto é uma plataforma de colaboração para equipes, unindo:
- gestão de projetos
- tarefas e estados
- chat em tempo real
- notificações
- dashboard de métricas

### Principais peças

- Frontend: Nuxt 3 + Vue 3 + TypeScript + Tailwind CSS
- Backend: Express.js + Socket.io
- Banco: MySQL + Prisma

---

## 2. Arquitetura Visual

```mermaid
flowchart LR
  F[Frontend Nuxt 3] -->|REST API| B[Backend Express.js]
  B -->|SQL Queries| D[(MySQL + Prisma)]
  F -->|WebSocket| S[Socket.io]
  B -->|Socket.io| S
  S -->|Realtime| F
```

### Explicação
- O frontend consome a API REST para todas as rotas de CRUD.
- O backend utiliza Prisma para acessar o MySQL.
- O Socket.io fica no backend e envia eventos em tempo real ao frontend.

---

## 3. Fluxos de Uso

### 3.1 Fluxo de login

```mermaid
graph TD
  A[Usuário] --> B[Login]
  B --> C[Backend Auth]
  C --> D[JWT]
  D --> E[Frontend recebe token]
  E --> F[Dashboard carregado]
```

### 3.2 Fluxo de projeto e tarefa

```mermaid
flowchart TB
  P[Projeto] --> T[Tarefas]
  T --> S[Status]
  S --> U[Comentários / Atualizações]
  U --> N[Notificações]
```

### 3.3 Fluxo de chat em tempo real

```mermaid
graph LR
  U[Usuário A] -->|Enviar mensagem| S[Socket.io]
  S -->|Broadcast| U2[Usuário B]
  U2 -->|Recebe mensagem| F[Interface]
```

---

## 4. Módulos do Sistema

### 4.1 Autenticação

- Cadastro de usuários
- Login com JWT
- Recuperação de senha opcional
- Papéis e permissões

### 4.2 Projetos e Equipes

- CRUD de projetos
- Membros atribuídos ao projeto
- Convites e permissões

### 4.3 Tarefas

- Tarefas dentro de projeto
- Estados: pendente, em andamento, concluída
- Comentários e anexos

### 4.4 Chat em Tempo Real

- Sala de chat por projeto
- Envio e recebimento instantâneo
- Indicador online/offline

### 4.5 Notificações

- Notificações em tempo real no frontend
- Atualizações de tarefas e chat
- Lista de notificações persistente

### 4.6 Dashboard

- Visão geral de projeto e tarefas
- Métricas de atividade
- Histórico de ações

---

## 5. Diagrama de Dados Simplificado

```mermaid
erDiagram
  USER ||--o{ PROJECT_MEMBER : belongs_to
  PROJECT ||--o{ PROJECT_MEMBER : has
  PROJECT ||--o{ TASK : contains
  PROJECT ||--o{ MESSAGE : contains
  USER ||--o{ MESSAGE : sends
  USER ||--o{ NOTIFICATION : receives
  PROJECT ||--o{ NOTIFICATION : relates_to
```

### Entidades-chave
- User
- Project
- Task
- Message
- Notification
- ProjectMember

---

## 6. Estrutura de Telas

### Telas principais

- Login / Registro
- Dashboard
- Lista de projetos
- Quadro global de tarefas (A fazer, Em andamento, Concluídas)
- Detalhe de projeto com abas: Visão geral, Tarefas, Arquivos, Conversa e Equipe
- Chat e anexos por projeto
- Perfil do usuário
- Administração (planejada)

### Layout visual

- Barra lateral de navegação
- Área principal com cards e listas
- Header com notificações e perfil
- Paleta teal e azul-escuro compartilhada com a página inicial, compatível com tema claro/escuro
- Responsivo e operável por teclado, com estados de carregamento, erro e vazio

### Extensões previstas para o backend

- Responsáveis, prazos e prioridades nas tarefas; enquanto a API não persistir esses dados, a interface não apresenta responsáveis fictícios.
- Biblioteca completa de arquivos do projeto. Até existir um endpoint paginado, a aba Arquivos é montada a partir das 50 mensagens mais recentes do chat.
- Feed de atividade persistente e relatórios. As tarefas recentes da dashboard usam os dados de atualização de tarefa disponíveis; não representam um histórico completo de ações.

### Comportamentos de interface

- Métricas e barras de progresso mostram “Sem tarefas” quando ainda não há dados para calcular uma porcentagem.
- A presença do chat contabiliza usuários únicos por projeto, mesmo quando a mesma pessoa abre mais de uma conexão.
