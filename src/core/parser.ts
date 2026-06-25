/**
 * parser.ts — Natural-display math evaluation engine.
 *
 * Decoupled evaluation layer. Exposes a tokenizer, a recursive-descent
 * evaluator, and the two critical sanitizer pipelines that harden user input
 * before it ever reaches execution:
 *
 *   Bug Fix A — closeParens()   auto-appends matching ")" so trailing
 *                              function wrappers like sin(, log(, ln( never
 *                              raise "mismatched parentheses".
 *   Bug Fix B — trimTrailing()  drops dangling binary operators so strings
 *                              such as "8+8+" evaluate safely to 16.
 */

export type Vars = Record<string, number>;
export type AngleMode = "DEG" | "RAD";

export class ParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ParseError";
  }
}

/* -------------------------------------------------------------------------- */
/*  Low level numeric helpers                                                  */
/* -------------------------------------------------------------------------- */

export function factorial(n: number): number {
  if (n < 0 || !Number.isFinite(n)) return NaN;
  const i = Math.round(n);
  if (i !== n) return gamma(n + 1); // fall back to Γ for non-integers
  let r = 1;
  for (let k = 2; k <= i; k++) r *= k;
  return r;
}

// Lanczos approximation of the Gamma function (for non-integer factorials).
function gamma(z: number): number {
  const g = 7;
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
  z -= 1;
  let x = c[0];
  for (let i = 1; i < g + 2; i++) x += c[i] / (z + i);
  const t = z + g + 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

export function nCr(n: number, r: number): number {
  n = Math.round(n);
  r = Math.round(r);
  if (r < 0 || r > n || n < 0) return 0;
  r = Math.min(r, n - r);
  let res = 1;
  for (let i = 0; i < r; i++) res = (res * (n - i)) / (i + 1);
  return Math.round(res);
}

export function nPr(n: number, r: number): number {
  n = Math.round(n);
  r = Math.round(r);
  if (r < 0 || r > n || n < 0) return 0;
  let res = 1;
  for (let i = 0; i < r; i++) res *= n - i;
  return res;
}

/* -------------------------------------------------------------------------- */
/*  Tokenizer                                                                  */
/* -------------------------------------------------------------------------- */

type Tok =
  | { t: "num"; v: number }
  | { t: "id"; v: string }
  | { t: "op"; v: string }
  | { t: "lp" }
  | { t: "rp" }
  | { t: "comma" };

const ID_CHARS = /[A-Za-zπ√∛⁻¹⁺²³°]/;
const DIGIT = /[0-9]/;

function tokenize(s: string): Tok[] {
  const toks: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === " " || c === "\t" || c === "\n") {
      i++;
      continue;
    }
    // numbers (with decimals & scientific exponent)
    if (DIGIT.test(c) || c === ".") {
      let j = i;
      let dot = false;
      while (j < s.length && (DIGIT.test(s[j]) || (s[j] === "." && !dot))) {
        if (s[j] === ".") dot = true;
        j++;
      }
      if (j < s.length && (s[j] === "E" || s[j] === "e")) {
        let k = j + 1;
        if (k < s.length && (s[k] === "+" || s[k] === "-")) k++;
        if (k < s.length && DIGIT.test(s[k])) {
          j = k;
          while (j < s.length && DIGIT.test(s[j])) j++;
        }
      }
      toks.push({ t: "num", v: parseFloat(s.slice(i, j)) });
      i = j;
      continue;
    }
    // identifiers / function names / constants
    if (ID_CHARS.test(c)) {
      let j = i;
      while (j < s.length && ID_CHARS.test(s[j])) j++;
      toks.push({ t: "id", v: s.slice(i, j) });
      i = j;
      continue;
    }
    if (c === "(") {
      toks.push({ t: "lp" });
      i++;
      continue;
    }
    if (c === ")") {
      toks.push({ t: "rp" });
      i++;
      continue;
    }
    if (c === ",") {
      toks.push({ t: "comma" });
      i++;
      continue;
    }
    if ("+-*/×÷·^!".includes(c)) {
      const op = c === "×" ? "*" : c === "÷" ? "/" : c === "·" ? "*" : c;
      toks.push({ t: "op", v: op });
      i++;
      continue;
    }
    if (c === "=") {
      i++;
      continue;
    }
    // unknown glyph — ignore gracefully
    i++;
  }
  return toks;
}

