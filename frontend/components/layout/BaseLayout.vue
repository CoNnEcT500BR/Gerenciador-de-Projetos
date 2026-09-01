<template>
  <div class="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)] transition-colors duration-200">
    <div class="mx-auto flex min-h-screen flex-col lg:flex-row">
      <SidebarNav />

      <div class="min-w-0 flex-1">
        <header class="border-b border-[color:var(--border)] bg-[color:var(--surface-strong)]/95 backdrop-blur transition-colors duration-200">
          <div class="flex flex-wrap items-center justify-between gap-4 px-5 py-4 lg:px-8">
            <div>
              <div class="flex items-center gap-2">
                <p class="text-base font-semibold text-[color:var(--text)]">Workspace principal</p>
                <span class="h-2 w-2 rounded-full bg-[color:var(--success-text)]"></span>
              </div>
              <div class="mt-1 text-xs text-[color:var(--text-muted)]">Visão geral da sua operação</div>
            </div>

            <div class="flex items-center gap-3">
              <ThemeToggle />
              <button aria-label="Notificações" class="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] text-sm text-[color:var(--text)] transition hover:border-[color:var(--border-hover)] hover:bg-[color:var(--accent-soft-bg)]">
                <span aria-hidden="true">🔔</span>
                <span class="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand-from)]"></span>
              </button>
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
                @click="handleLogout"
                class="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-3 py-2 text-sm text-[color:var(--text-muted)] transition hover:border-[color:var(--border-hover)] hover:bg-[color:var(--danger-bg)] hover:text-[color:var(--text)]"
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

const authStore = useAuthStore();
const router = useRouter();

const initials = computed(() => {
  const name = authStore.user?.name || 'Usuário';
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
});

async function handleLogout() {
  authStore.logout();
  await router.push('/login');
}
</script>
