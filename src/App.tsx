import { useEffect, useRef, useState } from "react";
import { Calculator } from "@/components/Calculator";
import { Sidebar, type ModuleId } from "@/components/Sidebar";
import { MatrixStudio } from "@/components/workspaces/MatrixStudio";
import { StatsSuite } from "@/components/workspaces/StatsSuite";
import { FormulaCompiler } from "@/components/workspaces/FormulaCompiler";
import { FormulaHub } from "@/components/workspaces/FormulaHub";
import AITutor from "@/components/workspaces/AITutor";
import { useCalculator } from "@/core/engine";
import { themeById, themeVars, THEMES } from "@/core/themes";
import { Panel, SectionTitle, Inp, Btn } from "@/components/ui";

function VariableMemory({
  vars,
  setVar,
  clearVars,
}: {
  vars: Record<string, number>;
  setVar: (name: string, val: number) => void;
  clearVars: () => void;
}) {
  const varNames = ["A", "B", "C", "D", "E", "F", "X", "Y", "M"];
  return (
    <Panel className="w-full max-w-[420px] shrink-0 border border-[var(--c-card-border)] p-4 shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <SectionTitle>Memory Registers</SectionTitle>
        <Btn variant="ghost" onClick={clearVars} className="px-2 py-1 text-xs">
          Clear All
        </Btn>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {varNames.map((name) => {
          const val = vars[name] ?? 0;
          return (
            <div key={name} className="flex flex-col gap-1 rounded-lg border border-[var(--c-card-border)] bg-[var(--c-bg2)] p-2">
              <span className="font-mono text-xs font-bold text-[var(--c-alpha)]">{name}</span>
              <Inp
                type="number"
                value={val}
                onChange={(v) => {
                  const num = parseFloat(v);
                  setVar(name, Number.isFinite(num) ? num : 0);
                }}
                className="h-8 border-none bg-transparent px-1 py-0 font-mono text-sm focus:ring-0 focus:ring-offset-0"
              />
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-[10px] leading-relaxed text-[var(--c-text-dim)]">
        Values set here are dynamically substituted into expressions containing A–F, X, Y, or M.
      </p>
    </Panel>
  );
}

const MODULE_TITLES: Record<Exclude<ModuleId, "home">, string> = {
  matrix: "Matrix Studio",
  stats: "Probability & Statistics",
  formula: "Formula Compiler",
  hub: "Formula & Constants Hub",
  tutor: "NEXUS AI Tutor",
};

export default function App() {
  const [themeId, setThemeId] = useState(() => {
    return localStorage.getItem("nexusfx.theme") || "paper";
  });
  const [open, setOpen] = useState(false);
  const [module, setModule] = useState<ModuleId>("home");

  const theme = themeById(themeId);
  const engine = useCalculator();
  const engineRef = useRef(engine);
  engineRef.current = engine;

  useEffect(() => {
    localStorage.setItem("nexusfx.theme", themeId);
  }, [themeId]);

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    const confirmInstall = window.confirm(
      "Are you sure you want to install NEXUS fx on your device? Note that the AI Tutor and interactive quiz features require an active internet connection to work."
    );
    if (!confirmInstall) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install choice: ${outcome}`);
    setDeferredPrompt(null);
  };

  // global keyboard drive of the calculator (only on the calculator view)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (module !== "home") return;
      const el = document.activeElement as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable))
        return;
      const eng = engineRef.current;
      const k = e.key;
      if (/^[0-9.]$/.test(k)) { eng.press(k); e.preventDefault(); return; }
      if (["+", "-", "*", "/", "(", ")", "^", "!"].includes(k)) { eng.press(k); e.preventDefault(); return; }
      if (k === "Enter" || k === "=") { eng.equals(); e.preventDefault(); return; }
      if (k === "Backspace") { eng.backspace(); e.preventDefault(); return; }
      if (k === "Escape" || k === "Delete") { eng.clearAll(); e.preventDefault(); return; }
      if (k === "ArrowLeft") { eng.moveCaret(-1); e.preventDefault(); return; }
      if (k === "ArrowRight") { eng.moveCaret(1); e.preventDefault(); return; }
      if (k === "ArrowUp") { eng.recall(-1); e.preventDefault(); return; }
      if (k === "ArrowDown") { eng.recall(1); e.preventDefault(); return; }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [module]);

  const selectModule = (m: ModuleId) => {
    setModule(m);
    setOpen(false);
  };

  const pasteToCalculator = (expr: string) => {
    const eng = engineRef.current;
    eng.setExpr(eng.expr ? eng.expr + expr : expr);
    setModule("home");
    setOpen(false);
  };

  const cycleTheme = () => {
    const idx = THEMES.findIndex((t) => t.id === themeId);
    setThemeId(THEMES[(idx + 1) % THEMES.length].id);
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{
        ...themeVars(theme),
        colorScheme: theme.dark ? "dark" : "light",
        background: "var(--c-bg)",
        color: "var(--c-text)",
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[var(--c-card-border)]" style={{ background: "var(--c-bg)" }}>
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3.5">
          {/* hamburger + logo (top-left) */}
          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--c-card-border)] text-[var(--c-text)] transition hover:border-[var(--c-accent)]"
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          <div className="flex items-baseline gap-1.5">
            <span className="text-xl leading-none text-[var(--c-accent)]">∑</span>
            <span className="font-display text-lg font-medium tracking-tight text-[var(--c-text)]">
              NEXUS fx
            </span>
          </div>

          <div className="ml-1 hidden font-display text-[0.8rem] italic text-[var(--c-text-dim)] sm:block">
            {module === "home" ? "fx-570ES PLUS · 2nd Edition" : MODULE_TITLES[module]}
          </div>

          <div className="ml-auto flex items-center gap-2">
            {deferredPrompt && (
              <button
                onClick={handleInstall}
                className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--c-eq)] px-5 text-xs font-semibold text-[var(--c-eq-text)] transition hover:-translate-y-0.5"
                title="Install app on device"
                aria-label="Install app"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span className="hidden sm:inline">Install app</span>
              </button>
            )}
            <span className="hidden rounded-full border border-[var(--c-card-border)] px-3 py-1 text-xs text-[var(--c-text-dim)] md:inline">
              {theme.name}
            </span>
            <button
              onClick={cycleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--c-card-border)] text-[var(--c-text)] transition hover:border-[var(--c-accent)]"
              title="Cycle theme"
              aria-label="Cycle theme"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="13.5" cy="6.5" r="2.5" />
                <circle cx="17.5" cy="10.5" r="2.5" />
                <circle cx="8.5" cy="7.5" r="2.5" />
                <circle cx="6.5" cy="12.5" r="2.5" />
                <path d="M12 22a10 10 0 1 1 10-10c0 2.5-2 2-3.5 2H16a2 2 0 0 0-1 3.5 2 2 0 0 1-2 2.5z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {module === "home" && (
          <div className="flex flex-col gap-14">
            <section className="mx-auto w-full max-w-3xl text-center">
              <h1
                className="font-display font-bold text-[var(--c-text)]"
                style={{
                  fontSize: "clamp(2.4rem, 3.6vw + 0.9rem, 3.5rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.015em",
                }}
              >
                A scientific calculator that respects your attention.
              </h1>
              <p
                className="mx-auto mt-5 text-[var(--c-text-dim)]"
                style={{ maxWidth: "65ch", fontSize: "clamp(1rem, 0.4vw + 0.95rem, 1.0625rem)", lineHeight: 1.65 }}
              >
                NEXUS fx pairs a faithful natural-V.P.A.M. keypad with matrix, probability,
                statistics, formula and constants workspaces. It runs entirely in the browser,
                stores nothing on a server and never asks you to create an account.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#calculator"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--c-eq)] px-7 text-sm font-semibold text-[var(--c-eq-text)] transition hover:-translate-y-0.5"
                >
                  Open the keypad
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--c-card-border)] bg-[var(--c-soft)] px-7 text-sm font-semibold text-[var(--c-text)] transition hover:-translate-y-0.5 hover:border-[var(--c-accent)]"
                >
                  Browse workspaces
                </button>
              </div>
            </section>

            <section id="calculator" className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-center">
              <div className="flex flex-col items-center gap-6">
                <Calculator engine={engine} />
              </div>
              <VariableMemory
                vars={engine.vars}
                setVar={engine.setVar}
                clearVars={engine.clearVars}
              />
            </section>

            <section className="mx-auto w-full max-w-3xl">
              <h2 className="font-display text-2xl font-bold text-[var(--c-text)]">
                Built for long study sessions.
              </h2>
              <p
                className="mt-3 text-[var(--c-text-dim)]"
                style={{ maxWidth: "65ch", lineHeight: 1.7 }}
              >
                Every workspace shares the same keyboard, the same memory registers and the same
                quiet paper palette. Matrix Studio handles determinants, inverses and adjoints.
                Probability and Statistics covers distributions alongside nPr and nCr. The Formula
                Compiler turns your own expressions into reusable tools, while the Constants Hub
                keeps physics, chemistry, maths and SI references one keystroke away.
              </p>
              <p
                className="mt-4 text-[var(--c-text-dim)]"
                style={{ maxWidth: "65ch", lineHeight: 1.7 }}
              >
                The optional AI Tutor answers questions, explains each step and builds short quizzes
                when you connect a key. Everything else works offline.
              </p>
            </section>
          </div>
        )}

        {module !== "home" && (
          <div className="animate-fade-in">
            <button
              onClick={() => setModule("home")}
              className="mb-5 inline-flex items-center gap-2 rounded-lg border border-[var(--c-card-border)] bg-[var(--c-soft2)] px-3 py-2 text-sm text-[var(--c-text)] transition hover:border-[var(--c-accent)]"
            >
              ← Back to calculator
            </button>
            {module === "matrix" && <MatrixStudio />}
            {module === "stats" && <StatsSuite />}
            {module === "formula" && <FormulaCompiler />}
            {module === "hub" && <FormulaHub onPaste={pasteToCalculator} />}
            {module === "tutor" && <AITutor />}
          </div>
        )}
      </main>

      <Sidebar
        open={open}
        active={module}
        onSelect={selectModule}
        onClose={() => setOpen(false)}
        themeId={themeId}
        onTheme={setThemeId}
      />
    </div>
  );
}
