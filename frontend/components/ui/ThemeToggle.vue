<template>
  <button
    type="button"
    class="theme-toggle"
    :class="isDark ? 'is-dark' : 'is-light'"
    :aria-label="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
    @click="toggleTheme"
  >
    <span class="theme-toggle-track">
      <span class="theme-toggle-thumb">
        <span class="theme-toggle-icon">{{ isDark ? '☀' : '☾' }}</span>
      </span>
    </span>
    <span class="theme-toggle-label">{{ isDark ? 'Claro' : 'Escuro' }}</span>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { isDark, toggleTheme } = useTheme();
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text);
  border-radius: 9999px;
  padding: 0.4rem 0.7rem 0.4rem 0.5rem;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
}

.theme-toggle:hover {
  border-color: var(--border-hover);
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
}

.theme-toggle-track {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 3.2rem;
  height: 1.8rem;
  border-radius: 9999px;
  background: rgba(148, 163, 184, 0.16);
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.15);
}

.theme-toggle-thumb {
  position: absolute;
  top: 0.14rem;
  left: 0.14rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.45rem;
  height: 1.45rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #fef3c7, #fbbf24);
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.35);
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
}

.theme-toggle.is-dark .theme-toggle-thumb {
  transform: translateX(1.34rem);
  background: linear-gradient(135deg, #f8fafc, #cbd5e1);
  box-shadow: 0 4px 12px rgba(148, 163, 184, 0.35);
}

.theme-toggle-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  line-height: 1;
}

.theme-toggle-label {
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.01em;
}
</style>
