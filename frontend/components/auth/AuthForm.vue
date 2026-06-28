<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <slot />
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'submit'): void;
}>();

function onSubmit() {
  emit('submit');
}
</script>
