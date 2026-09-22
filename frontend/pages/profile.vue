<template>
  <BaseLayout>
    <div class="space-y-6">
      <section class="surface-card max-w-2xl p-6 sm:p-8">
        <p class="page-kicker">Conta</p>
        <h1 class="mt-2 text-3xl font-semibold tracking-[-.035em] text-[color:var(--text)]">Seu perfil</h1>
        <p class="mt-2 text-sm leading-6 text-[color:var(--text-muted)]">Mantenha seus dados atualizados para que sua equipe saiba com quem contar.</p>
      </section>
      <div class="surface-card max-w-2xl p-6 sm:p-8">
        <form class="space-y-5" @submit.prevent="save">
          <label class="block text-sm font-medium text-[color:var(--text-muted)]">Nome
            <input v-model="form.name" required autocomplete="name" class="field mt-2 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-2)] px-4 py-3 text-[color:var(--text)] outline-none focus:border-[color:var(--primary)]" />
          </label>
          <label class="block text-sm font-medium text-[color:var(--text-muted)]">E-mail
            <input v-model="form.email" type="email" required autocomplete="email" class="field mt-2 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-2)] px-4 py-3 text-[color:var(--text)] outline-none focus:border-[color:var(--primary)]" />
          </label>
          <p v-if="message" class="text-sm text-[color:var(--success-text)]">{{ message }}</p>
          <p v-if="error" class="text-sm text-[color:var(--danger-text)]">{{ error }}</p>
          <button :disabled="saving" class="rounded-xl bg-[color:var(--bg-button)] px-5 py-3 text-sm font-semibold text-[color:var(--text-button)] transition hover:bg-[color:var(--bg-button-hover)] disabled:opacity-60">
            {{ saving ? 'Salvando...' : 'Salvar alterações' }}
          </button>
        </form>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/components/layout/BaseLayout.vue';
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useApi } from '@/composables/useApi';
import { useAuthStore } from '@/stores/auth';

definePageMeta({
  middleware: 'auth'
});

const api = useApi();
const auth = useAuthStore();
const form = reactive({ name: '', email: '' });
const saving = ref(false);
const message = ref('');
const error = ref('');

onMounted(() => {
  form.name = auth.user?.name ?? '';
  form.email = auth.user?.email ?? '';
});

async function save() {
  saving.value = true; message.value = ''; error.value = '';
  try {
    const response = await api.patch('/users/me', form);
    auth.user = { ...auth.user!, ...response.data };
    message.value = 'Perfil atualizado.';
  } catch (cause: unknown) {
    error.value = axios.isAxiosError(cause)
      ? cause.response?.data?.error ?? 'Não foi possível atualizar o perfil.'
      : 'Não foi possível atualizar o perfil.';
  } finally { saving.value = false; }
}
</script>
