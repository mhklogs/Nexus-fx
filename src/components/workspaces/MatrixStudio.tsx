/**
 * MatrixStudio.tsx — interactive matrix workspace (1×1 … 4×4).
 * Determinant, Inverse, Adjoint, Transpose, Trace, plus A·B / A±B.
 * Fractional results stay visible via the parser's rational formatter.
 */

import { useMemo, useState } from "react";
import { Btn, Chip, Inp, Panel, SectionTitle, Stat } from "../ui";
import {
  adjoint,
  clean,
  determinant,
  fmtEntry,
  inverse,
  matrixAdd,
  matrixMultiply,
  transpose,
  trace,
  type Matrix,
} from "@/core/mathlib";
import { evaluate } from "@/core/parser";

type StrMatrix = string[][];

function blank(n: number): StrMatrix {
  return Array.from({ length: n }, () => Array.from({ length: n }, () => ""));
}
function toNum(sm: StrMatrix): Matrix {
  return sm.map((row) =>
    row.map((c) => {
      const v = evaluate(c.trim() || "0");
      return Number.isFinite(v) ? v : 0;
    }),
  );
}
function resize(sm: StrMatrix, n: number): StrMatrix {
  const out = blank(n);
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) out[i][j] = sm[i]?.[j] ?? "";
  return out;
}

export function MatrixStudio() {
  const [n, setN] = useState(3);
  const [A, setA] = useState<StrMatrix>(() => blank(3));
  const [B, setB] = useState<StrMatrix>(() => blank(3));
  const [frac, setFrac] = useState(true);
  const [result, setResult] = useState<
    | { kind: "matrix"; label: string; value: Matrix }
    | { kind: "scalar"; label: string; value: number }
    | null
  >(null);

  const Am = useMemo(() => toNum(A), [A]);
  const Bm = useMemo(() => toNum(B), [B]);
  const detA = useMemo(() => determinant(Am), [Am]);
  const invA = useMemo(() => inverse(Am), [Am]);

  const changeSize = (nn: number) => {
    setN(nn);
    setA((s) => resize(s, nn));
    setB((s) => resize(s, nn));
    setResult(null);
  };

  const setCell = (which: "A" | "B") => (r: number, c: number, v: string) => {
    const set = which === "A" ? setA : setB;
    set((m) => m.map((row, i) => (i === r ? row.map((x, j) => (j === c ? v : x)) : row)));
  };

  const op = (
    label: string,
    fn: () => Matrix,
  ) => {
    try {
      setResult({ kind: "matrix", label, value: fn() });
    } catch {
      setResult({ kind: "scalar", label, value: NaN });
    }
  };

  const MatrixGrid = ({
    title,
    data,
    setter,
  }: {
    title: string;
    data: StrMatrix;
    setter: (r: number, c: number, v: string) => void;
  }) => (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span className="text-sm font-bold text-[var(--c-text)]">{title}</span>
      </div>
      <div
        className="grid gap-1.5 rounded-lg border border-[var(--c-card-border)] bg-[var(--c-bg2)] p-2"
        style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
      >
        {data.flat().map((_, idx) => {
          const r = Math.floor(idx / n);
          const c = idx % n;
          return (
            <Inp
              key={`${title}-${idx}`}
              value={data[r][c]}
              onChange={(v) => setter(r, c, v)}
              className="px-2 py-1.5 text-center font-mono text-xs"
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SectionTitle>Matrix Studio</SectionTitle>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--c-text-dim)]">Size</span>
          {[1, 2, 3, 4].map((k) => (
            <Chip key={k} active={n === k} onClick={() => changeSize(k)}>
              {k}×{k}
            </Chip>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Panel>
          <MatrixGrid title="Matrix A" data={A} setter={setCell("A")} />
        </Panel>
        <Panel>
          <MatrixGrid title="Matrix B" data={B} setter={setCell("B")} />
        </Panel>
      </div>

      <Panel className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <SectionTitle>Operations on A</SectionTitle>
          <Chip active={frac} onClick={() => setFrac((f) => !f)}>
            {frac ? "Fraction ✓" : "Decimal"}
          </Chip>
        </div>
        <div className="flex flex-wrap gap-2">
          <Btn variant="primary" onClick={() => setResult({ kind: "scalar", label: "det(A)", value: detA })}>
            Determinant
          </Btn>
          <Btn
            variant="primary"
            onClick={() =>
              invA
                ? op("A⁻¹", () => inverse(Am)!)
                : setResult({ kind: "scalar", label: "det(A)", value: NaN })
            }
          >
            Inverse
          </Btn>
          <Btn variant="ghost" onClick={() => op("adj(A)", () => adjoint(Am))}>
            Adjoint
          </Btn>
          <Btn variant="ghost" onClick={() => op("Aᵀ", () => transpose(Am))}>
            Transpose
          </Btn>
          <Btn variant="ghost" onClick={() => setResult({ kind: "scalar", label: "tr(A)", value: trace(Am) })}>
            Trace
          </Btn>
        </div>

        <div className="border-t border-[var(--c-card-border)] pt-3">
          <div className="mb-2 text-xs font-medium text-[var(--c-text-dim)]">
            Binary operations
          </div>
          <div className="flex flex-wrap gap-2">
            <Btn variant="accent" onClick={() => op("A × B", () => matrixMultiply(Am, Bm))}>
              A × B
            </Btn>
            <Btn variant="ghost" onClick={() => op("A + B", () => matrixAdd(Am, Bm, 1))}>
              A + B
            </Btn>
            <Btn variant="ghost" onClick={() => op("A − B", () => matrixAdd(Am, Bm, -1))}>
              A − B
            </Btn>
          </div>
        </div>
      </Panel>

      {/* result */}
      <Panel>
        <SectionTitle>Result</SectionTitle>
        {!result ? (
          <p className="text-sm text-[var(--c-text-dim)]">
            Run an operation to see the result matrix or scalar here.
          </p>
        ) : result.kind === "scalar" ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <Stat label={result.label} value={fmtEntry(result.value, frac)} />
            <Stat label="det(A)" value={fmtEntry(clean(detA), frac)} hint="determinant of A" />
            <Stat
              label="A⁻¹ exists"
              value={invA ? "Yes" : "No"}
              hint={invA ? `det = ${fmtEntry(clean(detA), false)}` : "det = 0"}
            />
          </div>
        ) : (
          <div>
            <div className="mb-2 text-sm font-semibold text-[var(--c-accent)]">
              {result.label}
            </div>
            <div
              className="inline-grid gap-1.5 rounded-lg border border-[var(--c-card-border)] bg-[var(--c-bg2)] p-3"
              style={{ gridTemplateColumns: `repeat(${result.value[0].length}, minmax(0,1fr))` }}
            >
              {result.value.flat().map((v, i) => (
                <div
                  key={i}
                  className="min-w-[3.2rem] rounded bg-[var(--c-soft)] px-2 py-1.5 text-center font-mono text-sm text-[var(--c-text)]"
                >
                  {fmtEntry(v, frac)}
                </div>
              ))}
            </div>
          </div>
        )}
      </Panel>
    </div>
  );
}
