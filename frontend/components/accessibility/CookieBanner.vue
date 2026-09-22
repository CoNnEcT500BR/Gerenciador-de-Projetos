<template>
  <div v-if="!hasChoice || isOpen" class="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-5 shadow-2xl backdrop-blur" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-description">
    <h2 id="cookie-title" class="font-semibold">Sua privacidade importa</h2>
    <p id="cookie-description" class="mt-2 text-sm leading-6 text-[color:var(--text-muted)]">
      Usamos cookies necessários para o funcionamento do site e, opcionalmente, cookies de análise para melhorar sua experiência.
    </p>
    <div class="mt-4 flex flex-wrap gap-2">
      <button type="button" class="rounded-xl bg-[color:var(--bg-button)] px-4 py-2 text-sm font-semibold text-[color:var(--text-button)] hover:bg-[color:var(--bg-button-hover)]" @click="save(true)">Aceitar todos</button>
      <button type="button" class="rounded-xl border border-[color:var(--border)] px-4 py-2 text-sm font-semibold hover:bg-[color:var(--surface-2)]" @click="save(false)">Recusar opcionais</button>
      <button type="button" class="rounded-xl border border-[color:var(--border)] px-4 py-2 text-sm font-semibold hover:bg-[color:var(--surface-2)]" @click="showOptions = !showOptions">Personalizar</button>
      <button v-if="hasChoice" type="button" class="ml-auto rounded-xl px-3 py-2 text-sm text-[color:var(--text-muted)] hover:text-[color:var(--text)]" @click="isOpen = false">Fechar</button>
    </div>
    <div v-if="showOptions" class="mt-4 rounded-xl border border-[color:var(--border)] p-4">
      <label class="flex items-start gap-3 text-sm">
        <input v-model="analytics" type="checkbox" class="mt-1" />
        <span><strong>Cookies de análise</strong><br /><span class="text-[color:var(--text-muted)]">Permitem entender como o site é usado. Nenhum cookie de marketing é utilizado.</span></span>
      </label>
      <button type="button" class="mt-4 rounded-xl bg-[color:var(--bg-button)] px-4 py-2 text-sm font-semibold text-[color:var(--text-button)]" @click="save(analytics)">Salvar preferências</button>
    </div>
  </div>
  <button v-else type="button" class="fixed bottom-4 left-4 z-40 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-xs font-semibold shadow-lg" @click="openPreferences">Preferências de cookies</button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useCookieConsent } from '@/composables/useCookieConsent';

const { hasChoice, isOpen, init, save, openPreferences } = useCookieConsent();
const showOptions = ref(false);
const analytics = ref(false);
onMounted(init);
</script>
