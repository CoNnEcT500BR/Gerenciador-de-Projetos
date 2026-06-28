<template>
  <div class="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
    <div class="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 lg:px-8">

      <!-- HEADER -->
      <header
        class="mb-14 flex flex-col gap-4 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/60 px-5 py-3 backdrop-blur lg:flex-row lg:items-center lg:justify-between"
      >
        <div class="flex items-center justify-between gap-4">
          <BrandLogo />
          <ThemeToggle />
        </div>

        <div class="flex gap-3">
          <NuxtLink
            to="/login"
            class="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/40 px-4 py-2 text-sm font-medium text-[color:var(--text)] transition hover:border-cyan-400 hover:bg-[color:var(--surface)]"
          >
            Entrar
          </NuxtLink>

          <NuxtLink
            to="/register"
            class="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Criar conta
          </NuxtLink>
        </div>
      </header>

      <!-- MAIN -->
      <main class="grid flex-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">

        <!-- LEFT -->
        <section class="space-y-6">

          <div class="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-200">
            Gestão inteligente para equipes modernas
          </div>

          <h1 class="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Organize projetos, tarefas e comunicação em um só lugar.
          </h1>

          <p class="max-w-2xl text-lg leading-8 text-[color:var(--text-muted)]">
            Uma plataforma premium para criar fluxo de trabalho, acompanhar entrega e manter sua equipe conectada em tempo real.
          </p>

          <div class="flex flex-wrap gap-4">
            <NuxtLink
              to="/register"
              class="rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Começar agora
            </NuxtLink>

            <NuxtLink
              to="/login"
              class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/40 px-6 py-3 font-semibold text-[color:var(--text)] transition hover:border-cyan-400 hover:bg-[color:var(--surface)]"
            >
              Já tenho conta
            </NuxtLink>
          </div>

          <!-- STATS -->
          <div class="grid gap-4 pt-4 sm:grid-cols-3">

            <div class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/60 p-4">
              <p class="text-2xl font-semibold">24/7</p>
              <p class="text-sm text-[color:var(--text-muted)]">Acompanhamento contínuo</p>
            </div>

            <div class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/60 p-4">
              <p class="text-2xl font-semibold">+50%</p>
              <p class="text-sm text-[color:var(--text-muted)]">Produtividade</p>
            </div>

            <div class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/60 p-4">
              <p class="text-2xl font-semibold">Realtime</p>
              <p class="text-sm text-[color:var(--text-muted)]">Chat e notificações</p>
            </div>

          </div>
        </section>

        <!-- RIGHT -->
        <section class="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]/80 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur">

          <div class="rounded-2xl border border-cyan-400/20 bg-linear-to-br from-cyan-500/20 to-indigo-500/20 p-5">

            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
              Visão da plataforma
            </p>

            <div class="mt-4 space-y-3 text-sm text-[color:var(--text-muted)]">

              <div class="flex items-center justify-between rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)]/60 px-4 py-3">
                <span>Projetos ativos</span>
                <span class="font-semibold text-[color:var(--text)]">12</span>
              </div>

              <div class="flex items-center justify-between rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)]/60 px-4 py-3">
                <span>Tarefas prioritárias</span>
                <span class="font-semibold text-[color:var(--text)]">8</span>
              </div>

              <div class="flex items-center justify-between rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)]/60 px-4 py-3">
                <span>Mensagens em tempo real</span>
                <span class="font-semibold text-[color:var(--text)]">Live</span>
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
