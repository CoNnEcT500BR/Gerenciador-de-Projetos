# Setup Modular do Projeto

## 1. Estrutura de pastas sugerida

```
Projeto/
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.middleware.ts
│   │   │   └── auth.schema.ts
│   │   ├── projects/
│   │   │   ├── project.controller.ts
│   │   │   ├── project.service.ts
│   │   │   ├── project.routes.ts
│   │   │   └── project.schema.ts
│   │   ├── tasks/
│   │   │   ├── task.controller.ts
│   │   │   ├── task.service.ts
│   │   │   ├── task.routes.ts
│   │   │   └── task.schema.ts
│   │   ├── chat/
│   │   │   ├── chat.gateway.ts
│   │   │   ├── chat.service.ts
│   │   │   └── chat.types.ts
│   │   ├── notifications/
│   │   │   ├── notification.service.ts
│   │   │   └── notification.types.ts
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── client.ts
│   │   ├── shared/
│   │   │   ├── config.ts
│   │   │   ├── errors.ts
│   │   │   └── utils.ts
│   │   ├── app.ts
│   │   ├── server.ts
│   │   └── socket.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── assets/
│   ├── components/
│   │   ├── auth/
│   │   ├── projects/
│   │   ├── tasks/
│   │   ├── chat/
│   │   ├── notifications/
│   │   └── dashboard/
│   ├── composables/
│   ├── pages/
│   │   ├── index.vue
│   │   ├── login.vue
│   │   ├── register.vue
│   │   ├── dashboard.vue
│   │   ├── projects/
│   │   └── profile.vue
│   ├── stores/
│   ├── styles/
│   ├── plugins/
│   ├── nuxt.config.ts
│   ├── package.json
│   └── tsconfig.json
├── docs/
│   ├── index.md
│   ├── plan.md
│   ├── tools.md
│   ├── setup.md
│   └── visual-doc.md
└── .gitignore
```

## 2. Setup inicial do projeto

### 2.1 Backend

1. criar pasta `backend/`
2. inicializar npm:
   - `npm init -y`
3. instalar dependências:
   - `npm install express socket.io dotenv cors helmet bcrypt jsonwebtoken prisma @prisma/client`
4. instalar dependências de desenvolvimento:
   - `npm install -D typescript ts-node-dev @types/node @types/express @types/cors @types/jsonwebtoken @types/bcrypt`
5. configurar TypeScript:
   - `npx tsc --init`
6. configurar Prisma:
   - `npx prisma init`
   - ajustar `prisma/schema.prisma`
   - `npx prisma migrate dev --name init`

### 2.2 Frontend

1. criar pasta `frontend/`
2. inicializar Nuxt 3 com TypeScript e Tailwind:
   - `npx nuxi init frontend`
3. instalar dependências:
   - `npm install nuxt@latest vue@latest @pinia/nuxt @nuxtjs/tailwindcss zod axios`
4. configurar o `nuxt.config.ts`
5. criar páginas e componentes menores por módulo

## 3. Setup por módulos

### 3.1 Módulo de Autenticação

- Frontend:
  - `components/auth/LoginForm.vue`
  - `components/auth/RegisterForm.vue`
  - `composables/useAuth.ts`
  - `stores/auth.ts`
- Backend:
  - `src/auth/auth.routes.ts`
  - `src/auth/auth.controller.ts`
  - `src/auth/auth.service.ts`
  - `src/auth/auth.middleware.ts`
  - `src/auth/auth.schema.ts`
- Banco:
  - `User` model em `schema.prisma`

### 3.2 Módulo de Projetos

- Frontend:
  - `components/projects/ProjectCard.vue`
  - `components/projects/ProjectList.vue`
  - `pages/projects/index.vue`
  - `pages/projects/[id].vue`
- Backend:
  - `src/projects/project.routes.ts`
  - `src/projects/project.controller.ts`
  - `src/projects/project.service.ts`
  - `src/projects/project.schema.ts`
- Banco:
  - `Project`, `ProjectMember`

### 3.3 Módulo de Tarefas

- Frontend:
  - `components/tasks/TaskCard.vue`
  - `components/tasks/TaskForm.vue`
  - `pages/projects/[id]/tasks.vue`
- Backend:
  - `src/tasks/task.routes.ts`
  - `src/tasks/task.controller.ts`
  - `src/tasks/task.service.ts`
  - `src/tasks/task.schema.ts`
- Banco:
  - `Task`

### 3.4 Módulo de Chat

- Frontend:
  - `components/chat/ChatRoom.vue`
  - `components/chat/MessageList.vue`
  - `components/chat/MessageInput.vue`
- Backend:
  - `src/chat/chat.gateway.ts`
  - `src/chat/chat.service.ts`
  - `src/chat/chat.types.ts`
- Banco:
  - `Message`

### 3.5 Módulo de Notificações

- Frontend:
  - `components/notifications/NotificationPanel.vue`
  - `stores/notification.ts`
- Backend:
  - `src/notifications/notification.service.ts`
  - `src/notifications/notification.types.ts`
- Banco:
  - `Notification`

### 3.6 Módulo de Dashboard

- Frontend:
  - `components/dashboard/StatsCard.vue`
  - `components/dashboard/ActivityFeed.vue`
  - `pages/dashboard.vue`
- Backend:
  - rotas e serviços para métricas e relatórios
- Banco:
  - consultas agregadas em tempo real

## 4. Estrutura de arquivos menores

- Separe cada recurso em arquivos específicos.
- Prefira um arquivo por controller, rota, serviço e schema.
- No frontend, use componentes pequenos e reutilizáveis.
- Nos stores, crie um arquivo por módulo de estado.

## 5. Scripts recomendados

### Backend (`backend/package.json`)
```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev"
  }
}
```

### Frontend (`frontend/package.json`)
```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "preview": "nuxt preview"
  }
}
```
