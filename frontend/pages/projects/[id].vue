<template>
  <BaseLayout>
    <div v-if="loading" class="surface-card p-6 text-sm text-[color:var(--text-muted)]" role="status">Carregando projeto...</div>
    <div v-else-if="pageError" class="rounded-2xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] p-5 text-sm text-[color:var(--danger-text)]" role="alert">{{ pageError }}</div>

    <div v-else-if="!project" class="surface-card p-8 text-center text-sm text-[color:var(--text-muted)]">
      Projeto não encontrado ou você não tem acesso.
    </div>

    <div v-else class="space-y-6">
      <section class="relative overflow-hidden rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_25px_50px_-35px_var(--shadow-tint)] sm:p-8">
        <div class="pointer-events-none absolute -right-14 -top-20 h-56 w-56 rounded-full bg-[color:var(--gradient-1)] blur-3xl" aria-hidden="true"></div>
        <NuxtLink to="/projects" class="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--text-muted)] transition hover:text-[color:var(--text)]">
          <span aria-hidden="true">←</span>
          Voltar para projetos
        </NuxtLink>
        <div class="relative mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="page-kicker">Projeto · workspace</p>
            <h1 class="mt-3 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">{{ project.title }}</h1>
            <p class="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--text-muted)]">{{ project.description || 'Sem descrição. Adicione um contexto para alinhar o time.' }}</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button class="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2.5 text-sm font-semibold text-[color:var(--text-muted)] transition hover:border-[color:var(--border-hover)]" @click="openProjectEditor">Editar</button>
            <button class="rounded-xl border border-[color:var(--danger-border)] px-4 py-2.5 text-sm font-semibold text-[color:var(--danger-text)] transition hover:bg-[color:var(--danger-bg)]" @click="removeProject">Excluir</button>
            <button
              @click="openTaskCreate"
              class="rounded-xl bg-[color:var(--bg-button)] px-4 py-2.5 text-sm font-semibold text-[color:var(--text-button)] transition hover:bg-[color:var(--bg-button-hover)]"
            >
              + Nova tarefa
            </button>
          </div>
        </div>
      </section>

      <div v-if="actionError" class="rounded-xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] px-4 py-3 text-sm text-[color:var(--danger-text)]" role="alert">{{ actionError }}</div>

      <nav class="surface-card flex gap-1 overflow-x-auto p-1.5" aria-label="Seções do projeto">
        <button
          v-for="tab in projectTabs"
          :key="tab.value"
          type="button"
          class="shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition"
          :class="activeTab === tab.value ? 'bg-[color:var(--accent-soft-bg)] text-[color:var(--text-info)]' : 'text-[color:var(--text-muted)] hover:bg-[color:var(--surface-soft)] hover:text-[color:var(--text)]'"
          :aria-pressed="activeTab === tab.value"
          @click="selectTab(tab.value)"
        >
          {{ tab.label }}
        </button>
      </nav>

      <section v-if="activeTab === 'overview'" class="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <div class="surface-card p-5 sm:p-6">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="page-kicker">Panorama</p>
              <h2 class="mt-1 text-lg font-semibold">Progresso do projeto</h2>
            </div>
            <span class="text-2xl font-semibold text-[color:var(--primary)]">{{ projectProgress === null ? 'Sem tarefas' : `${projectProgress}%` }}</span>
          </div>
          <div v-if="projectProgress !== null" class="mt-5 h-2 overflow-hidden rounded-full bg-[color:var(--surface-2)]">
            <div class="h-full rounded-full bg-[color:var(--primary)] transition-[width]" :style="{ width: `${projectProgress}%` }"></div>
          </div>
          <div class="mt-4 grid grid-cols-3 gap-3">
            <div class="rounded-xl bg-[color:var(--surface-soft)] p-3"><p class="text-xs text-[color:var(--text-muted)]">Tarefas</p><p class="mt-1 text-lg font-semibold">{{ project.tasks.length }}</p></div>
            <div class="rounded-xl bg-[color:var(--surface-soft)] p-3"><p class="text-xs text-[color:var(--text-muted)]">Em andamento</p><p class="mt-1 text-lg font-semibold">{{ tasksInProgress }}</p></div>
            <div class="rounded-xl bg-[color:var(--surface-soft)] p-3"><p class="text-xs text-[color:var(--text-muted)]">Concluídas</p><p class="mt-1 text-lg font-semibold">{{ tasksCompleted }}</p></div>
          </div>
          <div class="mt-5 flex flex-wrap gap-2">
            <button type="button" class="rounded-xl bg-[color:var(--bg-button)] px-4 py-2.5 text-sm font-semibold text-[color:var(--text-button)]" @click="selectTab('tasks')">Ir para tarefas <span aria-hidden="true">→</span></button>
            <button type="button" class="rounded-xl border border-[color:var(--border)] px-4 py-2.5 text-sm font-semibold text-[color:var(--text-muted)]" @click="selectTab('files')">Ver arquivos</button>
          </div>
        </div>
        <aside class="surface-card p-5 sm:p-6">
          <p class="page-kicker">Colaboração</p>
          <h2 class="mt-1 text-lg font-semibold">Trabalho e decisões no contexto</h2>
          <p class="mt-2 text-sm leading-6 text-[color:var(--text-muted)]">Converse com a equipe, encontre anexos compartilhados e acompanhe quem participa desta iniciativa.</p>
          <div class="mt-5 flex flex-wrap gap-2">
            <button type="button" class="rounded-xl border border-[color:var(--border)] px-3 py-2 text-sm font-semibold text-[color:var(--text-muted)] hover:bg-[color:var(--surface-soft)]" @click="selectTab('chat')">Abrir conversa</button>
            <button type="button" class="rounded-xl border border-[color:var(--border)] px-3 py-2 text-sm font-semibold text-[color:var(--text-muted)] hover:bg-[color:var(--surface-soft)]" @click="selectTab('team')">Ver equipe · {{ project.members.length }}</button>
          </div>
        </aside>
      </section>

      <section v-else-if="activeTab === 'tasks'" class="space-y-4">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="page-kicker">Execução</p>
            <h2 class="mt-1 text-xl font-semibold">Quadro de tarefas</h2>
          </div>
          <p class="text-xs text-[color:var(--text-muted)]">Responsáveis e prazos poderão ser conectados quando a API oferecer esses campos.</p>
        </div>
        <div class="grid items-start gap-4 lg:grid-cols-3">
          <section v-for="column in statusColumns" :key="column.value" class="min-w-0 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-3">
            <header class="flex items-center gap-3 px-1 pb-3 pt-1">
              <span class="h-2.5 w-2.5 rounded-full" :class="column.dot" aria-hidden="true"></span>
              <h3 class="flex-1 text-sm font-semibold">{{ column.label }}</h3>
              <span class="rounded-full bg-[color:var(--surface)] px-2.5 py-1 text-xs font-semibold text-[color:var(--text-muted)]">{{ column.tasks.length }}</span>
            </header>
            <div class="space-y-3">
              <article v-for="task in column.tasks" :key="task.id" class="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
                <div class="flex items-start justify-between gap-3">
                  <h4 class="min-w-0 flex-1 text-sm font-semibold">{{ task.title }}</h4>
                  <span class="shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold" :class="statusBadgeClass(task.status)">{{ statusLabel(task.status) }}</span>
                </div>
                <p v-if="task.description" class="mt-2 text-xs leading-5 text-[color:var(--text-muted)]">{{ task.description }}</p>
                <p class="mt-3 text-[11px] text-[color:var(--text-muted)]">Responsáveis · próxima integração</p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <button type="button" class="rounded-lg border border-[color:var(--border)] px-2.5 py-1.5 text-xs font-medium text-[color:var(--text-muted)] hover:bg-[color:var(--surface-soft)]" @click="openTaskEditor(task)">Editar</button>
                  <button type="button" class="rounded-lg border border-[color:var(--danger-border)] px-2.5 py-1.5 text-xs font-medium text-[color:var(--danger-text)] hover:bg-[color:var(--danger-bg)]" @click="removeTask(task)">Excluir</button>
                  <button
                    v-for="option in taskStatusOptions"
                    v-show="option.value !== task.status"
                    :key="option.value"
                    type="button"
                    class="rounded-lg bg-[color:var(--accent-soft-bg)] px-2.5 py-1.5 text-xs font-semibold text-[color:var(--text-info)]"
                    @click="changeTaskStatus(task, option.value)"
                  >
                    {{ option.label }}
                  </button>
                </div>
              </article>
              <p v-if="column.tasks.length === 0" class="rounded-xl border border-dashed border-[color:var(--border)] px-3 py-6 text-center text-xs text-[color:var(--text-muted)]">Nenhuma tarefa nesta etapa.</p>
            </div>
          </section>
        </div>
      </section>

      <section v-else-if="activeTab === 'files'" class="surface-card overflow-hidden">
        <div class="flex flex-col gap-2 border-b border-[color:var(--border)] px-5 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div>
            <p class="page-kicker">Materiais do projeto</p>
            <h2 class="mt-1 text-lg font-semibold">Arquivos compartilhados</h2>
          </div>
          <button type="button" class="text-sm font-semibold text-[color:var(--primary)] hover:underline" @click="selectTab('chat')">Anexar pelo chat <span aria-hidden="true">→</span></button>
        </div>
        <div class="px-5 py-3 text-xs leading-5 text-[color:var(--text-muted)] sm:px-6">Arquivos enviados nas 50 mensagens mais recentes do projeto. O envio e o download continuam disponíveis pelo chat.</div>
        <div v-if="loadingFiles" class="px-5 py-8 text-sm text-[color:var(--text-muted)]" role="status">Carregando arquivos...</div>
        <p v-else-if="fileError" class="m-5 rounded-xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] px-4 py-3 text-sm text-[color:var(--danger-text)]" role="alert">{{ fileError }}</p>
        <div v-else-if="projectFiles.length === 0" class="px-5 py-10 text-center">
          <p class="font-semibold">Nenhum arquivo encontrado</p>
          <p class="mt-2 text-sm text-[color:var(--text-muted)]">Os anexos enviados nas conversas deste projeto aparecerão aqui.</p>
          <button type="button" class="mt-4 rounded-xl bg-[color:var(--bg-button)] px-4 py-2.5 text-sm font-semibold text-[color:var(--text-button)]" @click="selectTab('chat')">Abrir conversa</button>
        </div>
        <ul v-else class="divide-y divide-[color:var(--border)]">
          <li v-for="file in projectFiles" :key="file.id" class="flex flex-wrap items-center gap-3 px-5 py-4 sm:px-6">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color:var(--accent-soft-bg)] text-[10px] font-bold text-[color:var(--text-info)]">{{ fileExtension(file.originalName) }}</span>
            <span class="min-w-0 flex-1">
              <span class="block truncate text-sm font-semibold">{{ file.originalName }}</span>
              <span class="mt-1 block text-xs text-[color:var(--text-muted)]">{{ file.user.name }} · {{ formatFileSize(file.size) }} · {{ formatFileDate(file.createdAt) }}</span>
            </span>
            <a :href="attachmentUrl(file.downloadUrl)" target="_blank" rel="noreferrer" class="rounded-lg border border-[color:var(--border)] px-3 py-2 text-xs font-semibold text-[color:var(--text-info)] hover:bg-[color:var(--surface-soft)]">Baixar</a>
          </li>
        </ul>
      </section>

      <section v-else-if="activeTab === 'chat'">
        <ChatRoom :project-id="projectId" />
      </section>

      <section v-else class="grid gap-5 lg:grid-cols-[1fr_20rem]">
        <div class="surface-card p-5 sm:p-6">
          <div class="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p class="page-kicker">Pessoas</p>
              <h2 class="mt-1 text-lg font-semibold">Equipe do projeto</h2>
            </div>
            <span class="text-xs text-[color:var(--text-muted)]">{{ project.members.length }} {{ project.members.length === 1 ? 'membro' : 'membros' }}</span>
          </div>
          <ul class="mt-5 divide-y divide-[color:var(--border)]">
            <li v-for="member in project.members" :key="member.id" class="flex items-center gap-3 py-3 first:pt-0">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-soft-bg)] text-xs font-bold text-[color:var(--text-info)]">{{ memberInitials(member.user.name) }}</span>
              <span class="min-w-0 flex-1">
                <span class="block truncate text-sm font-semibold">{{ member.user.name }}</span>
                <span class="block truncate text-xs text-[color:var(--text-muted)]">{{ member.user.email }}</span>
              </span>
              <span class="rounded-full bg-[color:var(--surface-soft)] px-2.5 py-1 text-[10px] font-semibold text-[color:var(--text-muted)]">{{ member.role === 'OWNER' ? 'Responsável' : 'Membro' }}</span>
              <button v-if="member.role !== 'OWNER'" type="button" class="text-xs font-semibold text-[color:var(--danger-text)] hover:underline" @click="askRemoveMember(member)">Remover</button>
            </li>
          </ul>
        </div>
        <aside class="surface-card p-5 sm:p-6">
          <h3 class="font-semibold">Adicionar pessoa</h3>
          <p class="mt-1 text-sm leading-6 text-[color:var(--text-muted)]">Convide alguém da equipe pelo e-mail cadastrado.</p>
          <form class="mt-4 space-y-3" @submit.prevent="addMember">
            <label for="member-email" class="sr-only">E-mail do membro</label>
            <input id="member-email" v-model="memberEmail" type="email" required placeholder="nome@empresa.com" class="field w-full px-3 py-2.5 text-sm" />
            <button class="w-full rounded-xl bg-[color:var(--bg-button)] px-4 py-2.5 text-sm font-semibold text-[color:var(--text-button)]">Adicionar ao projeto</button>
          </form>
        </aside>
      </section>
    </div>

    <BaseModal
      :open="isModalOpen"
      :title="editingTaskId ? 'Editar tarefa' : 'Nova tarefa'"
      :description="editingTaskId ? 'Atualize o título e o contexto desta entrega.' : 'Registre a próxima entrega deste projeto.'"
      @close="closeTaskModal"
    >
        <form @submit.prevent="submitTask" class="space-y-4">
          <div>
            <label for="task-title" class="mb-2 block text-sm font-medium text-[color:var(--text-muted)]">Título</label>
            <input
              id="task-title"
              v-model="taskForm.title"
              type="text"
              maxlength="160"
              required
              autofocus
              placeholder="Ex.: Preparar apresentação"
              class="field w-full px-4 py-3"
            />
          </div>
          <div>
            <label for="task-description" class="mb-2 block text-sm font-medium text-[color:var(--text-muted)]">Descrição</label>
            <textarea
              id="task-description"
              v-model="taskForm.description"
              rows="3"
              maxlength="2000"
              placeholder="Adicione contexto para quem for executar"
              class="field w-full px-4 py-3"
            ></textarea>
          </div>

          <p v-if="taskError" class="rounded-xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] px-3 py-2 text-sm text-[color:var(--danger-text)]" role="alert">{{ taskError }}</p>

          <div class="flex flex-col-reverse gap-2 border-t border-[color:var(--border)] pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              @click="closeTaskModal"
              class="rounded-2xl border border-[color:var(--border)] px-4 py-2 text-sm font-semibold text-[color:var(--text-muted)] transition hover:bg-[color:var(--surface-soft)]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="creatingTask"
              class="rounded-2xl bg-[color:var(--bg-button)] px-4 py-2 text-sm font-semibold text-[color:var(--text-button)] transition hover:bg-[color:var(--bg-button-hover)] hover:text-[color:var(--text-button-hover)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {{ creatingTask ? 'Salvando...' : editingTaskId ? 'Salvar alterações' : 'Criar tarefa' }}
            </button>
          </div>
        </form>
    </BaseModal>

    <BaseModal
      :open="isProjectModalOpen"
      title="Editar projeto"
      description="Ajuste as informações que dão contexto à equipe."
      @close="closeProjectModal"
    >
      <form class="space-y-4" @submit.prevent="submitProjectEdit">
        <div>
          <label for="edit-project-title" class="mb-2 block text-sm font-medium text-[color:var(--text-muted)]">Título</label>
          <input id="edit-project-title" v-model="projectForm.title" class="field w-full px-4 py-3" type="text" maxlength="120" required autofocus />
        </div>
        <div>
          <label for="edit-project-description" class="mb-2 block text-sm font-medium text-[color:var(--text-muted)]">Descrição</label>
          <textarea id="edit-project-description" v-model="projectForm.description" class="field w-full px-4 py-3" rows="4" maxlength="2000"></textarea>
        </div>
        <p v-if="projectError" class="rounded-xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] px-3 py-2 text-sm text-[color:var(--danger-text)]" role="alert">{{ projectError }}</p>
        <div class="flex flex-col-reverse gap-2 border-t border-[color:var(--border)] pt-4 sm:flex-row sm:justify-end">
          <button type="button" class="rounded-xl border border-[color:var(--border)] px-4 py-2.5 text-sm font-semibold text-[color:var(--text-muted)]" :disabled="savingProject" @click="closeProjectModal">Cancelar</button>
          <button type="submit" class="rounded-xl bg-[color:var(--bg-button)] px-4 py-2.5 text-sm font-semibold text-[color:var(--text-button)] disabled:opacity-60" :disabled="savingProject">{{ savingProject ? 'Salvando...' : 'Salvar alterações' }}</button>
        </div>
      </form>
    </BaseModal>

    <BaseModal
      :open="Boolean(confirmTarget)"
      :title="confirmTarget?.title ?? 'Confirmar ação'"
      description="Confira esta ação antes de continuar."
      @close="closeConfirmation"
    >
      <p class="text-sm leading-6 text-[color:var(--text-muted)]">{{ confirmTarget?.message }}</p>
      <p v-if="confirmationError" class="mt-4 rounded-xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] px-3 py-2 text-sm text-[color:var(--danger-text)]" role="alert">{{ confirmationError }}</p>
      <div class="mt-5 flex flex-col-reverse gap-2 border-t border-[color:var(--border)] pt-4 sm:flex-row sm:justify-end">
        <button type="button" autofocus class="rounded-xl border border-[color:var(--border)] px-4 py-2.5 text-sm font-semibold text-[color:var(--text-muted)] disabled:opacity-60" :disabled="confirming" @click="closeConfirmation">Cancelar</button>
        <button type="button" class="rounded-xl bg-[color:var(--danger-text)] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60" :disabled="confirming" @click="executeConfirmation">
          {{ confirming ? 'Processando...' : confirmTarget?.confirmLabel ?? 'Confirmar' }}
        </button>
      </div>
    </BaseModal>
  </BaseLayout>
