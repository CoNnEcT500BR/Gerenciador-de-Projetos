# Planejamento Detalhado do Projeto

## Visão do Projeto
Plataforma de colaboração para equipes gerenciarem projetos, tarefas e comunicação em tempo real.

## Objetivos Principais
- Sistema completo de autenticação e autorização
- Gestão de projetos, membros e tarefas
- Chat em tempo real com Socket.io
- Notificações e dashboard de métricas
- API segura e banco relacional escalável

## Módulos e Escopo

### Módulo 1: Autenticação e Usuários
- Cadastro de usuário com validação
- Login com JWT
- Recuperação de senha (opcional)
- Perfil do usuário
- Papéis: `user`, `manager`, `admin`

### Módulo 2: Projetos e Equipes
- CRUD completo de projetos
- Associação de membros a projetos
- Permissões de acesso por projeto
- Função de convite para equipe

### Módulo 3: Tarefas e Workflow
- CRUD de tarefas dentro de projetos
- Quadro Kanban com estados `PENDING`, `IN_PROGRESS` e `DONE`
- Alteração de estado persistida pela API
- Atribuição de responsáveis e prazos (próxima etapa de backend)
- Comentários ou notas associadas a tarefas (planejado)
- Anexos associados a tarefas (planejado; hoje os anexos pertencem ao chat/projeto)

### Módulo 4: Chat em Tempo Real
- Salas de chat por projeto
- Envio e recebimento instantâneo de mensagens
- Histórico de mensagens básico
- Indicação de usuários online

### Módulo 5: Notificações e Atualizações
- Notificações em tempo real via Socket.io
- Exibição de alertas para mudanças de tarefa, novo chat, convites
- Lista de notificações no frontend

### Módulo 6: Dashboard e Relatórios
- Visão geral de projetos e tarefas
- Progresso calculado a partir das tarefas existentes
- Tarefas atualizadas recentemente
- Atividades recentes com trilha de auditoria (próxima etapa)
- Gráficos de progresso de sprints ou etapas (planejado)
- Métricas de usuários e colaboração

### Módulo 7: Administração e Segurança
- Painel de administração com usuários e projetos
- Controle de permissões
- Hardening básico: CORS, Helmet, validação
- Logs simples de ações importantes

## Evolução da dashboard e do workspace

### Disponível com os contratos atuais
- A dashboard agrega projetos, contagens e progresso usando `GET /projects`.
- O quadro global e o quadro de cada projeto usam os estados aceitos pelo backend: `PENDING`, `IN_PROGRESS` e `DONE`. A mudança persiste por `PATCH /tasks/:id/status`.
- A página de projeto organiza visão geral, tarefas, arquivos, conversa e equipe em seções próprias, preservando o CRUD existente.
- A seção de arquivos reúne anexos encontrados nas 50 mensagens mais recentes retornadas por `GET /chat/projects/:projectId/messages`. Upload e download continuam usando as rotas de chat já existentes.
- Chat em tempo real, notificações, gestão de membros e perfil continuam usando as funções e rotas existentes.

### Próximas integrações de backend
1. **Responsáveis por tarefa:** adicionar `assigneeId` opcional em `Task`, relação com `User` e índice no banco. No `PATCH /tasks/:id`, aceitar apenas um responsável que seja membro do projeto; retornar dados mínimos do responsável nas consultas e emitir notificação quando houver atribuição ou remoção. A UI deve oferecer “Sem responsável” e seleção entre membros do projeto.
2. **Prazo e prioridade:** adicionar `dueDate` e `priority` com validação e defaults explícitos. Expor filtros por prazo, prioridade e pessoa no quadro; não inferir prazos nem prioridades no frontend.
3. **Biblioteca de arquivos do projeto:** criar `GET /projects/:id/attachments` com paginação por cursor, ordenação consistente e metadados de quem enviou e quando. Manter autorização por participação no projeto e o endpoint de download autenticado. A aba atual informa que sua lista cobre apenas as 50 mensagens mais recentes até a biblioteca dedicada existir.
4. **Atividade recente confiável:** registrar eventos persistentes (ator, projeto, tipo de entidade, ação, data e referência) para criação/edição/mudança de status, atribuição, anexos e mensagens. Expor um feed paginado para a dashboard; até lá, a seção recente é baseada em `Task.updatedAt`.
5. **Relatórios e administração:** após existir histórico de eventos e permissões administrativas, adicionar gráficos por período/projeto, carga por pessoa e telas de administração com controle de acesso. Evitar apresentar métricas não suportadas pela API.

As telas podem antecipar os pontos de extensão visualmente, mas controles de atribuição, prazo, prioridade, feed e administração só devem ser habilitados quando os contratos e a autorização correspondentes estiverem implementados.

## Estrutura Técnica

### Frontend (Nuxt 3)
- Páginas principais:
  - `/login`
  - `/register`
  - `/dashboard`
  - `/projects`
  - `/projects/[id]`
  - `/tasks`
  - `/messages`
  - `/profile`
- Componentes:
  - `ProjectCard`, `TaskList`, `ChatRoom`, `NotificationPanel`
- Estado: `Pinia`
- Estilização: `Tailwind CSS`
- Validação: `Zod` ou `Yup`

### Backend (Express + Socket.io)
- Rotas REST:
  - `POST /auth/login`
  - `POST /auth/register`
  - `GET /users/me`
  - `GET /projects`
  - `POST /projects`
  - `GET /projects/:id/tasks`
  - `POST /projects/:id/tasks`
  - `GET /chat/rooms`
- Realtime:
  - `socket.on('joinRoom')`
  - `socket.on('sendMessage')`
  - `socket.emit('receiveMessage')`
- Segurança:
  - `JWT` para autenticação
  - `middleware` de autorização
  - `cors`, `helmet`, `express.json()`

### Banco de Dados (MySQL + Prisma)
- Modelos principais:
  - `User`
  - `Project`
  - `Task`
  - `ProjectMember`
  - `Message`
  - `Notification`
- Relacionamentos:
  - Um `User` pode ter muitos `ProjectMember`
  - Um `Project` pode ter muitas `Task`
  - Um `Project` pode ter muitas `Message`

## Planejamento por fases

### Fase 1: Base e autenticação — existente
- Frontend, backend, banco, cadastro, login e perfil.

### Fase 2: Projetos, equipe e tarefas — existente
- CRUD de projetos, membros e tarefas; quadro de estados persistidos pela API.

### Fase 3: Realtime e notificações — existente
- Chat por projeto, anexos do chat, presença e notificações.

### Fase 4: Workspace e experiência de execução — em evolução
- Dashboard baseada em dados reais, navegação consistente, Kanban global e abas por projeto.
- Refinar métricas sem inventar dados e manter acessibilidade/responsividade.

### Fase 5: Backend de produtividade — próxima
- Responsáveis, prazos, prioridades, filtros e biblioteca completa de arquivos.
- Migrações de banco, validação, autorização, respostas da API e testes para cada contrato.

### Fase 6: Atividade, relatórios e administração — planejada
- Feed persistente, análises por período/equipe e administração protegida por papéis.

## Entregáveis Esperados
- Documentação clara e organizada
- Estrutura modular por frontend/backend
- Código com TypeScript e boas práticas
- Banco de dados relacional funcional
- Apresentação de features no GitHub
