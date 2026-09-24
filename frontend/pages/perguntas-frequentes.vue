<template>
  <PublicPage eyebrow="FAQ" title="Perguntas frequentes" description="Respostas objetivas para as dúvidas mais comuns.">
    <label for="faq-search" class="sr-only">Buscar perguntas</label>
    <input id="faq-search" v-model="query" type="search" placeholder="Buscar pergunta..." class="mb-6 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-2)] px-4 py-3 text-[color:var(--text)]" />
    <FAQAccordion :items="filteredFaqs" />
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
