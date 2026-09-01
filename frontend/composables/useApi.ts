import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

export function useApi() {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const token = import.meta.client
    ? (localStorage.getItem('authToken') ?? authStore.token)
    : authStore.token;

  return axios.create({
    baseURL: config.public.apiBase,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
}
