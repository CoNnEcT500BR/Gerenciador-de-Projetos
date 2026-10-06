<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useTheme } from '@/composables/useTheme';

type TokenKind = 'color' | 'radius' | 'shadow';

interface DesignToken {
  name: string;
  variable: string;
  utility: string;
  kind: TokenKind;
}

interface TokenGroup {
  id: string;
  title: string;
  description: string;
  tokens: DesignToken[];
}

const { isDark, toggleTheme } = useTheme();
const search = ref('');
const isMounted = ref(false);
const themeLabel = computed(() => isDark.value ? 'Escuro' : 'Claro');

useHead({ title: 'NovaHub — Design System' });

onMounted(() => {
  isMounted.value = true;
});

const groups: TokenGroup[] = [
  {
    id: 'brand',
    title: 'Marca',
    description: 'Cores principais da identidade NovaHub.',
    tokens: [
      { name: 'brand-from', variable: '--brand-from', utility: 'bg-brand-from', kind: 'color' },
      { name: 'brand-via', variable: '--brand-via', utility: 'bg-brand-via', kind: 'color' },
      { name: 'brand-to', variable: '--brand-to', utility: 'bg-brand-to', kind: 'color' },
      { name: 'brand-icon', variable: '--brand-icon', utility: 'bg-brand-icon', kind: 'color' }
    ]
  },
  {
    id: 'background',
    title: 'Fundos',
    description: 'Plano de fundo da aplicação e estados dos botões.',
    tokens: [
      { name: 'background', variable: '--bg', utility: 'bg-background', kind: 'color' },
      { name: 'background-button', variable: '--bg-button', utility: 'bg-background-button', kind: 'color' },
      { name: 'background-button-hover', variable: '--bg-button-hover', utility: 'bg-background-button-hover', kind: 'color' }
    ]
  },
  {
    id: 'surfaces',
    title: 'Superfícies',
    description: 'Camadas de conteúdo e elevação.',
    tokens: [
      { name: 'surface', variable: '--surface', utility: 'bg-surface', kind: 'color' },
      { name: 'surface-2', variable: '--surface-2', utility: 'bg-surface-raised', kind: 'color' },
      { name: 'surface-soft', variable: '--surface-soft', utility: 'bg-surface-soft', kind: 'color' },
      { name: 'surface-strong', variable: '--surface-strong', utility: 'bg-surface-strong', kind: 'color' }
    ]
  },
  {
    id: 'foreground',
    title: 'Texto',
    description: 'Cores para conteúdo, ações e mensagens informativas.',
    tokens: [
      { name: 'text', variable: '--text', utility: 'text-foreground', kind: 'color' },
      { name: 'text-muted', variable: '--text-muted', utility: 'text-foreground-muted', kind: 'color' },
      { name: 'text-button', variable: '--text-button', utility: 'text-foreground-button', kind: 'color' },
      { name: 'text-info', variable: '--text-info', utility: 'text-foreground-info', kind: 'color' },
      { name: 'text-button-hover', variable: '--text-button-hover', utility: 'text-foreground-button-hover', kind: 'color' }
    ]
  },
  {
    id: 'borders',
    title: 'Bordas',
    description: 'Contornos, interação e realce.',
    tokens: [
      { name: 'border', variable: '--border', utility: 'border-border', kind: 'color' },
      { name: 'border-hover', variable: '--border-hover', utility: 'border-border-hover', kind: 'color' },
      { name: 'border-shadow', variable: '--border-shadow', utility: 'border-border-shadow', kind: 'color' }
    ]
  },
  {
    id: 'accent',
    title: 'Primária e destaque',
    description: 'Acentos da interface, superfícies suaves e gradientes.',
    tokens: [
      { name: 'primary', variable: '--primary', utility: 'bg-primary', kind: 'color' },
      { name: 'accent-soft-bg', variable: '--accent-soft-bg', utility: 'bg-accent-soft-bg', kind: 'color' },
      { name: 'accent-soft-border', variable: '--accent-soft-border', utility: 'bg-accent-soft-border', kind: 'color' },
      { name: 'accent-gradient-a', variable: '--accent-gradient-a', utility: 'bg-accent-gradient-a', kind: 'color' },
      { name: 'accent-gradient-b', variable: '--accent-gradient-b', utility: 'bg-accent-gradient-b', kind: 'color' }
    ]
  },
  {
    id: 'feedback',
    title: 'Estados',
    description: 'Cores usadas para erros, sucesso e foco.',
    tokens: [
      { name: 'danger-bg', variable: '--danger-bg', utility: 'bg-danger-bg', kind: 'color' },
      { name: 'danger-border', variable: '--danger-border', utility: 'border-danger-border', kind: 'color' },
      { name: 'danger-text', variable: '--danger-text', utility: 'text-danger-text', kind: 'color' },
      { name: 'success-text', variable: '--success-text', utility: 'text-success-text', kind: 'color' },
      { name: 'focus-ring', variable: '--focus-ring', utility: 'ring-focus-ring', kind: 'color' },
      { name: 'focus-ring-offset', variable: '--focus-ring-offset', utility: 'ring-offset-focus-offset', kind: 'color' }
    ]
  },
  {
    id: 'gradients',
    title: 'Gradientes',
    description: 'Tons de apoio para fundos atmosféricos.',
    tokens: [
      { name: 'gradient-1', variable: '--gradient-1', utility: 'bg-gradient-one', kind: 'color' },
      { name: 'gradient-2', variable: '--gradient-2', utility: 'bg-gradient-two', kind: 'color' }
    ]
  },
  {
    id: 'shadows',
    title: 'Sombras',
    description: 'Sombras com tonalidade de marca.',
    tokens: [
      { name: 'shadow-tint', variable: '--shadow-tint', utility: 'shadow-shadow-tint', kind: 'shadow' },
      { name: 'shadow-tint-soft', variable: '--shadow-tint-soft', utility: 'shadow-shadow-tint-soft', kind: 'shadow' }
    ]
  },
  {
    id: 'radii',
    title: 'Arredondamento',
    description: 'Raios consistentes para cartões e controles.',
    tokens: [
      { name: 'radius-card', variable: '--radius-card', utility: 'rounded-card', kind: 'radius' },
      { name: 'radius-control', variable: '--radius-control', utility: 'rounded-control', kind: 'radius' }
    ]
  }
];

