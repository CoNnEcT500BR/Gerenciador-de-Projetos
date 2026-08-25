<template>
  <div class="relative min-h-screen overflow-hidden bg-[color:var(--bg)] px-4 py-10 text-[color:var(--text)]">
    <!-- Decorative background -->
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-linear-to-br from-[color:var(--accent-gradient-a)] to-transparent blur-3xl"></div>
      <div class="absolute -bottom-40 -right-16 h-[28rem] w-[28rem] rounded-full bg-linear-to-tr from-[color:var(--accent-gradient-b)] to-transparent blur-3xl"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle,_var(--border)_1px,_transparent_1px)] bg-size-[28px_28px] opacity-30"></div>
    </div>

    <div class="relative z-10 mx-auto mb-6 max-w-6xl">
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--text-muted)] transition hover:text-[color:var(--text)]">
        <span aria-hidden="true">←</span>
        Voltar para o início
      </NuxtLink>
    </div>

    <div class="mx-auto flex max-w-6xl items-center justify-center">
      <div class="grid w-full max-w-4xl overflow-hidden rounded-4xl border border-[color:var(--border)] bg-[color:var(--surface)]/90 shadow-[0_25px_50px_-12px_var(--shadow-tint-soft)] backdrop-blur lg:grid-cols-[1.05fr_1fr]">

        <!-- LEFT: brand panel -->
        <div class="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-[color:var(--accent-gradient-a)] to-[color:var(--accent-gradient-b)] p-10 lg:flex">
          <BrandLogo />

          <div class="space-y-5">
            <div class="inline-flex rounded-full border border-[color:var(--accent-soft-border)] bg-[color:var(--accent-soft-bg)] px-3 py-1 text-xs font-medium text-[color:var(--text-info)]">
              Bem-vindo de volta
            </div>
            <h2 class="text-3xl font-semibold leading-tight">Volte a organizar sua equipe em segundos.</h2>

            <div class="grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/60 p-3">
                <p class="text-xl font-semibold text-[color:var(--text)]">+2.500</p>
                <p class="text-xs text-[color:var(--text-muted)]">Equipes ativas</p>
              </div>
              <div class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/60 p-3">
                <p class="text-xl font-semibold text-[color:var(--text)]">24/7</p>
                <p class="text-xs text-[color:var(--text-muted)]">Suporte disponível</p>
              </div>
            </div>

            <ul class="space-y-3 text-sm text-[color:var(--text-muted)]">
              <li class="flex items-center gap-2">
                <span class="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-from)]"></span>
                Projetos e tarefas sempre atualizados
              </li>
              <li class="flex items-center gap-2">
                <span class="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-from)]"></span>
                Chat em tempo real com sua equipe
              </li>
              <li class="flex items-center gap-2">
                <span class="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-from)]"></span>
                Painel único para acompanhar entregas
              </li>
            </ul>
          </div>

          <p class="text-xs text-[color:var(--text-muted)]">&copy; {{ new Date().getFullYear() }} NovaHub</p>
        </div>

        <!-- RIGHT: form -->
        <div class="p-8 sm:p-10">
          <div class="mb-6 flex items-center justify-between lg:hidden">
            <BrandLogo />
            <ThemeToggle />
          </div>

          <div class="mb-6 hidden justify-end lg:flex">
            <ThemeToggle />
          </div>

          <div class="mb-6">
            <div class="mb-3 inline-flex rounded-full border border-[color:var(--accent-soft-border)] bg-[color:var(--accent-soft-bg)] px-3 py-1 text-xs font-medium text-[color:var(--text-info)] lg:hidden">
              Bem-vindo de volta
            </div>
            <h1 class="text-3xl font-bold tracking-tight">Entrar</h1>
            <p class="mt-2 text-sm text-[color:var(--text-muted)]">Acesse sua workspace e siga seu fluxo.</p>
          </div>

          <form @submit.prevent="submitLogin" class="space-y-4">
            <div>
              <label class="mb-2 block text-sm font-medium text-[color:var(--text-muted)]">Email</label>
              <input v-model="email" type="email" required class="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)] px-4 py-3 text-[color:var(--text)] placeholder:text-[color:var(--text-muted)] outline-none transition focus:border-[color:var(--primary)]" />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-[color:var(--text-muted)]">Senha</label>
              <input v-model="password" type="password" required class="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)] px-4 py-3 text-[color:var(--text)] placeholder:text-[color:var(--text-muted)] outline-none transition focus:border-[color:var(--primary)]" />
            </div>

            <p v-if="error" class="rounded-xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] px-3 py-2 text-sm text-[color:var(--danger-text)]">{{ error }}</p>

            <button type="submit" :disabled="loading" class="w-full rounded-2xl bg-[color:var(--bg-button)] px-4 py-3 font-semibold text-[color:var(--text-button)] transition hover:bg-[color:var(--bg-button-hover)] hover:text-[color:var(--text-button-hover)] disabled:cursor-not-allowed disabled:opacity-70">
              {{ loading ? 'Entrando...' : 'Entrar' }}
            </button>
          </form>

          <div class="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[color:var(--text-muted)]">
            <span class="flex items-center gap-1">
              <span class="text-[color:var(--success-text)]">✓</span>
              Acesso seguro
            </span>
            <span class="flex items-center gap-1">
              <span class="text-[color:var(--success-text)]">✓</span>
              Dados protegidos
            </span>
          </div>

          <p class="mt-5 text-center text-sm text-[color:var(--text-muted)]">
            Novo por aqui?
            <NuxtLink to="/register" class="font-semibold text-[color:var(--primary)]">Crie uma conta</NuxtLink>
          </p>
        </div>
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
import BrandLogo from '@/components/ui/BrandLogo.vue';
import ThemeToggle from '@/components/ui/ThemeToggle.vue';

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const authStore = useAuthStore();
const router = useRouter();
const api = useApi();

async function submitLogin() {
  error.value = '';
  loading.value = true;

  try {
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value,
    });

    authStore.setAuth(response.data);
    await router.push('/dashboard');
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error.value =
        err.response?.data?.error ?? 'Erro ao entrar. Tente novamente.';
    } else {
      error.value = 'Erro inesperado.';
    }
  } finally {
    loading.value = false;
  }
}
</script>
