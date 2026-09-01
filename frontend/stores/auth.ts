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
  const isReady = ref(false);

  const isAuthenticated = computed(() => user.value !== null);

  function setAuth(data: { user: AuthUser }) {
    user.value = data.user;
  }

  async function logout() {
    const config = useRuntimeConfig();

    try {
      await axios.post(`${config.public.apiBase}/auth/logout`, null, { withCredentials: true });
    } finally {
      user.value = null;
    }
  }

  async function fetchMe() {
    try {
      const config = useRuntimeConfig();
      const response = await axios.get(`${config.public.apiBase}/users/me`, {
        withCredentials: true
      });
      user.value = response.data;
    } catch {
      user.value = null;
    } finally {
      isReady.value = true;
    }
  }

  return { user, isReady, isAuthenticated, setAuth, logout, fetchMe };
});
