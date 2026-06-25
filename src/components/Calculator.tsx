/**
 * Calculator.tsx — visual replica of the Casio fx-570ES PLUS (2nd Edition).
 * Renders the two-line Natural V.P.A.M. display plus the hardware button grid
 * (control row, math-function block, numeric/execution block).
 */

import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { CalcEngine } from "@/core/engine";
import { MathText } from "./MathText";

type Kind = "num" | "fn" | "op" | "eq" | "ctrl" | "ghost";
type Action =
  | "shift" | "alpha" | "del" | "ac" | "equals"
  | "left" | "right" | "up" | "down" | "mode" | "on";

interface KeyDef {
  label: ReactNode;
  shift?: ReactNode;
  alpha?: string;
  kind: Kind;
  insert?: string;
  shiftInsert?: string;
  alphaInsert?: string;
  action?: Action;
}

/* ------------------------------------------------------------------ */
/*  Key maps (faithful 5-wide hardware layout)                         */
/* ------------------------------------------------------------------ */

const CTRL_ROW: KeyDef[] = [
  { label: "SHIFT", kind: "ctrl", action: "shift" },
  { label: "ALPHA", kind: "ctrl", action: "alpha" },
  { label: "PAD", kind: "ghost" }, // d-pad placeholder cell
  { label: <Span2 t="HIST" b="RECALL" />, kind: "ctrl", action: "history" },
  { label: "ON", kind: "ctrl", action: "on" },
];

const FUNC_ROWS: KeyDef[][] = [
  [
    { label: "_frac", kind: "fn", insert: "frac(", shiftInsert: "abs(", shift: "abs" },
    { label: "√‾", kind: "fn", insert: "√(", shiftInsert: "∛(", shift: "∛" },
    { label: "∫dx", kind: "fn", insert: "∫(", shift: "Σ", shiftInsert: "Σ(" },
    { label: "d/dx", kind: "fn", insert: "d/dx(", shift: "∫", shiftInsert: "∫(" },
    { label: "log", kind: "fn", insert: "log(", shiftInsert: "10^", shift: "10ˣ" },
  ],
  [
    { label: "sin", kind: "fn", insert: "sin(", shiftInsert: "asin(", shift: "sin⁻¹" },
    { label: "cos", kind: "fn", insert: "cos(", shiftInsert: "acos(", shift: "cos⁻¹" },
    { label: "tan", kind: "fn", insert: "tan(", shiftInsert: "atan(", shift: "tan⁻¹" },
    { label: "hyp", kind: "fn", insert: "sinh(", shiftInsert: "cosh(", shift: "sinh/cosh" },
    { label: "ln", kind: "fn", insert: "ln(", shiftInsert: "e^", shift: "eˣ" },
  ],
  [
    { label: "x²", kind: "fn", insert: "^2", shiftInsert: "^3", shift: "x³" },
    { label: "xʸ", kind: "fn", insert: "^", shift: "√‾", shiftInsert: "root(" },
    { label: "x⁻¹", kind: "fn", insert: "^(-1)", shift: "√(", shiftInsert: "√(" },
    { label: "ENG", kind: "fn", insert: "×10^", shift: "Norm" },
    { label: "log□", kind: "fn", insert: "logb(", shift: "root", shiftInsert: "root(" },
  ],
  [
    { label: "(−)", kind: "op", insert: "-", alpha: "A", alphaInsert: "A", shift: "x!", shiftInsert: "!" },
    { label: "(", kind: "op", insert: "(", shift: "e", shiftInsert: "e" },
    { label: ")", kind: "op", insert: ")" },
    { label: ",", kind: "op", insert: "," },
    { label: "π", kind: "fn", insert: "π", shift: "e", shiftInsert: "e" },
  ],
];