const normalizedSearch = computed(() => search.value.trim().toLowerCase());
const visibleGroups = computed(() => {
  if (!normalizedSearch.value) return groups;

  return groups
    .map(group => ({
      ...group,
      tokens: group.tokens.filter(token =>
        `${token.name} ${token.variable} ${token.utility}`.toLowerCase().includes(normalizedSearch.value)
      )
    }))
    .filter(group => group.tokens.length > 0);
});

const tokenCount = computed(() => visibleGroups.value.reduce((total, group) => total + group.tokens.length, 0));

function tokenValue(variable: string) {
  if (!isMounted.value) return '…';
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim() || 'não definido neste tema';
}

function previewStyle(token: DesignToken) {
  if (token.kind === 'radius') {
    return {
      backgroundColor: 'var(--surface-2)',
      border: '1px solid var(--border)',
      borderRadius: `var(${token.variable})`
    };
  }

  if (token.kind === 'shadow') {
    return {
      backgroundColor: 'var(--surface)',
      boxShadow: `0 14px 30px -16px var(${token.variable})`
    };
  }

  return { backgroundColor: `var(${token.variable})` };
}
</script>

<template>
  <main class="ds-page">
    <header class="ds-header">
      <a class="ds-brand" href="#top" aria-label="NovaHub Design System">
        <span class="ds-mark" aria-hidden="true">N</span>
        <span>NovaHub <span class="ds-brand-muted">/ Design System</span></span>
      </a>

      <div class="ds-header-actions">
        <span class="ds-theme-label">{{ themeLabel }} mode</span>
        <button
          class="ds-theme-toggle"
          type="button"
          :aria-label="`Alternar para o tema ${isDark ? 'claro' : 'escuro'}`"
          @click="toggleTheme"
        >
          <span aria-hidden="true">{{ isDark ? '☼' : '☾' }}</span>
          <span>{{ isDark ? 'Claro' : 'Escuro' }}</span>
        </button>
      </div>
    </header>

    <div id="top" class="ds-layout">
      <aside class="ds-sidebar" aria-label="Navegação do design system">
        <p class="ds-sidebar-caption">TOKENS</p>
        <nav>
          <a v-for="group in groups" :key="group.id" :href="`#${group.id}`">
            {{ group.title }}
            <span>{{ group.tokens.length }}</span>
          </a>
        </nav>
        <div class="ds-sidebar-note">
          <span class="ds-live-dot" />
          <span>Sincronizado com as variáveis CSS do projeto</span>
        </div>
      </aside>

      <div class="ds-content">
        <section class="ds-intro">
          <div>
            <p class="ds-eyebrow">BIBLIOTECA DE INTERFACE</p>
            <h1>Design system</h1>
            <p class="ds-description">
              Tokens de cor, superfície e forma do NovaHub, com valores ativos no tema selecionado.
            </p>
          </div>
          <div class="ds-version">
            <span class="ds-live-dot" />
            Tailwind CSS v3
          </div>
        </section>

        <section class="ds-toolbar" aria-label="Controles dos tokens">
          <label class="ds-search">
            <span aria-hidden="true">⌕</span>
            <input v-model="search" type="search" placeholder="Buscar token, variável ou classe..." />
          </label>
          <span class="ds-count">{{ tokenCount }} tokens</span>
        </section>

        <div v-if="visibleGroups.length" class="ds-groups">
          <section v-for="group in visibleGroups" :id="group.id" :key="group.id" class="ds-group">
            <div class="ds-group-heading">
              <div>
                <h2>{{ group.title }}</h2>
                <p>{{ group.description }}</p>
              </div>
              <span class="ds-group-count">{{ group.tokens.length.toString().padStart(2, '0') }}</span>
            </div>

            <div class="ds-token-grid">
              <article v-for="token in group.tokens" :key="token.variable" class="ds-token-card">
                <div class="ds-token-preview">
                  <span class="ds-swatch" :class="`ds-swatch-${token.kind}`" :style="previewStyle(token)" />
                </div>
                <div class="ds-token-details">
                  <code class="ds-token-name">{{ token.name }}</code>
                  <code class="ds-token-value">{{ tokenValue(token.variable) }}</code>
                  <div class="ds-token-meta">
                    <code>{{ token.variable }}</code>
                    <code class="ds-utility">{{ token.utility }}</code>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>

        <div v-else class="ds-empty">
          <span aria-hidden="true">⌕</span>
          <h2>Nenhum token encontrado</h2>
          <p>Tente buscar por outro nome, variável CSS ou classe Tailwind.</p>
        </div>

        <footer class="ds-footer">
          <span>NovaHub Design System</span>
          <span>Variáveis CSS · Tailwind CSS v3</span>
        </footer>
      </div>
    </div>
  </main>
