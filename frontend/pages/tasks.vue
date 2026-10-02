<template>
  <BaseLayout>
    <div class="space-y-7">
      <section class="relative overflow-hidden rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_25px_60px_-35px_var(--shadow-tint)] sm:p-8">
        <div class="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[color:var(--gradient-1)] blur-3xl" aria-hidden="true"></div>
        <div class="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="page-kicker">Execução do time</p>
            <h1 class="mt-3 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Quadro de tarefas</h1>
            <p class="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--text-muted)]">Veja o que está por fazer, em andamento e concluído — em todos os seus projetos.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <NuxtLink to="/projects" class="inline-flex shrink-0 items-center justify-center rounded-xl border border-[color:var(--border)] px-4 py-3 text-sm font-semibold text-[color:var(--text-muted)] transition hover:bg-[color:var(--surface-soft)]">Projetos</NuxtLink>
            <button type="button" class="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[color:var(--bg-button)] px-4 py-3 text-sm font-semibold text-[color:var(--text-button)] transition hover:bg-[color:var(--bg-button-hover)]" :disabled="projects.length === 0" @click="openCreateTask">
              <span aria-hidden="true">+</span> Nova tarefa
            </button>
          </div>
        </div>
      </section>

      <div class="grid gap-3 sm:grid-cols-3">
        <article v-for="column in columns" :key="column.status" class="surface-card flex items-center gap-3 px-4 py-3">
          <span class="h-2.5 w-2.5 rounded-full" :class="column.dot" aria-hidden="true"></span>
          <span class="flex-1 text-sm font-medium">{{ column.label }}</span>
          <strong class="text-sm">{{ column.tasks.length }}</strong>
        </article>
      </div>

      <div class="surface-card flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <label class="sr-only" for="task-search">Buscar tarefas</label>
        <input id="task-search" v-model="search" type="search" class="field min-w-0 flex-1 px-4 py-2.5 text-sm" placeholder="Buscar tarefa ou projeto..." />
        <label class="sr-only" for="project-filter">Filtrar por projeto</label>
        <select id="project-filter" v-model="projectFilter" class="field min-w-0 px-4 py-2.5 text-sm sm:w-64">
          <option value="all">Todos os projetos</option>
          <option v-for="project in projects" :key="project.id" :value="String(project.id)">{{ project.title }}</option>
        </select>
      </div>
      <p v-if="!loading && !error" class="px-1 text-xs text-[color:var(--text-muted)]" aria-live="polite">
        {{ filteredTasks.length }} {{ filteredTasks.length === 1 ? 'tarefa encontrada' : 'tarefas encontradas' }}
      </p>

      <div v-if="loading" class="surface-card p-8 text-sm text-[color:var(--text-muted)]" role="status">Carregando quadro...</div>
      <div v-else-if="error" class="rounded-2xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] p-5 text-sm text-[color:var(--danger-text)]" role="alert">{{ error }}</div>
      <div v-else-if="projects.length === 0" class="surface-card p-10 text-center">
        <p class="text-lg font-semibold">Seu quadro começa com um projeto</p>
        <p class="mt-2 text-sm text-[color:var(--text-muted)]">Crie um projeto para organizar as primeiras entregas do time.</p>
        <NuxtLink to="/projects" class="mt-5 inline-flex rounded-xl bg-[color:var(--bg-button)] px-4 py-2.5 text-sm font-semibold text-[color:var(--text-button)]">Criar projeto</NuxtLink>
      </div>
      <div v-else class="grid items-start gap-4 lg:grid-cols-3">
        <section v-for="column in columns" :key="column.status" class="min-w-0 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-3">
          <header class="flex items-center gap-3 px-1 pb-3 pt-1">
            <span class="h-2.5 w-2.5 rounded-full" :class="column.dot" aria-hidden="true"></span>
            <h2 class="flex-1 text-sm font-semibold">{{ column.label }}</h2>
            <span class="rounded-full bg-[color:var(--surface)] px-2.5 py-1 text-xs font-semibold text-[color:var(--text-muted)]">{{ column.tasks.length }}</span>
          </header>

          <div class="space-y-3">
            <article v-for="task in column.tasks" :key="`${task.projectId}-${task.id}`" class="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-[0_12px_30px_-25px_var(--shadow-tint)]">
              <div class="flex items-start justify-between gap-3">
                <h3 class="min-w-0 flex-1 text-sm font-semibold leading-5">{{ task.title }}</h3>
                <span class="shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold" :class="statusBadge(task.status)">{{ statusLabel(task.status) }}</span>
              </div>
              <p v-if="task.description" class="mt-2 line-clamp-2 text-xs leading-5 text-[color:var(--text-muted)]">{{ task.description }}</p>
              <NuxtLink :to="`/projects/${task.projectId}`" class="mt-3 inline-flex max-w-full items-center gap-2 text-xs font-medium text-[color:var(--text-info)] hover:text-[color:var(--primary)]">
                <span class="h-5 w-5 shrink-0 rounded-md bg-[color:var(--accent-soft-bg)]" aria-hidden="true"></span>
                <span class="truncate">{{ task.projectTitle }}</span>
              </NuxtLink>
              <div class="mt-3 flex justify-end border-t border-[color:var(--border)] pt-3">
                <label class="sr-only" :for="`status-${task.projectId}-${task.id}`">Alterar status de {{ task.title }}</label>
                <select
                  :id="`status-${task.projectId}-${task.id}`"
                  class="field max-w-36 px-2 py-1.5 text-xs"
                  :value="task.status"
                  :disabled="movingTaskIds.includes(task.id)"
                  @change="changeTaskStatus(task, ($event.target as HTMLSelectElement).value)"
                >
                  <option v-for="option in statusOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
                </select>
              </div>
            </article>
            <p v-if="column.tasks.length === 0" class="rounded-xl border border-dashed border-[color:var(--border)] px-3 py-6 text-center text-xs text-[color:var(--text-muted)]">Nenhuma tarefa nesta etapa.</p>
          </div>
        </section>
      </div>

      <p v-if="actionError" class="rounded-xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] px-4 py-3 text-sm text-[color:var(--danger-text)]" role="alert">{{ actionError }}</p>

      <aside class="rounded-2xl border border-[color:var(--accent-soft-border)] bg-[color:var(--accent-soft-bg)] p-4 text-sm leading-6 text-[color:var(--text-info)]">
        <strong>Próxima etapa:</strong> atribuir responsáveis, prazos e filtros por pessoa assim que a API passar a persistir esses dados.
      </aside>
    </div>

    <BaseModal
      :open="isCreateOpen"
      title="Criar tarefa"
      description="Escolha um projeto e descreva o próximo passo do time."
      @close="closeCreateTask"
    >
      <form class="space-y-4" @submit.prevent="submitCreateTask">
        <div>
          <label for="task-project" class="mb-2 block text-sm font-medium text-[color:var(--text-muted)]">Projeto</label>
          <select id="task-project" v-model="taskForm.projectId" class="field w-full px-4 py-3" required autofocus>
            <option disabled value="">Selecione um projeto</option>
            <option v-for="project in projects" :key="project.id" :value="String(project.id)">{{ project.title }}</option>
          </select>
        </div>
        <div>
          <label for="task-title" class="mb-2 block text-sm font-medium text-[color:var(--text-muted)]">Título</label>
          <input id="task-title" v-model="taskForm.title" class="field w-full px-4 py-3" type="text" maxlength="160" required placeholder="Ex.: Revisar a proposta" />
        </div>
        <div>
          <label for="task-description" class="mb-2 block text-sm font-medium text-[color:var(--text-muted)]">Descrição <span class="font-normal">(opcional)</span></label>
          <textarea id="task-description" v-model="taskForm.description" class="field w-full px-4 py-3" rows="3" maxlength="2000" placeholder="Adicione contexto para quem for executar"></textarea>
        </div>
        <p v-if="createError" class="rounded-xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] px-3 py-2 text-sm text-[color:var(--danger-text)]" role="alert">{{ createError }}</p>
        <div class="flex flex-col-reverse gap-2 border-t border-[color:var(--border)] pt-4 sm:flex-row sm:justify-end">
          <button type="button" class="rounded-xl border border-[color:var(--border)] px-4 py-2.5 text-sm font-semibold text-[color:var(--text-muted)]" :disabled="creatingTask" @click="closeCreateTask">Cancelar</button>
          <button type="submit" class="rounded-xl bg-[color:var(--bg-button)] px-4 py-2.5 text-sm font-semibold text-[color:var(--text-button)] disabled:opacity-60" :disabled="creatingTask">
            {{ creatingTask ? 'Criando...' : 'Criar tarefa' }}
          </button>
        </div>
      </form>
    </BaseModal>
  </BaseLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import { useApi } from '@/composables/useApi';

