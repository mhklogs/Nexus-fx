/**
 * engine.ts — React hook that binds the parser to interactive calculator state:
 * expression buffer, caret position, Ans memory, scroll-back history, Shift/Alpha
 * modifier state, angle mode and the "=" execution flow (which runs the
 * sanitizer pipeline before evaluating).
 */

import { useCallback, useMemo, useState } from "react";
import {
  evaluate,
  formatResult,
  tryEvaluate,
  type AngleMode,
} from "./parser";

export interface HistoryEntry {
  expr: string;
  result: string;
  value: number;
}

export interface CalcEngine {
  expr: string;
  caret: number;
  ans: number;
  vars: Record<string, number>;
  setVar: (name: string, val: number) => void;
  clearVars: () => void;
  shiftOn: boolean;
  alphaOn: boolean;
  angleMode: AngleMode;
  preferFrac: boolean;
  justEvaluated: boolean;
  history: HistoryEntry[];
  recallIndex: number;
  preview: { value: number | null; formatted: string };
  lastResult: HistoryEntry | null;
  press: (text: string, opts?: { atom?: boolean }) => void;
  backspace: () => void;
  clearAll: () => void;
  equals: () => void;
  moveCaret: (dir: -1 | 1) => void;
  setCaret: (n: number) => void;
  setExpr: (s: string) => void;
  recall: (dir: -1 | 1) => void;
  toggleShift: () => void;
  toggleAlpha: () => void;
  toggleAngle: () => void;
  toggleFrac: () => void;
  showHistory: boolean;
  setShowHistory: (b: boolean) => void;
  toggleHistory: () => void;
  clearHistory: () => void;
}

const OPERATOR_START = /^[+\-*/^×÷]/;

