import { io, type Socket } from 'socket.io-client';
import { onBeforeUnmount, ref } from 'vue';
import { useApi } from '@/composables/useApi';

export interface ChatAttachment {
  id: number;
  originalName: string;
  mimeType: string;
  size: number;
  downloadUrl: string;
}
export interface ChatMessage {
  id: number;
  content: string;
  projectId: number;
  createdAt: string;
  user: { id: number; name: string };
  attachment?: ChatAttachment | null;
}

export function useChat(projectId: number) {
  const config = useRuntimeConfig();
  const socket = ref<Socket | null>(null);
  const messages = ref<ChatMessage[]>([]);
  const onlineCount = ref(0);
  const error = ref('');
  const connected = ref(false);
  const api = useApi();

  async function loadHistory() {
    const response = await $fetch<ChatMessage[]>(
      `${config.public.apiBase}/chat/projects/${projectId}/messages`,
      { credentials: 'include' }
    );
    messages.value = response;
  }

  function connect() {
    socket.value = io(config.public.apiBase, { withCredentials: true, reconnection: true });
    socket.value.on('connect', () => {
      connected.value = true;
      error.value = '';
      loadHistory().catch(() => { error.value = 'Não foi possível sincronizar o chat'; });
      socket.value?.emit('joinRoom', projectId, (result: { ok: boolean; error?: string }) => {
        if (!result.ok) error.value = result.error ?? 'Sem acesso ao projeto';
      });
    });
    socket.value.on('disconnect', () => { connected.value = false; });
    socket.value.on('connect_error', (event) => { error.value = event.message; });
    socket.value.on('presence', (payload: { count: number }) => { onlineCount.value = payload.count; });
    socket.value.on('receiveMessage', (message: ChatMessage) => {
      if (!messages.value.some((item) => item.id === message.id)) messages.value.push(message);
    });
  }

  function sendMessage(content: string, attachmentId?: number) {
    return new Promise<void>((resolve, reject) => {
      socket.value?.emit(
        'sendMessage',
        { projectId, content, attachmentId },
        (result: { ok: boolean; error?: string }) => {
          if (!result.ok) return reject(new Error(result.error ?? 'Não foi possível enviar'));
          resolve();
        }
      );
    });
  }

  async function uploadAttachment(file: File) {
    const body = new FormData();
    body.append('file', file);
    const response = await api.post<{ attachment: ChatAttachment }>(
      `/chat/projects/${projectId}/attachments`,
      body,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data.attachment;
  }

  async function start() {
    try {
      await loadHistory();
      connect();
    } catch (cause) {
      error.value = cause instanceof Error ? cause.message : 'Não foi possível carregar o chat';
    }
  }

  function stop() {
    socket.value?.disconnect();
    socket.value = null;
  }

  onBeforeUnmount(stop);

  return { messages, onlineCount, error, connected, start, stop, sendMessage, uploadAttachment };
}
