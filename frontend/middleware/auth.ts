import { useAuthStore } from '@/stores/auth';

export default defineNuxtRouteMiddleware((to) => {
  if (!import.meta.client) return;

  const authStore = useAuthStore();
  authStore.hydrate();

  if (!authStore.isAuthenticated) {
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
  }
});
