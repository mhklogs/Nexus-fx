/**
 * FormulaCompiler.tsx — write a formula with variable placeholders; the
 * compiler extracts every distinct variable and renders bound value fields,
 * evaluating live. Saved formulas persist to localStorage.
 */

import { useEffect, useMemo, useState } from "react";
import { Btn, Inp, Panel, SectionTitle, Stat } from "../ui";
import { extractVariables, tryEvaluate } from "@/core/parser";

interface SavedFormula {
  id: string;
  name: string;
  body: string;
}

const PRESETS: SavedFormula[] = [
  { id: "quad", name: "Quadratic", body: "A*X^2 + B*X + C" },
  { id: "kin", name: "Kinematics v²", body: "V0^2 + 2*A*D" },
  { id: "ohm", name: "Ohm's Law", body: "V/R" },
  { id: "gas", name: "Ideal Gas", body: "(P*V)/(N*R*T)" },
];

const STORE_KEY = "nexusfx.formulas";

export function FormulaCompiler() {
  const [body, setBody] = useState("A*X^2 + B*X + C");
  const [name, setName] = useState("My Formula");
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<SavedFormula[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setSaved(JSON.parse(raw));
      else setSaved(PRESETS);
    } catch {
      setSaved(PRESETS);
    }
  }, []);

  const persist = (list: SavedFormula[]) => {
    setSaved(list);
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(list));
    } catch {
      /* ignore */
    }
  };

  const vars = useMemo(() => extractVariables(body), [body]);

  const parsedVars = useMemo(() => {
    const out: Record<string, number> = {};
    for (const v of vars) {
      const raw = values[v] ?? "";
      const num = tryEvaluate(raw);
      out[v] = num ?? (parseFloat(raw) || 0);
    }
    return out;
  }, [vars, values]);

  const result = useMemo(() => tryEvaluate(body, { vars: parsedVars }), [body, parsedVars]);
  const allBound = vars.every((v) => (values[v] ?? "").trim() !== "");

  const save = () => {
    const entry: SavedFormula = {
      id: crypto.randomUUID(),
      name: name.trim() || "Untitled",
      body,
    };
    persist([entry, ...saved.filter((s) => s.body !== body)].slice(0, 24));
  };

  const load = (f: SavedFormula) => {
    setBody(f.body);
    setName(f.name);
    setValues({});
  };

  const remove = (id: string) => persist(saved.filter((s) => s.id !== id));

  return (
    <div className="space-y-4">
      <SectionTitle>Custom Formula Compiler</SectionTitle>

      <Panel className="space-y-3">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[10rem] flex-1">
            <span className="mb-1 block text-xs text-[var(--c-text-dim)]">Formula name</span>
            <Inp value={name} onChange={setName} />
          </div>
          <Btn variant="primary" onClick={save}>＋ Save</Btn>
        </div>
        <div>
          <span className="mb-1 block text-xs text-[var(--c-text-dim)]">
            Expression · use letters as variables (e.g. A, B, X, Y)
          </span>
          <Inp type="textarea" rows={2} value={body} onChange={(v) => { setBody(v); }} placeholder="A*X^2 + B*X + C" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {vars.length === 0 ? (
            <span className="text-xs text-[var(--c-text-dim)]">
              No variables detected yet — add a letter to bind a value.
            </span>
          ) : (
            vars.map((v) => (
              <span key={v} className="rounded border border-[var(--c-accent)]/30 bg-[var(--c-accent)]/10 px-2 py-0.5 font-mono text-xs text-[var(--c-accent)]">
                {v}
              </span>
            ))
          )}
        </div>
      </Panel>

      {/* dynamic value binding */}
      {vars.length > 0 && (
        <Panel className="space-y-3">
          <div className="text-sm font-semibold text-[var(--c-text)]">Bind values</div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {vars.map((v) => (
              <div key={v}>
                <span className="mb-1 block font-mono text-xs text-[var(--c-text-dim)]">{v} =</span>
                <Inp
                  value={values[v] ?? ""}
                  onChange={(val) => setValues((s) => ({ ...s, [v]: val }))}
                  placeholder="0"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Stat
              label="Result"
              value={result == null ? "—" : result.toLocaleString(undefined, { maximumFractionDigits: 8 })}
              hint={allBound ? "all variables bound" : "fill all fields"}
            />
            <Stat label="Status" value={result == null ? "Invalid" : "OK"} hint="live evaluation" />
          </div>
        </Panel>
      )}

      {/* saved library */}
      <Panel className="space-y-2">
        <div className="text-sm font-semibold text-[var(--c-text)]">Saved formulas</div>
        <div className="space-y-1.5">
          {saved.map((f) => (
            <div
              key={f.id}
              className="flex items-center gap-2 rounded-lg border border-[var(--c-card-border)] bg-[var(--c-bg2)] p-2"
            >
              <button onClick={() => load(f)} className="min-w-0 flex-1 text-left">
                <div className="truncate text-sm font-medium text-[var(--c-text)]">{f.name}</div>
                <div className="truncate font-mono text-xs text-[var(--c-text-dim)]">{f.body}</div>
              </button>
              <Btn variant="ghost" className="px-2 py-1 text-xs" onClick={() => load(f)}>
                Load
              </Btn>
              <Btn variant="ghost" className="px-2 py-1 text-xs" onClick={() => remove(f.id)}>
                ✕
              </Btn>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
