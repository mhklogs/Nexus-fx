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
    return localStorage.getItem("nexusfx.theme") || "hardware";
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
        background:
          "radial-gradient(120% 120% at 15% 0%, var(--c-bg2) 0%, var(--c-bg) 55%)",
        color: "var(--c-text)",
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[var(--c-card-border)] bg-[var(--c-bg)]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          {/* hamburger + logo (top-left) */}
          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--c-card-border)] bg-[var(--c-soft2)] text-[var(--c-text)] transition hover:border-[var(--c-accent)]"
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          <div className="flex items-center gap-2 rounded-xl border border-lime-400/40 bg-black px-3 py-1.5 shadow-[0_0_20px_rgba(57,255,20,0.30)]">
            <span className="text-base font-black text-lime-400">∑</span>
            <span className="text-sm font-bold tracking-tight text-white">NEXUS</span>
            <span className="rounded bg-lime-400 px-1 text-[0.6rem] font-black text-black">fx</span>
          </div>

          <div className="ml-2 hidden text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[var(--c-text-dim)] sm:block">
            {module === "home" ? "fx-570ES PLUS · 2nd Edition" : MODULE_TITLES[module]}
          </div>

          <div className="ml-auto flex items-center gap-2">
            {deferredPrompt && (
              <button
                onClick={handleInstall}
                className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[var(--c-accent)] bg-[var(--c-accent)]/15 px-3 text-xs font-bold text-[var(--c-accent)] transition hover:bg-[var(--c-accent)]/30 active:scale-95 cursor-pointer"
                title="Install app on device"
                aria-label="Install app"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span className="hidden sm:inline">Install App</span>
              </button>
            )}
            <span className="hidden rounded-md border border-[var(--c-card-border)] bg-[var(--c-soft2)] px-2 py-1 text-xs text-[var(--c-text-dim)] md:inline">
              {theme.name}
            </span>
            <button
              onClick={cycleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--c-card-border)] bg-[var(--c-soft2)] text-[var(--c-text)] transition hover:border-[var(--c-accent)]"
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
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-center">
            <div className="flex flex-col items-center gap-6">
              <Calculator engine={engine} />
            </div>
            <VariableMemory
              vars={engine.vars}
              setVar={engine.setVar}
              clearVars={engine.clearVars}
            />
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