/* -------------------------------------------------------------------------- */
/*  Function dispatch tables                                                   */
/* -------------------------------------------------------------------------- */

const FUNC_NAMES = new Set([
  "sin", "cos", "tan", "asin", "acos", "atan", "sinh", "cosh", "tanh",
  "asinh", "acosh", "atanh",
  "log", "ln", "lg", "sqrt", "√", "cbrt", "∛", "abs", "exp", "floor", "ceil",
  "round", "sign", "frac", "logb", "root", "ncr", "npr", "gcd", "mod", "min",
  "max", "hypot", "pow", "Σ",
]);

function toRad(x: number, mode: AngleMode) {
  return mode === "DEG" ? (x * Math.PI) / 180 : x;
}
function fromRad(x: number, mode: AngleMode) {
  return mode === "DEG" ? (x * 180) / Math.PI : x;
}

function callFunc(name: string, a: number[], mode: AngleMode): number {
  const x = a[0];
  switch (name.toLowerCase()) {
    case "sin": return Math.sin(toRad(x, mode));
    case "cos": return Math.cos(toRad(x, mode));
    case "tan": return Math.tan(toRad(x, mode));
    case "asin": return fromRad(Math.asin(x), mode);
    case "acos": return fromRad(Math.acos(x), mode);
    case "atan": return fromRad(Math.atan(x), mode);
    case "sinh": return Math.sinh(x);
    case "cosh": return Math.cosh(x);
    case "tanh": return Math.tanh(x);
    case "asinh": return Math.asinh(x);
    case "acosh": return Math.acosh(x);
    case "atanh": return Math.atanh(x);
    case "log": return Math.log10(x);
    case "lg": return Math.log10(x);
    case "ln": return Math.log(x);
    case "sqrt": case "√": return Math.sqrt(x);
    case "cbrt": case "∛": return Math.cbrt(x);
    case "abs": return Math.abs(x);
    case "exp": return Math.exp(x);
    case "floor": return Math.floor(x);
    case "ceil": return Math.ceil(x);
    case "round": return Math.round(x);
    case "sign": return Math.sign(x);
    // two-argument
    case "frac": return a[0] / a[1];
    case "logb": return Math.log(a[1]) / Math.log(a[0]);
    case "root": return Math.pow(a[1], 1 / a[0]);
    case "ncr": return nCr(a[0], a[1]);
    case "npr": return nPr(a[0], a[1]);
    case "gcd": return gcd(a[0], a[1]);
    case "mod": return a[0] % a[1];
    case "pow": return Math.pow(a[0], a[1]);
    case "hypot": return Math.hypot(a[0], a[1]);
    case "min": return Math.min(...a);
    case "max": return Math.max(...a);
    default: throw new ParseError(`Unknown function "${name}"`);
  }
}

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

/* -------------------------------------------------------------------------- */
/*  Recursive descent parser                                                   */
/* -------------------------------------------------------------------------- */

class Parser {
  private i = 0;
  constructor(
    private toks: Tok[],
    private vars: Vars,
    private mode: AngleMode,
    private ans: number,
  ) {}

  private peek(): Tok | undefined {
    return this.toks[this.i];
  }
  private next(): Tok | undefined {
    return this.toks[this.i++];
  }

  parse(): number {
    if (this.toks.length === 0) throw new ParseError("Empty expression");
    const v = this.expr();
    if (this.i < this.toks.length) throw new ParseError("Unexpected token");
    return v;
  }

  private expr(): number {
    return this.addsub();
  }

  private addsub(): number {
    let v = this.muldiv();
    for (;;) {
      const t = this.peek();
      if (t && t.t === "op" && (t.v === "+" || t.v === "-")) {
        this.next();
        const r = this.muldiv();
        v = t.v === "+" ? v + r : v - r;
      } else break;
    }
    return v;
  }