definePageMeta({ middleware: 'auth' });

type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
}

interface Project {
  id: number;
  title: string;
  tasks: Task[];
}

interface BoardTask extends Task {
  projectId: number;
  projectTitle: string;
}

const api = useApi();
const projects = ref<Project[]>([]);
const loading = ref(true);
const error = ref('');
const actionError = ref('');
const search = ref('');
const projectFilter = ref('all');
const movingTaskIds = ref<number[]>([]);
const isCreateOpen = ref(false);
const creatingTask = ref(false);
const createError = ref('');
const taskForm = reactive({ projectId: '', title: '', description: '' });

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: 'PENDING', label: 'A fazer' },
  { value: 'IN_PROGRESS', label: 'Em andamento' },
  { value: 'DONE', label: 'Concluída' }
];

const allTasks = computed<BoardTask[]>(() => projects.value.flatMap((project) =>
  project.tasks.map((task) => ({ ...task, projectId: project.id, projectTitle: project.title }))
));

const filteredTasks = computed(() => {
  const query = search.value.trim().toLocaleLowerCase('pt-BR');
  return allTasks.value.filter((task) => {
    const matchesProject = projectFilter.value === 'all' || String(task.projectId) === projectFilter.value;
    const matchesSearch = !query || `${task.title} ${task.description ?? ''} ${task.projectTitle}`.toLocaleLowerCase('pt-BR').includes(query);
    return matchesProject && matchesSearch;
  });
});

