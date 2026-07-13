import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { isLight, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card/40 backdrop-blur-md text-muted-foreground hover:text-neon hover:border-neon/60 hover:-translate-y-0.5 hover:shadow-[0_0_18px_var(--neon-dim)] transition-all duration-300"
    >
      <Sun
        className={`h-4 w-4 absolute transition-all duration-500 ${
          isLight ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
        }`}
      />
      <Moon
        className={`h-4 w-4 absolute transition-all duration-500 ${
          isLight ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
        }`}
      />
    </button>
  );
}
