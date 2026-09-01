import { defineStore } from 'pinia';
import axios from 'axios';
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
  const isReady = ref(false);

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

  async function fetchMe() {
    if (!token.value) {
      isReady.value = true;
      return;
    }

    try {
      const config = useRuntimeConfig();
      const response = await axios.get(`${config.public.apiBase}/users/me`, {
        headers: { Authorization: `Bearer ${token.value}` }
      });
      user.value = response.data;
    } catch {
      logout();
    } finally {
      isReady.value = true;
    }
  }

  return { user, token, isReady, isAuthenticated, setAuth, logout, hydrate, fetchMe };
});
