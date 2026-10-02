<template>
  <BaseLayout>
    <div class="space-y-7">
      <section class="relative overflow-hidden rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_25px_60px_-35px_var(--shadow-tint)] sm:p-8">
        <div class="pointer-events-none absolute -right-14 -top-24 h-72 w-72 rounded-full bg-[color:var(--gradient-1)] blur-3xl" aria-hidden="true"></div>
        <div class="pointer-events-none absolute bottom-0 right-1/4 h-32 w-56 rounded-full bg-[color:var(--gradient-2)] blur-3xl" aria-hidden="true"></div>
        <div class="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div class="max-w-2xl">
            <p class="page-kicker">Workspace · visão geral</p>
            <h1 class="mt-3 text-3xl font-semibold tracking-[-.05em] sm:text-4xl">Olá, {{ firstName }}.</h1>
            <p class="mt-3 text-sm leading-6 text-[color:var(--text-muted)] sm:text-base">Um espaço claro para acompanhar o que está acontecendo e escolher o próximo passo do time.</p>
          </div>
          <NuxtLink to="/projects" class="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[color:var(--bg-button)] px-4 py-3 text-sm font-semibold text-[color:var(--text-button)] transition hover:bg-[color:var(--bg-button-hover)]">
            <span aria-hidden="true">+</span> Novo projeto
          </NuxtLink>
        </div>
      </section>

      <div v-if="error" class="flex flex-col gap-3 rounded-2xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] px-4 py-3 text-sm text-[color:var(--danger-text)] sm:flex-row sm:items-center sm:justify-between" role="alert">
        <span>{{ error }}</span>
        <button type="button" class="shrink-0 rounded-lg border border-[color:var(--danger-border)] px-3 py-1.5 text-xs font-semibold transition hover:bg-[color:var(--surface)]" @click="fetchProjects">Tentar novamente</button>
      </div>

      <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Resumo do workspace">
        <NuxtLink to="/projects" class="dashboard-stat">
          <span class="dashboard-stat-label">Projetos</span>
          <strong>{{ loading || error ? '—' : projects.length }}</strong>
          <span class="dashboard-stat-note">Iniciativas do seu time</span>
        </NuxtLink>
        <NuxtLink to="/tasks" class="dashboard-stat">
          <span class="dashboard-stat-label">Em aberto</span>
          <strong>{{ loading || error ? '—' : openTasks.length }}</strong>
          <span class="dashboard-stat-note">Tarefas que ainda precisam avançar</span>
        </NuxtLink>
        <NuxtLink to="/tasks" class="dashboard-stat">
          <span class="dashboard-stat-label">Concluídas</span>
          <strong>{{ loading || error || completionRate === null ? '—' : `${completionRate}%` }}</strong>
          <span class="dashboard-stat-note">{{ error ? 'Dados indisponíveis' : totalTasks === 0 ? 'Ainda sem tarefas' : `${completedTasks} de ${totalTasks} tarefas` }}</span>
        </NuxtLink>
        <NuxtLink to="/messages" class="dashboard-stat dashboard-stat-accent">
          <span class="dashboard-stat-label">Colaboração</span>
          <strong class="!text-xl">Continuar conversa <span aria-hidden="true">→</span></strong>
          <span class="dashboard-stat-note">Chat e arquivos por projeto</span>
        </NuxtLink>
      </section>

      <div class="grid gap-5 2xl:grid-cols-[minmax(0,1.4fr)_minmax(18rem,.8fr)]">
        <section class="dashboard-panel overflow-hidden">
          <div class="flex items-center justify-between gap-4 border-b border-[color:var(--border)] px-5 py-4 sm:px-6">
            <div>
              <p class="page-kicker">Panorama</p>
              <h2 class="mt-1 text-lg font-semibold">Projetos em andamento</h2>
            </div>
            <NuxtLink to="/projects" class="text-sm font-semibold text-[color:var(--primary)] hover:underline">Ver todos <span aria-hidden="true">→</span></NuxtLink>
          </div>
          <div v-if="loading" class="px-5 py-8 text-sm text-[color:var(--text-muted)]" role="status">Carregando seus projetos...</div>
          <div v-else-if="error" class="px-5 py-8 text-sm text-[color:var(--text-muted)] sm:px-6">Os projetos estarão disponíveis assim que a conexão for restabelecida.</div>
          <div v-else-if="projects.length === 0" class="px-5 py-9 sm:px-6">
            <p class="font-semibold">Seu primeiro projeto começa aqui.</p>
            <p class="mt-2 text-sm leading-6 text-[color:var(--text-muted)]">Crie uma iniciativa para reunir entregas, equipe e conversas no mesmo lugar.</p>
            <NuxtLink to="/projects" class="mt-4 inline-flex rounded-xl bg-[color:var(--bg-button)] px-4 py-2.5 text-sm font-semibold text-[color:var(--text-button)]">Criar projeto</NuxtLink>
          </div>
          <ul v-else class="divide-y divide-[color:var(--border)]">
            <li v-for="project in projectSummaries" :key="project.id">
              <NuxtLink :to="`/projects/${project.id}`" class="group flex items-center gap-4 px-5 py-4 transition hover:bg-[color:var(--surface-soft)] sm:px-6">
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color:var(--accent-soft-bg)] text-[color:var(--primary)]" aria-hidden="true">
                  <Icon name="layers" />
                </span>
                <span class="min-w-0 flex-1">
                  <span class="flex items-center justify-between gap-4">
                    <span class="truncate text-sm font-semibold">{{ project.title }}</span>
                    <span class="text-xs font-semibold text-[color:var(--primary)]">{{ project.progress }}%</span>
                  </span>
                  <span class="mt-1 block text-xs text-[color:var(--text-muted)]">{{ project.members }} {{ project.members === 1 ? 'membro' : 'membros' }} · {{ project.tasks }} {{ project.tasks === 1 ? 'tarefa' : 'tarefas' }}</span>
                  <span v-if="project.progress !== null" class="mt-3 block h-1.5 overflow-hidden rounded-full bg-[color:var(--surface-2)]" role="progressbar" :aria-label="`Progresso de ${project.title}`" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="project.progress">
                    <span class="block h-full rounded-full bg-[color:var(--primary)] transition-[width]" :style="{ width: `${project.progress}%` }"></span>
                  </span>
                  <span v-else class="mt-3 block text-xs font-medium text-[color:var(--text-muted)]">Sem tarefas</span>
                </span>
              </NuxtLink>
            </li>
          </ul>
        </section>

        <aside class="space-y-5">
          <section class="dashboard-panel overflow-hidden">
            <div class="flex items-center justify-between gap-4 border-b border-[color:var(--border)] px-5 py-4">
              <div>
                <p class="page-kicker">Próximos passos</p>
                <h2 class="mt-1 text-lg font-semibold">Tarefas em aberto</h2>
              </div>
              <NuxtLink to="/tasks" class="rounded-full bg-[color:var(--accent-soft-bg)] px-2.5 py-1 text-xs font-semibold text-[color:var(--text-info)]">{{ openTasks.length }} abertas</NuxtLink>
            </div>
            <div class="space-y-2 p-4 sm:p-5">
              <p v-if="loading" class="rounded-xl bg-[color:var(--surface-soft)] px-4 py-5 text-sm text-[color:var(--text-muted)]" role="status">Carregando tarefas...</p>
              <p v-else-if="error" class="rounded-xl bg-[color:var(--surface-soft)] px-4 py-5 text-sm text-[color:var(--text-muted)]">Tarefas temporariamente indisponíveis.</p>
              <p v-else-if="openTasks.length === 0" class="rounded-xl bg-[color:var(--surface-soft)] px-4 py-5 text-sm text-[color:var(--text-muted)]">Nenhuma tarefa em aberto. Bom trabalho!</p>
              <NuxtLink v-for="task in upNextTasks" :key="`${task.projectId}-${task.id}`" :to="`/projects/${task.projectId}`" class="flex items-start gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-3 transition hover:border-[color:var(--border-hover)] hover:bg-[color:var(--surface)]">
                <span class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" :class="task.status === 'IN_PROGRESS' ? 'bg-[color:var(--primary)]' : 'bg-amber-400'" aria-hidden="true"></span>
                <span class="min-w-0 flex-1">
                  <span class="block truncate text-sm font-medium">{{ task.title }}</span>
                  <span class="mt-1 block truncate text-xs text-[color:var(--text-muted)]">{{ task.projectTitle }}</span>
                </span>
                <span class="shrink-0 text-[10px] font-semibold text-[color:var(--text-info)]">{{ formatStatus(task.status) }}</span>
              </NuxtLink>
            </div>
            <NuxtLink to="/tasks" class="flex items-center justify-between border-t border-[color:var(--border)] px-5 py-3 text-sm font-semibold text-[color:var(--primary)] hover:bg-[color:var(--surface-soft)]">
              Abrir quadro de tarefas <span aria-hidden="true">→</span>
            </NuxtLink>
          </section>

          <section class="dashboard-panel p-5">
            <div class="flex items-start gap-3">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color:var(--accent-soft-bg)] text-[color:var(--primary)]" aria-hidden="true"><Icon name="messages" /></span>
              <div>
                <h2 class="font-semibold">Conversa com contexto</h2>
                <p class="mt-1 text-sm leading-6 text-[color:var(--text-muted)]">Acesse o chat e os anexos dentro de cada projeto, sem perder o fio do trabalho.</p>
                <NuxtLink to="/messages" class="mt-3 inline-flex text-sm font-semibold text-[color:var(--primary)] hover:underline">Ir para mensagens <span class="ml-2" aria-hidden="true">→</span></NuxtLink>
              </div>
            </div>
          </section>
        </aside>
      </div>

      <section class="dashboard-panel overflow-hidden">
        <div class="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div>
            <p class="page-kicker">Ritmo do time</p>
            <h2 class="mt-1 text-lg font-semibold">Tarefas atualizadas recentemente</h2>
          </div>
          <span class="text-xs text-[color:var(--text-muted)]">Atualizadas a partir das mudanças registradas pela API</span>
        </div>
        <div v-if="loading" class="px-5 pb-5 text-sm text-[color:var(--text-muted)] sm:px-6" role="status">Carregando atualizações...</div>
        <div v-else-if="error" class="px-5 pb-5 text-sm text-[color:var(--text-muted)] sm:px-6">As atualizações estão temporariamente indisponíveis.</div>
        <div v-else-if="recentTasks.length === 0" class="px-5 pb-5 text-sm text-[color:var(--text-muted)] sm:px-6">As tarefas dos seus projetos aparecerão aqui.</div>
        <ul v-else class="divide-y divide-[color:var(--border)]">
          <li v-for="task in recentTasks" :key="`${task.projectId}-${task.id}`">
            <NuxtLink :to="`/projects/${task.projectId}`" class="flex items-center gap-3 px-5 py-3 transition hover:bg-[color:var(--surface-soft)] sm:px-6">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[color:var(--surface-soft)] text-[color:var(--text-info)]" aria-hidden="true"><Icon name="tasks" :size="16" /></span>
            <span class="min-w-0 flex-1">
              <span class="block truncate text-sm font-medium">{{ task.title }}</span>
              <span class="mt-0.5 block truncate text-xs text-[color:var(--text-muted)]">{{ task.projectTitle }}</span>
            </span>
            <span class="text-xs text-[color:var(--text-muted)]">{{ formatDate(task.updatedAt || task.createdAt) }}</span>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import Icon from '@/components/ui/Icon.vue';
