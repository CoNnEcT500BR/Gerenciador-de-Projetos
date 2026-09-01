<template>
  <BaseLayout>
    <div class="space-y-7">
      <section class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--primary)]">Visão geral</p>
          <h1 class="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--text)]">Olá, {{ authStore.user?.name?.split(' ')[0] || 'usuário' }}.</h1>
          <p class="mt-1 text-sm text-[color:var(--text-muted)]">Acompanhe o ritmo da sua equipe e mantenha as entregas em movimento.</p>
        </div>
        <NuxtLink to="/projects" class="inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--bg-button)] px-4 py-2.5 text-sm font-semibold text-[color:var(--text-button)] transition hover:bg-[color:var(--bg-button-hover)] hover:text-[color:var(--text-button-hover)]">
          <span>+</span> Novo projeto
        </NuxtLink>
      </section>

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <NuxtLink to="/projects" class="dashboard-stat">
          <span class="dashboard-stat-label">Projetos ativos</span>
          <strong>{{ loading ? '—' : projects.length }}</strong>
          <span class="dashboard-stat-note">Iniciativas em acompanhamento</span>
        </NuxtLink>
        <div class="dashboard-stat">
          <span class="dashboard-stat-label">Tarefas pendentes</span>
          <strong>{{ loading ? '—' : pendingTasks.length }}</strong>
          <span class="dashboard-stat-note">{{ totalTasks }} tarefas no total</span>
        </div>
        <div class="dashboard-stat">
          <span class="dashboard-stat-label">Progresso geral</span>
          <strong>{{ loading ? '—' : `${completionRate}%` }}</strong>
          <span class="dashboard-stat-note">Tarefas concluídas</span>
        </div>
        <div class="dashboard-stat dashboard-stat-accent">
          <span class="dashboard-stat-label">Colaboração</span>
          <strong>Em breve</strong>
          <span class="dashboard-stat-note">Chat e arquivos no mesmo fluxo</span>
        </div>
      </div>

      <div class="grid gap-6 2xl:grid-cols-[minmax(0,1.55fr)_minmax(19rem,0.72fr)]">
        <div class="space-y-6">
          <section class="dashboard-panel overflow-hidden">
            <div class="flex items-center justify-between gap-4 border-b border-[color:var(--border)] px-5 py-4">
              <div>
                <h2 class="font-semibold text-[color:var(--text)]">Projetos em destaque</h2>
                <p class="mt-1 text-xs text-[color:var(--text-muted)]">Acompanhe o avanço das suas iniciativas.</p>
              </div>
              <NuxtLink to="/projects" class="text-sm font-semibold text-[color:var(--primary)]">Ver todos</NuxtLink>
            </div>
            <div v-if="!loading && projectSummaries.length === 0" class="px-5 py-8 text-sm text-[color:var(--text-muted)]">
              Você ainda não participa de nenhum projeto. Crie o primeiro para acompanhar o progresso aqui.
            </div>
            <div v-else class="divide-y divide-[color:var(--border)]">
              <NuxtLink v-for="project in projectSummaries" :key="project.id" :to="`/projects/${project.id}`" class="group flex items-center gap-4 px-5 py-4 transition hover:bg-[color:var(--surface-soft)]">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color:var(--accent-soft-bg)] text-lg">✦</div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center justify-between gap-4">
                    <p class="truncate font-medium text-[color:var(--text)]">{{ project.title }}</p>
                    <span class="text-sm font-semibold text-[color:var(--primary)]">{{ project.progress }}%</span>
                  </div>
                  <p class="mt-1 truncate text-xs text-[color:var(--text-muted)]">{{ project.members }} membro(s) · {{ project.tasks }} tarefa(s)</p>
                  <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-[color:var(--surface-2)]">
                    <div class="h-full rounded-full bg-[color:var(--primary)] transition-all" :style="{ width: `${project.progress}%` }"></div>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </section>

          <section class="dashboard-panel">
            <div class="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <h2 class="font-semibold text-[color:var(--text)]">Tarefas prioritárias</h2>
                <p class="mt-1 text-xs text-[color:var(--text-muted)]">O que precisa de atenção no próximo passo.</p>
              </div>
              <span class="rounded-full bg-[color:var(--accent-soft-bg)] px-2.5 py-1 text-xs font-semibold text-[color:var(--text-info)]">{{ pendingTasks.length }} abertas</span>
            </div>
            <div class="space-y-2 px-5 pb-5">
              <p v-if="!loading && priorityTasks.length === 0" class="rounded-xl bg-[color:var(--surface-soft)] px-4 py-5 text-sm text-[color:var(--text-muted)]">Nenhuma tarefa pendente. Excelente ritmo!</p>
              <div v-for="task in priorityTasks" :key="task.id" class="flex items-center gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-3 py-3">
                <span class="h-4 w-4 rounded border border-[color:var(--border-hover)]"></span>
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-medium text-[color:var(--text)]">{{ task.title }}</p>
                  <p class="mt-0.5 text-xs text-[color:var(--text-muted)]">{{ task.projectTitle }}</p>
                </div>
                <span class="rounded-md bg-[color:var(--accent-soft-bg)] px-2 py-1 text-xs text-[color:var(--text-info)]">{{ formatStatus(task.status) }}</span>
              </div>
            </div>
          </section>
        </div>

        <aside class="space-y-6">
          <section class="dashboard-panel overflow-hidden">
            <div class="flex items-center justify-between border-b border-[color:var(--border)] px-5 py-4">
              <h2 class="font-semibold text-[color:var(--text)]"><span class="mr-2 text-[color:var(--success-text)]">●</span>Chat em tempo real</h2>
              <span class="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--text-muted)]">Em breve</span>
            </div>
            <div class="space-y-3 p-5">
              <div class="max-w-[88%] rounded-2xl rounded-tl-sm bg-[color:var(--surface-2)] p-3 text-sm text-[color:var(--text-muted)]">As conversas da equipe aparecerão aqui, conectadas ao contexto de cada projeto.</div>
              <div class="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-[color:var(--accent-soft-bg)] p-3 text-sm text-[color:var(--text-info)]">Decisões, dúvidas e atualizações sem alternar ferramentas.</div>
              <div class="mt-5 flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-2 text-xs text-[color:var(--text-muted)]">
                <span class="flex-1 px-2">Mensagens estarão disponíveis em breve</span>
                <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-[color:var(--accent-soft-bg)] text-[color:var(--text-info)]">→</span>
              </div>
            </div>
          </section>

          <section class="dashboard-panel p-5">
            <div class="flex items-center justify-between">
              <h2 class="font-semibold text-[color:var(--text)]">Arquivos recentes</h2>
              <span class="text-xs font-semibold text-[color:var(--primary)]">Em breve</span>
            </div>
            <div class="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
              <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--accent-soft-bg)] text-lg">⌁</span>
              <p class="text-sm leading-5 text-[color:var(--text-muted)]">Compartilhe arquivos com contexto dentro dos seus projetos.</p>
            </div>
          </section>
        </aside>
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

