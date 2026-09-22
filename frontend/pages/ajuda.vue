<template>
  <PublicPage eyebrow="Central de ajuda" title="Encontre seu próximo passo" description="Guias rápidos para aproveitar melhor o NovaHub.">
    <div class="mb-8">
      <label for="help-search" class="sr-only">Buscar artigos</label>
      <input id="help-search" v-model="query" type="search" placeholder="Buscar na Central de ajuda..." class="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-2)] px-4 py-3 text-[color:var(--text)]" />
    </div>
    <div class="mb-8 flex flex-wrap gap-2" aria-label="Categorias de ajuda">
      <button v-for="category in categories" :key="category" type="button" class="rounded-full border px-3 py-2 text-sm" :class="selectedCategory === category ? 'border-[color:var(--primary)] bg-[color:var(--accent-soft-bg)]' : 'border-[color:var(--border)]'" @click="selectedCategory = category">{{ category }}</button>
    </div>
    <div class="grid gap-4 sm:grid-cols-2">
      <NuxtLink v-for="item in filteredItems" :key="item.title" to="/perguntas-frequentes" class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 hover:border-[color:var(--border-hover)]">
        <p class="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-info)]">{{ item.category }}</p>
        <h2 class="mt-2 font-semibold">{{ item.title }} <span aria-hidden="true">→</span></h2>
        <p class="mt-2 text-sm leading-6 text-[color:var(--text-muted)]">{{ item.text }}</p>
      </NuxtLink>
    </div>
    <p v-if="!filteredItems.length" class="rounded-xl border border-[color:var(--border)] p-5 text-[color:var(--text-muted)]">Nenhum artigo encontrado. Tente outro termo.</p>
  </PublicPage>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
definePageMeta({ layout: 'public' });
const query = ref('');
const selectedCategory = ref('Todas');
const categories = ['Todas', 'Primeiros passos', 'Conta e acesso', 'Projetos'];
const items = [
  { category: 'Primeiros passos', title: 'Configure seu workspace', text: 'Comece um workspace e convide sua equipe.' },
  { category: 'Conta e acesso', title: 'Gerencie seu perfil', text: 'Atualize seus dados e preferências com segurança.' },
  { category: 'Projetos', title: 'Organize o trabalho do time', text: 'Crie projetos, tarefas e prioridades no mesmo contexto.' },
  { category: 'Projetos', title: 'Acompanhe entregas', text: 'Use o painel para encontrar gargalos e próximos passos.' },
];
const filteredItems = computed(() => items.filter((item) => {
  const matchesCategory = selectedCategory.value === 'Todas' || item.category === selectedCategory.value;
  const text = `${item.title} ${item.text} ${item.category}`.toLowerCase();
  return matchesCategory && text.includes(query.value.toLowerCase().trim());
}));
</script>
