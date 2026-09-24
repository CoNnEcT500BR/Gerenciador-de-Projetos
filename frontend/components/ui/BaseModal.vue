<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" @click.self="close">
      <section
        ref="dialog"
        class="w-full max-w-md rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_25px_50px_-12px_var(--shadow-tint-soft)]"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        tabindex="-1"
      >
        <div class="flex items-start justify-between gap-4">
          <h2 :id="titleId" class="text-xl font-semibold text-[color:var(--text)]">{{ title }}</h2>
          <button type="button" class="rounded-lg p-2 text-[color:var(--text-muted)] hover:bg-[color:var(--surface-soft)]" aria-label="Fechar" @click="close">
            <Icon name="close" :size="18" />
          </button>
        </div>
        <slot />
      </section>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
import Icon from '@/components/ui/Icon.vue';

const props = defineProps<{ open: boolean; title: string }>();
const emit = defineEmits<{ close: [] }>();
const dialog = ref<HTMLElement | null>(null);
const previousFocus = ref<HTMLElement | null>(null);
const titleId = `modal-title-${Math.random().toString(36).slice(2)}`;

function close() {
  emit('close');
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault();
    close();
  }
  if (event.key === 'Tab' && dialog.value) {
    const focusable = [...dialog.value.querySelectorAll<HTMLElement>('button, input, textarea, select, a[href], [tabindex]:not([tabindex="-1"])')];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

watch(() => props.open, async (open) => {
  if (!import.meta.client) return;
  if (open) {
    previousFocus.value = document.activeElement as HTMLElement;
    document.addEventListener('keydown', onKeydown);
    await nextTick();
    dialog.value?.focus();
  } else {
    document.removeEventListener('keydown', onKeydown);
    previousFocus.value?.focus();
  }
}, { immediate: true });

onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown));
</script>
