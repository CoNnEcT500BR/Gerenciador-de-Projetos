<template>
  <div class="public-shell min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
    <a href="#main-content" class="skip-link">Pular para o conteúdo principal</a>
    <PublicHeader />
    <main id="main-content" class="public-main"><slot /></main>
    <PublicFooter />
    <CookieBanner />
  </div>
</template>
<script setup lang="ts">
import CookieBanner from '@/components/accessibility/CookieBanner.vue';
</script>
