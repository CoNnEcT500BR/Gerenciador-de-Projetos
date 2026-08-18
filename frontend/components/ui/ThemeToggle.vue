<template>
  <button
    type="button"
    class="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-3 py-2 text-sm font-medium text-[color:var(--text)] transition duration-300 hover:border-[color:var(--border-hover)] hover:bg-[color:var(--bg-button-hover)] hover:text-[color:var(--text-button-hover)]"
    @click="toggleTheme"
  >
    <span class="inline-flex h-5 w-5 items-center justify-center transition-transform duration-300" :class="isDark ? 'rotate-0 scale-100' : 'rotate-180 scale-110'">
      {{ isDark ? '☀️' : '🌙' }}
    </span>
    <span>{{ isDark ? 'Claro' : 'Escuro' }}</span>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { isDark, toggleTheme } = useTheme();
</script>
