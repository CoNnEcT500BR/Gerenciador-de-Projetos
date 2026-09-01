import axios from 'axios';

function readCookie(name: string): string | null {
  if (!import.meta.client) return null;

  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function useApi() {
  const config = useRuntimeConfig();

  const api = axios.create({
    baseURL: config.public.apiBase,
    // Sends the httpOnly auth cookie automatically; the API no longer needs a Bearer header.
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  api.interceptors.request.use((request) => {
    const method = request.method?.toUpperCase();

    if (method && method !== 'GET' && method !== 'HEAD') {
      const csrfToken = readCookie('csrfToken');
      if (csrfToken) {
        request.headers['X-CSRF-Token'] = csrfToken;
      }
    }

    return request;
  });

  return api;
}