  private muldiv(): number {
    let v = this.unary();
    for (;;) {
      const t = this.peek();
      if (!t) break;
      if (t.t === "op" && (t.v === "*" || t.v === "/")) {
        this.next();
        const r = this.unary();
        v = t.v === "*" ? v * r : v / r;
        continue;
      }
      // implicit multiplication: 2π, 3(4), 2sin(x), 5Ans
      if (this.startsAtom(t)) {
        const r = this.unary();
        v = v * r;
        continue;
      }
      break;
    }
    return v;
  }

  private startsAtom(t: Tok | undefined): boolean {
    return !!t && (t.t === "num" || t.t === "id" || t.t === "lp");
  }

  private unary(): number {
    const t = this.peek();
    if (t && t.t === "op" && (t.v === "-" || t.v === "+")) {
      this.next();
      const v = this.power();
      return t.v === "-" ? -v : +v;
    }
    return this.power();
  }

  private power(): number {
    const base = this.postfix();
    const t = this.peek();
    if (t && t.t === "op" && t.v === "^") {
      this.next();
      const e = this.unary(); // right associative; allows 2^-3
      return Math.pow(base, e);
    }
    return base;
  }

  private postfix(): number {
    let v = this.atom();
    for (;;) {
      const t = this.peek();
      if (t && t.t === "op" && t.v === "!") {
        this.next();
        v = factorial(v);
      } else break;
    }
    return v;
  }

  private atom(): number {
    const t = this.next();
    if (!t) throw new ParseError("Unexpected end of expression");
    if (t.t === "num") return t.v;
    if (t.t === "lp") {
      const v = this.expr();
      const r = this.peek();
      if (!r || r.t !== "rp") throw new ParseError('Missing ")"');
      this.next();
      return v;
    }
    if (t.t === "id") {
      const name = t.v;
      const nxt = this.peek();
      // function call
      if (nxt && nxt.t === "lp" && FUNC_NAMES.has(name.toLowerCase())) {
        this.next(); // consume "("
        const args: number[] = [];
        const r = this.peek();
        if (!(r && r.t === "rp")) {
          args.push(this.expr());
          while (this.peek() && this.peek()!.t === "comma") {
            this.next();
            args.push(this.expr());
          }
        }
        const close = this.peek();
        if (!close || close.t !== "rp") throw new ParseError('Missing ")"');
        this.next();
        return callFunc(name, args, this.mode);
      }
      return this.resolveName(name);
    }
    if (t.t === "op" && (t.v === "+" || t.v === "-")) {
      // leading sign with no operand yet
      return this.unary();
    }
    throw new ParseError("Unexpected token");
  }

  private resolveName(name: string): number {
    const l = name.toLowerCase();
    if (name === "π" || l === "pi") return Math.PI;
    if (name === "e") return Math.E;
    if (l === "ans") return this.ans;
    if (name in this.vars) return this.vars[name];
    if (l in this.vars) return this.vars[l];
    if (/^[A-Za-z]$/.test(name)) {
      // unbound single-letter variable — used by the formula compiler
      throw new ParseError(`Variable "${name}" has no value`);
    }
    throw new ParseError(`Undefined symbol "${name}"`);
  }
}

/* -------------------------------------------------------------------------- */
/*  Sanitizers (Bug Fix A + Bug Fix B)                                         */
/* -------------------------------------------------------------------------- */

/** Bug Fix B — strip dangling trailing binary operators / punctuation. */
export function trimTrailing(s: string): string {
  let t = s.replace(/\s+$/, "");
  while (t.length > 0 && "+-*/×÷·^,.".includes(t[t.length - 1])) {
    t = t.slice(0, -1).replace(/\s+$/, "");
  }
  return t;
}

/** Bug Fix A — append the exact number of missing closing parentheses. */
export function closeParens(s: string): string {
  let open = 0;
  for (const ch of s) {
    if (ch === "(") open++;
    else if (ch === ")") open = Math.max(0, open - 1);
  }
  return s + ")".repeat(open);
}

