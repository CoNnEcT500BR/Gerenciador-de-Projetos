<template>
  <AuthShell showcase-title="Dê à sua equipe um lugar para fazer acontecer." showcase-description="Comece com um projeto e transforme cada conversa em um próximo passo claro." :benefits="['Cadastro gratuito, sem cartão de crédito', 'Convide sua equipe em poucos cliques', 'Primeiro projeto pronto em minutos']">
    <div class="mb-8"><p class="page-kicker">Comece gratuitamente</p><h1 class="mt-3 text-3xl font-bold tracking-tight">Criar sua conta</h1><p class="mt-2 text-sm text-[color:var(--text-muted)]">Organize o trabalho com uma workspace moderna.</p></div>
    <form class="space-y-5" @submit.prevent="submitRegister">
      <div><label for="register-name" class="mb-2 block text-sm font-medium">Nome</label><input id="register-name" v-model="name" type="text" required minlength="3" autocomplete="name" placeholder="Seu nome completo" class="field w-full px-4 py-3" /></div>
      <div><label for="register-email" class="mb-2 block text-sm font-medium">Email</label><input id="register-email" v-model="email" type="email" required autocomplete="email" placeholder="voce@empresa.com" class="field w-full px-4 py-3" /></div>
      <div><label for="register-password" class="mb-2 block text-sm font-medium">Senha <span class="font-normal text-[color:var(--text-muted)]">(mínimo 6 caracteres)</span></label><input id="register-password" v-model="password" type="password" required minlength="6" autocomplete="new-password" placeholder="Mínimo de 6 caracteres" class="field w-full px-4 py-3" /></div>
      <p v-if="error" class="rounded-xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] px-3 py-2 text-sm text-[color:var(--danger-text)]" role="alert">{{ error }}</p>
      <button type="submit" :disabled="loading" class="min-h-12 w-full rounded-xl bg-[color:var(--bg-button)] px-4 py-3 font-semibold text-[color:var(--text-button)] transition hover:bg-[color:var(--bg-button-hover)] disabled:opacity-60">{{ loading ? 'Criando conta...' : 'Criar conta' }}</button>
    </form>
    <p class="mt-6 text-center text-sm text-[color:var(--text-muted)]">Já tem conta? <NuxtLink to="/login" class="font-semibold text-[color:var(--primary)]">Entre agora</NuxtLink></p>
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

const name = ref(''); const email = ref(''); const password = ref(''); const loading = ref(false); const error = ref('');
const authStore = useAuthStore(); const router = useRouter(); const api = useApi();
async function submitRegister() {
  error.value = ''; loading.value = true;
  try { const response = await api.post('/auth/register', { name: name.value, email: email.value, password: password.value }); authStore.setAuth(response.data); await router.push('/dashboard'); }
  catch (err) { error.value = axios.isAxiosError(err) ? (err.response?.data?.error ?? 'Erro ao registrar. Tente novamente.') : 'Erro inesperado.'; }
  finally { loading.value = false; }
}
</script>
