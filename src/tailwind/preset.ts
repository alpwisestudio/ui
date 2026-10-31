// Alpwise UI — preset Tailwind v3. Stessa mappa di alpwise-portfolio/tailwind.config.ts:
// ogni valore punta alle variabili CSS di tokens.css, mai a valori duplicati.
// Tuple esplicite: senza, TypeScript inferisce array e il preset non soddisfa `Config` di tailwindcss.
type FontSize = [size: string, config: { lineHeight: string; letterSpacing?: string; fontWeight?: string }];
const darkMode: ['selector', string] = ['selector', '[data-theme="dark"]'];

const preset = {
  darkMode,
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: { DEFAULT: 'var(--surface)', raised: 'var(--surface-raised)', sunken: 'var(--surface-sunken)' },
        line: { DEFAULT: 'var(--line)', grid: 'var(--line-grid)', strong: 'var(--line-strong)' },
        ink: { DEFAULT: 'var(--text)', muted: 'var(--text-muted)', subtle: 'var(--text-subtle)' },
        primary: { DEFAULT: 'var(--primary)', hover: 'var(--primary-hover)', soft: 'var(--primary-soft)', fg: 'var(--on-primary)' },
        inverse: { DEFAULT: 'var(--inverse)', fg: 'var(--on-inverse)' },
        sky: { 100: 'var(--sky-100)', 200: 'var(--sky-200)', 400: 'var(--sky-400)', 500: 'var(--sky-500)', 600: 'var(--sky-600)', 700: 'var(--sky-700)', 800: 'var(--sky-800)' },
        mist: 'var(--mist)',
        link: 'var(--link)',
        focus: 'var(--focus)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      fontSize: <Record<string, FontSize>>{
        'display-xl': ['104px', { lineHeight: '100px', letterSpacing: '-0.045em', fontWeight: '400' }],
        'display-lg': ['72px', { lineHeight: '72px', letterSpacing: '-0.04em', fontWeight: '400' }],
        h1: ['52px', { lineHeight: '56px', letterSpacing: '-0.035em', fontWeight: '400' }],
        h2: ['36px', { lineHeight: '40px', letterSpacing: '-0.025em', fontWeight: '400' }],
        h3: ['24px', { lineHeight: '30px', letterSpacing: '-0.015em', fontWeight: '400' }],
        h4: ['18px', { lineHeight: '24px', letterSpacing: '-0.01em', fontWeight: '500' }],
        lead: ['20px', { lineHeight: '30px', fontWeight: '300' }],
        body: ['16px', { lineHeight: '26px' }],
        'body-sm': ['14px', { lineHeight: '22px' }],
        label: ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'mono-label': ['11px', { lineHeight: '16px', letterSpacing: '0.04em' }],
        'mono-sm': ['12px', { lineHeight: '18px' }],
        'mono-data': ['14px', { lineHeight: '20px' }],
      },
      borderRadius: { none: 'var(--radius-none)', xs: 'var(--radius-xs)', sm: 'var(--radius-sm)' },
      maxWidth: { container: 'var(--container-max)' },
      boxShadow: { overlay: 'var(--shadow-overlay)' },
      backgroundImage: { horizon: 'var(--horizon)' },
      zIndex: { nav: 'var(--z-nav)', modal: 'var(--z-modal)', toast: 'var(--z-toast)' },
      transitionDuration: { fast: 'var(--motion-fast)', base: 'var(--motion-base)', slow: 'var(--motion-slow)', epic: 'var(--motion-epic)' },
      transitionTimingFunction: { out: 'var(--ease-out)', 'in-out': 'var(--ease-in-out)' },
    },
  },
};

export default preset;
