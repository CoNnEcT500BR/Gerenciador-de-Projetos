<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50">
    <div class="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg">
      <h1 class="text-2xl font-bold mb-6">Registrar</h1>
      <form @submit.prevent="submitRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Nome</label>
          <input v-model="name" type="text" required class="w-full rounded-xl border border-slate-300 px-4 py-3" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Email</label>
          <input v-model="email" type="email" required class="w-full rounded-xl border border-slate-300 px-4 py-3" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Senha</label>
          <input v-model="password" type="password" required class="w-full rounded-xl border border-slate-300 px-4 py-3" />
        </div>
        <button type="submit" class="w-full rounded-2xl bg-slate-900 text-white px-4 py-3">Registrar</button>
      </form>
      <p class="text-sm text-slate-500 mt-4">Já tem conta? <NuxtLink to="/login" class="text-slate-900 font-semibold">Entre</NuxtLink></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const password = ref('');

function submitRegister() {
  console.log('Registrar', name.value, email.value, password.value);
}
</script>
