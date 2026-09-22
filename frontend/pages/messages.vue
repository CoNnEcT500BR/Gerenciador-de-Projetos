<template>
  <BaseLayout>
    <div class="space-y-6">
      <section class="surface-card p-6">
        <p class="page-kicker">Colaboração</p>
        <h1 class="mt-2 text-3xl font-semibold tracking-[-.035em]">Mensagens</h1>
        <p class="mt-2 max-w-2xl text-sm leading-6 text-[color:var(--text-muted)]">Escolha um projeto para acompanhar decisões e conversar com o time no contexto certo.</p>
      </section>

      <div v-if="loading" class="surface-card p-8 text-sm text-[color:var(--text-muted)]">Carregando projetos...</div>
      <div v-else-if="error" class="rounded-2xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] p-5 text-sm text-[color:var(--danger-text)]">{{ error }}</div>
      <div v-else-if="projects.length === 0" class="surface-card p-10 text-center">
        <p class="text-lg font-semibold">Você ainda não tem projetos</p>
        <p class="mt-2 text-sm text-[color:var(--text-muted)]">Crie ou aceite um projeto para começar a conversar com sua equipe.</p>
        <NuxtLink to="/projects" class="mt-5 inline-flex rounded-xl bg-[color:var(--bg-button)] px-4 py-2.5 text-sm font-semibold text-[color:var(--text-button)]">Ir para projetos</NuxtLink>
      </div>
      <div v-else class="grid gap-5 xl:grid-cols-[18rem_minmax(0,1fr)]">
        <aside class="surface-card p-3">
          <p class="px-3 py-2 text-xs font-bold uppercase tracking-[.14em] text-[color:var(--text-muted)]">Projetos</p>
          <button v-for="project in projects" :key="project.id" type="button" class="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition" :class="selectedProjectId === project.id ? 'bg-[color:var(--accent-soft-bg)] font-semibold text-[color:var(--text-info)]' : 'text-[color:var(--text-muted)] hover:bg-[color:var(--surface-soft)] hover:text-[color:var(--text)]'" @click="selectedProjectId = project.id">
            <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-[color:var(--surface-soft)] text-xs" aria-hidden="true">◌</span>
            <span class="truncate">{{ project.title }}</span>
          </button>
        </aside>
        <ChatRoom v-if="selectedProjectId" :key="selectedProjectId" :project-id="selectedProjectId" />
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import ChatRoom from '@/components/chat/ChatRoom.vue';
import { useApi } from '@/composables/useApi';

definePageMeta({ middleware: 'auth' });

interface Project {
  id: number;
  title: string;
}

const api = useApi();
const projects = ref<Project[]>([]);
const selectedProjectId = ref<number | null>(null);
const loading = ref(true);
const error = ref('');

async function fetchProjects() {
  try {
    projects.value = (await api.get<Project[]>('/projects')).data;
    selectedProjectId.value = projects.value[0]?.id ?? null;
  } catch {
    error.value = 'Não foi possível carregar seus projetos.';
  } finally {
    loading.value = false;
  }
}

onMounted(fetchProjects);
</script>
