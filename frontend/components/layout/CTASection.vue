<template>
  <section class="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
    <div class="relative overflow-hidden rounded-[2rem] border border-[color:var(--accent-soft-border)] bg-[color:var(--accent-soft-bg)] p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-14">
      <div class="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[color:var(--gradient-1)] blur-3xl" aria-hidden="true"></div>
      <div class="relative max-w-2xl">
        <p v-if="eyebrow" class="page-kicker">{{ eyebrow }}</p>
        <h2 class="mt-3 text-3xl font-semibold tracking-[-.035em] sm:text-4xl">{{ title }}</h2>
        <p v-if="description" class="mt-4 leading-7 text-[color:var(--text-muted)]">{{ description }}</p>
      </div>
      <PublicButton :to="to" class="relative mt-7 shrink-0 lg:mt-0"><slot name="action">Começar agora <span aria-hidden="true">→</span></slot></PublicButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import PublicButton from '@/components/ui/PublicButton.vue';
defineProps<{ title: string; description?: string; eyebrow?: string; to: string }>();
</script>
