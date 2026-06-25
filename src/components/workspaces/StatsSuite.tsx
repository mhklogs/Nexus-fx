/**
 * StatsSuite.tsx — descriptive statistics, combinatorics (nPr / nCr) and
 * probability distributions (Binomial, Normal, Poisson).
 */

import { useMemo, useState } from "react";
import { Inp, Panel, SectionTitle, Stat } from "../ui";
import {
  binomialCdf,
  binomialPmf,
  combinations,
  computeStats,
  normalCdf,
  normalPdf,
  parseNumberList,
  poissonCdf,
  poissonPmf,
} from "@/core/mathlib";

const round = (x: number, d = 6) =>
  Number.isFinite(x) ? Number(x.toFixed(d)).toString() : "—";

export function StatsSuite() {
  const [data, setData] = useState("12, 18, 24, 24, 30, 36, 42");
  const [n, setN] = useState("10");
  const [r, setR] = useState("3");
  const [bn, setBn] = useState("20");
  const [bp, setBp] = useState("0.5");
  const [bk, setBk] = useState("8");
  const [lambda, setLambda] = useState("3");
  const [pk, setPk] = useState("5");
  const [x, setX] = useState("1.5");
  const [mu, setMu] = useState("0");
  const [sigma, setSigma] = useState("1");

  const stats = useMemo(() => computeStats(parseNumberList(data)), [data]);
  const combo = useMemo(() => combinations(+n || 0, +r || 0), [n, r]);
  const bin = useMemo(() => {
    const N = +bn, P = +bp, K = +bk;
    return { pmf: binomialPmf(N, P, K), cdf: binomialCdf(N, P, K) };
  }, [bn, bp, bk]);
  const poi = useMemo(() => {
    const L = +lambda, K = +pk;
    return { pmf: poissonPmf(L, K), cdf: poissonCdf(L, K) };
  }, [lambda, pk]);
  const norm = useMemo(() => {
    const X = +x, M = +mu, S = +sigma;
    return { pdf: normalPdf(X, M, S), cdf: normalCdf(X, M, S) };
  }, [x, mu, sigma]);

  return (
    <div className="space-y-4">
      <SectionTitle>Probability &amp; Statistics Suite</SectionTitle>

      {/* data + descriptive stats */}
      <Panel className="space-y-3">
        <div className="text-sm font-semibold text-[var(--c-text)]">Data list</div>
        <Inp type="textarea" rows={2} value={data} onChange={setData} placeholder="12, 18, 24 ..." />
        {!stats ? (
          <p className="text-sm text-[var(--c-text-dim)]">Enter numbers to compute statistics.</p>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            <Stat label="Count n" value={stats.n} />
            <Stat label="Sum Σx" value={round(stats.sum)} />
            <Stat label="Mean x̄" value={round(stats.mean)} />
            <Stat label="Median" value={round(stats.median)} />
            <Stat label="Mode" value={stats.mode.length ? stats.mode.join(", ") : "none"} />
            <Stat label="Min / Max" value={`${round(stats.min)} / ${round(stats.max)}`} />
            <Stat label="Range" value={round(stats.range)} />
            <Stat label="Q1 / Q3" value={`${round(stats.q1)} / ${round(stats.q3)}`} />
            <Stat label="Variance σ²" value={round(stats.variancePop)} hint="population" />
            <Stat label="Variance s²" value={round(stats.varianceSample)} hint="sample" />
            <Stat label="Std Dev σ" value={round(stats.sdPop)} hint="population" />
            <Stat label="Std Dev s" value={round(stats.sdSample)} hint="sample" />
          </div>
        )}
      </Panel>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* combinatorics */}
        <Panel className="space-y-3">
          <div className="text-sm font-semibold text-[var(--c-text)]">Combinatorics</div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-xs text-[var(--c-text-dim)]">n</span>
              <Inp type="number" value={n} onChange={setN} />
            </div>
            <div>
              <span className="text-xs text-[var(--c-text-dim)]">r</span>
              <Inp type="number" value={r} onChange={setR} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Stat label="nCr" value={combo.nCr.toLocaleString()} />
            <Stat label="nPr" value={combo.nPr.toLocaleString()} />
          </div>
        </Panel>

        {/* binomial */}
        <Panel className="space-y-3">
          <div className="text-sm font-semibold text-[var(--c-text)]">Binomial</div>
          <div className="grid grid-cols-3 gap-2">
            <div><span className="text-xs text-[var(--c-text-dim)]">n</span><Inp type="number" value={bn} onChange={setBn} /></div>
            <div><span className="text-xs text-[var(--c-text-dim)]">p</span><Inp type="number" value={bp} onChange={setBp} /></div>
            <div><span className="text-xs text-[var(--c-text-dim)]">k</span><Inp type="number" value={bk} onChange={setBk} /></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Stat label="P(X = k)" value={round(bin.pmf)} />
            <Stat label="P(X ≤ k)" value={round(bin.cdf)} />
          </div>
        </Panel>

        {/* poisson */}
        <Panel className="space-y-3">
          <div className="text-sm font-semibold text-[var(--c-text)]">Poisson</div>
          <div className="grid grid-cols-2 gap-2">
            <div><span className="text-xs text-[var(--c-text-dim)]">λ</span><Inp type="number" value={lambda} onChange={setLambda} /></div>
            <div><span className="text-xs text-[var(--c-text-dim)]">k</span><Inp type="number" value={pk} onChange={setPk} /></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Stat label="P(X = k)" value={round(poi.pmf)} />
            <Stat label="P(X ≤ k)" value={round(poi.cdf)} />
          </div>
        </Panel>
      </div>

      {/* normal */}
      <Panel className="space-y-3">
        <div className="text-sm font-semibold text-[var(--c-text)]">Normal Distribution</div>
        <div className="grid grid-cols-3 gap-2">
          <div><span className="text-xs text-[var(--c-text-dim)]">x</span><Inp type="number" value={x} onChange={setX} /></div>
          <div><span className="text-xs text-[var(--c-text-dim)]">μ</span><Inp type="number" value={mu} onChange={setMu} /></div>
          <div><span className="text-xs text-[var(--c-text-dim)]">σ</span><Inp type="number" value={sigma} onChange={setSigma} /></div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Stat label="f(x) pdf" value={round(norm.pdf)} />
          <Stat label="P(X ≤ x)" value={round(norm.cdf)} />
          <Stat label="P(X > x)" value={round(1 - norm.cdf)} />
        </div>
      </Panel>
    </div>
  );
}
