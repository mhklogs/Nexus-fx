# Nexus-fx — Architecture Summary

> Generated from static analysis on 2026-09-28.

## Components

| Layer | Present | Evidence |
| --- | --- | --- |
| Presentation / UI | yes | 0 route module(s), 9 component file(s) |
| API / server | no | 0 handler(s), entrypoints: none |
| Domain / business logic | unclear | no dedicated layer detected |
| Persistence | no | no database client |
| Authentication | no | none detected |

## Detected frameworks and libraries

| Package | Purpose (inferred) |
| --- | --- |
| `@google/genai` | dependency |
| `@tailwindcss/vite` | dependency |
| `@types/node` | dependency |
| `@types/react` | dependency |
| `@types/react-dom` | dependency |
| `@vitejs/plugin-react` | dependency |
| `clsx` | dependency |
| `lucide-react` | dependency |
| `react` | React |
| `react-dom` | React |
| `tailwind-merge` | dependency |
| `tailwindcss` | Tailwind CSS |
| `typescript` | dependency |
| `vite` | Vite |
| `vite-plugin-singlefile` | dependency |

## Runtime and delivery

| Concern | Finding |
| --- | --- |
| Language mix | TypeScript, HTML, CSS, JavaScript |
| Package manager | npm |
| Container | none |
| Serverless / PaaS | not configured for Vercel |
| CI | none detected |
| Tests | **none detected** |
| Type safety | TypeScript |

## Environment variables referenced

_None referenced._