import { useAuthStore } from '@/stores/auth';
import { useApi } from '@/composables/useApi';

definePageMeta({ middleware: 'auth' });

interface Task {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
}

interface Project {
  id: number;
  title: string;
  members: { id: number }[];
  tasks: Task[];
}

interface DashboardTask extends Task {
  projectId: number;
  projectTitle: string;
}

const authStore = useAuthStore();
const api = useApi();
const projects = ref<Project[]>([]);
const loading = ref(true);
const error = ref('');

const isMounted = ref(false);
const firstName = computed(() => (isMounted.value ? authStore.user?.name?.split(' ')[0] : '') || 'usuário');
const allTasks = computed<DashboardTask[]>(() => projects.value.flatMap((project) =>
  project.tasks.map((task) => ({ ...task, projectId: project.id, projectTitle: project.title }))
));
const totalTasks = computed(() => allTasks.value.length);
const completedTasks = computed(() => allTasks.value.filter((task) => task.status === 'DONE').length);
const openTasks = computed(() => allTasks.value.filter((task) => task.status !== 'DONE'));
const completionRate = computed(() => totalTasks.value === 0 ? null : Math.round((completedTasks.value / totalTasks.value) * 100));
const upNextTasks = computed(() => [...openTasks.value]
  .sort((left, right) => {
    if (left.status !== right.status) return left.status === 'IN_PROGRESS' ? -1 : 1;
    return new Date(right.updatedAt || right.createdAt).getTime() - new Date(left.updatedAt || left.createdAt).getTime();
  })
  .slice(0, 4));
