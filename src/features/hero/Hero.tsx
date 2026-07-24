import { Download, Linkedin, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import cv from '../../assets/CV_Massocco_Bruno.pdf'
import { CommandRain } from "@/features/hero/CommandRain";
import { HeroIllustration } from "@/features/hero/HeroIllustration";
import { HERO_BADGES } from "@/data/heroBadges";
import { useLang } from "@/hooks/useLang";
import { useTypewriter } from "@/hooks/useTypewriter";

const LINKEDIN_URL = "https://www.linkedin.com/in/bruno-massocco-49b113307/";

export function Hero() {
  const { t } = useTranslation();
  const lang = useLang();
  const typed = useTypewriter([
    t("hero.role1"),
    t("hero.role2"),
    t("hero.role3"),
    t("hero.role4"),
  ]);

  const name = "Massocco Bruno";
  const role = lang === "en" ? "Backend & Full Stack Developer" : "Desarrollador Backend & Full Stack";
  const location = lang === "en" ? "Buenos Aires, Argentina · Available remote" : "Buenos Aires, Argentina · Disponible remoto";
  const valueProp =
    lang === "en"
      ? "I help startups and small businesses ship reliable web platforms and REST APIs — from database design to production deployment — using Python, FastAPI, React, Docker and PostgreSQL."
      : "Ayudo a startups y pequeñas empresas a lanzar plataformas web y APIs REST confiables — desde el diseño de la base de datos hasta el despliegue en producción — con Python, FastAPI, React, Docker y PostgreSQL.";
  const downloadResume = lang === "en" ? "Download CV" : "Descargar CV";
  const viewLinkedIn = lang === "en" ? "View LinkedIn" : "Ver LinkedIn";

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
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              {name}
            </h1>
            <div className="text-xl md:text-2xl font-semibold text-neon">
              {role}
            </div>
            <div className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-neon" />
              {location}
            </div>
          </div>
          <div className="font-mono text-base md:text-lg text-muted-foreground h-7">
            <span className="text-neon">&gt;</span> {typed}
            <span className="inline-block w-2 h-4 bg-neon ml-1 align-middle animate-pulse" />
          </div>
          <p className="text-muted-foreground max-w-xl leading-relaxed text-base md:text-lg">
            {valueProp}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={cv}
              download
              className="inline-flex items-center gap-2 rounded-md bg-neon px-5 py-3 text-sm font-mono font-semibold text-primary-foreground hover:shadow-[0_0_24px_var(--neon-dim)] hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300"
            >
              <Download className="h-4 w-4" />
              {downloadResume}
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-md border border-neon/60 bg-card/40 backdrop-blur-md px-5 py-3 text-sm font-mono font-semibold text-neon hover:bg-neon/10 hover:-translate-y-0.5 hover:shadow-[0_0_18px_var(--neon-dim)] transition-all duration-300"
            >
              <Linkedin className="h-4 w-4" />
              {viewLinkedIn}
            </a>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2">
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
        </div>

        <div className="relative animate-hero-fade-up" style={{ animationDelay: "120ms" }}>
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
