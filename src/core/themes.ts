/**
 * themes.ts — 5 built-in presentation themes. Each theme is a flat map of
 * CSS custom properties consumed by every component via `var(--c-*)`.
 *
 * Palette: warm paper backgrounds, ink text, one quiet accent per theme.
 */

export interface Theme {
  id: string;
  name: string;
  desc: string;
  swatch: [string, string, string];
  dark: boolean;
  vars: Record<string, string>;
}

const SHARED_KEYS = [
  "--c-bg", "--c-bg2", "--c-body", "--c-body2", "--c-panel", "--c-panel-edge",
  "--c-display-bg", "--c-display-bg2", "--c-display-edge", "--c-text",
  "--c-text-dim", "--c-accent", "--c-accent2", "--c-btn", "--c-btn-edge",
  "--c-btn-text", "--c-fn", "--c-fn-text", "--c-op", "--c-op-text",
  "--c-eq", "--c-eq-text", "--c-shift", "--c-alpha", "--c-border",
  "--c-soft", "--c-soft2", "--c-card-border", "--c-ring",
  "--c-display-text", "--c-display-text-dim",
];

export const THEMES: Theme[] = [
  {
    id: "hardware",
    name: "Study Paper",
    desc: "Warm paper page with deep ink-blue accents and a soft amber secondary",
    swatch: ["#FAFAF7", "#FFFFFF", "#14337A"],
    dark: false,
    vars: {
      "--c-bg": "#FAFAF7",
      "--c-bg2": "#F4F1EA",
      "--c-body": "#FFFFFF",
      "--c-body2": "#F7F5F0",
      "--c-panel": "#FFFFFF",
      "--c-panel-edge": "#E7E3DA",
      "--c-display-bg": "#F7F5F0",
      "--c-display-bg2": "#EFEBE2",
      "--c-display-edge": "#E0DCD1",
      "--c-text": "#1C1917",
      "--c-text-dim": "#6E685F",
      "--c-display-text": "#1C1917",
      "--c-display-text-dim": "#8A8378",
      "--c-accent": "#14337A",
      "--c-accent2": "#C47F17",
      "--c-btn": "#FFFFFF",
      "--c-btn-edge": "#E0DCD1",
      "--c-btn-text": "#1C1917",
      "--c-fn": "#F4F1EA",
      "--c-fn-text": "#1C1917",
      "--c-op": "#ECE7DC",
      "--c-op-text": "#1C1917",
      "--c-eq": "#14337A",
      "--c-eq-text": "#FFFFFF",
      "--c-shift": "#C47F17",
      "--c-alpha": "#B45309",
      "--c-border": "#E7E3DA",
      "--c-soft": "#FFFFFF",
      "--c-soft2": "#F4F1EA",
      "--c-card-border": "#E7E3DA",
      "--c-ring": "#14337A",
    },
  },
  {
    id: "midnight",
    name: "Ink & Slate",
    desc: "Quiet slate paper with navy ink typography and a muted bronze accent",
    swatch: ["#F3F4F2", "#E9EBE8", "#334155"],
    dark: false,
    vars: {
      "--c-bg": "#F3F4F2",
      "--c-bg2": "#E9EBE8",
      "--c-body": "#FFFFFF",
      "--c-body2": "#EEF0ED",
      "--c-panel": "#FFFFFF",
      "--c-panel-edge": "#D8DCD6",
      "--c-display-bg": "#EEF0ED",
      "--c-display-bg2": "#E3E6E2",
      "--c-display-edge": "#D2D7D0",
      "--c-text": "#1F2A37",
      "--c-text-dim": "#5C6B7A",
      "--c-display-text": "#1F2A37",
      "--c-display-text-dim": "#74808D",
      "--c-accent": "#334155",
      "--c-accent2": "#9A7B4F",
      "--c-btn": "#FFFFFF",
      "--c-btn-edge": "#D8DCD6",
      "--c-btn-text": "#1F2A37",
      "--c-fn": "#E9EBE8",
      "--c-fn-text": "#1F2A37",
      "--c-op": "#E1E5E0",
      "--c-op-text": "#1F2A37",
      "--c-eq": "#334155",
      "--c-eq-text": "#FFFFFF",
      "--c-shift": "#9A7B4F",
      "--c-alpha": "#B45309",
      "--c-border": "#D8DCD6",
      "--c-soft": "#FFFFFF",
      "--c-soft2": "#E9EBE8",
      "--c-card-border": "#D8DCD6",
      "--c-ring": "#334155",
    },
  },
  {
    id: "rose",
    name: "Blush Paper",
    desc: "Warm rosy-tinted paper with deep burgundy ink and cream cards",
    swatch: ["#FBF6F4", "#FFFFFF", "#7A4A3F"],
    dark: false,
    vars: {
      "--c-bg": "#FBF6F4",
      "--c-bg2": "#F6EBE7",
      "--c-body": "#FFFFFF",
      "--c-body2": "#FAF3F0",
      "--c-panel": "#FFFFFF",
      "--c-panel-edge": "#EADADA",
      "--c-display-bg": "#FAF3F0",
      "--c-display-bg2": "#F3E3DF",
      "--c-display-edge": "#E6D2CD",
      "--c-text": "#3A2320",
      "--c-text-dim": "#8A6A64",
      "--c-display-text": "#3A2320",
      "--c-display-text-dim": "#9B7A72",
      "--c-accent": "#7A4A3F",
      "--c-accent2": "#B0702A",
      "--c-btn": "#FFFFFF",
      "--c-btn-edge": "#EADADA",
      "--c-btn-text": "#3A2320",
      "--c-fn": "#F6EBE7",
      "--c-fn-text": "#3A2320",
      "--c-op": "#F0E2DD",
      "--c-op-text": "#3A2320",
      "--c-eq": "#7A4A3F",
      "--c-eq-text": "#FFFFFF",
      "--c-shift": "#B0702A",
      "--c-alpha": "#A13A30",
      "--c-border": "#EADADA",
      "--c-soft": "#FFFFFF",
      "--c-soft2": "#F6EBE7",
      "--c-card-border": "#EADADA",
      "--c-ring": "#7A4A3F",
    },
  },
  {
    id: "mint",
    name: "Sage Paper",
    desc: "Pale sage paper with deep forest green ink and cream cards",
    swatch: ["#F6F8F3", "#FFFFFF", "#2F5D46"],
    dark: false,
    vars: {
      "--c-bg": "#F6F8F3",
      "--c-bg2": "#EAEFE6",
      "--c-body": "#FFFFFF",
      "--c-body2": "#F3F6EF",
      "--c-panel": "#FFFFFF",
      "--c-panel-edge": "#DCE4D8",
      "--c-display-bg": "#F3F6EF",
      "--c-display-bg2": "#E6ECE2",
      "--c-display-edge": "#D4DECD",
      "--c-text": "#22332A",
      "--c-text-dim": "#66766C",
      "--c-display-text": "#22332A",
      "--c-display-text-dim": "#7C8A80",
      "--c-accent": "#2F5D46",
      "--c-accent2": "#9A7B4F",
      "--c-btn": "#FFFFFF",
      "--c-btn-edge": "#DCE4D8",
      "--c-btn-text": "#22332A",
      "--c-fn": "#EAEFE6",
      "--c-fn-text": "#22332A",
      "--c-op": "#E1E8DC",
      "--c-op-text": "#22332A",
      "--c-eq": "#2F5D46",
      "--c-eq-text": "#FFFFFF",
      "--c-shift": "#9A7B4F",
      "--c-alpha": "#A13A30",
      "--c-border": "#DCE4D8",
      "--c-soft": "#FFFFFF",
      "--c-soft2": "#EAEFE6",
      "--c-card-border": "#DCE4D8",
      "--c-ring": "#2F5D46",
    },
  },
  {
    id: "highcontrast",
    name: "Sepia Ink",
    desc: "High-contrast warm ivory with near-black ink for low-light or long study sessions",
    swatch: ["#F5F1E8", "#1C1917", "#FFFFFF"],
    dark: false,
    vars: {
      "--c-bg": "#F5F1E8",
      "--c-bg2": "#E9E4D8",
      "--c-body": "#FCFAF5",
      "--c-body2": "#F0EBE0",
      "--c-panel": "#FCFAF5",
      "--c-panel-edge": "#D2CABB",
      "--c-display-bg": "#EAE5D9",
      "--c-display-bg2": "#DDD6C8",
      "--c-display-edge": "#C9C0AF",
      "--c-text": "#141210",
      "--c-text-dim": "#3F3A33",
      "--c-display-text": "#141210",
      "--c-display-text-dim": "#544D43",
      "--c-accent": "#141210",
      "--c-accent2": "#9A7B4F",
      "--c-btn": "#FCFAF5",
      "--c-btn-edge": "#A9A08C",
      "--c-btn-text": "#141210",
      "--c-fn": "#E9E4D8",
      "--c-fn-text": "#141210",
      "--c-op": "#DED7C9",
      "--c-op-text": "#141210",
      "--c-eq": "#141210",
      "--c-eq-text": "#FCFAF5",
      "--c-shift": "#9A7B4F",
      "--c-alpha": "#9C3B2E",
      "--c-border": "#A9A08C",
      "--c-soft": "#FCFAF5",
      "--c-soft2": "#E9E4D8",
      "--c-card-border": "#A9A08C",
      "--c-ring": "#141210",
    },
  },
];

export function themeById(id: string): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

export function themeVars(theme: Theme): React.CSSProperties {
  const v: Record<string, string> = {};
  for (const k of SHARED_KEYS) {
    v[k] = theme.vars[k] ?? (
      k === "--c-display-text" ? theme.vars["--c-text"] :
      k === "--c-display-text-dim" ? theme.vars["--c-text-dim"] :
      ""
    );
  }
  return v as React.CSSProperties;
}

export { SHARED_KEYS };