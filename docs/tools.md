# Ferramentas do Projeto

## Principais ferramentas escolhidas

### Frontend
- `Vue 3` — biblioteca progressiva para construção de interfaces reativas.
- `Nuxt 3` — framework para Vue que facilita roteamento, SSR/SSG, e estrutura de projeto.
- `TypeScript` — tipagem estática para maior segurança e produtividade.
- `Tailwind CSS` — framework de utilitários CSS para construir interfaces rápidas e responsivas.
- `Pinia` — gerenciamento de estado moderno para Vue.
- `Zod` — validação de schemas TypeScript no frontend (e backend, se desejado).

### Backend
- `Express.js` — framework minimalista para criar APIs REST.
- `Socket.io` — comunicação em tempo real entre cliente e servidor via WebSockets.
- `Prisma` — ORM para modelar e acessar o banco de dados MySQL com TypeScript.
- `MySQL` — banco de dados relacional robusto e amplamente usado.
- `JWT` — autenticação via token para rotas protegidas.
- `bcrypt` — hashing seguro de senhas.
- `cors` — configuração de políticas de origem para segurança nas APIs.
- `helmet` — cabeçalhos HTTP para proteção básica contra ataques web.

### Ferramentas úteis adicionais
- `dotenv` — carregamento de variáveis de ambiente para configuração segura.
- `ESLint` — linting de código para manter qualidade e consistência.
- `Prettier` — formatação automática de código.
- `Husky` — hooks de Git para garantir que testes e lint rodem antes de commits.
- `Lint-staged` — executa checagens apenas nos arquivos alterados.
- `Docker` — opcional para rodar MySQL e a aplicação de forma isolada.

## Ferramentas auxiliares recomendadas
- `Swagger` ou `OpenAPI` — documentação automática das APIs REST.
- `Postman` / `Insomnia` — testes e validação das rotas backend.
- `Vue DevTools` — depuração de estado e componentes Vue.
- `Chrome DevTools` — depuração, inspeção de rede e desempenho.
- `Prisma Studio` — interface visual para explorar dados no banco.

## Como cada ferramenta contribui para o projeto

### Nuxt 3 + Vue 3
- Permite construção de SPA/SSR com roteamento e carregamento otimizado.
- Oferece convenções que aceleram desenvolvimento e organização.

### Tailwind CSS
- Facilita estilos responsivos sem escrever classes CSS repetitivas.
- Permite prototipagem rápida e consistência visual.

### Express.js + Socket.io
- `Express` fornece rotas REST e middleware.
- `Socket.io` viabiliza chat e notificações em tempo real com fallback automático.

### Prisma + MySQL
- `Prisma` simplifica modelagem e queries com TypeScript.
- `MySQL` suporta relacionamentos e dados estruturados do sistema de projetos.

### TypeScript
- Reduz bugs com tipagem estática e autocompletar.
- Facilita refatorações e documentação implícita de contratos.

## Sugestão de versão inicial do projeto
1. Configurar Nuxt 3 + Tailwind + TypeScript.
2. Configurar backend Express com TypeScript.
3. Configurar MySQL local ou Docker.
4. Adicionar Prisma e gerar schema inicial.
5. Integrar JWT e autenticação básica.
