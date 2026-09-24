<template>
  <div class="auth-page relative min-h-screen overflow-hidden bg-[color:var(--bg)] px-4 py-8 text-[color:var(--text)] sm:py-10">
    <div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,var(--gradient-1),transparent_32%),radial-gradient(circle_at_90%_90%,var(--gradient-2),transparent_32%)]" aria-hidden="true"></div>
    <div class="mx-auto mb-7 flex max-w-6xl items-center justify-between">
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--text-muted)] hover:text-[color:var(--text)]"><span aria-hidden="true">←</span> Voltar para o início</NuxtLink>
      <ThemeToggle />
    </div>
    <div class="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)]/95 shadow-[0_30px_80px_-30px_var(--shadow-tint)] backdrop-blur xl:grid-cols-[.95fr_1.05fr]">
      <aside class="relative hidden overflow-hidden bg-linear-to-br from-[color:var(--accent-gradient-a)] to-[color:var(--accent-gradient-b)] p-10 xl:flex xl:flex-col">
        <BrandLogo />
        <div class="my-auto max-w-md">
          <p class="status-pill">NovaHub para equipes</p>
          <h2 class="mt-6 text-4xl font-semibold leading-tight tracking-[-.04em]">{{ showcaseTitle }}</h2>
          <p class="mt-5 leading-7 text-[color:var(--text-muted)]">{{ showcaseDescription }}</p>
          <ul class="mt-8 space-y-3 text-sm text-[color:var(--text-muted)]">
            <li v-for="item in benefits" :key="item" class="flex items-center gap-3"><span class="h-2 w-2 rounded-full bg-[color:var(--brand-from)]" aria-hidden="true"></span>{{ item }}</li>
          </ul>
        </div>
        <p class="text-xs text-[color:var(--text-muted)]">&copy; {{ new Date().getFullYear() }} NovaHub</p>
      </aside>
      <section class="p-7 sm:p-10 lg:p-14">
        <div class="mb-8 flex items-center justify-between xl:hidden"><BrandLogo /></div>
        <slot />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import BrandLogo from '@/components/ui/BrandLogo.vue';
import ThemeToggle from '@/components/ui/ThemeToggle.vue';
withDefaults(defineProps<{ showcaseTitle?: string; showcaseDescription?: string; benefits?: string[] }>(), {
  showcaseTitle: 'Menos ruído. Mais avanço.',
  showcaseDescription: 'Traga projetos, prioridades e conversas para o mesmo contexto e dê clareza ao próximo passo.',
  benefits: () => ['Projetos e tarefas no mesmo lugar', 'Colaboração em tempo real', 'Visibilidade para toda a equipe']
});
</script>
