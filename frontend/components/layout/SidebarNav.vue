<template>
  <aside class="w-full border-b border-white/10 bg-slate-950/70 px-4 py-5 backdrop-blur lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
    <div class="flex items-center justify-between">
      <BrandLogo />
      <div class="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
        Premium
      </div>
    </div>

    <div class="mt-6 rounded-[1.25rem] border border-white/10 bg-gradient-to-br from-cyan-500/15 to-indigo-500/10 p-4">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-lg text-cyan-200">✦</div>
        <div>
          <p class="text-sm font-semibold text-white">Fluxo inteligente</p>
          <p class="text-xs text-slate-400">Tudo em um painel elegante.</p>
        </div>
      </div>
    </div>

    <nav class="mt-8 flex flex-col gap-2">
      <NuxtLink
        v-for="item in navigation"
        :key="item.name"
        :to="item.to"
        class="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition"
        :class="isActive(item.to) ? 'bg-cyan-500/15 text-cyan-200 shadow-lg shadow-cyan-500/10' : 'text-slate-400 hover:bg-white/5 hover:text-white'"
      >
        <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-sm">{{ item.icon }}</span>
        <span>{{ item.name }}</span>
      </NuxtLink>
    </nav>

    <div class="mt-8 rounded-[1.25rem] border border-white/10 bg-slate-900/70 p-4">
      <p class="text-sm font-semibold text-white">Próximo objetivo</p>
      <p class="mt-2 text-sm leading-6 text-slate-400">Finalize a integração de mensagens e libere uma experiência mais fluida.</p>
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
