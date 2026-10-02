<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      class="workspace-modal w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-0 text-[color:var(--text)] shadow-[0_25px_50px_-12px_var(--shadow-tint-soft)]"
      :aria-labelledby="titleId"
      :aria-describedby="description ? descriptionId : undefined"
      @cancel.prevent="close"
      @click.self="close"
    >
      <section class="p-5 sm:p-6">
        <div class="mb-5 flex items-start justify-between gap-4">
          <div class="min-w-0">
            <h2 :id="titleId" class="text-xl font-semibold tracking-tight">{{ title }}</h2>
            <p v-if="description" :id="descriptionId" class="mt-1 text-sm leading-5 text-[color:var(--text-muted)]">{{ description }}</p>
          </div>
          <button
            type="button"
            class="shrink-0 rounded-lg p-2 text-[color:var(--text-muted)] transition hover:bg-[color:var(--surface-soft)] hover:text-[color:var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--primary)]"
            aria-label="Fechar janela"
            @click="close"
          >
            <Icon name="close" :size="18" />
          </button>
        </div>
        <slot />
      </section>
    </dialog>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch, useId } from 'vue';
import Icon from '@/components/ui/Icon.vue';

const props = withDefaults(defineProps<{
  open: boolean;
  title: string;
  description?: string;
}>(), { description: '' });
const emit = defineEmits<{ close: [] }>();
const dialog = ref<HTMLDialogElement | null>(null);
const previousFocus = ref<HTMLElement | null>(null);
const previousBodyOverflow = ref('');
const id = useId();
const titleId = `modal-title-${id}`;
const descriptionId = `modal-description-${id}`;

function close() {
  emit('close');
}

watch(() => props.open, async (open) => {
  if (!import.meta.client) return;
  await nextTick();
  const element = dialog.value;
  if (!element) return;

  if (open && !element.open) {
    previousFocus.value = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    previousBodyOverflow.value = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element.showModal();
    element.querySelector<HTMLElement>('[autofocus]')?.focus();
  } else if (!open && element.open) {
    element.close();
    document.body.style.overflow = previousBodyOverflow.value;
    if (previousFocus.value?.isConnected) previousFocus.value.focus();
  }
}, { immediate: true });

onBeforeUnmount(() => {
  if (dialog.value?.open) dialog.value.close();
  if (import.meta.client) document.body.style.overflow = previousBodyOverflow.value;
});
</script>

<style scoped>
.workspace-modal {
  max-height: min(90dvh, 52rem);
  margin: auto;
}

.workspace-modal::backdrop {
  background: rgb(2 6 23 / 0.68);
  backdrop-filter: blur(5px);
}
</style>
