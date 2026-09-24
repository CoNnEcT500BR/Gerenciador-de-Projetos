<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    :type="to ? undefined : type"
    :disabled="disabled"
    class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
    :class="variant === 'secondary'
      ? 'border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--text)] hover:border-[color:var(--border-hover)] hover:bg-[color:var(--surface-2)]'
      : 'bg-[color:var(--bg-button)] text-[color:var(--text-button)] shadow-[0_14px_30px_var(--shadow-tint)] hover:-translate-y-0.5 hover:bg-[color:var(--bg-button-hover)]'"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components';

withDefaults(defineProps<{
  to?: string;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  disabled?: boolean;
}>(), { variant: 'primary', type: 'button', disabled: false });
</script>
