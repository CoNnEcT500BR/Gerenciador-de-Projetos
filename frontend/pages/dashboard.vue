<template>
  <BaseLayout>
    <div class="space-y-6">
      <section class="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-500/10">
        <div class="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div class="max-w-2xl">
            <p class="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Bem-vindo de volta</p>
            <h1 class="mt-3 text-3xl font-semibold text-white">Seu painel central está mais claro, rápido e premium.</h1>
            <p class="mt-3 text-sm leading-7 text-slate-400">
              Acompanhe projetos, tarefas e comunicação em um ambiente elegante e pensado para decisões ágeis.
            </p>
          </div>
          <div class="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
            <div class="font-semibold">Meta do mês</div>
            <div class="mt-1 text-slate-300">78% de execução</div>
          </div>
        </div>
      </section>

      <div class="grid gap-6 xl:grid-cols-3">
        <div class="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6">
          <div class="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Projetos</div>
          <div class="mt-4 text-3xl font-semibold text-white">12</div>
          <p class="mt-2 text-sm leading-7 text-slate-400">Organize iniciativas e acompanhe o status em tempo real.</p>
        </div>
        <div class="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6">
          <div class="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Tarefas</div>
          <div class="mt-4 text-3xl font-semibold text-white">28</div>
          <p class="mt-2 text-sm leading-7 text-slate-400">Defina prioridades e visualize entregas com visão estratégica.</p>
        </div>
        <div class="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6">
          <div class="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Mensagens</div>
          <div class="mt-4 text-3xl font-semibold text-white">Live</div>
          <p class="mt-2 text-sm leading-7 text-slate-400">Mantenha comunicação fluida com notificações instantâneas.</p>
        </div>
      </div>

      <div class="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div class="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-white">Atividades recentes</h2>
            <span class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-400">Hoje</span>
          </div>
          <div class="mt-6 space-y-4">
            <div class="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div class="flex items-center justify-between">
                <p class="font-medium text-white">Nova tarefa atribuída</p>
                <span class="text-sm text-cyan-300">há 10 min</span>
              </div>
              <p class="mt-2 text-sm text-slate-400">Design review para a próxima sprint foi marcada para hoje.</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div class="flex items-center justify-between">
                <p class="font-medium text-white">Projeto atualizado</p>
                <span class="text-sm text-cyan-300">há 45 min</span>
              </div>
              <p class="mt-2 text-sm text-slate-400">O roadmap da integração foi ajustado com novas prioridades.</p>
            </div>
          </div>
        </div>

        <div class="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6">
          <h2 class="text-xl font-semibold text-white">Equipe em foco</h2>
          <div class="mt-6 space-y-3">
            <div class="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
              <div>
                <p class="font-medium text-white">Ana Ribeiro</p>
                <p class="text-sm text-slate-400">Product Design</p>
              </div>
              <span class="text-sm text-cyan-300">Online</span>
            </div>
            <div class="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
              <div>
                <p class="font-medium text-white">Caio Mendes</p>
                <p class="text-sm text-slate-400">Backend</p>
              </div>
              <span class="text-sm text-cyan-300">Disponível</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/components/layout/BaseLayout.vue';
</script>
