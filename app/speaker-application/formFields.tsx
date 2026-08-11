"use client";

import type { ChangeEvent, ReactNode } from "react";
import { countWords } from "../lib/validateSpeakerApplication";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'Inter Tight'",
  fontWeight: 600,
  fontSize: 14.5,
  color: "#e5e5e5",
  marginBottom: 8,
};

const hintStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#737373",
  marginBottom: 10,
  lineHeight: 1.5,
};

const errorStyle: React.CSSProperties = {
  fontSize: 12.5,
  color: "#ff6a5e",
  marginTop: 6,
};

const baseFieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,.14)",
  background: "rgba(255,255,255,.03)",
  color: "#f5f5f5",
  fontSize: 15,
  fontFamily: "'Inter'",
};

type FieldWrapProps = {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
};

export function FieldWrap({ label, required, hint, error, children }: FieldWrapProps) {
  return (
    <div style={{ marginBottom: 26 }}>
      <label style={labelStyle}>
        {label} {required && <span style={{ color: "var(--ted)" }}>*</span>}
      </label>
      {hint && <div style={hintStyle}>{hint}</div>}
      {children}
      {error && <div style={errorStyle}>{error}</div>}
    </div>
  );
}

type TextFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  hint?: string;
  error?: string;
  type?: string;
  placeholder?: string;
};

export function TextField({ label, name, value, onChange, required, hint, error, type = "text", placeholder }: TextFieldProps) {
  return (
    <FieldWrap label={label} required={required} hint={hint} error={error}>
      <input
        className={`field${error ? " field-error" : ""}`}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={baseFieldStyle}
      />
    </FieldWrap>
  );
}

type TextAreaFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  hint?: string;
  error?: string;
  placeholder?: string;
  rows?: number;
  maxWords?: number;
};

export function TextAreaField({
  label,
  name,
  value,
  onChange,
  required,
  hint,
  error,
  placeholder,
  rows = 5,
  maxWords,
}: TextAreaFieldProps) {
  const words = countWords(value);
  const overLimit = !!maxWords && words > maxWords;
  return (
    <FieldWrap label={label} required={required} hint={hint} error={error}>
      <textarea
        className={`field${error ? " field-error" : ""}`}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        style={{ ...baseFieldStyle, resize: "vertical", lineHeight: 1.6, fontFamily: "'Inter'" }}
      />
      {maxWords !== undefined && (
        <div style={{ fontSize: 12.5, color: overLimit ? "#ff6a5e" : "#5c5c5c", marginTop: 6, textAlign: "right" }}>
          {words} / {maxWords} words
        </div>
      )}
    </FieldWrap>
  );
}

type YesNoToggleProps = {
  label: string;
  value: "yes" | "no" | null;
  onChange: (v: "yes" | "no") => void;
  required?: boolean;
  error?: string;
};

export function YesNoToggle({ label, value, onChange, required, error }: YesNoToggleProps) {
  return (
    <FieldWrap label={label} required={required} error={error}>
      <div style={{ display: "flex", gap: 10 }} role="radiogroup" aria-label={label}>
        {(["yes", "no"] as const).map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt)}
              className="toggle-pill"
              style={{
                padding: "10px 26px",
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                border: `1px solid ${active ? "var(--ted)" : "rgba(255,255,255,.16)"}`,
                background: active ? "rgba(230,43,30,.15)" : "rgba(255,255,255,.03)",
                color: active ? "#ff8a7e" : "#d4d4d4",
              }}
            >
              {opt === "yes" ? "Yes" : "No"}
            </button>
          );
        })}
      </div>
    </FieldWrap>
  );
}

type CheckboxRowProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  error?: boolean;
};

export function CheckboxRow({ checked, onChange, children, error }: CheckboxRowProps) {
  return (
    <label
      className="check-row"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "14px 16px",
        borderRadius: 10,
        border: `1px solid ${error ? "rgba(230,43,30,.6)" : "rgba(255,255,255,.1)"}`,
        background: "rgba(255,255,255,.02)",
        marginBottom: 10,
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ marginTop: 3, width: 16, height: 16, accentColor: "var(--ted)", cursor: "pointer", flexShrink: 0 }}
      />
      <span style={{ fontSize: 14.5, lineHeight: 1.55, color: "#d4d4d4" }}>{children}</span>
    </label>
  );
}

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div style={{ marginBottom: 26, marginTop: 54 }}>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11.5,
          letterSpacing: ".2em",
          textTransform: "uppercase",
          color: "var(--ted)",
          marginBottom: 10,
        }}
      >
        {eyebrow}
      </div>
      <h2
        className="display"
        style={{
          fontSize: "clamp(22px, 3vw, 28px)",
        }}
      >
        {title}
      </h2>
      <div style={{ height: 1, background: "rgba(255,255,255,.08)", marginTop: 22 }} />
    </div>
  );
}
