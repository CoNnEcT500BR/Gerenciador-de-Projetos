import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null as null | { id: number; name: string; email: string; role: string });
  const token = ref('');

  function setAuth(data: { user: { id: number; name: string; email: string; role: string }; token: string }) {
    user.value = data.user;
    token.value = data.token;
    localStorage.setItem('authToken', data.token);
  }

  function logout() {
    user.value = null;
    token.value = '';
    localStorage.removeItem('authToken');
  }

  return { user, token, setAuth, logout };
});
