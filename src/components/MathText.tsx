/**
 * MathText.tsx — Natural V.P.A.M. display renderer.
 *
 * Converts the raw token stream (frac(a,b), √(x), ^n, sin(, Ans, π …) into a
 * typeset layout: stacked fractions, radicals with over-bar, superscripts and
 * a blinking caret that honours the live caret index (so it sits inside sin(|)).
 */

import type { ReactNode } from "react";

const SENTINEL = "\u0000";

/* ----------------------------- helpers ----------------------------------- */

function matchParen(s: string, openIdx: number): number {
  let depth = 0;
  for (let i = openIdx; i < s.length; i++) {
    if (s[i] === "(") depth++;
    else if (s[i] === ")") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return s.length - 1;
}

function splitTopComma(s: string): [string, string] {
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === "(") depth++;
    else if (c === ")") depth--;
    else if (c === "," && depth === 0) return [s.slice(0, i), s.slice(i + 1)];
  }
  return [s, ""];
}

function mapName(name: string): string {
  switch (name.toLowerCase()) {
    case "asin": return "sin⁻¹";
    case "acos": return "cos⁻¹";
    case "atan": return "tan⁻¹";
    case "logb": return "log";
    case "ncr": return "nCr";
    case "npr": return "nPr";
    default: return name;
  }
}

function prettify(c: string): string {
  if (c === "*") return "×";
  if (c === "/") return "÷";
  if (c === "-") return "−";
  return c;
}

/* ----------------------------- atoms ------------------------------------- */

function Caret() {
  return (
    <span
      className="inline-block w-[2px] self-stretch bg-current align-middle animate-[caret_1.1s_linear_infinite]"
      style={{ height: "1.05em", marginInline: "1px", transform: "translateY(2px)" }}
    />
  );
}

function Fraction({ num, den }: { num: ReactNode[]; den: ReactNode[] }) {
  return (
    <span
      className="mx-[1px] inline-flex flex-col items-center align-middle leading-none"
      style={{ verticalAlign: "middle" }}
    >
      <span className="px-1 pb-[1px] leading-tight">{num}</span>
      <span className="h-px w-full bg-current" />
      <span className="px-1 pt-[1px] leading-tight">{den}</span>
    </span>
  );
}

function Radical({ children, degree }: { children: ReactNode[]; degree?: string }) {
  return (
    <span className="inline-flex items-stretch align-middle">
      <span className="flex flex-col justify-end leading-none">
        {degree && (
          <span className="text-[0.6em] leading-none" style={{ transform: "translateY(0.4em)" }}>
            {degree}
          </span>
        )}
        <span className="leading-none">√</span>
      </span>
      <span className="border-t border-current pl-[1px] leading-tight">{children}</span>
    </span>
  );
}

/* ----------------------------- core render ------------------------------- */

function renderNodes(s: string, kp: string): ReactNode[] {
  const out: ReactNode[] = [];
  let i = 0;
  let k = 0;

  const readExponent = (start: number, ek: string) => {
    if (s[start] === "(") {
      const close = matchParen(s, start);
      return { node: renderNodes(s.slice(start + 1, close), ek), consumed: close - start + 1 };
    }
    if (s[start] === "-") {
      let j = start + 1;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      return { node: renderNodes(s.slice(start, j), ek), consumed: j - start };
    }
    if (/[0-9.]/.test(s[start])) {
      let j = start;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      return { node: renderNodes(s.slice(start, j), ek), consumed: j - start };
    }
    return { node: renderNodes(s[start] ?? "", ek), consumed: 1 };
  };

  while (i < s.length) {
    const c = s[i];

    if (c === SENTINEL) {
      out.push(<Caret key={`${kp}-c${k++}`} />);
      i++;
      continue;
    }

    // stacked fraction
    if (s.startsWith("frac(", i)) {
      const open = i + 4;
      const close = matchParen(s, open);
      const inner = s.slice(open + 1, close);
      const [num, den] = splitTopComma(inner);
      out.push(
        <Fraction key={`${kp}-f${k}`} num={renderNodes(num, `${kp}-fn${k}`)} den={renderNodes(den, `${kp}-fd${k}`)} />,
      );
      if (s[close] === SENTINEL) out.push(<Caret key={`${kp}-fc${k++}`} />);
      i = close + 1;
      continue;
    }

    // radical √( … ) and ∛( … )
    if ((c === "√" || c === "∛") && s[i + 1] === "(") {
      const close = matchParen(s, i + 1);
      const inner = s.slice(i + 2, close);
      out.push(
        <Radical key={`${kp}-r${k}`} degree={c === "∛" ? "3" : undefined}>
          {renderNodes(inner, `${kp}-ri${k}`)}
        </Radical>,
      );
      if (s[close] === SENTINEL) out.push(<Caret key={`${kp}-rc${k++}`} />);
      i = close + 1;
      continue;
    }

    // derivative token (render as a unit before identifier handling)
    if (s.startsWith("d/dx", i)) {
      out.push(
        <span key={`${kp}-dv${k++}`} className="font-light">
          d/dx
        </span>,
      );
      i += 4;
      continue;
    }

    // integral glyph already renders as a single glyph; fall through.

    // superscript
    if (c === "^") {
      const { node, consumed } = readExponent(i + 1, `${kp}-e${k++}`);
      out.push(
        <sup key={`${kp}-s${k++}`} className="text-[0.66em]">
          {node}
        </sup>,
      );
      i = i + 1 + consumed;
      continue;
    }

    // identifier / function name / constant
    if (/[A-Za-zπ√∛]/.test(c)) {
      let j = i;
      while (j < s.length && /[A-Za-zπ√∛]/.test(s[j])) j++;
      out.push(
        <span key={`${kp}-n${k++}`} className="font-light">
          {mapName(s.slice(i, j))}
        </span>,
      );
      i = j;
      continue;
    }

    // number
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      out.push(<span key={`${kp}-d${k++}`}>{s.slice(i, j)}</span>);
      i = j;
      continue;
    }

    // single glyph (operators / brackets / comma)
    out.push(<span key={`${kp}-g${k++}`}>{prettify(c)}</span>);
    i++;
  }

  return out;
}

export interface MathTextProps {
  value: string;
  caret?: number;
  className?: string;
}

export function MathText({ value, caret, className }: MathTextProps) {
  const withCaret =
    caret == null ? value : value.slice(0, caret) + SENTINEL + value.slice(caret);
  const nodes = renderNodes(withCaret, "m");
  return <span className={className}>{nodes}</span>;
}