</template>

<style scoped>
.ds-page {
  min-height: 100vh;
  color: var(--text);
}

.ds-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  min-height: 4.25rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
  background: var(--surface-strong);
  padding: .75rem 2rem;
  backdrop-filter: blur(16px);
}

.ds-brand,
.ds-header-actions,
.ds-theme-toggle,
.ds-version,
.ds-sidebar-note,
.ds-token-meta,
.ds-footer {
  display: flex;
  align-items: center;
}

.ds-brand {
  gap: .7rem;
  color: var(--text);
  font-size: .9rem;
  font-weight: 750;
  text-decoration: none;
}

.ds-mark {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border-radius: .7rem;
  background: linear-gradient(135deg, var(--brand-from), var(--brand-via));
  color: var(--brand-icon);
  font-size: 1rem;
  font-weight: 900;
}

.ds-brand-muted,
.ds-theme-label {
  color: var(--text-muted);
  font-weight: 500;
}

.ds-header-actions {
  gap: 1rem;
}

.ds-theme-label {
  font-size: .8rem;
}

.ds-theme-toggle {
  min-height: 2.35rem;
  gap: .5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-control);
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
  padding: .4rem .75rem;
  font: inherit;
  font-size: .8rem;
  transition: border-color 160ms ease, background-color 160ms ease;
}

