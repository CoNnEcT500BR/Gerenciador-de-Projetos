<template>
  <AuthShell showcase-title="Retome o que importa para sua equipe." showcase-description="Projetos, prioridades e decisões organizados para o seu próximo avanço.">
    <div class="mb-8"><p class="page-kicker">Bem-vindo de volta</p><h1 class="mt-3 text-3xl font-bold tracking-tight">Entrar na sua workspace</h1><p class="mt-2 text-sm text-[color:var(--text-muted)]">Acesse o NovaHub e siga seu fluxo.</p></div>
    <form class="space-y-5" @submit.prevent="submitLogin">
      <div><label for="login-email" class="mb-2 block text-sm font-medium">Email</label><input id="login-email" v-model="email" type="email" required autocomplete="email" placeholder="voce@empresa.com" class="field w-full px-4 py-3" /></div>
      <div><label for="login-password" class="mb-2 block text-sm font-medium">Senha</label><input id="login-password" v-model="password" type="password" required minlength="6" autocomplete="current-password" placeholder="Sua senha" class="field w-full px-4 py-3" /></div>
      <p v-if="error" class="rounded-xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] px-3 py-2 text-sm text-[color:var(--danger-text)]" role="alert">{{ error }}</p>
      <button type="submit" :disabled="loading" class="min-h-12 w-full rounded-xl bg-[color:var(--bg-button)] px-4 py-3 font-semibold text-[color:var(--text-button)] transition hover:bg-[color:var(--bg-button-hover)] disabled:opacity-60">{{ loading ? 'Entrando...' : 'Entrar' }}</button>
    </form>
    <p class="mt-6 text-center text-sm text-[color:var(--text-muted)]">Novo por aqui? <NuxtLink to="/register" class="font-semibold text-[color:var(--primary)]">Crie uma conta</NuxtLink></p>
  </AuthShell>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from '#imports';
import AuthShell from '@/components/layout/AuthShell.vue';
import { useAuthStore } from '@/stores/auth';
import { useApi } from '@/composables/useApi';

definePageMeta({ middleware: 'guest' });

const email = ref(''); const password = ref(''); const loading = ref(false); const error = ref('');
const authStore = useAuthStore(); const router = useRouter(); const api = useApi();
async function submitLogin() {
  error.value = ''; loading.value = true;
  try { const response = await api.post('/auth/login', { email: email.value, password: password.value }); authStore.setAuth(response.data); await router.push('/dashboard'); }
  catch (err) { error.value = axios.isAxiosError(err) ? (err.response?.data?.error ?? 'Erro ao entrar. Tente novamente.') : 'Erro inesperado.'; }
  finally { loading.value = false; }
}
</script>
