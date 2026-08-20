<template>
  <div class="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
    <div class="site-shell mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 lg:px-8">

      <!-- HEADER -->
      <header
        class="page-header mb-14 flex flex-col gap-4 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/60 px-5 py-3 backdrop-blur lg:flex-row lg:items-center lg:justify-between"
      >
        <div class="flex items-center justify-between gap-4">
          <BrandLogo />
        </div>

        <nav class="hidden items-center gap-6 text-sm font-medium text-[color:var(--text-muted)] lg:flex">
          <a href="#recursos" class="transition hover:text-[color:var(--text)]">Recursos</a>
          <a href="#depoimentos" class="transition hover:text-[color:var(--text)]">Empresa</a>
          <a href="#faq" class="transition hover:text-[color:var(--text)]">FAQ</a>
        </nav>

        <div class="header-actions flex items-center gap-3">
          <ThemeToggle />

          <NuxtLink
            to="/login"
            class="header-link rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/40 px-4 py-2 text-sm font-medium text-[color:var(--text)] transition hover:bg-[color:var(--bg-button-hover)] hover:text-[color:var(--text-button-hover)]"
          >
            Entrar
          </NuxtLink>

          <NuxtLink
            to="/register"
            class="header-cta rounded-full bg-[color:var(--bg-button)] border border-[color:var(--border)] px-4 py-2 text-sm font-semibold text-[color:var(--text-button)] transition hover:bg-[color:var(--bg-button-hover)] hover:text-[color:var(--text-button-hover)]"
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

          <h1 class="page-title text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            O espaço de trabalho da <span class="text-[color:var(--primary)]">sua equipe.</span>
          </h1>

          <p class="page-copy max-w-md text-lg leading-8 text-[color:var(--text-muted)]">
            Projetos, tarefas e comunicação em um único lugar para você e seu time entregarem mais, com menos esforço.
          </p>

          <div class="flex flex-wrap gap-4">
            <NuxtLink
              to="/register"
              class="hero-cta hero-cta-primary rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-button)] px-6 py-3 font-semibold text-[color:var(--text-button)] transition hover:text-[color:var(--text-button-hover)] hover:border-[color:var(--border-hover)] hover:bg-[color:var(--bg-button-hover)]"
            >
              Começar gratuitamente →
            </NuxtLink>

            <a
              href="#recursos"
              class="hero-cta hero-cta-secondary rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/40 px-6 py-3 font-semibold text-[color:var(--text)] transition hover:text-[color:var(--text-button-hover)] hover:border-[color:var(--border-hover)] hover:bg-[color:var(--bg-button-hover)]"
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
            class="company-badge flex items-center justify-center gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4 text-lg font-bold text-[color:var(--text)] shadow-[0_10px_25px_-15px_var(--shadow-tint-soft)] transition hover:border-[color:var(--border-hover)]"
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
          <div v-for="feature in features" :key="feature.title" class="feature-card">
            <div class="feature-icon flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--accent-soft-bg)] text-xl">
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
            class="testimonial-card flex flex-col justify-between rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]/60 p-6"
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
                class="hero-cta hero-cta-primary rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-button)] px-6 py-3 font-semibold text-[color:var(--text-button)] transition hover:text-[color:var(--text-button-hover)] hover:border-[color:var(--border-hover)] hover:bg-[color:var(--bg-button-hover)]"
              >
                Começar gratuitamente
              </NuxtLink>
              <a
                href="#depoimentos"
                class="hero-cta hero-cta-secondary rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/40 px-6 py-3 font-semibold text-[color:var(--text)] transition hover:border-[color:var(--border-hover)]"
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
          <div
            v-for="(item, index) in faq"
            :key="item.question"
            class="faq-item group rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/60 p-5"
            :class="{
              'faq-item-open': openFaqIndex === index,
              'faq-item-animated': faqAnimatedIndex === index,
            }"
          >
            <button
              type="button"
              class="faq-trigger flex w-full items-center justify-between gap-4 text-left font-semibold text-[color:var(--text)]"
              :aria-expanded="openFaqIndex === index"
              @click="toggleFaq(index)"
            >
              <span>{{ item.question }}</span>
              <span class="faq-plus" :class="{ 'faq-plus-open': openFaqIndex === index }">+</span>
            </button>

            <div class="faq-content" :class="{ 'faq-content-open': openFaqIndex === index }">
              <div class="faq-content-inner">
                <p class="text-sm leading-7 text-[color:var(--text-muted)]">{{ item.answer }}</p>
              </div>
            </div>
          </div>
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
import { ref } from 'vue';
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

