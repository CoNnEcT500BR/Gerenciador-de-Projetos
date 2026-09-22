<template>
  <PublicPage eyebrow="FAQ" title="Perguntas frequentes" description="Respostas objetivas para as dúvidas mais comuns.">
    <label for="faq-search" class="sr-only">Buscar perguntas</label>
    <input id="faq-search" v-model="query" type="search" placeholder="Buscar pergunta..." class="mb-6 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-2)] px-4 py-3 text-[color:var(--text)]" />
    <div class="divide-y divide-[color:var(--border)] rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]">
      <details v-for="item in filteredFaqs" :key="item.q" class="group p-5">
        <summary class="cursor-pointer list-none font-semibold">{{ item.q }} <span aria-hidden="true" class="float-right group-open:rotate-45">＋</span></summary>
        <p class="mt-3 max-w-3xl leading-6 text-[color:var(--text-muted)]">{{ item.a }}</p>
      </details>
    </div>
    <p v-if="!filteredFaqs.length" class="mt-4 text-[color:var(--text-muted)]">Nenhuma pergunta encontrada.</p>
  </PublicPage>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
definePageMeta({ layout: 'public' });
const query = ref('');
const faqs = [
  { q: 'O NovaHub é gratuito?', a: 'Você pode começar gratuitamente. Consulte as opções disponíveis no momento do cadastro.' },
  { q: 'Posso convidar minha equipe?', a: 'Sim. O workspace foi pensado para colaboração e permite organizar pessoas, projetos e conversas.' },
  { q: 'Meus dados estão protegidos?', a: 'Aplicamos boas práticas de segurança e privacidade. Consulte nossa política de privacidade para detalhes.' },
  { q: 'Como entro em contato?', a: 'Use a página de contato e descreva como podemos ajudar.' },
];
const filteredFaqs = computed(() => faqs.filter((item) => `${item.q} ${item.a}`.toLowerCase().includes(query.value.toLowerCase().trim())));
</script>
