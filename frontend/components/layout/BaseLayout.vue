<template>
  <div class="workspace-shell min-h-screen bg-[color:var(--bg)] text-[color:var(--text)] transition-colors duration-200">
    <div class="mx-auto flex min-h-screen flex-col lg:flex-row">
      <div v-if="isNavOpen" class="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm lg:hidden" aria-hidden="true" @click="closeNav"></div>
      <SidebarNav :open="isNavOpen" @close="closeNav" />

      <div class="min-w-0 flex-1">
        <header class="workspace-header sticky top-0 z-20 border-b border-[color:var(--border)] bg-[color:var(--surface-strong)]/95 backdrop-blur transition-colors duration-200">
          <div class="flex flex-wrap items-center justify-between gap-4 px-5 py-4 lg:px-8">
            <div class="flex min-w-0 items-center gap-3">
              <button class="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-2 text-[color:var(--text)] lg:hidden" type="button" aria-label="Abrir navegação" :aria-expanded="isNavOpen" @click="openNav">
                <Icon name="menu" :size="20" />
              </button>
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                <p class="text-base font-semibold text-[color:var(--text)]">{{ pageTitle }}</p>
                <span class="h-2 w-2 rounded-full bg-[color:var(--success-text)]"></span>
              </div>
                <div class="mt-1 truncate text-xs text-[color:var(--text-muted)]">{{ pageDescription }}</div>
              </div>
            </div>

            <div class="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <NotificationPanel />
              <div class="hidden items-center gap-3 border-l border-[color:var(--border)] pl-3 sm:flex">
                <div class="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-[color:var(--brand-from)] to-[color:var(--brand-to)] font-semibold text-[color:var(--brand-icon)]">
                  {{ initials }}
                </div>
                <div class="max-w-40 text-sm">
                  <div class="font-semibold text-[color:var(--text)]">{{ authStore.user?.name || 'Usuário' }}</div>
                  <div class="truncate text-xs text-[color:var(--text-muted)]">{{ authStore.user?.email || 'conta@empresa.com' }}</div>
                </div>
              </div>
              <button
                type="button"
                @click="handleLogout"
                class="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-3 py-2 text-sm font-semibold text-[color:var(--text-muted)] transition hover:border-[color:var(--border-hover)] hover:bg-[color:var(--danger-bg)] hover:text-[color:var(--text)]"
              >
                Sair
              </button>
            </div>
          </div>
        </header>

        <main class="p-5 lg:p-8">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from '#imports';
import { useAuthStore } from '@/stores/auth';
import SidebarNav from '@/components/layout/SidebarNav.vue';
import ThemeToggle from '@/components/ui/ThemeToggle.vue';
import NotificationPanel from '@/components/notifications/NotificationPanel.vue';
import Icon from '@/components/ui/Icon.vue';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const isNavOpen = ref(false);

const pageMeta: Record<string, { title: string; description: string }> = {
  '/dashboard': { title: 'Workspace principal', description: 'Visão geral da sua operação' },
  '/projects': { title: 'Projetos', description: 'Iniciativas, equipes e entregas em andamento' },
  '/tasks': { title: 'Tarefas', description: 'Tudo que precisa avançar nos seus projetos' },
  '/messages': { title: 'Mensagens', description: 'Conversas conectadas ao contexto do trabalho' },
  '/profile': { title: 'Seu perfil', description: 'Dados pessoais e preferências da conta' },
};

const currentMeta = computed(() => {
  if (route.path.startsWith('/projects/')) {
    return { title: 'Detalhe do projeto', description: 'Tarefas, equipe e conversas do projeto' };
  }
  return pageMeta[route.path] ?? pageMeta['/dashboard'];
});
const pageTitle = computed(() => currentMeta.value.title);
const pageDescription = computed(() => currentMeta.value.description);

const initials = computed(() => {
  const name = authStore.user?.name || 'Usuário';
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
});

async function handleLogout() {
  await authStore.logout();
  await router.push('/login');
}

function openNav() {
  isNavOpen.value = true;
}

function closeNav() {
  isNavOpen.value = false;
}

watch(() => route.path, closeNav);
onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
});

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeNav();
}
</script>
