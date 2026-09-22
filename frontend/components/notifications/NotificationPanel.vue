<template>
  <div class="relative">
    <button
      class="rounded-full border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-3 py-2 text-sm text-[color:var(--text)]"
      @click="open = !open"
    >
      🔔 <span v-if="unreadCount">{{ unreadCount }}</span>
    </button>
    <div v-if="open" class="absolute right-0 z-40 mt-2 w-80 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-[color:var(--text)]">Notificações</h3>
        <button class="text-xs text-[color:var(--primary)]" @click="markAll">Marcar lidas</button>
      </div>
      <p v-if="error" class="mt-2 text-xs text-[color:var(--danger-text)]">{{ error }}</p>
      <div class="mt-3 max-h-72 space-y-2 overflow-y-auto">
        <p v-if="notifications.length === 0" class="text-sm text-[color:var(--text-muted)]">Nenhuma notificação.</p>
        <button v-for="notification in notifications" :key="notification.id" class="block w-full rounded-2xl p-3 text-left text-sm" :class="notification.read ? 'bg-[color:var(--surface-soft)] text-[color:var(--text-muted)]' : 'bg-[color:var(--accent-soft-bg)] text-[color:var(--text)]'" @click="markRead(notification.id)">
          {{ notification.content }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { io, type Socket } from 'socket.io-client';
import { useApi } from '@/composables/useApi';

interface Notification {
  id: number;
  content: string;
  read: boolean;
  projectId?: number;
}

const api = useApi();
const open = ref(false);
const notifications = ref<Notification[]>([]);
const error = ref('');
const unreadCount = computed(() => notifications.value.filter((item) => !item.read).length);
let socket: Socket | null = null;

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

onMounted(async () => { await load(); connectRealtime(); });
onBeforeUnmount(() => socket?.disconnect());
</script>
