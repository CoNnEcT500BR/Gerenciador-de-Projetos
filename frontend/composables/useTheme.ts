import { computed, ref } from 'vue';

const theme = ref<'dark' | 'light'>('dark');

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark');

  function applyTheme(value: 'dark' | 'light') {
    if (!import.meta.client) return;

    const root = document.documentElement;

    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(value === 'dark' ? 'theme-dark' : 'theme-light');
  }

  function initTheme() {
    if (!import.meta.client) return;

    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;

    theme.value = saved || 'dark';

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
