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
    id: "paper",
    name: "Study Paper",
    desc: "Cream paper, ink text and a single ink-blue accent",
    swatch: ["#F9F8F6", "#FFFFFF", "#14337A"],
    dark: false,
    vars: {
      "--c-bg": "#F9F8F6",
      "--c-bg2": "#F2F0EC",
      "--c-body": "#FFFFFF",
      "--c-body2": "#F9F8F6",
      "--c-panel": "#FFFFFF",
      "--c-panel-edge": "#E5E0D6",
      "--c-display-bg": "#F2F0EC",
      "--c-display-bg2": "#F2F0EC",
      "--c-display-edge": "#E5E0D6",
      "--c-text": "#1A1A1A",
      "--c-text-dim": "#57534E",
      "--c-display-text": "#1A1A1A",
      "--c-display-text-dim": "#8A8578",
      "--c-accent": "#14337A",
      "--c-accent2": "#3B5BA5",
      "--c-btn": "#FFFFFF",
      "--c-btn-edge": "#E5E0D6",
      "--c-btn-text": "#1A1A1A",
      "--c-fn": "#F2F0EC",
      "--c-fn-text": "#1A1A1A",
      "--c-op": "#EDEAE3",
      "--c-op-text": "#1A1A1A",
      "--c-eq": "#1A1A1A",
      "--c-eq-text": "#F9F8F6",
      "--c-shift": "#3B5BA5",
      "--c-alpha": "#8A8578",
      "--c-border": "#E5E0D6",
      "--c-soft": "#FFFFFF",
      "--c-soft2": "#F2F0EC",
      "--c-card-border": "#E5E0D6",
      "--c-ring": "#14337A",
    },
  },
  {
    id: "ink",
    name: "Ink",
    desc: "Deep ink-green page with cream text and a lifted ink-blue accent",
    swatch: ["#0B1210", "#15201D", "#3B5BA5"],
    dark: true,
    vars: {
      "--c-bg": "#0B1210",
      "--c-bg2": "#15201D",
      "--c-body": "#15201D",
      "--c-body2": "#0F1715",
      "--c-panel": "#15201D",
      "--c-panel-edge": "#26332F",
      "--c-display-bg": "#0F1715",
      "--c-display-bg2": "#0F1715",
      "--c-display-edge": "#26332F",
      "--c-text": "#F3F6F5",
      "--c-text-dim": "#C3CFCB",
      "--c-display-text": "#F3F6F5",
      "--c-display-text-dim": "#8A9893",
      "--c-accent": "#3B5BA5",
      "--c-accent2": "#5B7BC5",
      "--c-btn": "#15201D",
      "--c-btn-edge": "#26332F",
      "--c-btn-text": "#F3F6F5",
      "--c-fn": "#1A2623",
      "--c-fn-text": "#F3F6F5",
      "--c-op": "#1A2623",
      "--c-op-text": "#F3F6F5",
      "--c-eq": "#3B5BA5",
      "--c-eq-text": "#0B1210",
      "--c-shift": "#5B7BC5",
      "--c-alpha": "#8A9893",
      "--c-border": "#26332F",
      "--c-soft": "#15201D",
      "--c-soft2": "#1A2623",
      "--c-card-border": "#26332F",
      "--c-ring": "#3B5BA5",
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
