<template>
  <footer class="public-footer border-t border-[color:var(--border)] bg-[color:var(--surface-soft)]">
    <div class="mx-auto grid max-w-7xl gap-10 px-6 py-14 text-sm lg:grid-cols-[1.5fr_repeat(3,1fr)] lg:px-8">
      <div>
        <NuxtLink to="/"><BrandLogo /></NuxtLink>
        <p class="mt-4 max-w-xs leading-6 text-[color:var(--text-muted)]">Um hub de execução para equipes que transformam planos em entregas.</p>
        <NuxtLink
          to="/contato"
          class="mt-5 inline-flex rounded-full bg-[color:var(--bg-button)] px-4 py-2 text-xs font-bold text-[color:var(--text-button)] transition hover:bg-[color:var(--bg-button-hover)]"
        >
          Fale com a gente <span class="ml-2" aria-hidden="true">→</span>
        </NuxtLink>
      </div>
      <div v-for="column in columns" :key="column.title">
        <h2 class="mb-3 font-semibold">{{ column.title }}</h2>
        <div class="flex flex-col gap-2 text-[color:var(--text-muted)]">
          <NuxtLink v-for="link in column.links" :key="link.to" :to="link.to" class="hover:text-[color:var(--text)]">
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="mx-auto flex max-w-7xl flex-col gap-2 border-t border-[color:var(--border)] px-6 py-5 text-xs text-[color:var(--text-muted)] sm:flex-row sm:justify-between lg:px-8"><span>© {{ new Date().getFullYear() }} NovaHub</span><span>Feito para transformar planos em entregas.</span></div>
  </footer>
</template>
<script setup lang="ts">
const columns = [
  { title: 'Produto', links: [{ label: 'Recursos', to: '/recursos' }, { label: 'Status', to: '/status' }, { label: 'Perguntas frequentes', to: '/perguntas-frequentes' }, { label: 'Ajuda', to: '/ajuda' }] },
  { title: 'Empresa', links: [{ label: 'Sobre', to: '/sobre' }, { label: 'Depoimentos', to: '/depoimentos' }, { label: 'Contato', to: '/contato' }] },
  { title: 'Legal', links: [{ label: 'Privacidade', to: '/politica-de-privacidade' }, { label: 'Termos de uso', to: '/termos-de-uso' }, { label: 'Cookies', to: '/politica-de-cookies' }] }
]
</script>
