import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { LangToggle } from "@/components/layout/LangToggle";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { NAV_LINKS, SECTION_IDS } from "@/data/navLinks";

export function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-md border border-neon/50 font-mono text-sm font-bold text-neon transition-all group-hover:glow-border">
            MB
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-neon animate-pulse" />
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-mono transition-colors relative group ${
                  isActive ? "text-neon" : "text-muted-foreground hover:text-neon"
                }`}
              >
                {t(item.labelKey)}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-neon transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
