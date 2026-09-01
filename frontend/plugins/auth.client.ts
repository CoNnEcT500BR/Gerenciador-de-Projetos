import { useAuthStore } from '@/stores/auth';

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();

  authStore.hydrate();
  await authStore.fetchMe();
});