const recentTasks = computed(() => [...allTasks.value]
  .sort((left, right) => new Date(right.updatedAt || right.createdAt).getTime() - new Date(left.updatedAt || left.createdAt).getTime())
  .slice(0, 5));
const projectSummaries = computed(() => projects.value.slice(0, 4).map((project) => {
  const done = project.tasks.filter((task) => task.status === 'DONE').length;
  return {
    id: project.id,
    title: project.title,
    members: project.members.length,
    tasks: project.tasks.length,
    progress: project.tasks.length === 0 ? null : Math.round((done / project.tasks.length) * 100)
  };
}));

function formatStatus(status: string) {
  return ({ PENDING: 'A fazer', IN_PROGRESS: 'Em andamento', DONE: 'Concluída' } as Record<string, string>)[status] ?? status;
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(date);
}

async function fetchProjects() {
  loading.value = true;
  error.value = '';
  try {
    projects.value = (await api.get<Project[]>('/projects')).data;
  } catch {
    error.value = 'Não foi possível carregar os dados do workspace.';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  isMounted.value = true;
  void fetchProjects();
});
</script>

<style scoped>
.dashboard-stat,
.dashboard-panel {
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--surface) 90%, transparent);
  box-shadow: 0 18px 40px -28px var(--shadow-tint);
}

.dashboard-stat {
  display: flex;
  min-height: 9.25rem;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 1rem;
  padding: 1.15rem;
  transition: border-color 180ms ease, transform 180ms ease, background-color 180ms ease;
}

.dashboard-stat:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
}

.dashboard-stat-label {
  color: var(--text-muted);
  font-size: .7rem;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
}

.dashboard-stat strong {
  margin-top: .85rem;
  color: var(--text);
  font-size: 1.8rem;
  line-height: 1.1;
}

.dashboard-stat-note {
  margin-top: .65rem;
  color: var(--text-muted);
  font-size: .75rem;
}

.dashboard-stat-accent {
  border-color: var(--accent-soft-border);
  background: linear-gradient(135deg, var(--accent-soft-bg), var(--accent-gradient-b));
}

.dashboard-panel {
  border-radius: 1rem;
}

@media (prefers-reduced-motion: reduce) {
  .dashboard-stat {
    transition: none;
  }

  .dashboard-stat:hover {
    transform: none;
  }
}
</style>
