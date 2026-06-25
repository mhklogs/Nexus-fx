/**
 * mathlib.ts — workspace maths: matrices, statistics, distributions,
 * physical constants and SI unit conversion. Pure functions, no UI.
 */

import { nCr, nPr, toFraction } from "./parser";

/* -------------------------------------------------------------------------- */
/*  Matrix algebra (1x1 .. 4x4)                                                */
/* -------------------------------------------------------------------------- */

export type Matrix = number[][];

export function matCreate(rows: number, cols: number, fill = 0): Matrix {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));
}

export function transpose(m: Matrix): Matrix {
  return m[0].map((_, c) => m.map((row) => row[c]));
}

export function minor(m: Matrix, r: number, c: number): Matrix {
  return m
    .filter((_, i) => i !== r)
    .map((row) => row.filter((_, j) => j !== c));
}

export function determinant(m: Matrix): number {
  const n = m.length;
  if (n === 1) return m[0][0];
  if (n === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  let det = 0;
  for (let c = 0; c < n; c++) {
    const sign = c % 2 === 0 ? 1 : -1;
    det += sign * m[0][c] * determinant(minor(m, 0, c));
  }
  return det;
}

export function cofactorMatrix(m: Matrix): Matrix {
  return m.map((row, i) =>
    row.map((_, j) => {
      const sign = (i + j) % 2 === 0 ? 1 : -1;
      return sign * determinant(minor(m, i, j));
    }),
  );
}

/** Adjoint = transpose of the cofactor matrix. */
export function adjoint(m: Matrix): Matrix {
  return transpose(cofactorMatrix(m));
}

export function inverse(m: Matrix): Matrix | null {
  const det = determinant(m);
  if (Math.abs(det) < 1e-12) return null;
  const adj = adjoint(m);
  return adj.map((row) => row.map((v) => v / det));
}

export function trace(m: Matrix): number {
  return m.reduce((s, row, i) => s + (row[i] ?? 0), 0);
}

export function matrixMultiply(a: Matrix, b: Matrix): Matrix {
  const r = a.length;
  const c = b[0].length;
  const inner = b.length;
  const out = matCreate(r, c);
  for (let i = 0; i < r; i++)
    for (let j = 0; j < c; j++) {
      let s = 0;
      for (let k = 0; k < inner; k++) s += a[i][k] * b[k][j];
      out[i][j] = s;
    }
  return out;
}

export function matrixAdd(a: Matrix, b: Matrix, sign = 1): Matrix {
  return a.map((row, i) => row.map((v, j) => v + sign * b[i][j]));
}

/** Snap near-integral floats to integers for cleaner display. */
export function clean(n: number): number {
  if (Number.isFinite(n) && Math.abs(n - Math.round(n)) < 1e-9) return Math.round(n);
  return n;
}

/** Format a single numeric entry, optionally as a fraction. */
export function fmtEntry(n: number, asFraction: boolean): string {
  n = clean(n);
  if (Number.isInteger(n)) return String(n);
  if (asFraction) {
    const f = toFraction(n, 100000);
    if (f && f.den > 1 && Math.abs(f.den) <= 100000) return `${f.num}/${f.den}`;
  }
  return n.toPrecision(8).replace(/0+$/, "").replace(/\.$/, "");
}

/* -------------------------------------------------------------------------- */
/*  Statistics                                                                 */
/* -------------------------------------------------------------------------- */

export interface Stats {
  n: number;
  sum: number;
  mean: number;
  median: number;
  mode: number[];
  min: number;
  max: number;
  range: number;
  variancePop: number;
  varianceSample: number;
  sdPop: number;
  sdSample: number;
  q1: number;
  q3: number;
}

export function parseNumberList(raw: string): number[] {
  return raw
    .split(/[\s,;]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0)
    .map((t) => parseFloat(t))
    .filter((n) => Number.isFinite(n));
}

export function computeStats(data: number[]): Stats | null {
  if (data.length === 0) return null;
  const n = data.length;
  const sorted = [...data].sort((a, b) => a - b);
  const sum = data.reduce((s, x) => s + x, 0);
  const mean = sum / n;
  const sq = data.reduce((s, x) => s + (x - mean) ** 2, 0);
  const variancePop = sq / n;
  const varianceSample = n > 1 ? sq / (n - 1) : 0;

  const median = quantile(sorted, 0.5);
  return {
    n,
    sum,
    mean,
    median,
    mode: computeMode(data),
    min: sorted[0],
    max: sorted[n - 1],
    range: sorted[n - 1] - sorted[0],
    variancePop,
    varianceSample,
    sdPop: Math.sqrt(variancePop),
    sdSample: Math.sqrt(varianceSample),
    q1: quantile(sorted, 0.25),
    q3: quantile(sorted, 0.75),
  };
}

function quantile(sorted: number[], p: number): number {
  const n = sorted.length;
  const pos = (n - 1) * p;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined)
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  return sorted[base];
}