.ds-theme-toggle:hover {
  border-color: var(--border-hover);
}

.ds-layout {
  display: grid;
  grid-template-columns: 15rem minmax(0, 1fr);
  max-width: 1600px;
  min-height: calc(100vh - 4.25rem);
  margin: 0 auto;
}

.ds-sidebar {
  position: sticky;
  top: 4.25rem;
  align-self: start;
  height: calc(100vh - 4.25rem);
  overflow-y: auto;
  border-right: 1px solid var(--border);
  padding: 2rem 1rem;
}

.ds-sidebar-caption,
.ds-eyebrow {
  color: var(--text-muted);
  font-size: .68rem;
  font-weight: 800;
  letter-spacing: .14em;
}

.ds-sidebar-caption {
  margin: 0 0 .9rem .75rem;
}

.ds-sidebar nav {
  display: grid;
  gap: .2rem;
}

.ds-sidebar nav a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: .65rem;
  color: var(--text-muted);
  padding: .65rem .75rem;
  font-size: .82rem;
  text-decoration: none;
  transition: background-color 140ms ease, color 140ms ease;
}

.ds-sidebar nav a:hover,
.ds-sidebar nav a:focus-visible {
  background: var(--accent-soft-bg);
  color: var(--text);
}

.ds-sidebar nav a span {
  color: var(--text-muted);
  font-size: .7rem;
}

.ds-sidebar-note {
  align-items: flex-start;
  gap: .6rem;
  margin: 2rem .75rem 0;
  color: var(--text-muted);
  font-size: .72rem;
  line-height: 1.5;
}

.ds-live-dot {
  flex: 0 0 auto;
  width: .45rem;
  height: .45rem;
  margin-top: .25rem;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 12px var(--shadow-tint);
}

.ds-content {
  min-width: 0;
  padding: 2.5rem clamp(1.25rem, 4vw, 3.75rem);
}

.ds-intro,
.ds-group-heading,
.ds-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ds-intro {
  gap: 2rem;
  margin: 0 0 2rem;
}

.ds-eyebrow {
  margin: 0 0 .65rem;
  color: var(--primary);
}

.ds-intro h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 750;
  letter-spacing: -.045em;
}

.ds-description {
  max-width: 38rem;
  margin: .75rem 0 0;
  color: var(--text-muted);
  font-size: .92rem;
  line-height: 1.65;
}

.ds-version {
  flex: 0 0 auto;
  gap: .55rem;
  border: 1px solid var(--accent-soft-border);
  border-radius: 999px;
  background: var(--accent-soft-bg);
  color: var(--text-info);
  padding: .5rem .8rem;
  font-size: .75rem;
  font-weight: 650;
}

.ds-version .ds-live-dot {
  margin: 0;
}

.ds-toolbar {
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.ds-search {
  display: flex;
  width: min(100%, 34rem);
  min-height: 2.8rem;
  align-items: center;
  gap: .7rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-control);
  background: var(--surface-soft);
  color: var(--text-muted);
  padding: 0 .8rem;
}

.ds-search:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--accent-soft-bg);
}

.ds-search > span {
  font-size: 1.2rem;
}

.ds-search input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--text);
  font: inherit;
  font-size: .82rem;
}

.ds-search input::placeholder {
  color: var(--text-muted);
}

.ds-search kbd {
  border: 1px solid var(--border);
  border-radius: .3rem;
  padding: .1rem .35rem;
  font-size: .72rem;
}

.ds-count,
.ds-group-count {
  color: var(--text-muted);
  font-size: .75rem;
  white-space: nowrap;
}

.ds-group {
  scroll-margin-top: 6.5rem;
  margin-bottom: 2.5rem;
}

.ds-group-heading {
  margin-bottom: 1rem;
}

.ds-group-heading h2 {
  margin: 0;
  font-size: 1.08rem;
  font-weight: 700;
  letter-spacing: -.015em;
}

.ds-group-heading p {
  margin: .35rem 0 0;
  color: var(--text-muted);
  font-size: .78rem;
}

