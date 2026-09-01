<template>
  <BaseLayout>
    <div v-if="loading" class="text-sm text-[color:var(--text-muted)]">Carregando projeto...</div>

    <div v-else-if="!project" class="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-8 text-center text-sm text-[color:var(--text-muted)]">
      Projeto não encontrado ou você não tem acesso.
    </div>

    <div v-else class="space-y-6">
      <section class="rounded-4xl border border-[color:var(--border)] bg-[color:var(--surface)]/80 p-6 shadow-[0_25px_50px_-12px_var(--shadow-tint-soft)] transition-colors duration-200">
        <NuxtLink to="/projects" class="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--text-muted)] transition hover:text-[color:var(--text)]">
          <span aria-hidden="true">←</span>
          Voltar para projetos
        </NuxtLink>
        <div class="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--primary)]">Projeto</p>
            <h1 class="mt-3 text-3xl font-semibold text-[color:var(--text)]">{{ project.title }}</h1>
            <p class="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--text-muted)]">{{ project.description || 'Sem descrição.' }}</p>
          </div>
          <button
            @click="isModalOpen = true"
            class="rounded-2xl bg-[color:var(--bg-button)] px-5 py-3 font-semibold text-[color:var(--text-button)] transition hover:bg-[color:var(--bg-button-hover)] hover:text-[color:var(--text-button-hover)]"
          >
            + Nova tarefa
          </button>
        </div>
      </section>

      <div class="grid gap-6 xl:grid-cols-[1.6fr_0.85fr]">
        <div class="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-6 transition-colors duration-200">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h2 class="text-xl font-semibold text-[color:var(--text)]">Tarefas</h2>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="option in statusFilters"
                :key="option.value"
                @click="statusFilter = option.value"
                class="rounded-full border px-3 py-1 text-xs font-semibold transition"
                :class="statusFilter === option.value
                  ? 'border-[color:var(--accent-soft-border)] bg-[color:var(--accent-soft-bg)] text-[color:var(--text-info)]'
                  : 'border-[color:var(--border)] text-[color:var(--text-muted)] hover:bg-[color:var(--surface-soft)]'"
              >
                {{ option.label }}
              </button>
            </div>
          </div>

          <div class="mt-6 space-y-3">
            <p v-if="filteredTasks.length === 0" class="text-sm text-[color:var(--text-muted)]">
              Nenhuma tarefa nessa categoria.
            </p>
            <div
              v-for="task in filteredTasks"
              :key="task.id"
              class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)]/70 p-4 transition-colors duration-200"
            >
              <div class="flex items-center justify-between gap-3">
                <p class="font-medium text-[color:var(--text)]">{{ task.title }}</p>
                <span
                  class="rounded-full px-3 py-1 text-xs font-semibold"
                  :class="statusBadgeClass(task.status)"
                >
                  {{ statusLabel(task.status) }}
                </span>
              </div>
              <p class="mt-2 text-sm text-[color:var(--text-muted)]">{{ task.description || 'Sem descrição.' }}</p>

              <div class="mt-3 flex flex-wrap gap-2">
                <button
                  v-for="option in taskStatusOptions"
                  v-show="option.value !== task.status"
                  :key="option.value"
                  @click="changeTaskStatus(task, option.value)"
                  class="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-[color:var(--text-muted)] transition hover:bg-[color:var(--surface-soft)]"
                >
                  Mover para {{ option.label }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-6 transition-colors duration-200">
          <h2 class="text-xl font-semibold text-[color:var(--text)]">Membros</h2>
          <div class="mt-6 space-y-3">
            <div
              v-for="member in project.members"
              :key="member.id"
              class="flex items-center justify-between rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)]/70 px-4 py-3 transition-colors duration-200"
            >
              <div>
                <p class="font-medium text-[color:var(--text)]">{{ member.user.name }}</p>
                <p class="text-sm text-[color:var(--text-muted)]">{{ member.user.email }}</p>
              </div>
              <span class="text-sm text-[color:var(--primary)]">{{ member.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de criação de tarefa -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      @click.self="isModalOpen = false"
    >
      <div class="w-full max-w-md rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_25px_50px_-12px_var(--shadow-tint-soft)]">
        <h2 class="text-xl font-semibold text-[color:var(--text)]">Nova tarefa</h2>
        <form @submit.prevent="submitCreateTask" class="mt-4 space-y-4">
          <div>
            <label class="mb-2 block text-sm font-medium text-[color:var(--text-muted)]">Título</label>
            <input
              v-model="taskForm.title"
              type="text"
              required
              class="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)] px-4 py-3 text-[color:var(--text)] outline-none transition focus:border-[color:var(--primary)]"
            />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-[color:var(--text-muted)]">Descrição</label>
            <textarea
              v-model="taskForm.description"
              rows="3"
              class="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)] px-4 py-3 text-[color:var(--text)] outline-none transition focus:border-[color:var(--primary)]"
            ></textarea>
          </div>

          <p v-if="taskError" class="rounded-xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] px-3 py-2 text-sm text-[color:var(--danger-text)]">{{ taskError }}</p>

          <div class="flex justify-end gap-3">
            <button
              type="button"
              @click="isModalOpen = false"
              class="rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm font-semibold text-[color:var(--text-muted)] transition hover:bg-[color:var(--surface-soft)]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="creatingTask"
              class="rounded-2xl bg-[color:var(--bg-button)] px-4 py-2 text-sm font-semibold text-[color:var(--text-button)] transition hover:bg-[color:var(--bg-button-hover)] hover:text-[color:var(--text-button-hover)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {{ creatingTask ? 'Criando...' : 'Criar tarefa' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from '#imports';
import BaseLayout from '@/components/layout/BaseLayout.vue';
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
  description: string;
  status: string;
  createdAt: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  members: ProjectMember[];
  tasks: Task[];
}

const route = useRoute();
const api = useApi();
const projectId = Number(route.params.id);

const project = ref<Project | null>(null);
const loading = ref(true);
const statusFilter = ref('ALL');

const isModalOpen = ref(false);
const creatingTask = ref(false);
const taskError = ref('');
const taskForm = reactive({
  title: '',
  description: ''
});

const statusFilters = [
  { value: 'ALL', label: 'Todas' },
  { value: 'PENDING', label: 'Pendente' },
  { value: 'IN_PROGRESS', label: 'Em andamento' },
  { value: 'DONE', label: 'Concluída' }
];

const taskStatusOptions = [
  { value: 'PENDING', label: 'Pendente' },
  { value: 'IN_PROGRESS', label: 'Em andamento' },
  { value: 'DONE', label: 'Concluída' }
];

const filteredTasks = computed(() => {
  if (!project.value) return [];
  if (statusFilter.value === 'ALL') return project.value.tasks;
  return project.value.tasks.filter((task) => task.status === statusFilter.value);
});

function statusLabel(status: string) {
  return taskStatusOptions.find((option) => option.value === status)?.label ?? status;
}

function statusBadgeClass(status: string) {
  if (status === 'DONE') {
    return 'bg-[color:var(--accent-soft-bg)] text-[color:var(--success-text)]';
  }
  if (status === 'IN_PROGRESS') {
    return 'bg-[color:var(--accent-soft-bg)] text-[color:var(--text-info)]';
  }
  return 'bg-[color:var(--surface-soft)] text-[color:var(--text-muted)]';
}

async function fetchProject() {
  loading.value = true;
  try {
    const response = await api.get(`/projects/${projectId}`);
    project.value = response.data;
  } catch {
    project.value = null;
  } finally {
    loading.value = false;
  }
}

async function submitCreateTask() {
  taskError.value = '';
  creatingTask.value = true;

  try {
    await api.post('/tasks', {
      title: taskForm.title,
      description: taskForm.description,
      projectId
    });

    taskForm.title = '';
    taskForm.description = '';
    isModalOpen.value = false;
    await fetchProject();
  } catch (err) {
    if (axios.isAxiosError(err)) {
      taskError.value = err.response?.data?.error ?? 'Erro ao criar tarefa.';
    } else {
      taskError.value = 'Erro inesperado.';
    }
  } finally {
    creatingTask.value = false;
  }
}

async function changeTaskStatus(task: Task, newStatus: string) {
  try {
    await api.patch(`/tasks/${task.id}/status`, { status: newStatus });
    await fetchProject();
  } catch {
    // silently ignore; could add toast in the future
  }
}

onMounted(() => {
  fetchProject();
});
</script>
