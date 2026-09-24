<template>
  <aside
    class="workspace-sidebar fixed inset-y-0 left-0 z-40 flex w-[min(19rem,88vw)] -translate-x-full flex-col border-r border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-5 backdrop-blur transition-transform duration-200 lg:sticky lg:top-0 lg:z-0 lg:h-screen lg:w-64 lg:translate-x-0 lg:border-r lg:px-4 lg:py-6"
    :class="{ 'translate-x-0': open }"
    aria-label="Navegação principal"
  >
    <div class="flex items-center justify-between">
      <BrandLogo />
      <div class="flex items-center gap-2">
        <div class="rounded-full border border-[color:var(--accent-soft-border)] bg-[color:var(--accent-soft-bg)] px-3 py-1 text-xs font-semibold text-[color:var(--text-info)]">
          PRO
        </div>
        <button class="rounded-lg p-2 text-[color:var(--text-muted)] hover:bg-[color:var(--surface-soft)] lg:hidden" type="button" aria-label="Fechar navegação" @click="emit('close')">
          <Icon name="close" :size="18" />
        </button>
      </div>
    </div>

    <div class="mt-7 rounded-2xl border border-[color:var(--border)] bg-linear-to-br from-[color:var(--accent-gradient-a)] to-[color:var(--accent-gradient-b)] p-4">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--surface-soft)] text-[color:var(--text-info)]"><Icon name="spark" /></div>
        <div>
          <p class="text-sm font-semibold text-[color:var(--text)]">Foco na entrega</p>
          <p class="text-xs text-[color:var(--text-muted)]">Sua equipe no mesmo ritmo.</p>
        </div>
      </div>
    </div>

    <nav class="mt-7 flex flex-col gap-1.5">
      <NuxtLink
        v-for="item in navigation"
        :key="item.name"
        :to="item.to"
        class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition"
        :aria-current="isActive(item.to) ? 'page' : undefined"
        @click="emit('close')"
        :class="isActive(item.to) ? 'bg-[color:var(--accent-soft-bg)] text-[color:var(--text-info)] shadow-[0_10px_25px_-10px_var(--shadow-tint-soft)]' : 'text-[color:var(--text-muted)] hover:bg-[color:var(--surface-soft)] hover:text-[color:var(--text)]'"
      >
        <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-[color:var(--surface-soft)] text-sm" aria-hidden="true"><Icon :name="item.icon" /></span>
        <span>{{ item.name }}</span>
      </NuxtLink>
    </nav>

    <div class="mt-8 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-4 transition-colors duration-200 lg:mt-auto">
      <div class="flex items-center justify-between text-xs">
        <p class="font-semibold uppercase tracking-[0.16em] text-[color:var(--text-muted)]">Ritmo semanal</p>
        <span class="text-[color:var(--primary)]">68%</span>
      </div>
      <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-[color:var(--surface-2)]">
        <div class="h-full w-[68%] rounded-full bg-[color:var(--primary)]"></div>
      </div>
      <p class="mt-3 text-xs leading-5 text-[color:var(--text-muted)]">Acompanhe prioridades, contexto e decisões em um só lugar.</p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import BrandLogo from '@/components/ui/BrandLogo.vue';
import Icon from '@/components/ui/Icon.vue';

defineProps<{ open: boolean }>();
const emit = defineEmits<{ close: [] }>();
const route = useRoute();

const navigation = [
  { name: 'Painel', to: '/dashboard', icon: 'dashboard' as const },
  { name: 'Projetos', to: '/projects', icon: 'projects' as const },
  { name: 'Tarefas', to: '/tasks', icon: 'tasks' as const },
  { name: 'Mensagens', to: '/messages', icon: 'messages' as const },
  { name: 'Perfil', to: '/profile', icon: 'profile' as const },
];

function isActive(path: string) {
  return route.path === path || (path !== '/' && route.path.startsWith(path));
}
</script>
