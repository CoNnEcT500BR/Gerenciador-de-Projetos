<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="(path, index) in paths" :key="index" :d="path" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  name: 'dashboard' | 'projects' | 'tasks' | 'messages' | 'profile' | 'spark' | 'menu' | 'close' | 'sun' | 'moon' | 'layers' | 'message' | 'chart' | 'bolt';
  size?: number;
}>(), { size: 18 });

const paths = computed(() => ({
  dashboard: ['M4 4h6v6H4z', 'M14 4h6v6h-6z', 'M4 14h6v6H4z', 'M14 14h6v6h-6z'],
  projects: ['M4 7h16', 'M6 4h5l2 3h5a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z'],
  tasks: ['M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'm8 12 2 2 5-5', 'M8 8h8'],
  messages: ['M20 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-4-.9L4 20l1.6-3.3A7.2 7.2 0 0 1 4.5 12 7.5 7.5 0 0 1 12 4.5a7.5 7.5 0 0 1 8 7Z'],
  profile: ['M20 21a8 8 0 0 0-16 0', 'M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'],
  spark: ['m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z'],
  menu: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
  close: ['M6 6l12 12', 'M18 6 6 18'],
  sun: ['M12 3v2', 'M12 19v2', 'm4.2 4.2 1.4 1.4', 'm18.4 18.4 1.4 1.4', 'M3 12h2', 'M19 12h2', 'm4.2 19.8 1.4-1.4', 'm18.4 5.6 1.4-1.4', 'a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z'],
  moon: ['M20.5 14.5A8 8 0 0 1 9.5 3.5 8 8 0 1 0 20.5 14.5Z'],
  layers: ['M12 3 3.5 7.5 12 12l8.5-4.5L12 3Z', 'm3.5 12 8.5 4.5 8.5-4.5', 'm3.5 16.5 8.5 4.5 8.5-4.5'],
  message: ['M20 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-4-.9L4 20l1.6-3.3A7.2 7.2 0 0 1 4.5 12 7.5 7.5 0 0 1 12 4.5a7.5 7.5 0 0 1 8 7Z', 'M8 12h.01', 'M12 12h.01', 'M16 12h.01'],
  chart: ['M5 19V9', 'M12 19V5', 'M19 19v-7'],
  bolt: ['m13 2-8 11h6l-1 9 8-11h-6l1-9Z'],
}[props.name]));
</script>