/** Full hardening pipeline run on "=" — never throws for bracket/operator drift. */
export function sanitize(input: string): string {
  let s = input;
  s = trimTrailing(s);
  if (s.length === 0) return "";
  s = closeParens(s);
  // empty argument lists become explicit zeros: sin() -> sin(0), () -> (0)
  s = s.replace(/([A-Za-z√∛π]+)?\(\)/g, (_full, p) =>
    p ? `${p}(0)` : "(0)",
  );
  return s;
}

/* -------------------------------------------------------------------------- */
/*  Public evaluate API                                                        */
/* -------------------------------------------------------------------------- */

export interface EvalOptions {
  vars?: Vars;
  angleMode?: AngleMode;
  ans?: number;
}

/**
 * Numerical calculus pre-processor.
 *
 * The main evaluator only understands numbers, so definite integrals and
 * derivatives are resolved symbolically first: the function body is kept as a
 * raw string and re-evaluated at sample points with `x` bound.
 *   ∫(body, a, b)   Simpson's rule definite integral
 *   d/dx(body, c)   central-difference derivative at c
 */
function processCalculus(s: string, opts: EvalOptions): string {
  let out = s;
  // derivatives first (they may live inside an integrand body)
  for (let guard = 0; guard < 50; guard++) {
    const idx = out.indexOf("d/dx(");
    if (idx === -1) break;
    const open = idx + 4;
    const close = matchBalanced(out, open);
    const inner = out.slice(open + 1, close);
    const [body, cStr] = splitTop(inner);
    if (!body || !cStr) throw new ParseError("d/dx needs (body, point)");
    const c = evaluate(cStr, opts);
    const h = Math.max(1e-6, Math.abs(c) * 1e-6);
    const f = (x: number) => evaluate(body, { ...opts, vars: { ...(opts.vars ?? {}), x } });
    const d = (f(c + h) - f(c - h)) / (2 * h);
    out = out.slice(0, idx) + `(${d})` + out.slice(close + 1);
  }
  // definite integrals
  for (let guard = 0; guard < 50; guard++) {
    const idx = out.indexOf("∫(");
    if (idx === -1) break;
    const open = idx + 1;
    const close = matchBalanced(out, open);
    const inner = out.slice(open + 1, close);
    const [body, aStr, bStr] = splitTop(inner);
    if (!body || aStr == null || bStr == null) throw new ParseError("∫ needs (body, a, b)");
    const a = evaluate(aStr, opts);
    const b = evaluate(bStr, opts);
    const f = (x: number) => evaluate(body, { ...opts, vars: { ...(opts.vars ?? {}), x } });
    out = out.slice(0, idx) + `(${simpson(f, a, b)})` + out.slice(close + 1);
  }
  // summations
  for (let guard = 0; guard < 50; guard++) {
    const idx = out.indexOf("Σ(");
    if (idx === -1) break;
    const open = idx + 1;
    const close = matchBalanced(out, open);
    const inner = out.slice(open + 1, close);
    const [body, aStr, bStr] = splitTop(inner);
    if (!body || aStr == null || bStr == null) throw new ParseError("Σ needs (body, a, b)");
    const a = evaluate(aStr, opts);
    const b = evaluate(bStr, opts);
    let sum = 0;
    const start = Math.min(a, b);
    const end = Math.max(a, b);
    for (let k = Math.ceil(start); k <= Math.floor(end); k++) {
      sum += evaluate(body, { ...opts, vars: { ...(opts.vars ?? {}), x: k } });
    }
    out = out.slice(0, idx) + `(${sum})` + out.slice(close + 1);
  }
  return out;
}

function matchBalanced(s: string, openIdx: number): number {
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

function splitTop(s: string): string[] {
  const parts: string[] = [];
  let depth = 0, start = 0;
  for (let i = 0; i <= s.length; i++) {
    const c = s[i];
    if (c === "(") depth++;
    else if (c === ")") depth--;
    else if ((c === "," || i === s.length) && depth === 0) {
      parts.push(s.slice(start, i));
      start = i + 1;
    }
  }
  return parts;
}

function simpson(f: (x: number) => number, a: number, b: number, n = 1000): number {
  if (n % 2 === 1) n++;
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) {
    s += (i % 2 === 0 ? 2 : 4) * f(a + i * h);
  }
  return (s * h) / 3;
}