export function useCalculator(): CalcEngine {
  const [expr, setExprState] = useState("");
  const [caret, setCaretState] = useState(0);
  const [ans, setAns] = useState(0);
  const [shiftOn, setShiftOn] = useState(false);
  const [alphaOn, setAlphaOn] = useState(false);
  const [angleMode, setAngleMode] = useState<AngleMode>("DEG");
  const [preferFrac, setPreferFrac] = useState(true);
  const [justEvaluated, setJustEvaluated] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [recallIndex, setRecallIndex] = useState(-1);
  const [lastResult, setLastResult] = useState<HistoryEntry | null>(null);
  const [vars, setVars] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("nexusfx.variables");
      if (saved) return JSON.parse(saved);
    } catch {}
    return { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, X: 0, Y: 0, M: 0 };
  });

  const setVar = useCallback((name: string, value: number) => {
    setVars((prev) => {
      const next = { ...prev, [name]: value };
      try {
        localStorage.setItem("nexusfx.variables", JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const clearVars = useCallback(() => {
    const next = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, X: 0, Y: 0, M: 0 };
    setVars(next);
    try {
      localStorage.setItem("nexusfx.variables", JSON.stringify(next));
    } catch {}
  }, []);

  const [showHistory, setShowHistory] = useState(false);
  const toggleHistory = useCallback(() => setShowHistory((h) => !h), []);
  const clearHistory = useCallback(() => {
    setHistory([]);
    setRecallIndex(-1);
  }, []);

  const commit = useCallback(
    (next: string, caretPos: number, evalReset = false) => {
      setExprState(next);
      setCaretState(Math.max(0, Math.min(caretPos, next.length)));
      if (evalReset) setJustEvaluated(false);
    },
    [],
  );

  const press = useCallback(
    (text: string) => {
      // resolve "just evaluated" continuation semantics
      if (justEvaluated) {
        setJustEvaluated(false);
        if (OPERATOR_START.test(text)) {
          // continue from the answer:  Ans <op> ...
          const base = formatResult(ans, preferFrac);
          const next = base + text;
          commit(next, next.length);
          return;
        }
        // start a fresh expression
        commit(text, text.length);
        return;
      }
      const start = caret;
      const next = expr.slice(0, start) + text + expr.slice(start);
      // function wrappers (end in "(") drop the caret inside the argument
      const pos = start + text.length;
      commit(next, pos);
    },
    [ans, caret, commit, expr, justEvaluated, preferFrac],
  );

  const backspace = useCallback(() => {
    if (justEvaluated) {
      setJustEvaluated(false);
      commit("", 0);
      return;
    }
    if (caret === 0) return;
    // swallow an entire function wrapper name when deleting past its "("
    const before = expr.slice(0, caret);
    const m = before.match(/[A-Za-z√∛π]+\($/);
    if (m) {
      const cut = caret - m[0].length;
      commit(expr.slice(0, cut) + expr.slice(caret), cut);
      return;
    }
    const next = expr.slice(0, caret - 1) + expr.slice(caret);
    commit(next, caret - 1);
  }, [caret, commit, expr, justEvaluated]);

  const clearAll = useCallback(() => {
    setExprState("");
    setCaretState(0);
    setJustEvaluated(false);
    setRecallIndex(-1);
    setShiftOn(false);
    setAlphaOn(false);
  }, []);

  const equals = useCallback(() => {
    let value: number;
    try {
      value = evaluate(expr, { ans, angleMode, vars });
    } catch {
      setLastResult({ expr, result: "Syntax ERROR", value: NaN });
      setJustEvaluated(false);
      return;
    }
    if (!Number.isFinite(value)) {
      // surface a Math ERROR but never crash the app
      setLastResult({
        expr,
        result: "Math ERROR",
        value: NaN,
      });
      setJustEvaluated(false);
      return;
    }
    const formatted = formatResult(value, preferFrac);
    setAns(value);
    setLastResult({ expr, result: formatted, value });
    setHistory((h) => [...h.slice(-49), { expr, result: formatted, value }]);
    setRecallIndex(-1);
    setJustEvaluated(true);
  }, [angleMode, ans, expr, preferFrac, vars]);

  const moveCaret = useCallback(
    (dir: -1 | 1) => {
      setJustEvaluated(false);
      setCaretState((c) => Math.max(0, Math.min(c + dir, expr.length)));
    },
    [expr.length],
  );

  const setCaret = useCallback(
    (n: number) => setCaretState(Math.max(0, Math.min(n, expr.length))),
    [expr.length],
  );

  const setExpr = useCallback(
    (s: string) => {
      setExprState(s);
      setCaretState(s.length);
      setJustEvaluated(false);
      setRecallIndex(-1);
    },
    [],
  );

  const recall = useCallback(
    (dir: -1 | 1) => {
      if (history.length === 0) return;
      let idx = recallIndex;
      if (idx === -1) idx = history.length; // start beyond end
      idx += dir;
      idx = Math.max(0, Math.min(idx, history.length - 1));
      setRecallIndex(idx);
      const entry = history[idx];
      setExprState(entry.expr);
      setCaretState(entry.expr.length);
      setJustEvaluated(false);
    },
    [history, recallIndex],
  );

  const preview = useMemo(() => {
    const value = tryEvaluate(expr, { ans, angleMode, vars });
    return {
      value,
      formatted: value == null ? "" : formatResult(value, preferFrac),
    };
  }, [expr, ans, angleMode, preferFrac, vars]);

  const toggleShift = useCallback(() => {
    setShiftOn((s) => !s);
    setAlphaOn(false);
  }, []);
  const toggleAlpha = useCallback(() => {
    setAlphaOn((a) => !a);
    setShiftOn(false);
  }, []);
  const toggleAngle = useCallback(
    () => setAngleMode((m) => (m === "DEG" ? "RAD" : "DEG")),
    [],
  );
  const toggleFrac = useCallback(() => setPreferFrac((f) => !f), []);

  return {
    expr, caret, ans, vars, setVar, clearVars, shiftOn, alphaOn, angleMode, preferFrac,
    justEvaluated, history, recallIndex, preview, lastResult,
    press, backspace, clearAll, equals, moveCaret, setCaret, setExpr,
    recall, toggleShift, toggleAlpha, toggleAngle, toggleFrac,
    showHistory, setShowHistory, toggleHistory, clearHistory,
  };
}
