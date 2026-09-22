<template>
  <button
    type="button"
    class="rounded-lg border border-[color:var(--border)] px-3 py-2 text-xs font-semibold text-[color:var(--text-muted)] transition hover:border-[color:var(--border-hover)] hover:text-[color:var(--text)]"
    :aria-pressed="highContrast"
    :aria-label="label"
    @click="toggleHighContrast"
  >
    <span aria-hidden="true">◐</span> Contraste
  </button>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAccessibility } from '@/composables/useAccessibility';

const { highContrast, label, init, toggleHighContrast } = useAccessibility();
onMounted(init);
</script>
