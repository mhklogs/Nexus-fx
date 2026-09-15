# NEXUS fx

A faithful, polished recreation of the **Casio fx-570ES PLUS (2nd Edition)** scientific
calculator — rebuilt as a modern web app with a Natural-V.P.A.M. display, five presentation
themes, and a full suite of engineering/maths workspaces.

Fully client-side and works offline once loaded: no analytics, no tracking, no sign-up.

## Features

- **Calculator** — natural two-line display with stacked fractions, radicals, superscripts,
  a blinking caret, SHIFT/ALPHA key functions, scroll-back history, Ans memory, live preview
  and DEG/RAD angle modes.
- **300+ offline formulas** (Physics · Chemistry · Mathematics · Statistics) with derivations,
  one-click "paste into calculator".
- **Scientific constants** (c, G, h, e, Avogadro, …) and an **SI unit converter**
  (distance, mass, volume, pressure, temperature).
- **Matrix Studio** — determinant, inverse, adjoint, transpose, trace, A·B, A±B (1×1 … 4×4),
  fraction output.
- **Probability & Statistics** — descriptive stats, nCr/nPr, Binomial / Poisson / Normal
  distributions.
- **Formula Compiler** — write a formula, bind variable values live, save up to 24 snippets
  to localStorage.
- **NEXUS AI Tutor** (optional) — Gemini-powered chat with image/audio/PDF attachments and
  auto-generated 5-question quizzes.

## Getting started

```bash
npm install
npm run dev        # local dev server
npm run build      # production build (dist/index.html)
npm run preview    # preview the production build
```

### Enabling the AI Tutor / quiz (optional)

Create `.env.local` in the project root:

```
VITE_GEMINI_API_KEY=your_gemini_api_key
```

> Without a key the app still runs fully — the calculator and every workspace work normally
> and the AI Tutor shows a graceful "offline" notice instead of crashing.

## Tech

React 19 · TypeScript · Tailwind CSS 4 · Vite · single-file build (`vite-plugin-singlefile`)
· PWA (service worker + manifest) · `@google/genai` for the optional AI tutor.