"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";
import { cn } from "../lib/utils";

type RevealProps = {
  children?: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  style?: CSSProperties;
};

export default function Reveal({ children, className, delay = 0, as, style }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}
