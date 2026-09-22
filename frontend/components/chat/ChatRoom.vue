<template>
  <section class="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-6">
    <div class="flex items-center justify-between gap-3">
      <div>
        <h2 class="text-xl font-semibold text-[color:var(--text)]">Chat do projeto</h2>
        <p class="mt-1 text-sm text-[color:var(--text-muted)]">
          {{ connected ? 'Conectado' : 'Conectando...' }} · {{ onlineCount }} online
        </p>
      </div>
      <span v-if="error" class="text-xs text-[color:var(--danger-text)]">{{ error }}</span>
    </div>
    <div class="mt-5 max-h-80 space-y-3 overflow-y-auto">
      <p v-if="messages.length === 0" class="text-sm text-[color:var(--text-muted)]">Nenhuma mensagem ainda.</p>
      <div v-for="message in messages" :key="message.id" class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)]/70 p-3">
        <div class="flex items-center justify-between gap-3">
          <span class="text-sm font-semibold text-[color:var(--text)]">{{ message.user.name }}</span>
          <span class="text-xs text-[color:var(--text-muted)]">{{ formatTime(message.createdAt) }}</span>
        </div>
        <p class="mt-1 text-sm text-[color:var(--text-muted)]">{{ message.content }}</p>
        <a
          v-if="message.attachment"
          :href="attachmentUrl(message.attachment.downloadUrl)"
          target="_blank"
          rel="noreferrer"
          class="mt-3 inline-flex max-w-full items-center gap-2 rounded-xl border border-[color:var(--border)] px-3 py-2 text-xs font-semibold text-[color:var(--text-info)] hover:bg-[color:var(--surface-soft)]"
        >
          <span class="truncate">{{ message.attachment.originalName }}</span>
          <span class="shrink-0 text-[color:var(--text-muted)]">{{ formatSize(message.attachment.size) }}</span>
        </a>
      </div>
    </div>
    <form class="mt-4 space-y-3" @submit.prevent="submit">
      <div v-if="selectedFile" class="flex items-center justify-between gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-2)] px-3 py-2 text-xs">
        <span class="truncate text-[color:var(--text)]">{{ selectedFile.name }}</span>
        <button type="button" class="shrink-0 text-[color:var(--danger-text)]" @click="selectedFile = null">Remover</button>
      </div>
      <div class="flex gap-2">
      <input v-model="draft" maxlength="2000" placeholder="Escreva uma mensagem..." class="min-w-0 flex-1 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)] px-4 py-3 text-sm text-[color:var(--text)] outline-none focus:border-[color:var(--primary)]" />
      <label class="flex cursor-pointer items-center rounded-2xl border border-[color:var(--border)] px-3 text-xs font-semibold text-[color:var(--text-muted)] hover:bg-[color:var(--surface-soft)]">
        Anexar
        <input type="file" class="sr-only" :disabled="sending" @change="selectFile" />
      </label>
      <button class="rounded-2xl bg-[color:var(--bg-button)] px-4 py-3 text-sm font-semibold text-[color:var(--text-button)] disabled:opacity-60" :disabled="!connected || sending || (!draft.trim() && !selectedFile)">{{ sending ? 'Enviando...' : 'Enviar' }}</button>
      </div>
      <p class="text-xs text-[color:var(--text-muted)]">Você pode enviar uma mensagem, um arquivo ou ambos.</p>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useChat } from '@/composables/useChat';

const props = defineProps<{ projectId: number }>();
const { messages, onlineCount, error, connected, start, sendMessage, uploadAttachment } = useChat(props.projectId);
const draft = ref('');
const selectedFile = ref<File | null>(null);
const sending = ref(false);
const config = useRuntimeConfig();

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function attachmentUrl(path: string) {
  return path.startsWith('http') ? path : `${config.public.apiBase}${path}`;
}

function selectFile(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) selectedFile.value = file;
}

async function submit() {
  sending.value = true;
  try {
    let attachmentId: number | undefined;
    if (selectedFile.value) {
      const attachment = await uploadAttachment(selectedFile.value);
      attachmentId = attachment.id;
    }
    await sendMessage(draft.value.trim(), attachmentId);
    draft.value = '';
    selectedFile.value = null;
  } catch (cause) {
    // Surface the transport error in the existing component status area.
    error.value = cause instanceof Error ? cause.message : 'Falha ao enviar';
  } finally {
    sending.value = false;
  }
}

onMounted(start);
</script>
