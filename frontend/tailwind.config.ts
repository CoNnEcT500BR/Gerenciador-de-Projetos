export default {
  darkMode: 'class',

  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}'
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          from: 'var(--brand-from)',
          via: 'var(--brand-via)',
          to: 'var(--brand-to)',
          icon: 'var(--brand-icon)'
        },
        background: {
          DEFAULT: 'var(--bg)',
          button: 'var(--bg-button)',
          'button-hover': 'var(--bg-button-hover)'
        },
        surface: {
          DEFAULT: 'var(--surface)',
          raised: 'var(--surface-2)',
          soft: 'var(--surface-soft)',
          strong: 'var(--surface-strong)'
        },
        foreground: {
          DEFAULT: 'var(--text)',
          muted: 'var(--text-muted)',
          button: 'var(--text-button)',
          info: 'var(--text-info)',
          'button-hover': 'var(--text-button-hover)'
        },
        border: {
          DEFAULT: 'var(--border)',
          hover: 'var(--border-hover)',
          shadow: 'var(--border-shadow)'
        },
        primary: 'var(--primary)',
        accent: {
          'soft-bg': 'var(--accent-soft-bg)',
          'soft-border': 'var(--accent-soft-border)',
          'gradient-a': 'var(--accent-gradient-a)',
          'gradient-b': 'var(--accent-gradient-b)'
        },
        danger: {
          bg: 'var(--danger-bg)',
          border: 'var(--danger-border)',
          text: 'var(--danger-text)'
        },
        success: {
          text: 'var(--success-text)'
        },
        focus: {
          ring: 'var(--focus-ring)',
          offset: 'var(--focus-ring-offset)'
        },
        gradient: {
          one: 'var(--gradient-1)',
          two: 'var(--gradient-2)'
        },
        shadow: {
          tint: 'var(--shadow-tint)',
          'tint-soft': 'var(--shadow-tint-soft)'
        }
      },
      borderRadius: {
        card: 'var(--radius-card)',
        control: 'var(--radius-control)'
      },
      boxShadow: {
        tint: '0 18px 40px -28px var(--shadow-tint)',
        'tint-soft': '0 18px 40px -28px var(--shadow-tint-soft)'
      }
    }
  },

  plugins: []
}
