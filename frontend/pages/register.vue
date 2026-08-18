<template>
  <div class="relative min-h-screen overflow-hidden bg-[color:var(--bg)] px-4 py-10 text-[color:var(--text)]">
    <!-- Decorative background -->
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-linear-to-br from-[color:var(--accent-gradient-a)] to-transparent blur-3xl"></div>
      <div class="absolute -bottom-40 -left-16 h-[28rem] w-[28rem] rounded-full bg-linear-to-tr from-[color:var(--accent-gradient-b)] to-transparent blur-3xl"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle,_var(--border)_1px,_transparent_1px)] bg-size-[28px_28px] opacity-30"></div>
    </div>

    <div class="relative z-10 mx-auto mb-6 max-w-6xl">
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--text-muted)] transition hover:text-[color:var(--text)]">
        <span aria-hidden="true">←</span>
        Voltar para o início
      </NuxtLink>
    </div>

    <div class="mx-auto flex max-w-6xl items-center justify-center">
      <div class="grid w-full max-w-4xl overflow-hidden rounded-4xl border border-[color:var(--border)] bg-[color:var(--surface)]/90 shadow-[0_25px_50px_-12px_var(--shadow-tint-soft)] backdrop-blur lg:grid-cols-[1fr_1.05fr]">

        <!-- LEFT: form -->
        <div class="order-2 p-8 sm:p-10 lg:order-1">
          <div class="mb-6 flex items-center justify-between lg:hidden">
            <BrandLogo />
            <ThemeToggle />
          </div>

          <div class="mb-6 hidden lg:flex">
            <ThemeToggle />
          </div>

          <div class="mb-6">
            <div class="mb-3 inline-flex rounded-full border border-[color:var(--accent-soft-border)] bg-[color:var(--accent-soft-bg)] px-3 py-1 text-xs font-medium text-[color:var(--text-info)] lg:hidden">
              Comece gratuitamente
            </div>
            <h1 class="text-3xl font-bold tracking-tight">Criar conta</h1>
            <p class="mt-2 text-sm text-[color:var(--text-muted)]">Comece sua jornada com uma workspace moderna.</p>
          </div>

          <form @submit.prevent="submitRegister" class="space-y-4">
            <div>
              <label class="mb-2 block text-sm font-medium text-[color:var(--text-muted)]">Nome</label>
              <input v-model="name" type="text" required class="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)]/60 px-4 py-3 text-[color:var(--text)] outline-none transition focus:border-[color:var(--border-hover)]" />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-[color:var(--text-muted)]">Email</label>
              <input v-model="email" type="email" required class="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)]/60 px-4 py-3 text-[color:var(--text)] outline-none transition focus:border-[color:var(--border-hover)]" />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-[color:var(--text-muted)]">Senha</label>
              <input v-model="password" type="password" required class="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)]/60 px-4 py-3 text-[color:var(--text)] outline-none transition focus:border-[color:var(--border-hover)]" />
            </div>

            <p v-if="error" class="rounded-xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] px-3 py-2 text-sm text-[color:var(--danger-text)]">{{ error }}</p>

            <button type="submit" :disabled="loading" class="w-full rounded-2xl bg-[color:var(--bg-button)] px-4 py-3 font-semibold text-[color:var(--text-button)] transition hover:bg-[color:var(--bg-button-hover)] hover:text-[color:var(--text-button-hover)] disabled:cursor-not-allowed disabled:opacity-70">
              {{ loading ? 'Criando conta...' : 'Registrar' }}
            </button>
          </form>

          <div class="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[color:var(--text-muted)]">
            <span class="flex items-center gap-1">
              <span class="text-[color:var(--success-text)]">✓</span>
              Sem cartão de crédito
            </span>
            <span class="flex items-center gap-1">
              <span class="text-[color:var(--success-text)]">✓</span>
              Cancelamento fácil
            </span>
          </div>

          <p class="mt-5 text-center text-sm text-[color:var(--text-muted)]">
            Já tem conta?
            <NuxtLink to="/login" class="font-semibold text-[color:var(--primary)]">Entre agora</NuxtLink>
          </p>
        </div>

        <!-- RIGHT: brand panel -->
        <div class="relative order-1 hidden flex-col justify-between overflow-hidden bg-linear-to-br from-[color:var(--accent-gradient-a)] to-[color:var(--accent-gradient-b)] p-10 lg:order-2 lg:flex">
          <BrandLogo />

          <div class="space-y-5">
            <div class="inline-flex rounded-full border border-[color:var(--accent-soft-border)] bg-[color:var(--accent-soft-bg)] px-3 py-1 text-xs font-medium text-[color:var(--text-info)]">
              Comece gratuitamente
            </div>
            <h2 class="text-3xl font-semibold leading-tight">Comece a organizar sua equipe hoje mesmo.</h2>

            <div class="grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/60 p-3">
                <p class="text-xl font-semibold text-[color:var(--text)]">+2.500</p>
                <p class="text-xs text-[color:var(--text-muted)]">Equipes ativas</p>
              </div>
              <div class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/60 p-3">
                <p class="text-xl font-semibold text-[color:var(--text)]">2 min</p>
                <p class="text-xs text-[color:var(--text-muted)]">Para começar</p>
              </div>
            </div>

            <ul class="space-y-3 text-sm text-[color:var(--text-muted)]">
              <li class="flex items-center gap-2">
                <span class="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-from)]"></span>
                Cadastro gratuito, sem cartão de crédito
              </li>
              <li class="flex items-center gap-2">
                <span class="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-from)]"></span>
                Convide sua equipe em poucos cliques
              </li>
              <li class="flex items-center gap-2">
                <span class="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-from)]"></span>
                Primeiro projeto pronto em minutos
              </li>
            </ul>
          </div>

          <p class="text-xs text-[color:var(--text-muted)]">&copy; {{ new Date().getFullYear() }} NovaHub</p>
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