const openFaqIndex = ref<number | null>(null);
const faqAnimatedIndex = ref<number | null>(null);

function toggleFaq(index: number) {
  const isOpening = openFaqIndex.value !== index;
  openFaqIndex.value = isOpening ? index : null;
  faqAnimatedIndex.value = index;

  window.setTimeout(() => {
    faqAnimatedIndex.value = null;
  }, 500);
}
</script>
<style scoped>
.site-shell {
  width: min(100%, 90rem);
}

.page-header {
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}

.page-header:hover {
  border-color: var(--border-hover);
  box-shadow: 0 12px 25px rgba(15, 23, 42, 0.04);
}

.page-title {
  max-width: 12ch;
}

.page-copy {
  max-width: 36rem;
}

@keyframes riseIn {
  0% {
    opacity: 0;
    transform: translateY(16px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes glowPulse {
  0%,
  100% {
    box-shadow: 0 0 0 rgba(45, 212, 191, 0);
  }
  50% {
    box-shadow: 0 0 20px rgba(45, 212, 191, 0.2);
  }
}

@keyframes floatSoft {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
}

.header-link,
.header-cta,
.hero-cta,
.company-badge,
.feature-card,
.testimonial-card {
  animation: riseIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.page-header {
  backdrop-filter: blur(18px);
  background-image: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
}

.hero-cta {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.06);
}

.hero-cta::before {
  content: '';
  position: absolute;
  inset: -30% auto -30% -20%;
  width: 40%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0));
  transform: translateX(-180%) skewX(-18deg);
  transition: transform 0.7s ease;
  z-index: -1;
}

.hero-cta:hover::before {
  transform: translateX(380%) skewX(-18deg);
}

.hero-cta-primary {
  background-image: linear-gradient(135deg, rgba(20,184,166,0.35), rgba(45,212,191,0.12));
}

.hero-cta-primary:hover {
  box-shadow: 0 16px 32px rgba(20, 184, 166, 0.25);
}

.header-link,
.header-cta {
  position: relative;
  overflow: hidden;
}

.header-link::after,
.header-cta::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0));
  opacity: 0;
  transition: opacity 0.25s ease;
}

.header-link:hover::after,
.header-cta:hover::after {
  opacity: 1;
}

.hero-cta-primary {
  box-shadow: 0 12px 28px rgba(20, 184, 166, 0.22);
}

.hero-cta-secondary {
  backdrop-filter: blur(10px);
}

.company-badge,
.feature-card,
.testimonial-card {
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
}

.company-badge:hover,
.feature-card:hover,
.testimonial-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-hover);
  box-shadow: 0 18px 35px rgba(15, 23, 42, 0.08);
}

.feature-card {
  padding: 1.25rem;
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 1.5rem;
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
}

.testimonial-card {
  background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
}

.company-badge {
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
}

.feature-card:nth-child(2) { animation-delay: 0.08s; }
.feature-card:nth-child(3) { animation-delay: 0.16s; }
.feature-card:nth-child(4) { animation-delay: 0.24s; }

.feature-icon {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: inset 0 0 0 1px rgba(45, 212, 191, 0.12);
}

.feature-card:hover .feature-icon {
  transform: rotate(-4deg) scale(1.05);
  box-shadow: 0 12px 24px rgba(45, 212, 191, 0.12);
}

.company-badge:nth-child(2) { animation-delay: 0.06s; }
.company-badge:nth-child(3) { animation-delay: 0.12s; }
.company-badge:nth-child(4) { animation-delay: 0.18s; }
.company-badge:nth-child(5) { animation-delay: 0.24s; }

.testimonial-card:nth-child(2) { animation-delay: 0.08s; }
.testimonial-card:nth-child(3) { animation-delay: 0.16s; }