.ds-group-count {
  border: 1px solid var(--border);
  border-radius: .5rem;
  padding: .3rem .5rem;
  font-variant-numeric: tabular-nums;
}

.ds-token-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
  gap: .85rem;
}

.ds-token-card {
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  background: color-mix(in srgb, var(--surface) 92%, transparent);
  transition: border-color 160ms ease, transform 160ms ease;
}

.ds-token-card:hover {
  transform: translateY(-2px);
  border-color: var(--border-hover);
}

.ds-token-preview {
  display: grid;
  min-height: 6.5rem;
  place-items: center;
  border-bottom: 1px solid var(--border);
  background-color: var(--surface-soft);
  background-image: linear-gradient(45deg, var(--border) 25%, transparent 25%), linear-gradient(-45deg, var(--border) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--border) 75%), linear-gradient(-45deg, transparent 75%, var(--border) 75%);
  background-position: 0 0, 0 .35rem, .35rem -.35rem, -.35rem 0;
  background-size: .7rem .7rem;
}

.ds-swatch {
  display: block;
  width: 4rem;
  height: 4rem;
  border: 1px solid var(--border);
  box-shadow: 0 3px 12px var(--shadow-tint-soft);
}

.ds-swatch-color {
  border-radius: .85rem;
}

.ds-swatch-radius {
  width: 5rem;
  height: 3rem;
}

.ds-swatch-shadow {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: .9rem;
}

.ds-token-details {
  display: grid;
  gap: .5rem;
  padding: .85rem .9rem 1rem;
}

.ds-token-name {
  overflow: hidden;
  color: var(--text);
  font-size: .82rem;
  font-weight: 700;
  text-overflow: ellipsis;
}

.ds-token-value,
.ds-token-meta code {
  overflow: hidden;
  color: var(--text-muted);
  font-size: .7rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ds-token-meta {
  justify-content: space-between;
  gap: .5rem;
  border-top: 1px solid var(--border);
  padding-top: .55rem;
}

.ds-token-meta .ds-utility {
  color: var(--text-info);
}

.ds-empty {
  display: grid;
  min-height: 18rem;
  align-content: center;
  justify-items: center;
  color: var(--text-muted);
  text-align: center;
}

.ds-empty > span {
  color: var(--primary);
  font-size: 2rem;
}

.ds-empty h2 {
  margin: .75rem 0 .25rem;
  color: var(--text);
  font-size: 1.1rem;
}

.ds-empty p {
  margin: 0;
  font-size: .82rem;
}

.ds-footer {
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  padding: 1.25rem 0 .5rem;
  font-size: .72rem;
}

@media (max-width: 760px) {
  .ds-header {
    padding-right: 1rem;
    padding-left: 1rem;
  }

  .ds-layout {
    display: block;
  }

  .ds-sidebar {
    position: static;
    height: auto;
    border-right: 0;
    border-bottom: 1px solid var(--border);
    padding: .75rem 1rem;
  }

  .ds-sidebar-caption,
  .ds-sidebar-note {
    display: none;
  }

  .ds-sidebar nav {
    display: flex;
    gap: .35rem;
    overflow-x: auto;
  }

  .ds-sidebar nav a {
    flex: 0 0 auto;
    gap: .45rem;
    padding: .5rem .65rem;
    font-size: .74rem;
  }

  .ds-content {
    padding-top: 1.75rem;
  }
}

@media (max-width: 520px) {
  .ds-header {
    min-height: 3.75rem;
  }

  .ds-brand {
    gap: .5rem;
    font-size: .78rem;
  }

  .ds-brand-muted,
  .ds-theme-label {
    display: none;
  }

  .ds-mark {
    width: 1.8rem;
    height: 1.8rem;
  }

  .ds-theme-toggle {
    min-height: 2.1rem;
    padding: .3rem .55rem;
  }

  .ds-intro {
    align-items: flex-start;
    flex-direction: column;
    gap: 1rem;
  }

  .ds-description {
    font-size: .84rem;
  }

  .ds-toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .ds-search {
    width: 100%;
  }

  .ds-footer {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