export function evaluate(input: string, opts: EvalOptions = {}): number {
  let s = sanitize(input);
  if (s.length === 0) return opts.ans ?? 0;
  s = processCalculus(s, opts);
  if (s.length === 0) return opts.ans ?? 0;
  const toks = tokenize(s);
  const parser = new Parser(
    toks,
    opts.vars ?? {},
    opts.angleMode ?? "DEG",
    opts.ans ?? 0,
  );
  return parser.parse();
}

/** Safe variant — returns null instead of throwing. Useful for live preview. */
export function tryEvaluate(input: string, opts: EvalOptions = {}): number | null {
  try {
    const v = evaluate(input, opts);
    return Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*  Variable extraction — used by the Formula Compiler                         */
/* -------------------------------------------------------------------------- */

export function extractVariables(input: string): string[] {
  const toks = tokenize(sanitize(input) || input);
  const out: string[] = [];
  for (let k = 0; k < toks.length; k++) {
    const t = toks[k];
    if (t.t !== "id") continue;
    const name = t.v;
    const low = name.toLowerCase();
    if (name === "π" || low === "pi" || name === "e" || low === "ans") continue;
    const nxt = toks[k + 1];
    if (nxt && nxt.t === "lp" && FUNC_NAMES.has(low)) continue; // it's a function
    if (!out.includes(name)) out.push(name);
  }
  return out;
}

/* -------------------------------------------------------------------------- */
/*  Result formatting (decimal / fraction / scientific)                        */
/* -------------------------------------------------------------------------- */

export interface Frac {
  num: number;
  den: number;
}

/** Best rational approximation via continued fractions. */
export function toFraction(x: number, maxDen = 1_000_000): Frac | null {
  if (!Number.isFinite(x)) return null;
  const sign = x < 0 ? -1 : 1;
  let z = Math.abs(x);
  let h1 = 1, h0 = 0, k1 = 0, k0 = 1;
  let best: Frac | null = null;
  for (let i = 0; i < 32; i++) {
    const a = Math.floor(z);
    const h2 = a * h1 + h0;
    const k2 = a * k1 + k0;
    if (k2 > maxDen) break;
    best = { num: sign * h2, den: k2 };
    h0 = h1; h1 = h2; k0 = k1; k1 = k2;
    const frac = z - a;
    if (frac < 1e-12) break;
    z = 1 / frac;
  }
  if (!best) return null;
  if (Math.abs(best.num / best.den - x) > 1e-9) return null;
  return best;
}

/** Render a numeric result back into calculator token syntax for the display. */
export function formatResult(x: number, preferFrac = true): string {
  if (!Number.isFinite(x)) return x > 0 ? "∞" : x < 0 ? "-∞" : "NaN";
  if (x === 0) return "0";

  const abs = Math.abs(x);
  // scientific envelope
  if (abs >= 1e13 || abs < 1e-9) {
    return scientific(x);
  }
  if (Number.isInteger(x)) return String(x);

  if (preferFrac) {
    const f = toFraction(x, 100000);
    if (f && f.den > 1 && f.den <= 100000) {
      const whole = Math.trunc(f.num / f.den);
      const rem = f.num - whole * f.den;
      if (whole !== 0 && rem !== 0) {
        return `${whole}+frac(${rem},${f.den})`;
      }
      return `frac(${f.num},${f.den})`;
    }
  }
  // decimal with trimmed trailing zeros
  return trimZeros(x.toPrecision(12));
}

function trimZeros(s: string): string {
  if (s.indexOf(".") === -1) return s;
  return s.replace(/0+$/, "").replace(/\.$/, "");
}

function scientific(x: number): string {
  const exp = x.toExponential(10);
  const [m, e] = exp.split("e");
  const mantissa = trimZeros(m);
  const power = parseInt(e, 10);
  return `${mantissa}×10^(${power})`;
}

export function formatDecimal(x: number): string {
  if (!Number.isFinite(x)) return String(x);
  return trimZeros(x.toPrecision(12));
}
