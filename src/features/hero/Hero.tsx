import { ArrowRight, Download } from "lucide-react";
import { useTranslation } from "react-i18next";

import { CommandRain } from "@/features/hero/CommandRain";
import { HeroIllustration } from "@/features/hero/HeroIllustration";
import { HERO_BADGES } from "@/data/heroBadges";
import { useLang } from "@/hooks/useLang";
import { useTypewriter } from "@/hooks/useTypewriter";

export function Hero() {
  const { t } = useTranslation();
  const lang = useLang();
  const typed = useTypewriter([
    t("hero.role1"),
    t("hero.role2"),
    t("hero.role3"),
    t("hero.role4"),
  ]);

  const description =
    lang === "en"
      ? "I build scalable web applications, REST APIs and business platforms with Python, FastAPI, React, Docker and PostgreSQL."
      : "Construyo aplicaciones web escalables, APIs REST y plataformas de negocio con Python, FastAPI, React, Docker y PostgreSQL.";
  const viewProjects = lang === "en" ? "View Projects" : "Ver Proyectos";
  const downloadResume = lang === "en" ? "Download Resume" : "Descargar CV";

  return (
    <section id="top" className="relative overflow-hidden">
      <CommandRain />
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-28 md:pt-32 md:pb-36 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-hero-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 backdrop-blur-md px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
            {t("hero.available")}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            {t("hero.headline_a")}
            <span className="text-neon">{t("hero.headline_b")}</span>
          </h1>
          <div className="font-mono text-lg md:text-xl text-muted-foreground h-8">
            <span className="text-neon">&gt;</span> {typed}
            <span className="inline-block w-2 h-5 bg-neon ml-1 align-middle animate-pulse" />
          </div>
          <p className="text-muted-foreground max-w-xl leading-relaxed text-base md:text-lg">
            {description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {HERO_BADGES.map((b, i) => (
              <span
                key={b}
                style={{ animationDelay: `${200 + i * 60}ms` }}
                className="animate-hero-fade-up inline-flex items-center rounded-md border border-border bg-card/50 backdrop-blur-md px-2.5 py-1 font-mono text-xs text-foreground hover:border-neon/60 hover:text-neon hover:-translate-y-0.5 hover:shadow-[0_0_16px_var(--neon-dim)] transition-all duration-300"
              >
                {b}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-neon px-5 py-3 text-sm font-mono font-semibold text-primary-foreground hover:shadow-[0_0_24px_var(--neon-dim)] hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300"
            >
              {viewProjects}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#"
              download
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 backdrop-blur-md px-5 py-3 text-sm font-mono text-foreground hover:border-neon hover:text-neon hover:-translate-y-0.5 transition-all duration-300"
            >
              <Download className="h-4 w-4" />
              {downloadResume}
            </a>
          </div>
        </div>

        <div className="relative animate-hero-fade-up" style={{ animationDelay: "120ms" }}>
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
