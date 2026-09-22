<template>
  <div class="public-shell min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
    <a href="#main-content" class="skip-link">Pular para o conteúdo principal</a>
    <PublicHeader />

    <main id="main-content" class="public-main">
      <section class="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:px-10 lg:pb-28 lg:pt-24">
        <div class="max-w-2xl">
          <span class="status-pill">Um hub de execução para equipes que entregam</span>
          <h1 class="mt-6 max-w-xl text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-7xl">
            Menos troca de abas. <span class="text-[color:var(--primary)]">Mais entregas.</span>
          </h1>
          <p class="mt-6 max-w-xl text-lg leading-8 text-[color:var(--text-muted)] sm:text-xl">
            Projetos, prioridades e conversas no mesmo contexto para transformar planos em progresso visível.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink to="/register" class="rounded-xl bg-[color:var(--bg-button)] px-5 py-3.5 font-semibold text-[color:var(--text-button)] shadow-[0_14px_30px_var(--shadow-tint)] transition hover:-translate-y-0.5 hover:bg-[color:var(--bg-button-hover)]">
              Começar gratuitamente <span aria-hidden="true">→</span>
            </NuxtLink>
            <NuxtLink to="/recursos" class="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-3.5 font-semibold transition hover:border-[color:var(--border-hover)] hover:bg-[color:var(--surface-2)]">
              Explorar recursos
            </NuxtLink>
          </div>
          <div class="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[color:var(--text-muted)]">
            <span>✓ Contexto centralizado</span>
            <span>✓ Sem cartão de crédito</span>
          </div>
        </div>

        <div class="home-mockup surface-card overflow-hidden p-3 sm:p-4">
          <div class="flex overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-2)]">
            <aside class="hidden w-40 shrink-0 border-r border-[color:var(--border)] p-3 sm:block">
              <div class="mb-5 flex items-center gap-2 text-xs font-bold">
                <span class="flex h-6 w-6 items-center justify-center rounded-lg bg-[color:var(--primary)] text-[color:var(--brand-icon)]">N</span>
                NovaHub
              </div>
              <div class="space-y-1 text-xs">
                <div v-for="item in navigation" :key="item.label" class="rounded-lg px-2.5 py-2" :class="item.active ? 'bg-[color:var(--accent-soft-bg)] font-semibold text-[color:var(--text-info)]' : 'text-[color:var(--text-muted)]'">
                  {{ item.icon }} {{ item.label }}
                </div>
              </div>
            </aside>
            <div class="min-w-0 flex-1 bg-[color:var(--surface)] p-4 sm:p-5">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <p class="text-sm font-semibold">Workspace principal</p>
                  <p class="mt-1 text-xs text-[color:var(--text-muted)]">Visão geral da operação</p>
                </div>
                <span class="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--accent-soft-bg)] text-xs text-[color:var(--text-info)]">NR</span>
              </div>
              <div class="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div v-for="stat in stats" :key="stat.label" class="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-2.5">
                  <p class="text-[10px] text-[color:var(--text-muted)]">{{ stat.label }}</p>
                  <p class="mt-1 text-lg font-semibold">{{ stat.value }}</p>
                  <p class="text-[10px] text-[color:var(--success-text)]">{{ stat.delta }}</p>
                </div>
              </div>
              <div class="mt-4 rounded-lg border border-[color:var(--border)] p-3">
                <div class="flex items-center justify-between">
                  <p class="text-xs font-semibold">Projetos em destaque</p>
                  <span class="text-[10px] text-[color:var(--text-muted)]">Esta semana</span>
                </div>
                <div v-for="project in projects" :key="project.name" class="mt-3">
                  <div class="flex justify-between text-[11px]"><span>{{ project.name }}</span><span class="text-[color:var(--text-muted)]">{{ project.percent }}%</span></div>
                  <div class="mt-1 h-1.5 rounded-full bg-[color:var(--surface-2)]"><div class="h-full rounded-full bg-[color:var(--primary)]" :style="{ width: `${project.percent}%` }"></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl border-t border-[color:var(--border)] px-5 py-20 sm:px-8 lg:px-10">
        <div class="max-w-2xl">
          <p class="page-kicker">O essencial no mesmo lugar</p>
          <h2 class="mt-3 text-3xl font-semibold tracking-[-.035em] sm:text-4xl">Clareza para decidir. Ritmo para entregar.</h2>
          <p class="mt-4 text-lg leading-8 text-[color:var(--text-muted)]">Uma experiência feita para reduzir ruído e aproximar planejamento, execução e colaboração.</p>
        </div>
        <div class="mt-10 grid gap-4 md:grid-cols-3">
          <article v-for="feature in features" :key="feature.title" class="surface-card p-6">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--accent-soft-bg)] text-lg text-[color:var(--primary)]">{{ feature.icon }}</span>
            <h3 class="mt-5 text-lg font-semibold">{{ feature.title }}</h3>
            <p class="mt-2 leading-6 text-[color:var(--text-muted)]">{{ feature.description }}</p>
          </article>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
        <div class="rounded-3xl border border-[color:var(--accent-soft-border)] bg-[color:var(--accent-soft-bg)] p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div class="max-w-2xl">
            <p class="page-kicker">Feito para avançar</p>
            <h2 class="mt-3 text-3xl font-semibold tracking-[-.035em] sm:text-4xl">Dê à sua equipe um lugar para fazer acontecer.</h2>
            <p class="mt-4 leading-7 text-[color:var(--text-muted)]">Comece com um projeto e transforme cada conversa em um próximo passo claro.</p>
          </div>
          <NuxtLink to="/register" class="mt-7 inline-flex shrink-0 items-center justify-center rounded-xl bg-[color:var(--bg-button)] px-5 py-3.5 font-semibold text-[color:var(--text-button)] transition hover:bg-[color:var(--bg-button-hover)] lg:mt-0">
            Criar minha conta <span class="ml-2" aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </section>
    </main>

    <PublicFooter />
    <CookieBanner />
  </div>
</template>

<script setup lang="ts">
const navigation = [
  { label: 'Painel', icon: '◉', active: true },
  { label: 'Projetos', icon: '◌', active: false },
  { label: 'Tarefas', icon: '◈', active: false },
  { label: 'Mensagens', icon: '◎', active: false }
];

const stats = [
  { label: 'Projetos ativos', value: '12', delta: '+20%' },
  { label: 'Tarefas abertas', value: '08', delta: '+12%' },
  { label: 'Mensagens hoje', value: '24', delta: '+30%' },
  { label: 'Membros online', value: '07', delta: 'Agora' }
];

const projects = [
  { name: 'Website 2.0', percent: 78 },
  { name: 'App Mobile', percent: 45 },
  { name: 'Campanha Q2', percent: 62 }
];

const features = [
  { icon: '◈', title: 'Visão única da operação', description: 'Enxergue projetos, progresso e prioridades sem montar relatórios manuais.' },
  { icon: '↗', title: 'Prioridades que aparecem', description: 'As próximas entregas ficam visíveis para que a equipe saiba onde concentrar energia.' },
  { icon: '◎', title: 'Conversas no contexto', description: 'Preserve decisões, alinhamento e velocidade perto do trabalho.' }
];
</script>

<style scoped>
.home-mockup {
  box-shadow: 0 28px 80px -36px var(--shadow-tint), inset 0 1px 0 rgba(255, 255, 255, .08);
}
</style>
