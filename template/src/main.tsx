import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { config } from './content/site.ts'

/**
 * ThemeProvider
 *
 * Applies CSS variables from site.config.json onto :root so every component
 * can reference var(--pm-accent), var(--pm-background), etc. without knowing
 * the exact hex values at write time.
 *
 * Also handles font loading:
 *  - source:"google" -> injects a <link> to Google Fonts for heading+body.
 *  - source:"byo"    -> injects @font-face rules for each file in fonts.files,
 *                       pointing at /public/fonts/<filename>.
 *
 * Runs once on mount (the config is static at build time).
 */
function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;

    // ── Theme colors ─────────────────────────────────────────────────────
    root.style.setProperty('--pm-accent', config.theme.accent);
    if (config.theme.background) {
      root.style.setProperty('--pm-background', config.theme.background);
    }
    if (config.theme.ink) {
      root.style.setProperty('--pm-ink', config.theme.ink);
    }

    // ── Font CSS variables ────────────────────────────────────────────────
    // heading font
    const headingStack = `"${config.fonts.heading}", Georgia, serif`;
    root.style.setProperty('--pm-font-display', headingStack);

    // body font
    const bodyStack = `"${config.fonts.body}", system-ui, sans-serif`;
    root.style.setProperty('--pm-font-sans', bodyStack);
    // Also update <body> directly since it was set before JS ran
    document.body.style.fontFamily = bodyStack;

    // ── Font loading ──────────────────────────────────────────────────────
    if (config.fonts.source === 'google') {
      injectGoogleFonts(config.fonts.heading, config.fonts.body);
    } else if (config.fonts.source === 'byo' && config.fonts.files) {
      injectBYOFonts(config.fonts.files);
    }
  }, []);

  return <>{children}</>;
}

/**
 * Inject a Google Fonts <link> for the heading and body families.
 * Builds a single combined URL to minimise round-trips.
 */
function injectGoogleFonts(heading: string, body: string) {
  const families = [heading, body]
    .filter((f, i, a) => a.indexOf(f) === i) // dedupe
    .map((f) => encodeURIComponent(f));

  const familyParams = families
    .map((f) => `family=${f}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500`)
    .join('&');

  const href = `https://fonts.googleapis.com/css2?${familyParams}&display=swap`;

  // Preconnect (idempotent)
  upsertLink({ rel: 'preconnect', href: 'https://fonts.googleapis.com' });
  upsertLink({ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' });

  // Stylesheet
  upsertLink({ rel: 'stylesheet', href, id: 'pm-google-fonts' });
}

/**
 * Inject @font-face rules for BYO fonts.
 * Files are expected in /public/fonts/<filename>.
 */
function injectBYOFonts(files: { family: string; file: string; weight?: string }[]) {
  const styleId = 'pm-byo-fonts';
  if (document.getElementById(styleId)) return;

  const css = files
    .map(({ family, file, weight = '400' }) => {
      const src = `/fonts/${file}`;
      return `@font-face {
  font-family: "${family}";
  src: url("${src}") format("woff2");
  font-weight: ${weight};
  font-display: swap;
}`;
    })
    .join('\n\n');

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = css;
  document.head.appendChild(style);
}

/** Create or update a <link> element idempotently. */
function upsertLink(attrs: { rel: string; href: string; id?: string; crossOrigin?: string }) {
  const selector = attrs.id
    ? `#${attrs.id}`
    : `link[rel="${attrs.rel}"][href="${attrs.href}"]`;

  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    if (attrs.id) el.id = attrs.id;
    document.head.appendChild(el);
  }
  el.rel = attrs.rel;
  el.href = attrs.href;
  if (attrs.crossOrigin !== undefined) el.crossOrigin = attrs.crossOrigin;
}

/**
 * Also inject JetBrains Mono (always needed for the UI chrome)
 * alongside whatever heading/body fonts the config specifies.
 */
function injectMonoFont() {
  upsertLink({
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
  });
  upsertLink({
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  });
  upsertLink({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap',
    id: 'pm-mono-font',
  });
}

// Inject mono font immediately (before React mounts) so it's always available
injectMonoFont();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
