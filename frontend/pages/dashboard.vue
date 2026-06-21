<template>
  <div class="min-h-screen bg-slate-50 text-slate-800">
    <div class="mx-auto max-w-6xl p-8">
      <h1 class="text-4xl font-semibold mb-6">Dashboard</h1>
      <div class="grid gap-6 lg:grid-cols-3">
        <div class="rounded-3xl bg-white p-6 shadow-sm">
          <h2 class="text-xl font-semibold mb-3">Projetos</h2>
          <p class="text-slate-500">Visão geral rápida dos projetos ativos.</p>
        </div>
        <div class="rounded-3xl bg-white p-6 shadow-sm">
          <h2 class="text-xl font-semibold mb-3">Tarefas</h2>
          <p class="text-slate-500">Status e progresso das tarefas em andamento.</p>
        </div>
        <div class="rounded-3xl bg-white p-6 shadow-sm">
          <h2 class="text-xl font-semibold mb-3">Chat</h2>
          <p class="text-slate-500">Acompanhe mensagens e notificações em tempo real.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