const NUM_ROWS: KeyDef[][] = [
  [
    { label: "7", kind: "num", insert: "7", alpha: "A", alphaInsert: "A" },
    { label: "8", kind: "num", insert: "8", alpha: "B", alphaInsert: "B" },
    { label: "9", kind: "num", insert: "9", alpha: "C", alphaInsert: "C" },
    { label: "DEL", kind: "ctrl", action: "del", shift: "INS" },
    { label: "AC", kind: "ctrl", action: "ac" },
  ],
  [
    { label: "4", kind: "num", insert: "4", alpha: "D", alphaInsert: "D" },
    { label: "5", kind: "num", insert: "5", alpha: "E", alphaInsert: "E" },
    { label: "6", kind: "num", insert: "6", alpha: "F", alphaInsert: "F" },
    { label: "×", kind: "op", insert: "*" },
    { label: "÷", kind: "op", insert: "/" },
  ],
  [
    { label: "1", kind: "num", insert: "1", alpha: "X", alphaInsert: "X" },
    { label: "2", kind: "num", insert: "2", alpha: "Y", alphaInsert: "Y" },
    { label: "3", kind: "num", insert: "3", alpha: "M", alphaInsert: "M" },
    { label: "+", kind: "op", insert: "+" },
    { label: "−", kind: "op", insert: "-" },
  ],
  [
    { label: "0", kind: "num", insert: "0" },
    { label: ".", kind: "num", insert: "." },
    { label: "×10ˣ", kind: "num", insert: "×10^", shift: "π", shiftInsert: "π" },
    { label: "Ans", kind: "op", insert: "Ans" },
    { label: "=", kind: "eq", action: "equals" },
  ],
];

/* ------------------------------------------------------------------ */
/*  Tiny presentational helpers                                       */
/* ------------------------------------------------------------------ */

function Span2({ t, b }: { t: string; b: string }) {
  return (
    <span className="flex flex-col items-center leading-none">
      <span>{t}</span>
      <span className="text-[0.62em] opacity-70">{b}</span>
    </span>
  );
}

const KIND_CLASS: Record<Kind, string> = {
  num: "bg-[var(--c-btn)] text-[var(--c-btn-text)] border-[var(--c-btn-edge)]",
  fn: "bg-[var(--c-fn)] text-[var(--c-fn-text)] border-[var(--c-btn-edge)]",
  op: "bg-[var(--c-op)] text-[var(--c-op-text)] border-[var(--c-btn-edge)]",
  eq: "bg-[var(--c-eq)] text-[var(--c-eq-text)] border-[var(--c-btn-edge)]",
  ctrl: "bg-[var(--c-fn)] text-[var(--c-op-text)] border-[var(--c-btn-edge)]",
  ghost: "bg-transparent border-transparent",
};

/* ------------------------------------------------------------------ */
/*  Key component                                                     */
/* ------------------------------------------------------------------ */

function Key({
  def,
  active,
  onClick,
}: {
  def: KeyDef;
  active?: boolean;
  onClick: () => void;
}) {
  if (def.kind === "ghost") return <div />;

  // render the fraction glyph nicely
  const label =
    typeof def.label === "string" && def.label.startsWith("_frac") ? (
      <FracGlyph />
    ) : (
      def.label
    );

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex h-full btn-min-h select-none items-center justify-center rounded-md border-b-2 px-0.5 btn-text font-medium leading-none shadow-sm transition-all duration-75 active:translate-y-[1px] active:border-b-0 focus:outline-none",
        KIND_CLASS[def.kind],
        active && "ring-2 ring-[var(--c-ring)] ring-offset-0",
      )}
    >
      {def.shift && (
        <span className="absolute left-0.5 sm:left-1 top-0.5 btn-label-shift-alpha font-semibold text-[var(--c-shift)]">
          {def.shift}
        </span>
      )}
      {def.alpha && (
        <span className="absolute right-0.5 sm:right-1 top-0.5 btn-label-shift-alpha font-semibold text-[var(--c-alpha)]">
          {def.alpha}
        </span>
      )}
      <span className="mt-1 truncate">{label}</span>
    </button>
  );
}

