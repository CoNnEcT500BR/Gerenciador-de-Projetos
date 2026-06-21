<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50">
    <div class="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg">
      <h1 class="text-2xl font-bold mb-6">Entrar</h1>
      <form @submit.prevent="submitLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Email</label>
          <input v-model="email" type="email" required class="w-full rounded-xl border border-slate-300 px-4 py-3" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Senha</label>
          <input v-model="password" type="password" required class="w-full rounded-xl border border-slate-300 px-4 py-3" />
        </div>
        <button type="submit" class="w-full rounded-2xl bg-slate-900 text-white px-4 py-3">Entrar</button>
      </form>
      <p class="text-sm text-slate-500 mt-4">Novo por aqui? <NuxtLink to="/register" class="text-slate-900 font-semibold">Crie uma conta</NuxtLink></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');

function submitLogin() {
  console.log('Login', email.value, password.value);
}
</script>
