# Índice do Projeto

## 1. Visão Geral do Projeto

Este projeto é uma plataforma de colaboração e gerenciamento de projetos com chat em tempo real.

- Usuários podem criar contas, participar de equipes e trabalhar em projetos
- Cada projeto comporta tarefas, membros, comentários e arquivos
- O chat em tempo real permite comunicação instantânea entre membros
- Notificações mostram atualizações importantes sem precisar recarregar

## 2. Arquitetura

```
[Frontend Nuxt 3] <---> [Backend Express.js / API REST] <---> [MySQL + Prisma]
                         |
                         |-- Socket.io (Realtime Chat)
```

### Frontend
- `Nuxt 3` com `Vue 3` e `TypeScript`
- `Tailwind CSS` para interface responsiva
- `Pinia` para gerenciamento de estado
- Páginas principais: login, dashboard, projetos, tarefa, chat, perfil

### Backend
- `Express.js` para rotas REST
- `Socket.io` para comunicação em tempo real
- `Prisma` para conexão e modelagem de dados MySQL
- Autenticação com JWT e autorização por papéis

### Banco de Dados
- `MySQL` com schema relacional
- Uso de `Prisma` para migrations, queries e validação de dados

## 3. Módulos Principais

1. Autenticação e Usuários
2. Projetos e Equipes
3. Tarefas e Fluxo de Trabalho
4. Chat em Tempo Real
5. Notificações e Atualizações
6. Dashboard e Relatórios
7. Administração e Segurança

## 4. Ilustrações de Fluxo

### 4.1 Fluxo de login e dashboard

```
[Login] -> [Autenticação JWT] -> [Dashboard do Usuário]
```

### 4.2 Fluxo de projeto e tarefa

```
[Projeto] -> [Lista de Tarefas] -> [Detalhes da Tarefa] -> [Comentários / chat]
```

### 4.3 Fluxo de chat realtime

```
[Usuário] --emit--> [Socket.io Server] --broadcast--> [Outros usuários]
```

## 5. Como usar este índice

- Comece pelo módulo de `Autenticação e Usuários` para construir a base
- Avance para `Projetos e Equipes` uma vez que usuários estejam funcionando
- Depois implemente `Tarefas`, `Chat` e `Notificações`
- Finalize com `Dashboard` e `Admin`
