<template>
  <div class="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
    <div class="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 lg:px-8">

      <!-- HEADER -->
      <header
        class="mb-14 flex flex-col gap-4 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/60 px-5 py-3 backdrop-blur lg:flex-row lg:items-center lg:justify-between"
      >
        <div class="flex items-center justify-between gap-4">
          <BrandLogo />
        </div>

        <nav class="hidden items-center gap-6 text-sm font-medium text-[color:var(--text-muted)] lg:flex">
          <a href="#recursos" class="transition hover:text-[color:var(--text)]">Recursos</a>
          <a href="#depoimentos" class="transition hover:text-[color:var(--text)]">Empresa</a>
          <a href="#faq" class="transition hover:text-[color:var(--text)]">FAQ</a>
        </nav>

        <div class="flex items-center gap-3">
          <ThemeToggle />

          <NuxtLink
            to="/login"
            class="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/40 px-4 py-2 text-sm font-medium text-[color:var(--text)] transition hover:bg-[color:var(--bg-button-hover)] hover:text-[color:var(--text-button-hover)]"
          >
            Entrar
          </NuxtLink>

          <NuxtLink
            to="/register"
            class="rounded-full bg-[color:var(--bg-button)] border border-[color:var(--border)] px-4 py-2 text-sm font-semibold text-[color:var(--text-button)] transition hover:bg-[color:var(--bg-button-hover)] hover:text-[color:var(--text-button-hover)]"
          >
            Criar conta
          </NuxtLink>
        </div>
      </header>

      <!-- HERO -->
      <main class="grid items-center gap-10 pb-16 lg:grid-cols-[0.95fr_1.15fr]">

        <!-- LEFT -->
        <section class="space-y-6">

          <div class="inline-flex rounded-full border border-[color:var(--accent-soft-border)] bg-[color:var(--accent-soft-bg)] px-3 py-1 text-sm font-medium text-[color:var(--text-info)]">
            Gestão inteligente para equipes modernas
          </div>

          <h1 class="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            O espaço de trabalho da <span class="text-[color:var(--primary)]">sua equipe.</span>
          </h1>

          <p class="max-w-md text-lg leading-8 text-[color:var(--text-muted)]">
            Projetos, tarefas e comunicação em um único lugar para você e seu time entregarem mais, com menos esforço.
          </p>

          <div class="flex flex-wrap gap-4">
            <NuxtLink
              to="/register"
              class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-button)] px-6 py-3 font-semibold text-[color:var(--text-button)] transition hover:text-[color:var(--text-button-hover)] hover:border-[color:var(--border-hover)] hover:bg-[color:var(--bg-button-hover)]"
            >
              Começar gratuitamente →
            </NuxtLink>

            <a
              href="#recursos"
              class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/40 px-6 py-3 font-semibold text-[color:var(--text)] transition hover:text-[color:var(--text-button-hover)] hover:border-[color:var(--border-hover)] hover:bg-[color:var(--bg-button-hover)]"
            >
              Ver demonstração
            </a>
          </div>

          <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[color:var(--text-muted)]">
            <span class="flex items-center gap-2">
              <span class="text-[color:var(--success-text)]">✓</span>
              Sem cartão de crédito
            </span>
            <span class="flex items-center gap-2">
              <span class="text-[color:var(--success-text)]">✓</span>
              Cancelamento fácil
            </span>
          </div>
        </section>

        <!-- RIGHT: PRODUCT MOCKUP -->
        <section class="relative">
          <div class="overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[0_25px_60px_-15px_var(--shadow-tint-soft)]">
            <div class="flex">
              <!-- mini sidebar -->
              <div class="hidden w-40 shrink-0 flex-col gap-1 border-r border-[color:var(--border)] bg-[color:var(--surface-2)]/50 p-3 sm:flex">
                <div class="mb-3 flex items-center gap-2 text-xs font-semibold text-[color:var(--text)]">
                  <span class="flex h-5 w-5 items-center justify-center rounded-md bg-linear-to-br from-[color:var(--brand-from)] to-[color:var(--brand-to)] text-[10px] text-[color:var(--brand-icon)]">N</span>
                  NovaHub
                </div>
                <span
                  v-for="item in mockNav"
                  :key="item.label"
                  class="rounded-lg px-2 py-1.5 text-xs"
                  :class="item.active ? 'bg-[color:var(--accent-soft-bg)] font-medium text-[color:var(--text-info)]' : 'text-[color:var(--text-muted)]'"
                >
                  {{ item.icon }} {{ item.label }}
                </span>
              </div>

              <!-- main mock content -->
              <div class="min-w-0 flex-1 p-4">
                <div class="flex items-center justify-between gap-2">
                  <p class="truncate text-sm font-semibold text-[color:var(--text)]">Boas-vindas, Diego! 👋</p>
                  <div class="flex shrink-0 items-center gap-2">
                    <span class="hidden rounded-full border border-[color:var(--border)] px-2 py-1 text-[10px] text-[color:var(--text-muted)] sm:inline">🔍 Buscar...</span>
                    <span class="text-xs">🔔</span>
                    <span class="h-6 w-6 rounded-full bg-linear-to-br from-[color:var(--brand-from)] to-[color:var(--brand-to)]"></span>
                  </div>
                </div>

                <div class="mt-4 grid grid-cols-2 gap-2 text-[11px] sm:grid-cols-4">
                  <div v-for="stat in statCards" :key="stat.label" class="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)]/60 p-2">
                    <p class="text-[color:var(--text-muted)]">{{ stat.label }}</p>
                    <p class="text-sm font-semibold text-[color:var(--text)]">{{ stat.value }}</p>
                    <p class="text-[10px] text-[color:var(--success-text)]">{{ stat.delta }}</p>
                  </div>
                </div>

                <div class="mt-4 grid gap-3 text-[11px] sm:grid-cols-2">
                  <div class="rounded-lg border border-[color:var(--border)] p-3">
                    <p class="mb-2 font-semibold text-[color:var(--text)]">Projetos em andamento</p>
                    <div v-for="project in projects" :key="project.name" class="mb-2 last:mb-0">
                      <div class="flex justify-between text-[color:var(--text)]">
                        <span>{{ project.name }}</span>
                        <span>{{ project.percent }}%</span>
                      </div>
                      <div class="mt-1 h-1.5 rounded-full bg-[color:var(--surface-2)]">
                        <div
                          class="h-1.5 rounded-full bg-linear-to-r from-[color:var(--brand-from)] to-[color:var(--brand-to)]"
                          :style="{ width: project.percent + '%' }"
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div class="rounded-lg border border-[color:var(--border)] p-3">
                    <p class="mb-2 font-semibold text-[color:var(--text)]">Atividades recentes</p>
                    <div v-for="activity in activities" :key="activity.text" class="mb-2 flex items-start gap-2 last:mb-0">
                      <span class="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-linear-to-br from-[color:var(--brand-from)] to-[color:var(--brand-to)]"></span>
                      <div>
                        <p class="text-[color:var(--text)]">{{ activity.text }}</p>
                        <p class="text-[10px] text-[color:var(--text-muted)]">{{ activity.time }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- floating chat bubble -->
          <div class="absolute -bottom-6 left-6 w-64 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-3 text-xs shadow-[0_15px_35px_-10px_var(--shadow-tint-soft)] sm:left-10">
            <div class="flex items-start gap-2">
              <img src="https://i.pravatar.cc/48?img=47" alt="Marina" class="h-6 w-6 shrink-0 rounded-full object-cover" />
              <div>
                <p class="font-semibold text-[color:var(--text)]">Marina <span class="ml-1 font-normal text-[color:var(--text-muted)]">agora</span></p>
                <p class="text-[color:var(--text-muted)]">Pessoal, a nova versão da homepage está pronta para revisão! 🎉</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <!-- LOGOS -->
      <section class="border-y border-[color:var(--border)] bg-[color:var(--surface)]/60 py-14">
        <p class="text-center text-sm font-bold uppercase tracking-[0.35em] text-[color:var(--text)]">
          Empresas que confiam na NovaHub
        </p>
        <div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <div
            v-for="company in companies"
            :key="company.name"
            class="flex items-center justify-center gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4 text-lg font-bold text-[color:var(--text)] shadow-[0_10px_25px_-15px_var(--shadow-tint-soft)] transition hover:border-[color:var(--border-hover)]"
          >
            <span class="text-xl">{{ company.icon }}</span>
            {{ company.name }}
          </div>
        </div>
      </section>

      <!-- RECURSOS -->
      <section id="recursos" class="scroll-mt-24 border-t border-[color:var(--border)] py-20">
        <div class="mx-auto max-w-3xl text-center">
          <div class="inline-flex rounded-full border border-[color:var(--accent-soft-border)] bg-[color:var(--accent-soft-bg)] px-3 py-1 text-sm font-medium text-[color:var(--text-info)]">
            Recursos
          </div>
          <h2 class="mt-4 text-3xl font-semibold sm:text-4xl">Tudo que sua equipe precisa, em um só lugar</h2>
          <p class="mt-3 text-lg leading-8 text-[color:var(--text-muted)]">
            Ferramentas pensadas para reduzir ruído de comunicação e acelerar decisões.
          </p>
        </div>

        <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="feature in features" :key="feature.title">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--accent-soft-bg)] text-xl">
              {{ feature.icon }}
            </div>
            <h3 class="mt-4 text-lg font-semibold text-[color:var(--text)]">{{ feature.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-[color:var(--text-muted)]">{{ feature.description }}</p>
          </div>
        </div>
      </section>

      <!-- DEPOIMENTOS -->
      <section id="depoimentos" class="scroll-mt-24 border-t border-[color:var(--border)] py-20">
        <div class="mx-auto max-w-3xl text-center">
          <div class="inline-flex rounded-full border border-[color:var(--accent-soft-border)] bg-[color:var(--accent-soft-bg)] px-3 py-1 text-sm font-medium text-[color:var(--text-info)]">
            Depoimentos
          </div>
          <h2 class="mt-4 text-3xl font-semibold sm:text-4xl">Times que já organizaram o caos com o NovaHub</h2>
          <p class="mt-3 text-lg leading-8 text-[color:var(--text-muted)]">
            Um retrato de como equipes reais usam a plataforma no dia a dia.
          </p>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-3">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.author"
            class="flex flex-col justify-between rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]/60 p-6"
          >
            <p class="text-sm leading-7 text-[color:var(--text-muted)]">&ldquo;{{ testimonial.quote }}&rdquo;</p>
            <div class="mt-6 flex items-center gap-3">
              <img :src="testimonial.avatar" :alt="testimonial.author" class="h-9 w-9 rounded-full object-cover" />
              <div>
                <p class="text-sm font-semibold text-[color:var(--text)]">{{ testimonial.author }}</p>
                <p class="text-xs text-[color:var(--text-muted)]">{{ testimonial.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA FINAL -->
      <section class="border-t border-[color:var(--border)] py-20">
        <div class="mx-auto flex max-w-5xl flex-col items-center gap-8 rounded-[2rem] border border-[color:var(--border)] bg-linear-to-br from-[color:var(--accent-gradient-a)] to-[color:var(--accent-gradient-b)] p-10 lg:flex-row lg:items-center lg:justify-between">
          <div class="max-w-md text-center lg:text-left">
            <h2 class="text-3xl font-semibold sm:text-4xl">Pronto para transformar a maneira como sua equipe trabalha?</h2>
            <p class="mt-3 text-lg leading-8 text-[color:var(--text-muted)]">
              Junte-se a milhares de equipes que já aumentaram sua produtividade com o NovaHub.
            </p>
            <div class="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              <NuxtLink
                to="/register"
                class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-button)] px-6 py-3 font-semibold text-[color:var(--text-button)] transition hover:text-[color:var(--text-button-hover)] hover:border-[color:var(--border-hover)] hover:bg-[color:var(--bg-button-hover)]"
              >
                Começar gratuitamente
              </NuxtLink>
              <a
                href="#depoimentos"
                class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/40 px-6 py-3 font-semibold text-[color:var(--text)] transition hover:border-[color:var(--border-hover)]"
              >
                Falar com vendas
              </a>
            </div>
          </div>

          <div class="w-full max-w-xs rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/80 p-5 text-center">
            <p class="text-2xl font-semibold text-[color:var(--text)]">+2.500 equipes</p>
            <p class="text-sm text-[color:var(--text-muted)]">já usam o NovaHub</p>
            <div class="mt-4 flex justify-center -space-x-3">
              <img
                v-for="avatar in avatarStack"
                :key="avatar"
                :src="avatar"
                alt=""
                class="h-9 w-9 rounded-full border-2 border-[color:var(--surface)] object-cover"
              />
              <span class="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[color:var(--surface)] bg-[color:var(--bg-button)] text-xs font-semibold text-[color:var(--text-button)]">
                +
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section id="faq" class="scroll-mt-24 border-t border-[color:var(--border)] py-20">
        <div class="mx-auto max-w-3xl text-center">
          <div class="inline-flex rounded-full border border-[color:var(--accent-soft-border)] bg-[color:var(--accent-soft-bg)] px-3 py-1 text-sm font-medium text-[color:var(--text-info)]">
            Perguntas frequentes
          </div>
          <h2 class="mt-4 text-3xl font-semibold sm:text-4xl">Ainda com dúvidas? Respondemos aqui</h2>
        </div>

        <div class="mx-auto mt-12 max-w-3xl space-y-4">
          <details
            v-for="item in faq"
            :key="item.question"
            class="group rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/60 p-5 open:border-[color:var(--border-hover)]"
          >
            <summary class="flex cursor-pointer list-none items-center justify-between font-semibold text-[color:var(--text)]">
              {{ item.question }}
              <span class="text-[color:var(--text-muted)] transition group-open:rotate-45">+</span>
            </summary>
            <p class="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">{{ item.answer }}</p>
          </details>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="border-t border-[color:var(--border)] py-12 text-sm text-[color:var(--text-muted)]">
        <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div class="space-y-3 lg:col-span-1">
            <BrandLogo />
            <p class="max-w-xs leading-6">
              Plataforma de gestão de projetos, tarefas e comunicação em tempo real para equipes que querem entregar mais.
            </p>
          </div>

          <div v-for="column in footerColumns" :key="column.title" class="space-y-3">
            <p class="font-semibold text-[color:var(--text)]">{{ column.title }}</p>
            <ul class="space-y-2">
              <li v-for="link in column.links" :key="link">{{ link }}</li>
            </ul>
          </div>
        </div>

        <div class="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[color:var(--border)] pt-6 sm:flex-row">
          <p>&copy; {{ new Date().getFullYear() }} NovaHub. Todos os direitos reservados.</p>
          <p>Feito para equipes que valorizam clareza e ritmo de entrega.</p>
        </div>
      </footer>
    </div>
  </div>
</template>


<script setup lang="ts">
import BrandLogo from '@/components/ui/BrandLogo.vue';
import ThemeToggle from '@/components/ui/ThemeToggle.vue';

const features = [
  {
    icon: '📁',
    title: 'Gestão de projetos',
    description: 'Planeje, organize e acompanhe projetos de qualquer tamanho com facilidade.',
  },
  {
    icon: '✅',
    title: 'Tarefas e prazos',
    description: 'Distribua tarefas, defina prioridades e nunca mais perca um prazo.',
  },
  {
    icon: '💬',
    title: 'Comunicação em tempo real',
    description: 'Converse, compartilhe e tome decisões rápidas sem sair da plataforma.',
  },
  {
    icon: '📊',
    title: 'Relatórios inteligentes',
    description: 'Tenha insights valiosos para entregar resultados cada vez melhores.',
  },
];

const mockNav = [
  { label: 'Painel', icon: '🏠', active: true },
  { label: 'Projetos', icon: '📁', active: false },
  { label: 'Tarefas', icon: '✅', active: false },
  { label: 'Equipe', icon: '👥', active: false },
  { label: 'Calendário', icon: '📅', active: false },
  { label: 'Mensagens', icon: '💬', active: false },
  { label: 'Arquivos', icon: '🗂️', active: false },
  { label: 'Relatórios', icon: '📊', active: false },
  { label: 'Configurações', icon: '⚙️', active: false },
];

const statCards = [
  { label: 'Projetos ativos', value: '12', delta: '+20% este mês' },
  { label: 'Tarefas prioritárias', value: '8', delta: '+12% este mês' },
  { label: 'Mensagens hoje', value: '24', delta: '+30% este mês' },
  { label: 'Membros online', value: '7', delta: 'Agora' },
];

const projects = [
  { name: 'Website 2.0', percent: 78 },
  { name: 'App Mobile', percent: 45 },
  { name: 'Campanha Q2', percent: 62 },
  { name: 'Integração API', percent: 25 },
];

const activities = [
  { text: 'Marina comentou no Website 2.0', time: '2 min' },
  { text: 'João aprovou a tarefa Revisar landing page', time: '15 min' },
  { text: 'Você enviou um arquivo em Briefing nova-fase.pdf', time: '32 min' },
  { text: 'Lucas criou uma tarefa Ajustes no header', time: '1h' },
];

const companies = [
  { name: 'NEXORA', icon: '⬢' },
  { name: 'linex', icon: '📈' },
  { name: 'cloudware', icon: '☁️' },
  { name: 'VERTEX', icon: '◆' },
  { name: 'airflow', icon: '🌀' },
];

const avatarStack = [
  'https://i.pravatar.cc/72?img=12',
  'https://i.pravatar.cc/72?img=33',
  'https://i.pravatar.cc/72?img=48',
  'https://i.pravatar.cc/72?img=15',
];

const testimonials = [
  {
    author: 'Ana Ribeiro',
    avatar: 'https://i.pravatar.cc/72?img=12',
    role: 'Head de Produto',
    quote: 'Trocamos quatro ferramentas diferentes pelo NovaHub. Hoje toda a equipe sabe exatamente o que fazer sem precisar perguntar.',
  },
  {
    author: 'Caio Mendes',
    avatar: 'https://i.pravatar.cc/72?img=33',
    role: 'Tech Lead',
    quote: 'O chat integrado às tarefas eliminou boa parte das mensagens perdidas. As decisões ficam registradas no contexto certo.',
  },
  {
    author: 'Bia Torres',
    avatar: 'https://i.pravatar.cc/72?img=48',
    role: 'Gerente de Projetos',
    quote: 'Consigo ver o andamento de todos os projetos em segundos. O painel virou a primeira tela que abro todo dia.',
  },
];

const faq = [
  {
    question: 'Preciso instalar algo para usar o NovaHub?',
    answer: 'Não. O NovaHub funciona direto do navegador, em qualquer computador, sem necessidade de instalação.',
  },
  {
    question: 'Consigo usar com minha equipe atual?',
    answer: 'Sim. Basta criar sua conta, convidar os membros do time e organizar os primeiros projetos em minutos.',
  },
  {
    question: 'O plano gratuito tem limite de projetos?',
    answer: 'O cadastro gratuito já libera projetos, tarefas e chat em tempo real, ideal para validar o fluxo com sua equipe.',
  },
  {
    question: 'Meus dados ficam seguros?',
    answer: 'Sim. As informações da sua conta e dos seus projetos são protegidas com autenticação segura e acesso restrito por usuário.',
  },
];

const footerColumns = [
  {
    title: 'Produto',
    links: ['Recursos', 'Depoimentos'],
  },
  {
    title: 'Empresa',
    links: ['Sobre', 'Depoimentos', 'Contato'],
  },
  {
    title: 'Suporte',
    links: ['Central de ajuda', 'Perguntas frequentes', 'Status da plataforma'],
  },
];
</script>

