import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null);
  const token = ref('');

  const isAuthenticated = computed(() => Boolean(token.value));

  function setAuth(data: { user: AuthUser; token: string }) {
    user.value = data.user;
    token.value = data.token;

    if (import.meta.client) {
      localStorage.setItem('authToken', data.token);
    }
  }

  function logout() {
    user.value = null;
    token.value = '';

    if (import.meta.client) {
      localStorage.removeItem('authToken');
    }
  }

  function hydrate() {
    if (!import.meta.client) return;

    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      token.value = storedToken;
    }
  }

  return { user, token, isAuthenticated, setAuth, logout, hydrate };
});
