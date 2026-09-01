<template>
  <BaseLayout>
    <div class="space-y-6">
      <section class="flex flex-col gap-4 rounded-4xl border border-[color:var(--border)] bg-[color:var(--surface)]/80 p-6 shadow-[0_25px_50px_-12px_var(--shadow-tint-soft)] transition-colors duration-200 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--primary)]">Workspace</p>
          <h1 class="mt-3 text-3xl font-semibold text-[color:var(--text)]">Seus projetos</h1>
          <p class="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
            Gerencie iniciativas, equipes e tarefas em um único lugar.
          </p>
        </div>
        <button
          @click="isModalOpen = true"
          class="rounded-2xl bg-[color:var(--bg-button)] px-5 py-3 font-semibold text-[color:var(--text-button)] transition hover:bg-[color:var(--bg-button-hover)] hover:text-[color:var(--text-button-hover)]"
        >
          + Novo projeto
        </button>
      </section>

      <p v-if="loading" class="text-sm text-[color:var(--text-muted)]">Carregando projetos...</p>

      <p v-else-if="projects.length === 0" class="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-8 text-center text-sm text-[color:var(--text-muted)]">
        Você ainda não participa de nenhum projeto. Crie o primeiro para começar.
      </p>

      <div v-else class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <NuxtLink
          v-for="project in projects"
          :key="project.id"
          :to="`/projects/${project.id}`"
          class="flex flex-col justify-between rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-6 transition-colors duration-200 hover:border-[color:var(--border-hover)]"
        >
          <div>
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-[color:var(--text)]">{{ project.title }}</h2>
              <span class="rounded-full border border-[color:var(--accent-soft-border)] bg-[color:var(--accent-soft-bg)] px-3 py-1 text-xs font-semibold text-[color:var(--text-info)]">
                {{ project.tasks.length }} tarefa(s)
              </span>
            </div>
            <p class="mt-3 text-sm leading-6 text-[color:var(--text-muted)]">
              {{ project.description || 'Sem descrição.' }}
            </p>
          </div>
          <div class="mt-6 flex items-center justify-between text-sm">
            <span class="text-[color:var(--text-muted)]">{{ project.members.length }} membro(s)</span>
            <span class="text-[color:var(--primary)]">Ver detalhes →</span>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Modal de criação -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      @click.self="isModalOpen = false"
    >
      <div class="w-full max-w-md rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_25px_50px_-12px_var(--shadow-tint-soft)]">
        <h2 class="text-xl font-semibold text-[color:var(--text)]">Novo projeto</h2>
        <form @submit.prevent="submitCreate" class="mt-4 space-y-4">
          <div>
            <label class="mb-2 block text-sm font-medium text-[color:var(--text-muted)]">Título</label>
            <input
              v-model="form.title"
              type="text"
              required
              class="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)] px-4 py-3 text-[color:var(--text)] outline-none transition focus:border-[color:var(--primary)]"
            />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-[color:var(--text-muted)]">Descrição</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)] px-4 py-3 text-[color:var(--text)] outline-none transition focus:border-[color:var(--primary)]"
            ></textarea>
          </div>

          <p v-if="error" class="rounded-xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] px-3 py-2 text-sm text-[color:var(--danger-text)]">{{ error }}</p>

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
              :disabled="creating"
              class="rounded-2xl bg-[color:var(--bg-button)] px-4 py-2 text-sm font-semibold text-[color:var(--text-button)] transition hover:bg-[color:var(--bg-button-hover)] hover:text-[color:var(--text-button-hover)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {{ creating ? 'Criando...' : 'Criar projeto' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
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
  status: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  members: ProjectMember[];
  tasks: Task[];
}

const api = useApi();

const projects = ref<Project[]>([]);
const loading = ref(true);
const isModalOpen = ref(false);
const creating = ref(false);
const error = ref('');

const form = reactive({
  title: '',
  description: ''
});

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

async function submitCreate() {
  error.value = '';
  creating.value = true;

  try {
    await api.post('/projects', {
      title: form.title,
      description: form.description
    });

    form.title = '';
    form.description = '';
    isModalOpen.value = false;
    await fetchProjects();
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error.value = err.response?.data?.error ?? 'Erro ao criar projeto.';
    } else {
      error.value = 'Erro inesperado.';
    }
  } finally {
    creating.value = false;
  }
}

onMounted(() => {
  fetchProjects();
});
</script>