function FracGlyph() {
  return (
    <span className="inline-flex flex-col items-center leading-none">
      <span className="text-[0.6em]">□</span>
      <span className="h-px w-3 bg-current" />
      <span className="text-[0.6em]">□</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Directional pad                                                   */
/* ------------------------------------------------------------------ */

function DPad({ engine }: { engine: CalcEngine }) {
  const base =
    "flex items-center justify-center rounded bg-[var(--c-fn)] text-[var(--c-fn-text)] border border-[var(--c-btn-edge)] active:translate-y-px text-[0.7rem] font-bold";
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-0.5" style={{ aspectRatio: "3/2.2" }}>
      {/* Row 0 */}
      <div />
      <button className={base} onClick={() => engine.recall(-1)} aria-label="up">
        ▲
      </button>
      <div />
      {/* Row 1 */}
      <button className={base} onClick={() => engine.moveCaret(-1)} aria-label="left">
        ◄
      </button>
      <div className="flex items-center justify-center">
        <span className="text-[0.45rem] font-bold tracking-tight text-[var(--c-text-dim)]">REPLAY</span>
      </div>
      <button className={base} onClick={() => engine.moveCaret(1)} aria-label="right">
        ►
      </button>
      {/* Row 2 */}
      <div />
      <button className={base} onClick={() => engine.recall(1)} aria-label="down">
        ▼
      </button>
      <div />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main calculator                                                   */
/* ------------------------------------------------------------------ */

export function Calculator({ engine }: { engine: CalcEngine }) {
  const {
    expr, caret, preview, lastResult, justEvaluated,
    shiftOn, alphaOn, angleMode, preferFrac,
    press, backspace, clearAll, equals, moveCaret, recall,
    toggleShift, toggleAlpha, toggleAngle, toggleFrac,
    history, showHistory, setShowHistory, toggleHistory, clearHistory, setExpr,
  } = engine;

  const consume = () => {
    if (shiftOn) toggleShift();
    if (alphaOn) toggleAlpha();
  };

  const onKey = (def: KeyDef) => {
    if (def.action) {
      switch (def.action) {
        case "shift": toggleShift(); return;
        case "alpha": toggleAlpha(); return;
        case "history": toggleHistory(); return;
        default:
          // del / ac / equals / arrows / on — clear any active modifier
          consume();
          switch (def.action) {
            case "del": backspace(); return;
            case "ac": clearAll(); return;
            case "equals": equals(); return;
            case "left": moveCaret(-1); return;
            case "right": moveCaret(1); return;
            case "up": recall(-1); return;
            case "down": recall(1); return;
            case "on": 
              clearAll(); 
              clearHistory();
              setShowHistory(false);
              return;
          }
      }
    }
    let insert = def.insert;
    if (shiftOn && def.shiftInsert != null) { insert = def.shiftInsert; }
    else if (alphaOn && def.alphaInsert != null) { insert = def.alphaInsert; }
    consume();
    if (insert != null) press(insert);
  };

  const resultText = justEvaluated && lastResult ? lastResult.result : preview.formatted;
  const resultIsError = justEvaluated && !!lastResult?.result.includes("ERROR");

  return (
    <div
      className="relative w-full max-w-[420px] overflow-hidden rounded-[1.2rem] sm:rounded-[1.6rem] border border-[var(--c-border)] p-2 sm:p-3 shadow-2xl"
      style={{
        background: "linear-gradient(150deg, var(--c-body), var(--c-body2))",
      }}
    >
      {/* top brand strip */}
      <div className="mb-2 flex items-center justify-between px-1">
        <div className="flex items-baseline gap-1">
          <span className="text-[0.8rem] font-black text-[var(--c-accent)] mr-0.5">∑</span>
          <span className="text-[0.7rem] font-extrabold tracking-tight text-[var(--c-btn-text)]">
            NEXUS
          </span>
          <span className="rounded bg-[var(--c-accent)] px-0.5 text-[0.5rem] font-black text-[var(--c-bg)] leading-none py-[1px]">
            fx
          </span>
          <span className="ml-1.5 text-[0.55rem] font-semibold text-[var(--c-text-dim)]">
            fx-570ES PLUS · 2nd Edition
          </span>
        </div>
        <span className="text-[0.45rem] font-bold uppercase tracking-wider text-[var(--c-text-dim)]/70">
          Natural-V.P.A.M.
        </span>
      </div>

      {/* solar / sheen strip */}
      <div className="mb-2 h-1.5 w-full rounded-full bg-[var(--c-display-edge)] opacity-30" />

      {/* DISPLAY */}
      <div
        className="mb-3 rounded-lg border border-[var(--c-display-edge)] p-2.5 shadow-inner"
        style={{
          background:
            "linear-gradient(165deg, var(--c-display-bg), var(--c-display-bg2))",
        }}
      >
        <div className="mb-1 flex items-center gap-2 text-[0.5rem] sm:text-[0.55rem] font-semibold text-[var(--c-display-text-dim)]">
          {shiftOn && <span className="text-[var(--c-shift)]">SHIFT</span>}
          {alphaOn && <span className="text-[var(--c-alpha)]">ALPHA</span>}
          <span className="rounded bg-[var(--c-display-text-dim)]/15 px-1 py-px text-[var(--c-display-text-dim)]">
            {angleMode}
          </span>
          {preferFrac && <span className="text-[var(--c-display-text-dim)]">Math</span>}
          <span className="ml-auto opacity-60">{showHistory ? "history scroll" : `${expr.length} chars`}</span>
        </div>

        {showHistory ? (
          <div className="flex flex-col h-[3.75rem] overflow-y-auto text-left text-xs font-mono text-[var(--c-display-text)] select-none">
            <div className="text-[0.6rem] font-bold border-b border-[var(--c-display-text-dim)]/20 pb-0.5 mb-1 flex justify-between">
              <span>SCROLLBACK HISTORY</span>
              <span className="opacity-60">{history.length} entries</span>
            </div>
            {history.length === 0 ? (
              <div className="text-center text-[var(--c-display-text-dim)] mt-2">No history yet</div>
            ) : (
              history.map((h, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setExpr(h.expr);
                    setShowHistory(false);
                  }}
                  className="w-full text-left truncate hover:bg-[var(--c-display-text-dim)]/10 px-1 rounded py-0.5"
                >
                  {h.expr} = {h.result}
                </button>
              ))
            )}
          </div>
        ) : (
          <>
            {/* expression line */}
            <div className="flex min-h-[2.1rem] items-start justify-end overflow-x-auto pb-0.5 text-right calc-display-expr-text leading-tight text-[var(--c-display-text)]">
              {expr.length === 0 ? (
                <span className="font-lcd text-[1.1rem] text-[var(--c-display-text-dim)]">0</span>
              ) : (
                <MathText value={expr} caret={caret} className="font-lcd" />
              )}
            </div>

            {/* result line */}
            <div className="flex min-h-[1.6rem] items-center justify-end overflow-x-auto text-right calc-display-result-text text-[var(--c-display-text-dim)]">
              {resultText && (
                <span
                  className={cn(
                    "font-lcd",
                    justEvaluated && "text-[1.15em] text-[var(--c-display-text)]",
                    resultIsError && "animate-pulse text-[var(--c-alpha)]",
                  )}
                >
                  {resultIsError ? "Math ERROR" : <>= <MathText value={resultText} /></>}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* CONTROL ROW */}
      <div className="mb-2 grid grid-cols-[1fr_1fr_1.5fr_1fr_1fr] gap-1 sm:gap-1.5">
        <Key def={CTRL_ROW[0]} active={shiftOn} onClick={() => onKey(CTRL_ROW[0])} />
        <Key def={CTRL_ROW[1]} active={alphaOn} onClick={() => onKey(CTRL_ROW[1])} />
        <div className="flex items-center justify-center">
          <DPad engine={engine} />
        </div>
        <Key def={CTRL_ROW[3]} onClick={() => onKey(CTRL_ROW[3])} />
        <Key def={CTRL_ROW[4]} onClick={() => onKey(CTRL_ROW[4])} />
      </div>

      {/* MATH FUNCTION block (full width, 5×4) */}
      <div className="mb-1.5 grid grid-cols-5 grid-rows-4 gap-1 sm:gap-1.5">
        {FUNC_ROWS.flat().map((k, i) => (
          <Key key={`f${i}`} def={k} onClick={() => onKey(k)} />
        ))}
      </div>

      {/* EXECUTION + NUMERIC block (full width, 5×4) */}
      <div className="grid grid-cols-5 grid-rows-4 gap-1 sm:gap-1.5">
        {NUM_ROWS.flat().map((k, i) => (
          <Key key={`n${i}`} def={k} onClick={() => onKey(k)} />
        ))}
      </div>


    </div>
  );
}
