import { computed } from 'vue';

export function useTheme() {
  const theme = useState<'dark' | 'light'>('theme', () => 'dark');

  const isDark = computed(() => theme.value === 'dark');

  // Drive the <html> class through Nuxt's head manager so it survives SSR and client-side navigation.
  // NOTE: must run on every call (no module-level guard) - a shared flag would persist across
  // server requests in the same Node process and silently break theming for later requests.
  useHead({
    htmlAttrs: {
      class: computed(() => (isDark.value ? 'theme-dark' : 'theme-light')),
    },
  });

  function initTheme() {
    if (!import.meta.client) return;

    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    theme.value = savedTheme || 'dark';
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';

    if (!import.meta.client) return;

    localStorage.setItem('theme', theme.value);
  }

  return { theme, isDark, initTheme, toggleTheme };
}
