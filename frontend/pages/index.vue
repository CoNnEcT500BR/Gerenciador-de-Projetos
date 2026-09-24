<template>
  <div>
    <section class="relative overflow-hidden">
      <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[64px_64px] opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" aria-hidden="true"></div>
      <div class="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:px-10 lg:pb-28 lg:pt-24">
        <div class="max-w-2xl">
          <p class="status-pill">O workspace que mantém o time em movimento</p>
          <h1 class="mt-7 max-w-xl text-5xl font-semibold leading-[.96] tracking-[-.06em] sm:text-7xl">Transforme intenção em <span class="text-[color:var(--primary)]">entrega.</span></h1>
          <p class="mt-6 max-w-xl text-lg leading-8 text-[color:var(--text-muted)] sm:text-xl">Projetos, prioridades e conversas no mesmo contexto para que sua equipe saiba o que importa agora — e avance junto.</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <PublicButton to="/register">Começar gratuitamente <span aria-hidden="true">→</span></PublicButton>
            <PublicButton to="/recursos" variant="secondary">Conhecer a plataforma</PublicButton>
          </div>
        </div>
        <div class="surface-card relative overflow-hidden p-3 sm:p-4">
          <div class="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[color:var(--gradient-1)] blur-3xl" aria-hidden="true"></div>
          <div class="relative overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-2)]">
            <div class="flex items-center justify-between border-b border-[color:var(--border)] px-4 py-3 text-xs"><span class="font-semibold">Workspace principal</span><span class="text-[color:var(--text-muted)]">Visão geral da operação</span></div>
            <div class="grid gap-4 p-4 sm:grid-cols-[.8fr_1.2fr] sm:p-6">
              <div class="space-y-2"><p class="page-kicker">Hoje</p><p class="text-2xl font-semibold tracking-tight">Clareza para avançar.</p><p class="text-sm leading-6 text-[color:var(--text-muted)]">Tudo o que sua equipe precisa para sair do plano e chegar ao próximo marco.</p></div>
              <div class="space-y-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
                <div v-for="project in projects" :key="project.name"><div class="flex justify-between text-xs"><span>{{ project.name }}</span><span class="text-[color:var(--text-muted)]">{{ project.percent }}%</span></div><div class="mt-2 h-2 rounded-full bg-[color:var(--surface-2)]"><div class="h-full rounded-full bg-[color:var(--primary)]" :style="{ width: `${project.percent}%` }"></div></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="mx-auto max-w-7xl border-t border-[color:var(--border)] px-5 py-20 sm:px-8 lg:px-10">
      <div class="max-w-2xl"><p class="page-kicker">Um sistema para o ritmo real</p><h2 class="mt-3 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">Menos ruído entre a ideia e o resultado.</h2><p class="mt-4 text-lg leading-8 text-[color:var(--text-muted)]">Uma base compartilhada para planejar, executar e colaborar sem perder o contexto.</p></div>
      <div class="mt-10 grid gap-4 md:grid-cols-3">
        <article v-for="feature in features" :key="feature.title" class="surface-card p-6 transition hover:-translate-y-1"><span class="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--accent-soft-bg)] text-[color:var(--primary)]"><Icon name="spark" /></span><h3 class="mt-5 text-lg font-semibold">{{ feature.title }}</h3><p class="mt-2 leading-6 text-[color:var(--text-muted)]">{{ feature.description }}</p></article>
      </div>
    </section>
    <CTASection eyebrow="Feito para avançar" title="Dê à sua equipe um lugar para fazer acontecer." description="Comece com um projeto e transforme cada conversa em um próximo passo claro." to="/register"><template #action>Criar minha conta <span aria-hidden="true">→</span></template></CTASection>
  </div>
</template>

<script setup lang="ts">
import CTASection from '@/components/layout/CTASection.vue';
import Icon from '@/components/ui/Icon.vue';
import PublicButton from '@/components/ui/PublicButton.vue';

definePageMeta({ layout: 'public' });
const projects = [{ name: 'Website 2.0', percent: 78 }, { name: 'App Mobile', percent: 45 }, { name: 'Campanha Q2', percent: 62 }];
const features = [
  { title: 'Visão única da operação', description: 'Enxergue projetos, progresso e prioridades sem montar relatórios manuais.' },
  { title: 'Prioridades que aparecem', description: 'As próximas entregas ficam visíveis para que a equipe saiba onde concentrar energia.' },
  { title: 'Conversas com contexto', description: 'Decisões e mensagens permanecem próximas do trabalho que elas movimentam.' }
];
</script>