function computeMode(data: number[]): number[] {
  const counts = new Map<number, number>();
  for (const v of data) counts.set(v, (counts.get(v) ?? 0) + 1);
  let max = 0;
  for (const c of counts.values()) max = Math.max(max, c);
  if (max <= 1) return [];
  return [...counts.entries()].filter(([, c]) => c === max).map(([v]) => v).sort((a, b) => a - b);
}

/* -------------------------------------------------------------------------- */
/*  Probability distributions                                                  */
/* -------------------------------------------------------------------------- */

export function binomialPmf(n: number, p: number, k: number): number {
  if (p < 0 || p > 1) return NaN;
  return nCr(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

export function binomialCdf(n: number, p: number, k: number): number {
  let s = 0;
  for (let i = 0; i <= k; i++) s += binomialPmf(n, p, i);
  return s;
}

export function poissonPmf(lambda: number, k: number): number {
  if (lambda < 0) return NaN;
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorialLocal(k);
}

function factorialLocal(k: number): number {
  let r = 1;
  for (let i = 2; i <= k; i++) r *= i;
  return r;
}

export function poissonCdf(lambda: number, k: number): number {
  let s = 0;
  for (let i = 0; i <= k; i++) s += poissonPmf(lambda, i);
  return s;
}

// Abramowitz & Stegun erf approximation -> accurate to ~1e-7.
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const t = 1 / (1 + p * x);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

export function normalPdf(x: number, mu = 0, sigma = 1): number {
  if (sigma <= 0) return NaN;
  const z = (x - mu) / sigma;
  return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
}

export function normalCdf(x: number, mu = 0, sigma = 1): number {
  if (sigma <= 0) return NaN;
  return 0.5 * (1 + erf((x - mu) / (sigma * Math.SQRT2)));
}

export function combinations(n: number, r: number) {
  return { nCr: nCr(n, r), nPr: nPr(n, r) };
}

/* -------------------------------------------------------------------------- */
/*  Scientific constants                                                       */
/* -------------------------------------------------------------------------- */

export interface Constant {
  sym: string;
  name: string;
  value: string; // calculator-syntax value for pasting
  group: string;
}

export const CONSTANTS: Constant[] = [
  { sym: "c", name: "Speed of light", value: "299792458", group: "Universal" },
  { sym: "G", name: "Gravitational constant", value: "6.6743×10^(-11)", group: "Universal" },
  { sym: "g", name: "Gravity (Earth)", value: "9.80665", group: "Universal" },
  { sym: "h", name: "Planck constant", value: "6.62607015×10^(-34)", group: "Universal" },
  { sym: "ℏ", name: "Reduced Planck", value: "1.054571817×10^(-34)", group: "Universal" },
  { sym: "NA", name: "Avogadro number", value: "6.02214076×10^(23)", group: "Universal" },
  { sym: "kB", name: "Boltzmann constant", value: "1.380649×10^(-23)", group: "Universal" },
  { sym: "R", name: "Gas constant", value: "8.314462618", group: "Universal" },
  { sym: "e", name: "Elementary charge", value: "1.602176634×10^(-19)", group: "Electromagnetic" },
  { sym: "ε₀", name: "Permittivity of vacuum", value: "8.8541878128×10^(-12)", group: "Electromagnetic" },
  { sym: "μ₀", name: "Permeability of vacuum", value: "1.25663706212×10^(-6)", group: "Electromagnetic" },
  { sym: "me", name: "Electron mass", value: "9.1093837×10^(-31)", group: "Atomic" },
  { sym: "mp", name: "Proton mass", value: "1.67262192×10^(-27)", group: "Atomic" },
  { sym: "mn", name: "Neutron mass", value: "1.674927498×10^(-27)", group: "Atomic" },
  { sym: "F", name: "Faraday constant", value: "96485.33212", group: "Electromagnetic" },
  { sym: "σ", name: "Stefan–Boltzmann", value: "5.670374×10^(-8)", group: "Universal" },
  { sym: "π", name: "Pi", value: "π", group: "Mathematical" },
  { sym: "τ", name: "Tau (2π)", value: "2π", group: "Mathematical" },
  { sym: "φ", name: "Golden ratio", value: "(1+√(5))/2", group: "Mathematical" },
  { sym: "e", name: "Euler's number", value: "e", group: "Mathematical" },
];

/* -------------------------------------------------------------------------- */
/*  SI / unit conversion                                                       */
/* -------------------------------------------------------------------------- */

export interface UnitDef {
  id: string;
  label: string;
  toBase: number; // multiply value by this to reach the base unit
}

export interface UnitCategory {
  id: string;
  name: string;
  base: string;
  units: UnitDef[];
  // for temperature we convert with functions instead of factors
  custom?: "temperature";
}

export const UNIT_CATEGORIES: UnitCategory[] = [
  {
    id: "length",
    name: "Distance",
    base: "metre",
    units: [
      { id: "nm", label: "Nanometre (nm)", toBase: 1e-9 },
      { id: "um", label: "Micrometre (µm)", toBase: 1e-6 },
      { id: "mm", label: "Millimetre (mm)", toBase: 1e-3 },
      { id: "cm", label: "Centimetre (cm)", toBase: 1e-2 },
      { id: "m", label: "Metre (m)", toBase: 1 },
      { id: "km", label: "Kilometre (km)", toBase: 1e3 },
      { id: "in", label: "Inch (in)", toBase: 0.0254 },
      { id: "ft", label: "Foot (ft)", toBase: 0.3048 },
      { id: "yd", label: "Yard (yd)", toBase: 0.9144 },
      { id: "mi", label: "Mile (mi)", toBase: 1609.344 },
      { id: "ly", label: "Light year", toBase: 9.4607e15 },
    ],
  },
  {
    id: "mass",
    name: "Mass",
    base: "kilogram",
    units: [
      { id: "mg", label: "Milligram (mg)", toBase: 1e-6 },
      { id: "g", label: "Gram (g)", toBase: 1e-3 },
      { id: "kg", label: "Kilogram (kg)", toBase: 1 },
      { id: "t", label: "Tonne (t)", toBase: 1e3 },
      { id: "oz", label: "Ounce (oz)", toBase: 0.0283495 },
      { id: "lb", label: "Pound (lb)", toBase: 0.453592 },
      { id: "ton", label: "US ton", toBase: 907.185 },
      { id: "u", label: "Atomic mass (u)", toBase: 1.66054e-27 },
    ],
  },
  {
    id: "volume",
    name: "Volume",
    base: "litre",
    units: [
      { id: "ml", label: "Millilitre (mL)", toBase: 1e-3 },
      { id: "l", label: "Litre (L)", toBase: 1 },
      { id: "m3", label: "Cubic metre (m³)", toBase: 1e3 },
      { id: "cm3", label: "Cubic cm (cm³)", toBase: 1e-3 },
      { id: "tsp", label: "Teaspoon (US)", toBase: 0.00492892 },
      { id: "tbsp", label: "Tablespoon (US)", toBase: 0.0147868 },
      { id: "cup", label: "Cup (US)", toBase: 0.236588 },
      { id: "pt", label: "Pint (US)", toBase: 0.473176 },
      { id: "gal", label: "Gallon (US)", toBase: 3.78541 },
    ],
  },
  {
    id: "pressure",
    name: "Pressure",
    base: "pascal",
    units: [
      { id: "pa", label: "Pascal (Pa)", toBase: 1 },
      { id: "kpa", label: "Kilopascal (kPa)", toBase: 1e3 },
      { id: "mpa", label: "Megapascal (MPa)", toBase: 1e6 },
      { id: "bar", label: "Bar", toBase: 1e5 },
      { id: "atm", label: "Atmosphere (atm)", toBase: 101325 },
      { id: "mmhg", label: "mmHg (torr)", toBase: 133.322 },
      { id: "psi", label: "PSI", toBase: 6894.76 },
    ],
  },
  {
    id: "temperature",
    name: "Temperature",
    base: "celsius",
    custom: "temperature",
    units: [
      { id: "c", label: "Celsius (°C)", toBase: 1 },
      { id: "f", label: "Fahrenheit (°F)", toBase: 1 },
      { id: "k", label: "Kelvin (K)", toBase: 1 },
      { id: "r", label: "Rankine (°R)", toBase: 1 },
    ],
  },
];

function toKelvin(value: number, id: string): number {
  switch (id) {
    case "c": return value + 273.15;
    case "f": return (value - 32) * (5 / 9) + 273.15;
    case "k": return value;
    case "r": return value * (5 / 9);
    default: return value;
  }
}
function fromKelvin(k: number, id: string): number {
  switch (id) {
    case "c": return k - 273.15;
    case "f": return (k - 273.15) * (9 / 5) + 32;
    case "k": return k;
    case "r": return k * (9 / 5);
    default: return k;
  }
}

export function convert(value: number, from: string, to: string, cat: UnitCategory): number {
  if (cat.custom === "temperature") {
    return fromKelvin(toKelvin(value, from), to);
  }
  const f = cat.units.find((u) => u.id === from)?.toBase ?? 1;
  const t = cat.units.find((u) => u.id === to)?.toBase ?? 1;
  return (value * f) / t;
}
