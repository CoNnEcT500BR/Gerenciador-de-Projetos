import { computed, ref } from 'vue';

const STORAGE_KEY = 'novahub-cookie-consent';

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
};

export function useCookieConsent() {
  const consent = useState<CookieConsent | null>('cookie-consent', () => null);
  const isOpen = ref(false);
  const hasChoice = computed(() => consent.value !== null);

  function init() {
    if (!import.meta.client) return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        consent.value = JSON.parse(saved) as CookieConsent;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }

  function save(analytics: boolean) {
    const value: CookieConsent = { necessary: true, analytics };
    consent.value = value;
    isOpen.value = false;
    if (import.meta.client) localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  }

  function openPreferences() {
    isOpen.value = true;
  }

  return { consent, hasChoice, isOpen, init, save, openPreferences };
}
