import { computed, ref } from 'vue';

export function useTheme() {
  const theme = ref<'dark' | 'light'>('dark');

  const isDark = computed(() => theme.value === 'dark');

  function applyTheme(value: 'dark' | 'light') {
    const root = document.documentElement;
    root.classList.toggle('theme-light', value === 'light');
    root.classList.toggle('theme-dark', value === 'dark');
  }

  function initTheme() {
    if (!import.meta.client) return;

    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    theme.value = savedTheme || 'dark';
    applyTheme(theme.value);
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';

    if (import.meta.client) {
      localStorage.setItem('theme', theme.value);
      applyTheme(theme.value);
    }
  }

  return { theme, isDark, initTheme, toggleTheme };
}
