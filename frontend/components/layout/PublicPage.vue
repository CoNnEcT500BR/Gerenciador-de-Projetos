<template>
  <div class="public-page mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-24">
    <div class="public-hero mb-12 max-w-4xl sm:mb-16">
      <div class="public-hero-orb" aria-hidden="true"></div>
      <p v-if="eyebrow" class="mb-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--accent-soft-border)] bg-[color:var(--accent-soft-bg)] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--text-info)] shadow-[0_8px_24px_var(--shadow-tint-soft)]">
        <span class="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-from)] shadow-[0_0_10px_var(--brand-from)]" aria-hidden="true"></span>
        {{ eyebrow }}
      </p>
      <h1 class="max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-[color:var(--text)] sm:text-6xl lg:text-7xl">{{ title }}</h1>
      <p v-if="description" class="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--text-muted)] sm:text-xl">{{ description }}</p>
    </div>
    <slot />
  </div>
</template>
<script setup lang="ts">defineProps<{ title: string; description?: string; eyebrow?: string }>()</script>
