<template>
  <BaseLayout>
    <div class="space-y-6">
      <section class="surface-card flex flex-col gap-5 p-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="page-kicker">Execução</p>
          <h1 class="mt-2 text-3xl font-semibold tracking-[-.035em]">Tarefas</h1>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-[color:var(--text-muted)]">Uma visão rápida do que está aberto, em andamento e concluído em cada projeto.</p>
        </div>
        <NuxtLink to="/projects" class="inline-flex items-center justify-center rounded-xl bg-[color:var(--bg-button)] px-4 py-2.5 text-sm font-semibold text-[color:var(--text-button)] transition hover:bg-[color:var(--bg-button-hover)]">Ver projetos <span class="ml-2" aria-hidden="true">→</span></NuxtLink>
      </section>

      <div v-if="loading" class="surface-card p-8 text-sm text-[color:var(--text-muted)]">Carregando tarefas...</div>
      <div v-else-if="error" class="rounded-2xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] p-5 text-sm text-[color:var(--danger-text)]">{{ error }}</div>
      <div v-else-if="groups.length === 0" class="surface-card p-10 text-center">
        <p class="text-lg font-semibold">Nenhuma tarefa por aqui</p>
        <p class="mt-2 text-sm text-[color:var(--text-muted)]">Crie um projeto e adicione a primeira tarefa para começar.</p>
        <NuxtLink to="/projects" class="mt-5 inline-flex rounded-xl bg-[color:var(--bg-button)] px-4 py-2.5 text-sm font-semibold text-[color:var(--text-button)]">Criar projeto</NuxtLink>
      </div>

      <div v-else class="grid gap-5 xl:grid-cols-2">
        <section v-for="group in groups" :key="group.id" class="surface-card overflow-hidden">
          <div class="flex items-center justify-between gap-3 border-b border-[color:var(--border)] px-5 py-4">
            <div class="min-w-0">
              <NuxtLink :to="`/projects/${group.id}`" class="truncate font-semibold hover:text-[color:var(--primary)]">{{ group.title }}</NuxtLink>
              <p class="mt-1 text-xs text-[color:var(--text-muted)]">{{ group.tasks.length }} tarefa(s) · {{ completedCount(group.tasks) }} concluída(s)</p>
            </div>
            <span class="status-pill">{{ progress(group.tasks) }}%</span>
          </div>
          <div class="space-y-2 p-4">
            <div v-for="task in group.tasks" :key="task.id" class="flex items-start gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-3">
              <span class="mt-1 h-3 w-3 shrink-0 rounded-full" :class="task.status === 'DONE' ? 'bg-[color:var(--success-text)]' : 'bg-[color:var(--primary)]'" aria-hidden="true"></span>
              <div class="min-w-0 flex-1">
                <p class="font-medium">{{ task.title }}</p>
                <p v-if="task.description" class="mt-1 truncate text-xs text-[color:var(--text-muted)]">{{ task.description }}</p>
              </div>
              <span class="shrink-0 rounded-full bg-[color:var(--accent-soft-bg)] px-2 py-1 text-[10px] font-semibold text-[color:var(--text-info)]">{{ statusLabel(task.status) }}</span>
            </div>
            <p v-if="group.tasks.length === 0" class="px-2 py-4 text-sm text-[color:var(--text-muted)]">Nenhuma tarefa neste projeto.</p>
          </div>
        </section>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import { useApi } from '@/composables/useApi';

definePageMeta({ middleware: 'auth' });

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
}

interface Project {
  id: number;
  title: string;
}

interface TaskGroup extends Project {
  tasks: Task[];
}

const api = useApi();
const groups = ref<TaskGroup[]>([]);
const loading = ref(true);
const error = ref('');

function statusLabel(status: string) {
  return ({ PENDING: 'Pendente', TODO: 'A fazer', IN_PROGRESS: 'Em andamento', REVIEW: 'Em revisão', DONE: 'Concluída' } as Record<string, string>)[status] ?? status;
}

function completedCount(tasks: Task[]) {
  return tasks.filter((task) => task.status === 'DONE').length;
}

function progress(tasks: Task[]) {
  return tasks.length === 0 ? 0 : Math.round((completedCount(tasks) / tasks.length) * 100);
}

async function fetchTasks() {
  loading.value = true;
  error.value = '';
  try {
    const projects = (await api.get<Project[]>('/projects')).data;
    const results = await Promise.allSettled(projects.map(async (project) => ({
      ...project,
      tasks: (await api.get<Task[]>('/tasks', { params: { projectId: project.id } })).data
    })));
    groups.value = results
      .filter((result): result is PromiseFulfilledResult<TaskGroup> => result.status === 'fulfilled')
      .map((result) => result.value);
    if (groups.value.length === 0 && projects.length > 0) error.value = 'Não foi possível carregar as tarefas dos seus projetos.';
  } catch {
    error.value = 'Não foi possível carregar suas tarefas.';
  } finally {
    loading.value = false;
  }
}

onMounted(fetchTasks);
</script>
