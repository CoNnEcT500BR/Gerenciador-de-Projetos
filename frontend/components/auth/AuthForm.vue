<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits<{
  (e: 'submit'): void;
}>();

function onSubmit() {
  emit('submit');
}
</script>