</template>

<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from '#imports';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import ChatRoom from '@/components/chat/ChatRoom.vue';
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
  description: string;
  status: string;
  createdAt: string;
}

interface ProjectAttachment {
  id: number;
  originalName: string;
  mimeType: string;
  size: number;
  downloadUrl: string;
  createdAt: string;
  user: { name: string };
}

interface MessageAttachment {
  id: number;
  originalName: string;
  mimeType: string;
  size: number;
  downloadUrl: string;
}

interface ProjectMessage {
  createdAt: string;
  user: { name: string };
  attachment: MessageAttachment | null;
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
const pageError = ref('');
const actionError = ref('');
const activeTab = ref<'overview' | 'tasks' | 'files' | 'chat' | 'team'>('overview');
const projectFiles = ref<ProjectAttachment[]>([]);
const filesLoaded = ref(false);
const loadingFiles = ref(false);
const fileError = ref('');
const config = useRuntimeConfig();

const isModalOpen = ref(false);
const creatingTask = ref(false);
const taskError = ref('');
const editingTaskId = ref<number | null>(null);
const taskForm = reactive({
  title: '',
  description: ''
});
const isProjectModalOpen = ref(false);
const savingProject = ref(false);
const projectError = ref('');
const projectForm = reactive({ title: '', description: '' });
type ConfirmTarget =
  | { kind: 'project'; title: string; message: string; confirmLabel: string }
  | { kind: 'task'; taskId: number; title: string; message: string; confirmLabel: string }
  | { kind: 'member'; memberId: number; title: string; message: string; confirmLabel: string };
const confirmTarget = ref<ConfirmTarget | null>(null);
const confirming = ref(false);
const confirmationError = ref('');
const memberEmail = ref('');

const projectTabs = [
  { value: 'overview' as const, label: 'Visão geral' },
  { value: 'tasks' as const, label: 'Tarefas' },
  { value: 'files' as const, label: 'Arquivos' },
  { value: 'chat' as const, label: 'Conversa' },
  { value: 'team' as const, label: 'Equipe' }
];

const taskStatusOptions: { value: 'PENDING' | 'IN_PROGRESS' | 'DONE'; label: string; dot: string }[] = [
  { value: 'PENDING', label: 'A fazer', dot: 'bg-amber-400' },
  { value: 'IN_PROGRESS', label: 'Em andamento', dot: 'bg-[color:var(--primary)]' },
  { value: 'DONE', label: 'Concluída', dot: 'bg-[color:var(--success-text)]' }
];

const statusColumns = computed(() => taskStatusOptions.map((option) => ({
  ...option,
  tasks: project.value?.tasks.filter((task) => task.status === option.value) ?? []
})));
const tasksCompleted = computed(() => project.value?.tasks.filter((task) => task.status === 'DONE').length ?? 0);
const tasksInProgress = computed(() => project.value?.tasks.filter((task) => task.status === 'IN_PROGRESS').length ?? 0);
const projectProgress = computed(() => {
  const total = project.value?.tasks.length ?? 0;
  return total === 0 ? null : Math.round((tasksCompleted.value / total) * 100);
});

function statusLabel(status: string) {
  return taskStatusOptions.find((option) => option.value === status)?.label ?? status;
}

function memberInitials(name: string) {
  return name.split(' ').slice(0, 2).map((part) => part[0]?.toUpperCase() ?? '').join('');
}

function statusBadgeClass(status: string) {
  if (status === 'DONE') {
    return 'bg-emerald-500/10 text-[color:var(--success-text)]';
  }
  if (status === 'IN_PROGRESS') {
    return 'bg-[color:var(--accent-soft-bg)] text-[color:var(--text-info)]';
  }
  return 'bg-amber-500/10 text-[color:var(--text-muted)]';
}

function getApiError(cause: unknown, fallback: string) {
  if (!axios.isAxiosError(cause)) return fallback;
  const responseData: unknown = cause.response?.data;
  if (responseData && typeof responseData === 'object' && 'error' in responseData && typeof responseData.error === 'string') {
    return responseData.error;
  }
  return fallback;
}

async function fetchProject() {
  loading.value = true;
  pageError.value = '';
  try {
    const response = await api.get<Project>(`/projects/${projectId}`);
    project.value = response.data;
  } catch {
    project.value = null;
    pageError.value = 'Não foi possível carregar este projeto.';
  } finally {
    loading.value = false;
  }
}

async function selectTab(tab: 'overview' | 'tasks' | 'files' | 'chat' | 'team') {
  activeTab.value = tab;
  if (tab === 'files' && !filesLoaded.value && !loadingFiles.value) {
    await fetchProjectFiles();
  }
}

async function fetchProjectFiles() {
  loadingFiles.value = true;
  fileError.value = '';
  try {
    const response = await api.get<ProjectMessage[]>(`/chat/projects/${projectId}/messages`);
    projectFiles.value = response.data
      .flatMap((message) => message.attachment ? [{ ...message.attachment, createdAt: message.createdAt, user: message.user }] : [])
      .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());
    filesLoaded.value = true;
  } catch {
    fileError.value = 'Não foi possível carregar os anexos deste projeto.';
  } finally {
    loadingFiles.value = false;
  }
}

