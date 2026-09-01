<template>
  <BaseLayout>
    <div class="space-y-6">
      <h1 class="text-3xl font-semibold text-[color:var(--text)]">Perfil</h1>
      <div class="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-8">
        <p class="text-[color:var(--text-muted)]">Esta é a base da página de perfil do usuário.</p>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/components/layout/BaseLayout.vue';

definePageMeta({
  middleware: 'auth'
});
</script>