const pendingTasks = computed(() => projects.value.flatMap((project) =>
  project.tasks
    .filter((task) => task.status !== 'DONE')
    .map((task) => ({ ...task, projectTitle: project.title }))
));

const priorityTasks = computed(() => pendingTasks.value.slice(0, 4));

const projectSummaries = computed(() => projects.value.slice(0, 4).map((project) => {
  const completedTasks = project.tasks.filter((task) => task.status === 'DONE').length;
  const progress = project.tasks.length === 0 ? 0 : Math.round((completedTasks / project.tasks.length) * 100);

  return {
    id: project.id,
    title: project.title,
    members: project.members.length,
    tasks: project.tasks.length,
    progress
  };
}));

function formatStatus(status: string) {
  const labels: Record<string, string> = {
    TODO: 'A fazer',
    IN_PROGRESS: 'Em andamento',
    REVIEW: 'Em revisão'
  };

  return labels[status] || status;
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

<style scoped>
.dashboard-stat,
.dashboard-panel {
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--surface) 82%, transparent);
  box-shadow: 0 18px 40px -28px var(--shadow-tint);
}

.dashboard-stat {
  display: flex;
  min-height: 9.5rem;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 1rem;
  padding: 1.25rem;
  transition: border-color 180ms ease, transform 180ms ease, background-color 180ms ease;
}

.dashboard-stat:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
}

.dashboard-stat-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.dashboard-stat strong {
  margin-top: 0.9rem;
  font-size: 2rem;
  line-height: 1;
  color: var(--text);
}

.dashboard-stat-note {
  margin-top: 0.7rem;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.dashboard-stat-accent {
  border-color: var(--accent-soft-border);
  background: linear-gradient(135deg, var(--accent-soft-bg), var(--accent-gradient-b));
}

.dashboard-panel {
  border-radius: 1rem;
}
</style>
