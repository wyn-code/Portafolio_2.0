import type { ReactNode } from "react";

import { useReveal } from "@/hooks/useReveal";

type Variant = "up" | "scale" | "fade";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: Variant;
}

const HIDDEN: Record<Variant, string> = {
  up: "opacity-0 translate-y-6",
  scale: "opacity-0 translate-y-4 scale-[0.97]",
  fade: "opacity-0",
};

export function Reveal({ children, delay = 0, className = "", variant = "up" }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms`, willChange: "transform, opacity" }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0 scale-100" : HIDDEN[variant]
      } ${className}`}
    >
      {children}
    </div>
  );
}
