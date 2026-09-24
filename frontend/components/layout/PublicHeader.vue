<template>
  <header class="public-header sticky top-0 z-30 border-b border-[color:var(--border)] bg-[color:var(--bg)]/80 backdrop-blur-xl">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
      <NuxtLink to="/" aria-label="NovaHub — início"><BrandLogo /></NuxtLink>
      <nav class="hidden items-center gap-6 text-sm font-medium text-[color:var(--text-muted)] md:flex" aria-label="Navegação principal">
        <NuxtLink v-for="link in desktopLinks" :key="link.to" :to="link.to" class="transition hover:text-[color:var(--text)]">{{ link.label }}</NuxtLink>
      </nav>
      <div class="flex items-center gap-2">
        <AccessibilityControls class="hidden sm:inline-flex" />
        <ThemeToggle />
        <NuxtLink to="/login" class="hidden rounded-full border border-[color:var(--border)] px-4 py-2 text-sm font-semibold transition hover:border-[color:var(--border-hover)] hover:bg-[color:var(--surface-2)] sm:inline-flex">Entrar</NuxtLink>
        <NuxtLink to="/register" class="hidden rounded-full bg-[color:var(--bg-button)] px-4 py-2 text-sm font-semibold text-[color:var(--text-button)] shadow-[0_8px_24px_var(--shadow-tint)] transition hover:-translate-y-0.5 hover:bg-[color:var(--bg-button-hover)] sm:inline-flex">Criar conta</NuxtLink>
        <button type="button" class="rounded-lg border border-[color:var(--border)] p-2 md:hidden" :aria-expanded="open" aria-controls="mobile-menu" :aria-label="open ? 'Fechar menu' : 'Abrir menu'" @click="open = !open">
          <Icon :name="open ? 'close' : 'menu'" :size="20" />
        </button>
      </div>
    </div>
    <nav v-if="open" id="mobile-menu" class="border-t border-[color:var(--border)] px-6 py-4 md:hidden" aria-label="Navegação móvel">
      <div class="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-[color:var(--text-muted)]">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="rounded-lg px-2 py-2 hover:bg-[color:var(--surface-2)] hover:text-[color:var(--text)]" @click="open = false">{{ link.label }}</NuxtLink>
        <div class="flex gap-2 border-t border-[color:var(--border)] pt-3 sm:hidden">
          <NuxtLink to="/login" class="flex-1 rounded-lg border border-[color:var(--border)] px-3 py-2 text-center font-semibold">Entrar</NuxtLink>
          <NuxtLink to="/register" class="flex-1 rounded-lg bg-[color:var(--bg-button)] px-3 py-2 text-center font-semibold text-[color:var(--text-button)]">Criar conta</NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AccessibilityControls from '@/components/accessibility/AccessibilityControls.vue'
import Icon from '@/components/ui/Icon.vue'
const open = ref(false)
const desktopLinks = [
  { to: '/recursos', label: 'Recursos' }, { to: '/depoimentos', label: 'Depoimentos' },
  { to: '/sobre', label: 'Sobre' }, { to: '/ajuda', label: 'Ajuda' }
]
const links = [
  { to: '/recursos', label: 'Recursos' }, { to: '/depoimentos', label: 'Depoimentos' },
  { to: '/sobre', label: 'Sobre' }, { to: '/contato', label: 'Contato' },
  { to: '/ajuda', label: 'Ajuda' }, { to: '/perguntas-frequentes', label: 'Perguntas frequentes' }
]
</script>
