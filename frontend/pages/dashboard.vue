<template>
  <BaseLayout>
    <div class="space-y-6">
      <section class="rounded-4xl border border-[color:var(--border)] bg-[color:var(--surface)]/80 p-6 shadow-[0_25px_50px_-12px_var(--shadow-tint-soft)] transition-colors duration-200">
        <div class="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div class="max-w-2xl">
            <p class="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--primary)]">Bem-vindo de volta</p>
            <h1 class="mt-3 text-3xl font-semibold text-[color:var(--text)]">Seu painel central está mais claro, rápido e premium.</h1>
            <p class="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
              Acompanhe projetos, tarefas e comunicação em um ambiente elegante e pensado para decisões ágeis.
            </p>
          </div>
          <div class="rounded-2xl border border-[color:var(--accent-soft-border)] bg-[color:var(--accent-soft-bg)] px-4 py-3 text-sm text-[color:var(--text-info)]">
            <div class="font-semibold">Meta do mês</div>
            <div class="mt-1 text-[color:var(--text)]">78% de execução</div>
          </div>
        </div>
      </section>

      <div class="grid gap-6 xl:grid-cols-3">
        <div class="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-6 transition-colors duration-200">
          <div class="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--primary)]">Projetos</div>
          <div class="mt-4 text-3xl font-semibold text-[color:var(--text)]">12</div>
          <p class="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">Organize iniciativas e acompanhe o status em tempo real.</p>
        </div>
        <div class="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-6 transition-colors duration-200">
          <div class="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--primary)]">Tarefas</div>
          <div class="mt-4 text-3xl font-semibold text-[color:var(--text)]">28</div>
          <p class="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">Defina prioridades e visualize entregas com visão estratégica.</p>
        </div>
        <div class="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-6 transition-colors duration-200">
          <div class="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--primary)]">Mensagens</div>
          <div class="mt-4 text-3xl font-semibold text-[color:var(--text)]">Live</div>
          <p class="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">Mantenha comunicação fluida com notificações instantâneas.</p>
        </div>
      </div>

      <div class="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div class="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-6 transition-colors duration-200">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-[color:var(--text)]">Atividades recentes</h2>
            <span class="rounded-full border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-3 py-1 text-sm text-[color:var(--text-muted)]">Hoje</span>
          </div>
          <div class="mt-6 space-y-4">
            <div class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)]/70 p-4 transition-colors duration-200">
              <div class="flex items-center justify-between">
                <p class="font-medium text-[color:var(--text)]">Nova tarefa atribuída</p>
                <span class="text-sm text-[color:var(--primary)]">há 10 min</span>
              </div>
              <p class="mt-2 text-sm text-[color:var(--text-muted)]">Design review para a próxima sprint foi marcada para hoje.</p>
            </div>
            <div class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)]/70 p-4 transition-colors duration-200">
              <div class="flex items-center justify-between">
                <p class="font-medium text-[color:var(--text)]">Projeto atualizado</p>
                <span class="text-sm text-[color:var(--primary)]">há 45 min</span>
              </div>
              <p class="mt-2 text-sm text-[color:var(--text-muted)]">O roadmap da integração foi ajustado com novas prioridades.</p>
            </div>
          </div>
        </div>

        <div class="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-6 transition-colors duration-200">
          <h2 class="text-xl font-semibold text-[color:var(--text)]">Equipe em foco</h2>
          <div class="mt-6 space-y-3">
            <div class="flex items-center justify-between rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)]/70 px-4 py-3 transition-colors duration-200">
              <div>
                <p class="font-medium text-[color:var(--text)]">Ana Ribeiro</p>
                <p class="text-sm text-[color:var(--text-muted)]">Product Design</p>
              </div>
              <span class="text-sm text-[color:var(--primary)]">Online</span>
            </div>
            <div class="flex items-center justify-between rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)]/70 px-4 py-3 transition-colors duration-200">
              <div>
                <p class="font-medium text-[color:var(--text)]">Caio Mendes</p>
                <p class="text-sm text-[color:var(--text-muted)]">Backend</p>
              </div>
              <span class="text-sm text-[color:var(--primary)]">Disponível</span>
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
