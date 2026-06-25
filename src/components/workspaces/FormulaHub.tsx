/**
 * FormulaHub.tsx — searchable multi-disciplinary formula library, scientific
 * constants, and the SI unit-conversion panel. Any item can be pasted straight
 * into the active calculator layout via `onPaste`.
 */

import { useMemo, useState } from "react";
import { Btn, Chip, Inp, Panel, SectionTitle, Stat } from "../ui";
import { CONSTANTS, convert, UNIT_CATEGORIES } from "@/core/mathlib";
import { MathText } from "../MathText";
import { FORMULAS_DATA } from "@/core/formulasData";

const CATS = ["Physics", "Chemistry", "Mathematics", "Statistics"];

export function FormulaHub({ onPaste }: { onPaste: (expr: string) => void }) {
  const [tab, setTab] = useState<"formulas" | "constants" | "convert">("formulas");
  const [cat, setCat] = useState("Physics");
  const [query, setQuery] = useState("");

  const subs = useMemo(
    () => [...new Set(FORMULAS_DATA.filter((f) => f.category === cat.toLowerCase()).map((f) => f.subcategory))],
    [cat],
  );
  const [sub, setSub] = useState<string>("Kinematics & Mechanics");

  const pickCat = (c: string) => {
    setCat(c);
    const subcats = [...new Set(FORMULAS_DATA.filter((f) => f.category === c.toLowerCase()).map((f) => f.subcategory))];
    setSub(subcats[0] || "");
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FORMULAS_DATA.filter(
      (f) =>
        (!q || f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q) || f.engineExpression.toLowerCase().includes(q)) &&
        (q ? true : f.category === cat.toLowerCase() && f.subcategory === sub),
    );
  }, [cat, sub, query]);

  return (
    <div className="space-y-4">
      <SectionTitle>Formula &amp; Constants Hub</SectionTitle>

      {/* top tabs */}
      <div className="flex gap-2">
        {(["formulas", "constants", "convert"] as const).map((t) => (
          <Chip key={t} active={tab === t} onClick={() => setTab(t)}>
            {t === "formulas" ? "Formulas" : t === "constants" ? "Constants" : "SI Convert"}
          </Chip>
        ))}
      </div>

      {tab === "formulas" && (
        <>
          <Panel className="space-y-3">
            <Inp value={query} onChange={setQuery} placeholder="🔍 Search all formulas, e.g. momentum, moles, derivative…" />
            {!query && (
              <>
                <div className="flex flex-wrap gap-1.5">
                  {CATS.map((c) => (
                    <Chip key={c} active={cat === c} onClick={() => pickCat(c)}>
                      {c}
                    </Chip>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {subs.map((s) => (
                    <Chip key={s} active={sub === s} onClick={() => setSub(s)}>{s}</Chip>
                  ))}
                </div>
              </>
            )}
          </Panel>

          <div className="grid gap-3 sm:grid-cols-2">
            {filtered.map((f, i) => (
              <Panel key={f.id || i} className="flex flex-col gap-2">
                <div>
                  <div className="text-sm font-semibold text-[var(--c-text)]">{f.name}</div>
                  <div className="text-xs text-[var(--c-text-dim)]">{f.description}</div>
                </div>
                <div className="rounded-lg border border-[var(--c-card-border)] bg-[var(--c-bg2)] px-3 py-2 text-sm text-[var(--c-accent)] flex items-center min-h-[2.5rem] overflow-x-auto">
                  <MathText value={f.displayExpression} />
                </div>
                {f.derivationSteps && f.derivationSteps.length > 0 && (
                  <details className="text-xs text-[var(--c-text-dim)] mt-1">
                    <summary className="cursor-pointer hover:text-[var(--c-text)] font-semibold select-none">
                      Show derivation & steps
                    </summary>
                    <ol className="list-decimal list-inside space-y-1 mt-1 border-t border-[var(--c-card-border)]/50 pt-1.5 pl-1.5">
                      {f.derivationSteps.map((step, idx) => (
                        <li key={idx} className="leading-relaxed">{step}</li>
                      ))}
                    </ol>
                  </details>
                )}
                <Btn variant="primary" onClick={() => onPaste(f.engineExpression)}>↩ Paste into calculator</Btn>
              </Panel>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-[var(--c-text-dim)]">No formulas match your search.</p>
            )}
          </div>
        </>
      )}

      {tab === "constants" && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CONSTANTS.map((c) => (
            <Panel key={c.sym + c.name} className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-lg font-bold text-[var(--c-accent)]">{c.sym}</span>
                <span className="text-[0.6rem] uppercase tracking-wide text-[var(--c-text-dim)]">{c.group}</span>
              </div>
              <div className="text-sm text-[var(--c-text)]">{c.name}</div>
              <div className="font-mono text-xs text-[var(--c-text-dim)]">{c.value}</div>
              <Btn variant="ghost" onClick={() => onPaste(c.value)}>↩ Paste value</Btn>
            </Panel>
          ))}
        </div>
      )}

      {tab === "convert" && <UnitConverter />}
    </div>
  );
}

function UnitConverter() {
  const [catId, setCatId] = useState("length");
  const cat = UNIT_CATEGORIES.find((c) => c.id === catId)!;
  const [from, setFrom] = useState(cat.units[3].id);
  const [to, setTo] = useState(cat.units[5].id);
  const [val, setVal] = useState("1");

  const pickCat = (id: string) => {
    setCatId(id);
    const c = UNIT_CATEGORIES.find((x) => x.id === id)!;
    setFrom(c.units[0].id);
    setTo(c.units[Math.min(2, c.units.length - 1)].id);
  };

  const result = convert(+val || 0, from, to, cat);
  const fromLabel = cat.units.find((u) => u.id === from)?.label;
  const toLabel = cat.units.find((u) => u.id === to)?.label;

  return (
    <Panel className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {UNIT_CATEGORIES.map((c) => (
          <Chip key={c.id} active={catId === c.id} onClick={() => pickCat(c.id)}>{c.name}</Chip>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <span className="mb-1 block text-xs text-[var(--c-text-dim)]">Value</span>
          <Inp type="number" value={val} onChange={setVal} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="mb-1 block text-xs text-[var(--c-text-dim)]">From</span>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full rounded-lg border border-[var(--c-card-border)] bg-[var(--c-bg2)] px-2 py-2 text-sm text-[var(--c-text)]"
            >
              {cat.units.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
            </select>
          </div>
          <div>
            <span className="mb-1 block text-xs text-[var(--c-text-dim)]">To</span>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full rounded-lg border border-[var(--c-card-border)] bg-[var(--c-bg2)] px-2 py-2 text-sm text-[var(--c-text)]"
            >
              {cat.units.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Stat label={`${val} ${fromLabel ?? ""}`} value="→" />
        <Stat label={toLabel ?? ""} value={result.toLocaleString(undefined, { maximumFractionDigits: 8 })} />
      </div>
    </Panel>
  );
}
