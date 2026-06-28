<template>
  <div class="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
    <div class="mx-auto flex max-w-6xl items-center justify-center">
      <div class="w-full max-w-md rounded-4xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur">
        <div class="mb-6">
          <p class="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">NovaHub</p>
          <h1 class="mt-2 text-3xl font-semibold">Criar conta</h1>
          <p class="mt-2 text-sm text-slate-400">Comece sua jornada com uma workspace moderna.</p>
        </div>

        <form @submit.prevent="submitRegister" class="space-y-4">
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-300">Nome</label>
            <input v-model="name" type="text" required class="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-cyan-400" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-300">Email</label>
            <input v-model="email" type="email" required class="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-cyan-400" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-300">Senha</label>
            <input v-model="password" type="password" required class="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 outline-none transition focus:border-cyan-400" />
          </div>

          <p v-if="error" class="rounded-xl border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{{ error }}</p>

          <button type="submit" :disabled="loading" class="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70">
            {{ loading ? 'Criando conta...' : 'Registrar' }}
          </button>
        </form>

        <p class="mt-5 text-center text-sm text-slate-400">
          Já tem conta?
          <NuxtLink to="/login" class="font-semibold text-cyan-300">Entre agora</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from '#imports';
import { useAuthStore } from '@/stores/auth';
import { useApi } from '@/composables/useApi';

const name = ref('');
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const authStore = useAuthStore();
const router = useRouter();
const api = useApi();

async function submitRegister() {
  error.value = '';
  loading.value = true;

  try {
    const response = await api.post('/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value,
    });

    authStore.setAuth(response.data);
    await router.push('/dashboard');
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error.value =
        err.response?.data?.error ?? 'Erro ao registrar. Tente novamente.';
    } else {
      error.value = 'Erro inesperado.';
    }
  } finally {
    loading.value = false;
  }
}
</script>
