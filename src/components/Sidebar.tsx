/**
 * Sidebar.tsx — sliding drawer navigation. Hosts the workspace module list
 * and the Appearance engine (5 built-in presentation themes).
 */

import React from "react";
import { cn } from "@/utils/cn";
import { THEMES } from "@/core/themes";
import {
  Calculator,
  Grid3X3,
  Sigma,
  Brackets,
  Library,
  GraduationCap,
} from "lucide-react";

export type ModuleId = "home" | "matrix" | "stats" | "formula" | "hub" | "tutor";

interface NavItem {
  id: ModuleId;
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV: NavItem[] = [
  { id: "home", label: "Calculator", desc: "fx-570ES PLUS shell", icon: Calculator },
  { id: "matrix", label: "Matrix Studio", desc: "Determinant · Inverse · Adjoint", icon: Grid3X3 },
  { id: "stats", label: "Probability & Statistics", desc: "Distributions · nPr · nCr", icon: Sigma },
  { id: "formula", label: "Formula Compiler", desc: "Custom variable formulas", icon: Brackets },
  { id: "hub", label: "Formula & Constants Hub", desc: "Physics · Chem · Maths · SI", icon: Library },
  { id: "tutor", label: "NEXUS AI Tutor", desc: "Interactive math help & quizzes", icon: GraduationCap },
];

export function Sidebar({
  open,
  active,
  onSelect,
  onClose,
  themeId,
  onTheme,
}: {
  open: boolean;
  active: ModuleId;
  onSelect: (m: ModuleId) => void;
  onClose: () => void;
  themeId: string;
  onTheme: (id: string) => void;
}) {
  return (
    <>
      {/* overlay */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* drawer */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-[86%] max-w-[340px] flex-col border-r border-[var(--c-card-border)] shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        style={{
          background: "linear-gradient(180deg, var(--c-soft), var(--c-bg2))",
        }}
      >
        {/* brand header */}
        <div className="flex items-center gap-3 border-b border-[var(--c-card-border)] p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-lime-400/40 bg-black shadow-[0_0_18px_rgba(57,255,20,0.35)]">
            <span className="text-lg font-black text-lime-400">∑</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold text-[var(--c-text)]">NEXUS fx</div>
            <div className="text-[0.65rem] text-[var(--c-text-dim)]">
              Engineering Workspace
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-auto rounded-lg p-1.5 text-[var(--c-text-dim)] hover:bg-[var(--c-soft2)] hover:text-[var(--c-text)]"
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          <div className="px-2 pb-1 pt-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--c-text-dim)]">
            Workspaces
          </div>
          {NAV.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition",
                  isActive
                    ? "border-[var(--c-accent)] bg-[var(--c-accent)]/10"
                    : "border-transparent hover:border-[var(--c-card-border)] hover:bg-[var(--c-soft2)]",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200",
                    isActive ? "text-[var(--c-bg)]" : "text-[var(--c-accent)]"
                  )}
                  style={{
                    background: isActive
                      ? "var(--c-accent)"
                      : "color-mix(in srgb, var(--c-accent) 14%, transparent)",
                  }}
                >
                  <item.icon className="w-5 h-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-[var(--c-text)]">
                    {item.label}
                  </span>
                  <span className="block truncate text-[0.65rem] text-[var(--c-text-dim)]">
                    {item.desc}
                  </span>
                </span>
                {isActive && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-[var(--c-accent)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* appearance / themes */}
        <div className="border-t border-[var(--c-card-border)] p-3">
          <div className="mb-2 px-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--c-text-dim)]">
            Appearance · 5 Themes
          </div>
          <div className="grid grid-cols-2 gap-2">
            {THEMES.map((t) => {
              const isActive = t.id === themeId;
              return (
                <button
                  key={t.id}
                  onClick={() => onTheme(t.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border p-1.5 text-left transition",
                    isActive
                      ? "border-[var(--c-accent)] ring-1 ring-[var(--c-accent)]"
                      : "border-[var(--c-card-border)] hover:border-[var(--c-accent)]/50",
                  )}
                >
                  <span className="flex h-7 w-7 shrink-0 overflow-hidden rounded-md border border-black/20">
                    {t.swatch.map((c, i) => (
                      <span key={i} className="flex-1" style={{ background: c }} />
                    ))}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[0.7rem] font-semibold text-[var(--c-text)]">
                      {t.name}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
