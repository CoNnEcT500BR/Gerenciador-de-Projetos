<template>
  <aside
    class="workspace-sidebar fixed inset-y-0 left-0 z-40 flex w-[min(19rem,88vw)] -translate-x-full flex-col border-r border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-5 backdrop-blur transition-transform duration-200 lg:sticky lg:top-0 lg:z-0 lg:h-screen lg:w-64 lg:translate-x-0 lg:border-r lg:px-4 lg:py-6"
    :class="{ 'translate-x-0': open }"
    aria-label="Navegação principal"
  >
    <div class="flex min-w-0 items-center justify-between gap-2">
      <BrandLogo class="min-w-0" />
      <button class="shrink-0 rounded-lg p-2 text-[color:var(--text-muted)] hover:bg-[color:var(--surface-soft)] lg:hidden" type="button" aria-label="Fechar navegação" @click="emit('close')">
        <Icon name="close" :size="18" />
      </button>
    </div>

    <div class="mt-8 rounded-2xl border border-[color:var(--accent-soft-border)] bg-linear-to-br from-[color:var(--accent-gradient-a)] to-[color:var(--accent-gradient-b)] p-4">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--surface)] text-[color:var(--primary)]"><Icon name="spark" /></div>
        <div>
          <p class="text-sm font-semibold text-[color:var(--text)]">Tudo no mesmo ritmo</p>
          <p class="text-xs leading-5 text-[color:var(--text-muted)]">Projetos, tarefas e conversas.</p>
        </div>
      </div>
    </div>

    <nav class="mt-8 flex flex-col gap-1.5" aria-label="Workspace">
      <NuxtLink
        v-for="item in navigation"
        :key="item.name"
        :to="item.to"
        class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition"
        :aria-current="isActive(item.to) ? 'page' : undefined"
        @click="emit('close')"
        :class="isActive(item.to) ? 'bg-[color:var(--accent-soft-bg)] text-[color:var(--text-info)]' : 'text-[color:var(--text-muted)] hover:bg-[color:var(--surface-soft)] hover:text-[color:var(--text)]'"
      >
        <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-[color:var(--surface-soft)] text-sm transition group-hover:bg-[color:var(--surface)]" aria-hidden="true"><Icon :name="item.icon" /></span>
        <span>{{ item.name }}</span>
      </NuxtLink>
    </nav>

    <div class="mt-8 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4 lg:mt-auto">
      <p class="text-xs font-semibold uppercase tracking-[.14em] text-[color:var(--text-muted)]">Um próximo passo claro</p>
      <p class="mt-2 text-sm leading-6 text-[color:var(--text)]">Organize tarefas, acompanhe o progresso e mantenha as decisões junto do projeto.</p>
      <NuxtLink to="/tasks" class="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[color:var(--primary)] hover:underline">
        Abrir quadro <span aria-hidden="true">→</span>
      </NuxtLink>
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
