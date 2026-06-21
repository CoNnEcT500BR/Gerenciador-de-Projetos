<template>
  <div class="min-h-screen bg-slate-50 text-slate-800">
    <div class="mx-auto max-w-4xl p-8">
      <h1 class="text-4xl font-semibold mb-4">Plataforma de Colaboração</h1>
      <p class="text-lg text-slate-600 mb-6">Bem-vindo à base do projeto. Faça login ou registre-se para começar.</p>
      <div class="grid gap-4 sm:grid-cols-2">
        <NuxtLink to="/login" class="rounded-xl bg-slate-900 text-white px-6 py-4 text-center">Login</NuxtLink>
        <NuxtLink to="/register" class="rounded-xl bg-slate-200 text-slate-900 px-6 py-4 text-center">Registro</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
