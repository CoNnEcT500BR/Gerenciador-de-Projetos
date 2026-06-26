<template>
  <button
    type="button"
    class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm font-medium text-slate-200 transition duration-300 hover:border-cyan-400 hover:text-white"
    @click="toggleTheme"
  >
    <span class="transition-transform duration-300" :class="isDark ? 'rotate-0' : 'rotate-180'">
      {{ isDark ? '☀️' : '🌙' }}
    </span>
    <span>{{ isDark ? 'Claro' : 'Escuro' }}</span>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { isDark, toggleTheme } = useTheme();
</script>
