<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <header class="border-b border-slate-200 bg-white shadow-sm">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div class="text-lg font-semibold">Portfolio Project</div>
      </div>
    </header>
    <main class="mx-auto max-w-6xl p-6">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts"></script>