const columns = computed(() => [
  { status: 'PENDING' as const, label: 'A fazer', dot: 'bg-amber-400', tasks: filteredTasks.value.filter((task) => task.status === 'PENDING') },
  { status: 'IN_PROGRESS' as const, label: 'Em andamento', dot: 'bg-[color:var(--primary)]', tasks: filteredTasks.value.filter((task) => task.status === 'IN_PROGRESS') },
  { status: 'DONE' as const, label: 'Concluídas', dot: 'bg-[color:var(--success-text)]', tasks: filteredTasks.value.filter((task) => task.status === 'DONE') }
]);

function statusLabel(status: TaskStatus) {
  return statusOptions.find((option) => option.value === status)?.label ?? status;
}

function statusBadge(status: TaskStatus) {
  if (status === 'DONE') return 'bg-emerald-500/10 text-[color:var(--success-text)]';
  if (status === 'IN_PROGRESS') return 'bg-[color:var(--accent-soft-bg)] text-[color:var(--text-info)]';
  return 'bg-amber-500/10 text-amber-700 dark:text-amber-300';
}

async function fetchProjects() {
  loading.value = true;
  error.value = '';
  try {
    projects.value = (await api.get<Project[]>('/projects')).data;
  } catch {
    error.value = 'Não foi possível carregar os projetos e suas tarefas.';
  } finally {
    loading.value = false;
  }
}

async function changeTaskStatus(task: BoardTask, status: string) {
  const nextStatus = statusOptions.find((option) => option.value === status)?.value;
  if (!nextStatus || task.status === nextStatus) return;

  actionError.value = '';
  movingTaskIds.value = [...movingTaskIds.value, task.id];
  try {
    await api.patch(`/tasks/${task.id}/status`, { status: nextStatus });
    const sourceProject = projects.value.find((project) => project.id === task.projectId);
    const sourceTask = sourceProject?.tasks.find((item) => item.id === task.id);
    if (sourceTask) sourceTask.status = nextStatus;
  } catch {
    actionError.value = `Não foi possível atualizar o status de "${task.title}". Tente novamente.`;
  } finally {
    movingTaskIds.value = movingTaskIds.value.filter((id) => id !== task.id);
  }
}

function openCreateTask() {
  taskForm.projectId = projects.value.length === 1 ? String(projects.value[0].id) : '';
  taskForm.title = '';
  taskForm.description = '';
  createError.value = '';
  isCreateOpen.value = true;
}

function closeCreateTask() {
  if (!creatingTask.value) isCreateOpen.value = false;
}

async function submitCreateTask() {
  if (!taskForm.projectId) {
    createError.value = 'Selecione um projeto para esta tarefa.';
    return;
  }
  if (!taskForm.title.trim()) {
    createError.value = 'Informe um título para a tarefa.';
    return;
  }
  creatingTask.value = true;
  createError.value = '';
  try {
    await api.post('/tasks', {
      projectId: Number(taskForm.projectId),
      title: taskForm.title.trim(),
      description: taskForm.description.trim()
    });
    isCreateOpen.value = false;
    await fetchProjects();
  } catch {
    createError.value = 'Não foi possível criar a tarefa. Confira os dados e tente novamente.';
  } finally {
    creatingTask.value = false;
  }
}

onMounted(fetchProjects);
</script>
