/**
 * ui.tsx — small themed primitives shared by every workspace panel.
 * All colors resolve through the active theme's CSS custom properties.
 */

import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--c-card-border)] bg-[var(--c-soft)] p-4 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[var(--c-accent)]">
      <span className="h-3 w-1 rounded bg-[var(--c-accent)]" />
      {children}
    </h3>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <label className="mb-1 block text-xs font-medium text-[var(--c-text-dim)]">
      {children}
    </label>
  );
}

export function Inp({
  value,
  onChange,
  onInput,
  type = "text",
  placeholder,
  className,
  rows,
  disabled,
}: {
  value?: string | number;
  onChange?: (v: string) => void;
  onInput?: (v: string) => void;
  type?: string;
  placeholder?: string;
  className?: string;
  rows?: number;
  disabled?: boolean;
}) {
  const common =
    "w-full rounded-lg border border-[var(--c-card-border)] bg-[var(--c-bg2)] px-3 py-2 text-sm text-[var(--c-text)] outline-none transition focus:border-[var(--c-accent)] focus:ring-1 focus:ring-[var(--c-accent)] placeholder:text-[var(--c-text-dim)]";
  if (type === "textarea" || rows) {
    return (
      <textarea
        value={value as string}
        rows={rows ?? 3}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(common, "font-mono resize-y", className)}
      />
    );
  }
  return (
    <input
      type={type}
      value={value as string | number}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      onInput={(e) => onInput?.((e.target as HTMLInputElement).value)}
      className={cn(common, className)}
    />
  );
}

export function Btn({
  children,
  onClick,
  variant = "ghost",
  className,
  disabled,
  title,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "accent";
  className?: string;
  disabled?: boolean;
  title?: string;
}) {
  const styles: Record<string, string> = {
    primary:
      "bg-[var(--c-accent)] text-[var(--c-bg)] hover:brightness-110 font-semibold",
    accent:
      "bg-[var(--c-eq)] text-[var(--c-eq-text)] hover:brightness-110 font-semibold",
    ghost:
      "border border-[var(--c-card-border)] bg-[var(--c-soft2)] text-[var(--c-text)] hover:border-[var(--c-accent)]",
  };
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "rounded-lg px-3 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-40",
        styles[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-[var(--c-card-border)] bg-[var(--c-bg2)] p-2.5">
      <div className="text-[0.65rem] font-medium uppercase tracking-wide text-[var(--c-text-dim)]">
        {label}
      </div>
      <div className="mt-0.5 font-mono text-sm font-semibold text-[var(--c-text)]">
        {value}
      </div>
      {hint && (
        <div className="text-[0.6rem] text-[var(--c-text-dim)]">{hint}</div>
      )}
    </div>
  );
}

export function Chip({
  children,
  active,
  onClick,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition",
        active
          ? "border-[var(--c-accent)] bg-[var(--c-accent)] text-[var(--c-bg)]"
          : "border-[var(--c-card-border)] bg-[var(--c-soft2)] text-[var(--c-text-dim)] hover:text-[var(--c-text)]",
      )}
    >
      {children}
    </button>
  );
}