.faq-item {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015));
  transition:
    border-color 0.28s ease,
    box-shadow 0.28s ease,
    transform 0.28s ease,
    background-color 0.28s ease;
}

.faq-item::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.22), rgba(127, 140, 255, 0.08), rgba(255, 255, 255, 0.08));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.faq-item:hover {
  border-color: rgba(123, 136, 255, 0.44);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(45, 212, 191, 0.08);
  transform: translateY(-2px);
}

.faq-item-open {
  border-color: rgba(123, 136, 255, 0.48);
  box-shadow: 0 20px 45px rgba(94, 104, 255, 0.12), 0 0 28px rgba(45, 212, 191, 0.08);
}

.faq-item-open::before,
.faq-item-animated::before {
  opacity: 1;
}

.faq-item-animated {
  animation: glowPulse 1.2s ease;
}

.faq-trigger {
  list-style: none;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;
  transition: color 0.25s ease, transform 0.25s ease;
}

.faq-trigger:hover {
  color: var(--text);
}

.faq-trigger span:first-child {
  transition: transform 0.25s ease;
}

.faq-item-open .faq-trigger span:first-child {
  transform: translateX(2px);
}

.faq-plus {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background: rgba(148, 163, 184, 0.08);
  color: var(--text-muted);
  font-size: 1.4rem;
  line-height: 1;
  transition:
    transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1),
    background-color 0.28s ease,
    color 0.28s ease,
    box-shadow 0.28s ease;
  flex-shrink: 0;
}

.faq-item:hover .faq-plus,
.faq-item-open .faq-plus {
  background: rgba(124, 92, 255, 0.1);
  color: var(--text);
  box-shadow: inset 0 0 0 1px rgba(124, 92, 255, 0.18);
}

.faq-plus-open {
  transform: rotate(45deg) scale(1.04);
}

.faq-content {
  display: grid;
  grid-template-rows: 0fr;
  max-height: 0;
  opacity: 0;
  transform: translateY(-8px);
  overflow: hidden;
  transition:
    grid-template-rows 0.42s cubic-bezier(0.2, 0.8, 0.2, 1),
    max-height 0.42s cubic-bezier(0.2, 0.8, 0.2, 1),
    opacity 0.26s ease,
    transform 0.28s ease,
    margin-top 0.28s ease;
}

.faq-content-open {
  grid-template-rows: 1fr;
  max-height: 18rem;
  opacity: 1;
  transform: translateY(0);
  margin-top: 0.9rem;
}

.faq-content-inner {
  min-height: 0;
  overflow: hidden;
}

.faq-content-inner p {
  margin-top: 0.9rem;
  padding-top: 0.7rem;
  border-top: 1px solid rgba(148, 163, 184, 0.16);
  color: var(--text-muted);
}

@media (min-width: 1280px) {
  .page-header {
    padding-inline: 1.4rem;
  }

  .feature-card,
  .company-badge,
  .testimonial-card {
    min-height: 100%;
  }
}

@media (max-width: 767px) {
  .site-shell {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .page-header {
    margin-bottom: 1.5rem;
    border-radius: 1.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .header-actions > :first-child {
    flex: 1 1 auto;
  }

  .hero-cta,
  .header-link,
  .header-cta {
    width: 100%;
    justify-content: center;
    text-align: center;
  }

  .page-title {
    max-width: none;
    font-size: clamp(2.5rem, 9vw, 3.4rem);
  }

  .page-copy {
    font-size: 1rem;
    line-height: 1.7;
  }

  .faq-item {
    padding: 1.1rem 1rem;
  }

  .faq-item summary {
    gap: 0.75rem;
    font-size: 0.96rem;
  }

  .faq-plus {
    width: 1.75rem;
    height: 1.75rem;
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .site-shell {
    padding-top: 0.9rem;
    padding-bottom: 1.25rem;
  }

  .theme-toggle {
    width: 100%;
    justify-content: center;
  }

  .theme-toggle-label {
    font-size: 0.74rem;
  }

  .header-actions {
    gap: 0.6rem;
  }

  .hero-cta,
  .header-link,
  .header-cta {
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
  }
}
</style>