function attachmentUrl(path: string) {
  return path.startsWith('http') ? path : `${config.public.apiBase}${path}`;
}

function fileExtension(name: string) {
  const extension = name.split('.').pop();
  return name.includes('.') && extension ? extension.slice(0, 4).toUpperCase() : 'FILE';
}

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function formatFileDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}

function openTaskCreate() {
  editingTaskId.value = null;
  taskForm.title = '';
  taskForm.description = '';
  taskError.value = '';
  isModalOpen.value = true;
}

function openTaskEditor(task: Task) {
  editingTaskId.value = task.id;
  taskForm.title = task.title;
  taskForm.description = task.description ?? '';
  taskError.value = '';
  isModalOpen.value = true;
}

function closeTaskModal() {
  if (creatingTask.value) return;
  isModalOpen.value = false;
  editingTaskId.value = null;
}

async function submitTask() {
  if (!taskForm.title.trim()) {
    taskError.value = 'Informe um título para a tarefa.';
    return;
  }
  taskError.value = '';
  creatingTask.value = true;

  try {
    const taskDetails = {
      title: taskForm.title.trim(),
      description: taskForm.description.trim()
    };
    if (editingTaskId.value) {
      await api.patch(`/tasks/${editingTaskId.value}`, taskDetails);
    } else {
      await api.post('/tasks', { ...taskDetails, projectId });
    }
    isModalOpen.value = false;
    editingTaskId.value = null;
    await fetchProject();
  } catch (err) {
    taskError.value = getApiError(err, 'Não foi possível salvar a tarefa.');
  } finally {
    creatingTask.value = false;
  }
}

