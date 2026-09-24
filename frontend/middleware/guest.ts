import { useAuthStore } from '@/stores/auth';

export default defineNuxtRouteMiddleware(async () => {
  if (!import.meta.client) return;

  const authStore = useAuthStore();
  if (!authStore.isReady) await authStore.fetchMe();
  if (authStore.isAuthenticated) return navigateTo('/dashboard');
});
