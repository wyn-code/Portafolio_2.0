import { MapPin } from "lucide-react";
import cv from "../../assets/CV_Massocco_Bruno.pdf";
import { FOOTER_SOCIALS } from "@/data/socialLinks";
import { useLang } from "@/hooks/useLang";
import { CommandRain } from "@/features/hero/CommandRain";

const COPY = {
  en: {
    nameLine1: "Bruno",
    nameLine2: "Massocco",
    role: "Backend & Full Stack Developer",
    location: "Buenos Aires, Argentina",
    contact: "Contacto",
    downloadCV: "Descargar CV",
  },
  es: {
    nameLine1: "Bruno",
    nameLine2: "Massocco",
    role: "Desarrollador Backend & Full Stack",
    location: "Buenos Aires, Argentina",
    contact: "Contacto",
    downloadCV: "Descargar CV",
  },
};

const HERO_SOCIALS = FOOTER_SOCIALS.filter((s) => s.label === "GitHub" || s.label === "LinkedIn");

export function Hero() {
  const lang = useLang();
  const c = COPY[lang];

  return (
    <section id="top" className="relative flex min-h-[85vh] items-center justify-center px-6 py-16 md:py-20">
      <CommandRain />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 45%, var(--background) 0%, transparent 100%)",
        }}
        aria-hidden
      />
      <div className="relative z-10 animate-hero-fade-up mx-auto max-w-3xl space-y-8 text-center">
        <h1 className="font-display text-6xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-7xl md:text-8xl">
          {c.nameLine1}
          <br />
          {c.nameLine2}
        </h1>

        <p className="font-mono text-base tracking-wide text-muted-foreground md:text-lg">
          {c.role}
        </p>

        <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{c.location}</span>
        </div>

        <div className="flex items-center justify-center gap-6 pt-2">
          <a
            href="#contact"
            className="font-mono text-sm text-foreground underline-offset-4 transition-colors duration-200 hover:text-neon hover:underline"
          >
            {c.contact}
          </a>
          <a
            href={cv}
            download
            className="font-mono text-sm text-foreground underline-offset-4 transition-colors duration-200 hover:text-neon hover:underline"
          >
            {c.downloadCV}
          </a>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          {HERO_SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-neon/60 hover:text-neon"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
