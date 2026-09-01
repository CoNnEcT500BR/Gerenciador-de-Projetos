<template>
  <BaseLayout>
    <div class="space-y-6">
      <section class="rounded-4xl border border-[color:var(--border)] bg-[color:var(--surface)]/80 p-6 shadow-[0_25px_50px_-12px_var(--shadow-tint-soft)] transition-colors duration-200">
        <div class="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div class="max-w-2xl">
            <p class="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--primary)]">Bem-vindo de volta</p>
            <h1 class="mt-3 text-3xl font-semibold text-[color:var(--text)]">
              Olá, {{ authStore.user?.name?.split(' ')[0] || 'usuário' }}. Seu painel está mais claro, rápido e premium.
            </h1>
            <p class="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
              Acompanhe projetos, tarefas e comunicação em um ambiente elegante e pensado para decisões ágeis.
            </p>
          </div>
          <div class="rounded-2xl border border-[color:var(--accent-soft-border)] bg-[color:var(--accent-soft-bg)] px-4 py-3 text-sm text-[color:var(--text-info)]">
            <div class="font-semibold">Progresso geral</div>
            <div class="mt-1 text-[color:var(--text)]">{{ completionRate }}% de tarefas concluídas</div>
          </div>
        </div>
      </section>

      <div class="grid gap-6 xl:grid-cols-3">
        <NuxtLink to="/projects" class="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-6 transition-colors duration-200 hover:border-[color:var(--border-hover)]">
          <div class="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--primary)]">Projetos</div>
          <div class="mt-4 text-3xl font-semibold text-[color:var(--text)]">{{ loading ? '—' : projects.length }}</div>
          <p class="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">Organize iniciativas e acompanhe o status em tempo real.</p>
        </NuxtLink>
        <div class="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-6 transition-colors duration-200">
          <div class="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--primary)]">Tarefas</div>
          <div class="mt-4 text-3xl font-semibold text-[color:var(--text)]">{{ loading ? '—' : totalTasks }}</div>
          <p class="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">Defina prioridades e visualize entregas com visão estratégica.</p>
        </div>
        <div class="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-6 transition-colors duration-200">
          <div class="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--primary)]">Mensagens</div>
          <div class="mt-4 text-3xl font-semibold text-[color:var(--text)]">Em breve</div>
          <p class="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">Chat em tempo real chega na próxima fase.</p>
        </div>
      </div>

      <div class="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div class="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-6 transition-colors duration-200">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-[color:var(--text)]">Atividades recentes</h2>
            <span class="rounded-full border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-3 py-1 text-sm text-[color:var(--text-muted)]">Projetos e tarefas</span>
          </div>
          <div class="mt-6 space-y-4">
            <p v-if="!loading && recentActivities.length === 0" class="text-sm text-[color:var(--text-muted)]">
              Nenhuma atividade ainda. Crie seu primeiro projeto para começar.
            </p>
            <div
              v-for="activity in recentActivities"
              :key="`${activity.type}-${activity.id}`"
              class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)]/70 p-4 transition-colors duration-200"
            >
              <div class="flex items-center justify-between">
                <p class="font-medium text-[color:var(--text)]">{{ activity.title }}</p>
                <span class="text-sm text-[color:var(--primary)]">{{ formatRelativeDate(activity.createdAt) }}</span>
              </div>
              <p class="mt-2 text-sm text-[color:var(--text-muted)]">{{ activity.description }}</p>
            </div>
          </div>
        </div>

        <div class="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-6 transition-colors duration-200">
          <h2 class="text-xl font-semibold text-[color:var(--text)]">Meus projetos</h2>
          <div class="mt-6 space-y-3">
            <p v-if="!loading && projects.length === 0" class="text-sm text-[color:var(--text-muted)]">
              Você ainda não participa de nenhum projeto.
            </p>
            <NuxtLink
              v-for="project in projects.slice(0, 5)"
              :key="project.id"
              :to="`/projects/${project.id}`"
              class="flex items-center justify-between rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)]/70 px-4 py-3 transition-colors duration-200 hover:border-[color:var(--border-hover)]"
            >
              <div>
                <p class="font-medium text-[color:var(--text)]">{{ project.title }}</p>
                <p class="text-sm text-[color:var(--text-muted)]">{{ project.members.length }} membro(s)</p>
              </div>
              <span class="text-sm text-[color:var(--primary)]">{{ project.tasks.length }} tarefa(s)</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import { useAuthStore } from '@/stores/auth';
import { useApi } from '@/composables/useApi';

definePageMeta({
  middleware: 'auth'
});

interface ProjectMember {
  id: number;
  role: string;
  user: { id: number; name: string; email: string };
}

interface Task {
  id: number;
  title: string;
  status: string;
  createdAt: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  members: ProjectMember[];
  tasks: Task[];
  createdAt: string;
}

const authStore = useAuthStore();
const api = useApi();

const projects = ref<Project[]>([]);
const loading = ref(true);

const totalTasks = computed(() => projects.value.reduce((sum, project) => sum + project.tasks.length, 0));

const completionRate = computed(() => {
  const allTasks = projects.value.flatMap((project) => project.tasks);
  if (allTasks.length === 0) return 0;
  const done = allTasks.filter((task) => task.status === 'DONE').length;
  return Math.round((done / allTasks.length) * 100);
});

const recentActivities = computed(() => {
  const projectActivities = projects.value.map((project) => ({
    id: project.id,
    type: 'project',
    title: `Projeto "${project.title}" criado`,
    description: project.description || 'Sem descrição.',
    createdAt: project.createdAt
  }));

  const taskActivities = projects.value.flatMap((project) =>
    project.tasks.map((task) => ({
      id: task.id,
      type: 'task',
      title: `Tarefa "${task.title}"`,
      description: `Status atual: ${task.status} · Projeto: ${project.title}`,
      createdAt: task.createdAt
    }))
  );

  return [...projectActivities, ...taskActivities]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
});

function formatRelativeDate(dateString: string) {
  const date = new Date(dateString);
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return 'agora';
  if (diffMinutes < 60) return `há ${diffMinutes} min`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `há ${diffHours}h`;

  const diffDays = Math.floor(diffHours / 24);
  return `há ${diffDays}d`;
}

async function fetchProjects() {
  loading.value = true;
  try {
    const response = await api.get('/projects');
    projects.value = response.data;
  } catch {
    projects.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchProjects();
});
</script>
