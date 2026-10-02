<template>
  <BaseLayout>
    <div class="space-y-6">
      <section class="relative overflow-hidden rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_25px_60px_-35px_var(--shadow-tint)] sm:p-8">
        <div class="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[color:var(--gradient-1)] blur-3xl" aria-hidden="true"></div>
        <div class="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="page-kicker">Workspace · iniciativas</p>
          <h1 class="mt-3 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Seus projetos</h1>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--text-muted)]">Organize o trabalho, acompanhe as entregas e mantenha as conversas junto de cada iniciativa.</p>
        </div>
        <button
          @click="openCreate"
          class="shrink-0 rounded-xl bg-[color:var(--bg-button)] px-5 py-3 text-sm font-semibold text-[color:var(--text-button)] transition hover:bg-[color:var(--bg-button-hover)]"
        >
          + Novo projeto
        </button>
        </div>
      </section>

      <div v-if="actionError && !deleteTarget" class="rounded-2xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] px-4 py-3 text-sm text-[color:var(--danger-text)]" role="alert">{{ actionError }}</div>
      <div v-if="loading" class="surface-card p-6 text-sm text-[color:var(--text-muted)]" role="status">Carregando projetos...</div>
      <div v-else-if="error" class="rounded-2xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] px-4 py-3 text-sm text-[color:var(--danger-text)]" role="alert">{{ error }}</div>

      <div v-else-if="projects.length === 0" class="surface-card p-10 text-center">
        <span class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--accent-soft-bg)] text-[color:var(--primary)]" aria-hidden="true"><Icon name="projects" :size="22" /></span>
        <h2 class="mt-4 text-lg font-semibold">Um bom trabalho começa com contexto.</h2>
        <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-[color:var(--text-muted)]">Crie seu primeiro projeto para reunir equipe, tarefas e conversas em um só lugar.</p>
        <button @click="openCreate" class="mt-5 rounded-xl bg-[color:var(--bg-button)] px-4 py-2.5 text-sm font-semibold text-[color:var(--text-button)]">Criar projeto</button>
      </div>

      <div v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <article v-for="project in projects" :key="project.id" class="surface-card flex min-h-64 flex-col p-5 transition hover:-translate-y-0.5 hover:border-[color:var(--border-hover)]">
          <div class="flex items-start justify-between gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--accent-soft-bg)] text-[color:var(--primary)]" aria-hidden="true"><Icon name="layers" /></span>
            <span class="rounded-full bg-[color:var(--surface-soft)] px-2.5 py-1 text-xs font-semibold text-[color:var(--text-muted)]">{{ project.members.length }} {{ project.members.length === 1 ? 'membro' : 'membros' }}</span>
          </div>
          <NuxtLink :to="`/projects/${project.id}`" class="mt-4 text-lg font-semibold tracking-tight hover:text-[color:var(--primary)]">{{ project.title }}</NuxtLink>
          <p class="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-[color:var(--text-muted)]">{{ project.description || 'Adicione uma descrição para compartilhar o contexto deste projeto.' }}</p>
          <div class="mt-4">
            <div class="flex items-center justify-between text-xs">
              <span class="text-[color:var(--text-muted)]">{{ project.tasks.length }} tarefas</span>
              <span class="font-semibold text-[color:var(--primary)]">{{ project.tasks.length === 0 ? 'Sem tarefas' : `${projectProgress(project)}% concluído` }}</span>
            </div>
            <div v-if="project.tasks.length > 0" class="mt-2 h-1.5 overflow-hidden rounded-full bg-[color:var(--surface-2)]" role="progressbar" :aria-label="`Progresso de ${project.title}`" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="projectProgress(project)">
              <div class="h-full rounded-full bg-[color:var(--primary)] transition-[width]" :style="{ width: `${projectProgress(project)}%` }"></div>
            </div>
          </div>
          <div class="mt-auto flex items-center justify-between gap-3 border-t border-[color:var(--border)] pt-4">
            <NuxtLink :to="`/projects/${project.id}`" class="text-sm font-semibold text-[color:var(--primary)]">Abrir projeto <span aria-hidden="true">→</span></NuxtLink>
            <div class="flex gap-2">
              <button class="rounded-lg border border-[color:var(--border)] px-2.5 py-1.5 text-xs font-medium text-[color:var(--text-muted)] hover:bg-[color:var(--surface-soft)]" @click="openEdit(project)">Editar</button>
              <button type="button" class="rounded-lg border border-[color:var(--danger-border)] px-2.5 py-1.5 text-xs font-medium text-[color:var(--danger-text)] hover:bg-[color:var(--danger-bg)]" @click="askRemoveProject(project)">Excluir</button>
            </div>
          </div>
        </article>
      </div>
    </div>

    <BaseModal
      :open="isModalOpen"
      :title="editingProject ? 'Editar projeto' : 'Novo projeto'"
      :description="editingProject ? 'Atualize as informações principais desta iniciativa.' : 'Reúna pessoas, tarefas e conversas em um só lugar.'"
      @close="closeProjectModal"
    >
        <form @submit.prevent="submitProject" class="space-y-4">
          <div>
            <label for="project-title" class="mb-2 block text-sm font-medium text-[color:var(--text-muted)]">Título</label>
            <input
              id="project-title"
              v-model="form.title"
              type="text"
              maxlength="120"
              required
              autofocus
              placeholder="Ex.: Lançamento do produto"
              class="field w-full px-4 py-3"
            />
          </div>
          <div>
            <label for="project-description" class="mb-2 block text-sm font-medium text-[color:var(--text-muted)]">Descrição</label>
            <textarea
              id="project-description"
              v-model="form.description"
              rows="3"
              maxlength="2000"
              placeholder="Qual é o objetivo deste projeto?"
              class="field w-full px-4 py-3"
            ></textarea>
          </div>

          <p v-if="formError" class="rounded-xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] px-3 py-2 text-sm text-[color:var(--danger-text)]" role="alert">{{ formError }}</p>

          <div class="flex flex-col-reverse gap-2 border-t border-[color:var(--border)] pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              @click="closeProjectModal"
              class="rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm font-semibold text-[color:var(--text-muted)] transition hover:bg-[color:var(--surface-soft)]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="rounded-2xl bg-[color:var(--bg-button)] px-4 py-2 text-sm font-semibold text-[color:var(--text-button)] transition hover:bg-[color:var(--bg-button-hover)] hover:text-[color:var(--text-button-hover)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {{ saving ? 'Salvando...' : editingProject ? 'Salvar alterações' : 'Criar projeto' }}
            </button>
          </div>
        </form>
    </BaseModal>
    <BaseModal
      :open="Boolean(deleteTarget)"
      title="Excluir projeto?"
      description="Esta ação remove o projeto e todo o contexto associado a ele."
      @close="closeDeleteModal"
    >
      <p class="text-sm leading-6 text-[color:var(--text-muted)]">
        Você está prestes a excluir <strong class="text-[color:var(--text)]">{{ deleteTarget?.title }}</strong>. Essa ação não pode ser desfeita.
      </p>
      <p v-if="actionError" class="mt-4 rounded-xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] px-3 py-2 text-sm text-[color:var(--danger-text)]" role="alert">{{ actionError }}</p>
      <div class="mt-5 flex flex-col-reverse gap-2 border-t border-[color:var(--border)] pt-4 sm:flex-row sm:justify-end">
        <button type="button" autofocus class="rounded-xl border border-[color:var(--border)] px-4 py-2.5 text-sm font-semibold text-[color:var(--text-muted)] disabled:opacity-60" :disabled="removing" @click="closeDeleteModal">Cancelar</button>
        <button type="button" class="rounded-xl bg-[color:var(--danger-text)] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60" :disabled="removing" @click="confirmRemoveProject">
          {{ removing ? 'Excluindo...' : 'Excluir projeto' }}
        </button>
      </div>
    </BaseModal>
  </BaseLayout>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
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
const saving = ref(false);
const removing = ref(false);
const error = ref('');
const formError = ref('');
const actionError = ref('');
const editingProject = ref<Project | null>(null);
const deleteTarget = ref<Project | null>(null);

const form = reactive({
  title: '',
  description: ''
});

async function fetchProjects() {
  loading.value = true;
  error.value = '';
  try {
    const response = await api.get('/projects');
    projects.value = response.data;
  } catch {
    error.value = 'Não foi possível carregar os projetos.';
  } finally {
    loading.value = false;
  }
}

function projectProgress(project: Project) {
  if (project.tasks.length === 0) return 0;
  return Math.round((project.tasks.filter((task) => task.status === 'DONE').length / project.tasks.length) * 100);
}

function openCreate() {
  editingProject.value = null;
  form.title = '';
  form.description = '';
  formError.value = '';
  actionError.value = '';
  isModalOpen.value = true;
}

function openEdit(project: Project) {
  editingProject.value = project;
  form.title = project.title;
  form.description = project.description ?? '';
  formError.value = '';
  actionError.value = '';
  isModalOpen.value = true;
}

function closeProjectModal() {
  if (saving.value) return;
  isModalOpen.value = false;
  editingProject.value = null;
}

function closeDeleteModal() {
  if (!removing.value) deleteTarget.value = null;
}

function askRemoveProject(project: Project) {
  actionError.value = '';
  deleteTarget.value = project;
}

async function submitProject() {
  formError.value = '';
  saving.value = true;
  try {
    const payload = { title: form.title.trim(), description: form.description.trim() };
    if (editingProject.value) {
      await api.patch(`/projects/${editingProject.value.id}`, payload);
    } else {
      await api.post('/projects', payload);
    }
    isModalOpen.value = false;
    editingProject.value = null;
    await fetchProjects();
  } catch (err) {
    if (axios.isAxiosError(err)) {
      formError.value = err.response?.data?.error ?? 'Não foi possível salvar o projeto.';
    } else {
      formError.value = 'Ocorreu um erro inesperado ao salvar o projeto.';
    }
  } finally {
    saving.value = false;
  }
}

async function confirmRemoveProject() {
  const project = deleteTarget.value;
  if (!project) return;
  actionError.value = '';
  removing.value = true;
  try {
    await api.delete(`/projects/${project.id}`);
    deleteTarget.value = null;
    await fetchProjects();
  } catch {
    actionError.value = 'Não foi possível excluir o projeto.';
  } finally {
    removing.value = false;
  }
}

onMounted(() => {
  fetchProjects();
});
</script>
