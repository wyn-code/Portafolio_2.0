import { useEffect, useState } from "react";

import { LangToggle } from "@/components/layout/LangToggle";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { NAV_LINKS, SECTION_IDS } from "@/data/navLinks";
import { useLang } from "@/hooks/useLang";

export function Navbar() {
  const lang = useLang();
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full pt-4">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-3 rounded-full border border-border/70 bg-card/60 px-3 py-2 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
          <a href="#top" className="group flex shrink-0 items-center gap-2 pl-1">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-neon/50 font-mono text-xs font-bold text-neon transition-all group-hover:glow-border">
              MB
              <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
            </span>
          </a>

          <nav className="flex items-center gap-0.5 sm:gap-1">
            {NAV_LINKS.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  title={item.label[lang]}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 font-mono text-xs transition-all duration-300 sm:px-3 ${
                    isActive
                      ? "bg-neon/12 text-neon border border-neon/40"
                      : "border border-transparent text-muted-foreground hover:text-neon hover:bg-neon/5"
                  }`}
                >
                  <item.icon className="h-3.5 w-3.5" />
                  <span className="hidden md:inline">{item.label[lang]}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-1">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
