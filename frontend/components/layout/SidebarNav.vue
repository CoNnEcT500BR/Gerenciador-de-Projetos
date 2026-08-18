<template>
  <aside class="w-full border-b border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-5 backdrop-blur transition-colors duration-200 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
    <div class="flex items-center justify-between">
      <BrandLogo />
      <div class="rounded-full border border-[color:var(--accent-soft-border)] bg-[color:var(--accent-soft-bg)] px-3 py-1 text-xs font-semibold text-[color:var(--text-info)]">
        Premium
      </div>
    </div>

    <div class="mt-6 rounded-[1.25rem] border border-[color:var(--border)] bg-linear-to-br from-[color:var(--accent-gradient-a)] to-[color:var(--accent-gradient-b)] p-4">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--surface-soft)] text-lg text-[color:var(--text-info)]">✦</div>
        <div>
          <p class="text-sm font-semibold text-[color:var(--text)]">Fluxo inteligente</p>
          <p class="text-xs text-[color:var(--text-muted)]">Tudo em um painel elegante.</p>
        </div>
      </div>
    </div>

    <nav class="mt-8 flex flex-col gap-2">
      <NuxtLink
        v-for="item in navigation"
        :key="item.name"
        :to="item.to"
        class="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition"
        :class="isActive(item.to) ? 'bg-[color:var(--accent-soft-bg)] text-[color:var(--text-info)] shadow-[0_10px_25px_-10px_var(--shadow-tint-soft)]' : 'text-[color:var(--text-muted)] hover:bg-[color:var(--surface-soft)] hover:text-[color:var(--text)]'"
      >
        <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--surface-soft)] text-sm">{{ item.icon }}</span>
        <span>{{ item.name }}</span>
      </NuxtLink>
    </nav>

    <div class="mt-8 rounded-[1.25rem] border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-4 transition-colors duration-200">
      <p class="text-sm font-semibold text-[color:var(--text)]">Próximo objetivo</p>
      <p class="mt-2 text-sm leading-6 text-[color:var(--text-muted)]">Finalize a integração de mensagens e libere uma experiência mais fluida.</p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import BrandLogo from '@/components/ui/BrandLogo.vue';

const route = useRoute();

const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: '◉' },
  { name: 'Projetos', to: '/projects', icon: '◌' },
  { name: 'Tarefas', to: '/tasks', icon: '◈' },
  { name: 'Mensagens', to: '/messages', icon: '◎' },
  { name: 'Perfil', to: '/profile', icon: '◍' },
];

function isActive(path: string) {
  return route.path === path || (path !== '/' && route.path.startsWith(path));
}
</script>