async function changeTaskStatus(task: Task, newStatus: string) {
  if (!taskStatusOptions.some((option) => option.value === newStatus)) return;
  actionError.value = '';
  try {
    await api.patch(`/tasks/${task.id}/status`, { status: newStatus });
    task.status = newStatus;
  } catch {
    actionError.value = `Não foi possível atualizar o status de "${task.title}".`;
  }
}

function openProjectEditor() {
  if (!project.value) return;
  projectForm.title = project.value.title;
  projectForm.description = project.value.description ?? '';
  projectError.value = '';
  isProjectModalOpen.value = true;
}

function closeProjectModal() {
  if (!savingProject.value) isProjectModalOpen.value = false;
}

async function submitProjectEdit() {
  if (!projectForm.title.trim()) {
    projectError.value = 'Informe um título para o projeto.';
    return;
  }
  projectError.value = '';
  savingProject.value = true;
  try {
    await api.patch(`/projects/${projectId}`, {
      title: projectForm.title.trim(),
      description: projectForm.description.trim()
    });
    isProjectModalOpen.value = false;
    await fetchProject();
  } catch (cause) {
    projectError.value = getApiError(cause, 'Não foi possível atualizar o projeto.');
  } finally {
    savingProject.value = false;
  }
}

function removeProject() {
  confirmTarget.value = {
    kind: 'project',
    title: 'Excluir projeto?',
    message: `Você está prestes a excluir "${project.value?.title}". Esta ação não pode ser desfeita.`,
    confirmLabel: 'Excluir projeto'
  };
  confirmationError.value = '';
}

