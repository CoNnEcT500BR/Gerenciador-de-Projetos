<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <div class="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 lg:px-8">
      <header class="mb-14 flex flex-col gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
        <div class="flex items-center justify-between gap-4">
          <BrandLogo />
          <ThemeToggle />
        </div>

        <div class="flex gap-3">
          <NuxtLink to="/login" class="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-white">Entrar</NuxtLink>
          <NuxtLink to="/register" class="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">Criar conta</NuxtLink>
        </div>
      </header>

      <main class="grid flex-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section class="space-y-6">
          <div class="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-200">
            Gestão inteligente para equipes modernas
          </div>
          <h1 class="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Organize projetos, tarefas e comunicação em um só lugar.
          </h1>
          <p class="max-w-2xl text-lg leading-8 text-slate-400">
            Uma plataforma premium para criar fluxo de trabalho, acompanhar entrega e manter sua equipe conectada em tempo real.
          </p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink to="/register" class="rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">Começar agora</NuxtLink>
            <NuxtLink to="/login" class="rounded-2xl border border-white/10 px-6 py-3 font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-white">Já tenho conta</NuxtLink>
          </div>
          <div class="grid gap-4 pt-4 sm:grid-cols-3">
            <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <p class="text-2xl font-semibold text-white">24/7</p>
              <p class="text-sm text-slate-400">Acompanhamento contínuo</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <p class="text-2xl font-semibold text-white">+50%</p>
              <p class="text-sm text-slate-400">Produtividade</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <p class="text-2xl font-semibold text-white">Realtime</p>
              <p class="text-sm text-slate-400">Chat e notificações</p>
            </div>
          </div>
        </section>

        <section class="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur">
          <div class="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 p-5">
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">Visão da plataforma</p>
            <div class="mt-4 space-y-3 text-sm text-slate-300">
              <div class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
                <span>Projetos ativos</span>
                <span class="font-semibold text-white">12</span>
              </div>
              <div class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
                <span>Tarefas prioritárias</span>
                <span class="font-semibold text-white">8</span>
              </div>
              <div class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
                <span>Mensagens em tempo real</span>
                <span class="font-semibold text-white">Live</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import BrandLogo from '@/components/ui/BrandLogo.vue';
import ThemeToggle from '@/components/ui/ThemeToggle.vue';
</script>
