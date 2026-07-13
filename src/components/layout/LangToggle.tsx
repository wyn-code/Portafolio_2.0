import { useLanguage } from "@/hooks/useLanguage";
import type { Locale } from "@/types";

const OPTIONS: { code: Locale; flag: string; label: string }[] = [
  { code: "es", flag: "🇦🇷", label: "Español" },
  { code: "en", flag: "🇬🇧", label: "English" },
];

export function LangToggle() {
  const { lang, switchTo } = useLanguage();

  return (
    <div
      role="radiogroup"
      aria-label="Language"
      className="relative flex items-center gap-0.5 rounded-full border border-border/60 bg-card/30 backdrop-blur-xl p-1 shadow-sm hover:border-neon/50 transition-all"
    >
      {OPTIONS.map((o) => {
        const active = lang === o.code;
        return (
          <button
            key={o.code}
            role="radio"
            aria-checked={active}
            aria-label={o.label}
            title={o.label}
            onClick={() => switchTo(o.code)}
            className={`relative flex h-7 w-7 items-center justify-center rounded-full text-base leading-none transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/60 ${
              active
                ? "bg-neon/15 shadow-[0_0_14px_var(--neon-dim)] scale-110"
                : "opacity-60 hover:opacity-100 hover:scale-105"
            }`}
          >
            <span aria-hidden>{o.flag}</span>
          </button>
        );
      })}
    </div>
  );
}
