<template>
  <div class="divide-y divide-[color:var(--border)] overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]">
    <details v-for="item in items" :key="item.q" class="group p-5">
      <summary class="cursor-pointer list-none pr-8 font-semibold focus-visible:rounded-lg">
        {{ item.q }} <span aria-hidden="true" class="float-right text-[color:var(--primary)] transition group-open:rotate-45">＋</span>
      </summary>
      <p class="mt-3 max-w-3xl leading-6 text-[color:var(--text-muted)]">{{ item.a }}</p>
    </details>
  </div>
</template>

<script setup lang="ts">
defineProps<{ items: Array<{ q: string; a: string }> }>();
</script>
