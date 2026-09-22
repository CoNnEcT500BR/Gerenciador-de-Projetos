import { computed } from 'vue';

const STORAGE_KEY = 'novahub-accessibility';

export function useAccessibility() {
  const highContrast = useState('highContrast', () => false);

  const label = computed(() => highContrast.value ? 'Desativar alto contraste' : 'Ativar alto contraste');

  function apply() {
    if (!import.meta.client) return;
    document.documentElement.classList.toggle('high-contrast', highContrast.value);
  }

  function init() {
    if (!import.meta.client) return;
    highContrast.value = localStorage.getItem(STORAGE_KEY) === 'high-contrast';
    apply();
  }

  function toggleHighContrast() {
    highContrast.value = !highContrast.value;
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, highContrast.value ? 'high-contrast' : 'normal');
      apply();
    }
  }

  return { highContrast, label, init, toggleHighContrast };
}