function removeTask(task: Task) {
  confirmTarget.value = {
    kind: 'task',
    taskId: task.id,
    title: 'Excluir tarefa?',
    message: `A tarefa "${task.title}" será removida permanentemente do projeto.`,
    confirmLabel: 'Excluir tarefa'
  };
  confirmationError.value = '';
}

async function addMember() {
  actionError.value = '';
  try {
    await api.post(`/projects/${projectId}/members`, { email: memberEmail.value });
    memberEmail.value = '';
    await fetchProject();
  } catch (cause) {
    actionError.value = getApiError(cause, 'Não foi possível adicionar essa pessoa ao projeto.');
  }
}

function askRemoveMember(member: ProjectMember) {
  confirmTarget.value = {
    kind: 'member',
    memberId: member.id,
    title: 'Remover pessoa?',
    message: `${member.user.name} perderá o acesso a este projeto.`,
    confirmLabel: 'Remover pessoa'
  };
  confirmationError.value = '';
}

function closeConfirmation() {
  if (!confirming.value) confirmTarget.value = null;
}

async function executeConfirmation() {
  const target = confirmTarget.value;
  if (!target) return;
  confirming.value = true;
  confirmationError.value = '';
  try {
    if (target.kind === 'project') {
      await api.delete(`/projects/${projectId}`);
      confirmTarget.value = null;
      await navigateTo('/projects');
    } else if (target.kind === 'task') {
      await api.delete(`/tasks/${target.taskId}`);
      confirmTarget.value = null;
      await fetchProject();
    } else {
      await api.delete(`/projects/${projectId}/members/${target.memberId}`);
      confirmTarget.value = null;
      await fetchProject();
    }
  } catch (cause) {
    confirmationError.value = getApiError(cause, 'Não foi possível concluir esta ação.');
  } finally {
    confirming.value = false;
  }
}

onMounted(() => {
  fetchProject();
});
</script>
