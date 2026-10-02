<template>
  <div ref="root" class="relative">
    <button
      type="button"
      class="relative rounded-full border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-3 py-2 text-sm text-[color:var(--text)] transition hover:border-[color:var(--border-hover)] hover:bg-[color:var(--surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--primary)]"
      aria-label="Notificações"
      aria-controls="notification-panel"
      :aria-expanded="open"
      @click="open = !open"
    >
      <Icon name="bell" :size="17" />
      <span v-if="unreadCount" class="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-[color:var(--primary)] px-1.5 py-0.5 text-[10px] font-bold text-white">{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
    </button>
    <section
      v-if="open"
      id="notification-panel"
      class="absolute right-0 z-40 mt-2 w-[min(90vw,23rem)] origin-top-right rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-[0_20px_55px_-24px_var(--shadow-tint)]"
      aria-label="Notificações recentes"
      @keydown.esc.stop="open = false"
    >
      <div class="flex items-center justify-between gap-3 border-b border-[color:var(--border)] pb-3">
        <div>
          <h2 class="font-semibold text-[color:var(--text)]">Notificações</h2>
          <p class="mt-0.5 text-xs text-[color:var(--text-muted)]">{{ unreadCount ? `${unreadCount} não lidas` : 'Tudo em dia' }}</p>
        </div>
        <button type="button" class="rounded-lg px-2 py-1.5 text-xs font-semibold text-[color:var(--primary)] transition hover:bg-[color:var(--accent-soft-bg)] disabled:cursor-default disabled:opacity-50" :disabled="unreadCount === 0" @click="markAll">Marcar lidas</button>
      </div>
      <p v-if="error" class="mt-3 rounded-xl border border-[color:var(--danger-border)] bg-[color:var(--danger-bg)] px-3 py-2 text-xs text-[color:var(--danger-text)]" role="alert">{{ error }}</p>
      <div class="mt-3 max-h-[min(60dvh,24rem)] space-y-2 overflow-y-auto" role="list">
        <p v-if="notifications.length === 0 && !error" class="rounded-xl bg-[color:var(--surface-soft)] px-4 py-5 text-center text-sm text-[color:var(--text-muted)]">Nenhuma notificação por enquanto.</p>
        <button
          v-for="notification in notifications"
          :key="notification.id"
          type="button"
          class="flex w-full items-start gap-3 rounded-xl p-3 text-left text-sm transition hover:ring-1 hover:ring-[color:var(--border-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--primary)]"
          :class="notification.read ? 'bg-[color:var(--surface-soft)] text-[color:var(--text-muted)]' : 'bg-[color:var(--accent-soft-bg)] text-[color:var(--text)]'"
          :aria-label="`${notification.read ? '' : 'Não lida: '}${notification.content}`"
          @click="markRead(notification.id)"
        >
          <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full" :class="notification.read ? 'bg-[color:var(--border-hover)]' : 'bg-[color:var(--primary)]'" aria-hidden="true"></span>
          <span class="min-w-0 flex-1 leading-5">{{ notification.content }}</span>
          <span v-if="!notification.read" class="sr-only">Não lida</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { io, type Socket } from 'socket.io-client';
import { useApi } from '@/composables/useApi';
import Icon from '@/components/ui/Icon.vue';

interface Notification {
  id: number;
  content: string;
  read: boolean;
  projectId?: number;
}

const api = useApi();
const root = ref<HTMLElement | null>(null);
const open = ref(false);
const notifications = ref<Notification[]>([]);
const error = ref('');
const unreadCount = computed(() => notifications.value.filter((item) => !item.read).length);
let socket: Socket | null = null;

function dismissOnOutsideClick(event: PointerEvent) {
  if (event.target instanceof Node && !root.value?.contains(event.target)) open.value = false;
}

function dismissOnEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') open.value = false;
}

async function load() {
  try {
    const response = await api.get('/notifications');
    notifications.value = response.data;
  } catch {
    error.value = 'Não foi possível carregar as notificações.';
  }
}

function connectRealtime() {
  const config = useRuntimeConfig();
  socket = io(config.public.apiBase, { withCredentials: true, reconnection: true });
  socket.on('notification', (item: Notification) => {
    if (!notifications.value.some((notification) => notification.id === item.id)) {
      notifications.value.unshift(item);
    }
  });
}

async function markRead(id: number) {
  try {
    await api.patch(`/notifications/${id}/read`);
    const notification = notifications.value.find((item) => item.id === id);
    if (notification) notification.read = true;
  } catch {
    error.value = 'Não foi possível marcar a notificação como lida.';
  }
}

async function markAll() {
  try {
    await api.patch('/notifications/read-all');
    notifications.value.forEach((item) => { item.read = true; });
  } catch {
    error.value = 'Não foi possível marcar as notificações como lidas.';
  }
}

onMounted(async () => {
  await load();
  connectRealtime();
  document.addEventListener('pointerdown', dismissOnOutsideClick);
  document.addEventListener('keydown', dismissOnEscape);
});
onBeforeUnmount(() => {
  socket?.disconnect();
  document.removeEventListener('pointerdown', dismissOnOutsideClick);
  document.removeEventListener('keydown', dismissOnEscape);
});
</script>
