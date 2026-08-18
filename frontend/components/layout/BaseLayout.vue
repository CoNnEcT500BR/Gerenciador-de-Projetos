<template>
  <div class="min-h-screen bg-transparent text-[color:var(--text)] transition-colors duration-200">
    <div class="mx-auto flex min-h-screen flex-col lg:flex-row">
      <SidebarNav />

      <div class="flex-1">
        <header class="border-b border-[color:var(--border)] bg-[color:var(--surface-strong)] backdrop-blur transition-colors duration-200">
          <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4 lg:px-8">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.3em] text-[color:var(--primary)]">NovaHub</p>
              <div class="text-sm text-[color:var(--text-muted)]">Painel de gestão premium</div>
            </div>

            <div class="flex items-center gap-3">
              <ThemeToggle />
              <button class="rounded-full border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-3 py-2 text-sm text-[color:var(--text)] transition hover:border-[color:var(--border-hover)] hover:bg-[color:var(--bg-button-hover)] hover:text-[color:var(--text-button-hover)]">
                🔔 3
              </button>
              <div class="flex items-center gap-3 rounded-full border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-3 py-2 transition-colors duration-200">
                <div class="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-[color:var(--brand-from)] to-[color:var(--brand-to)] font-semibold text-[color:var(--brand-icon)]">
                  {{ initials }}
                </div>
                <div class="text-sm">
                  <div class="font-semibold text-[color:var(--text)]">{{ authStore.user?.name || 'Usuário' }}</div>
                  <div class="text-[color:var(--text-muted)]">{{ authStore.user?.email || 'conta@empresa.com' }}</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main class="mx-auto max-w-7xl p-6 lg:p-8">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import ThemeToggle from '@/components/ui/ThemeToggle.vue';

const authStore = useAuthStore();

const initials = computed(() => {
  const name = authStore.user?.name || 'Usuário';
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
});
</script>
