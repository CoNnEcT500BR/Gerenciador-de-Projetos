<template>
  <div class="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_25%),linear-gradient(135deg,#020617_0%,#0f172a_100%)] text-slate-100">
    <div class="mx-auto flex min-h-screen flex-col lg:flex-row">
      <SidebarNav />

      <div class="flex-1">
        <header class="border-b border-white/10 bg-slate-900/70 backdrop-blur">
          <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4 lg:px-8">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">NovaHub</p>
              <div class="text-sm text-slate-400">Painel de gestão premium</div>
            </div>

            <div class="flex items-center gap-3">
              <ThemeToggle />
              <button class="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-white">
                🔔 3
              </button>
              <div class="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <div class="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-indigo-500 font-semibold text-slate-950">
                  {{ initials }}
                </div>
                <div class="text-sm">
                  <div class="font-semibold text-white">{{ authStore.user?.name || 'Usuário' }}</div>
                  <div class="text-slate-400">{{ authStore.user?.email || 'conta@empresa.com' }}</div>
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
