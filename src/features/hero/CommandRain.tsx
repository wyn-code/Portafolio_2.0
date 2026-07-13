import { useEffect, useState } from "react";

import { COMMAND_LINES } from "@/data/commandLines";

interface Column {
  id: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
  lines: string[];
}

export function CommandRain() {
  const [cols, setCols] = useState<Column[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 5 : 10;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);
    setCols(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i / count) * 100 + rand(-2, 2),
        delay: -rand(0, 24),
        duration: rand(28, 46),
        opacity: rand(0.02, 0.04),
        lines: shuffle(COMMAND_LINES).slice(0, 7),
      })),
    );
  }, []);

  return (
    <div className="command-rain" aria-hidden>
      {cols.map((c) => (
        <div
          key={c.id}
          className="command-rain__col"
          style={{
            left: `${c.left}%`,
            opacity: c.opacity,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          {c.lines.map((l, idx) => (
            <div key={idx}>{l}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
