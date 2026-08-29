import { Download, Github, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import cv from "../../assets/CV_Massocco_Bruno.pdf";
import { CommandRain } from "@/features/hero/CommandRain";
import { HeroIllustration } from "@/features/hero/HeroIllustration";
import { HERO_BADGES } from "@/data/heroBadges";
import { useLang } from "@/hooks/useLang";
import { useTypewriter } from "@/hooks/useTypewriter";

const LINKEDIN_URL = "https://www.linkedin.com/in/bruno-massocco-49b113307/";
const GITHUB_URL = "https://github.com/wyn-code";
const EMAIL_URL = "mailto:brunoo6.massocco@gmail.com";

const SOCIALS = [
  { icon: Github, href: GITHUB_URL, label: "GitHub" },
  { icon: Linkedin, href: LINKEDIN_URL, label: "LinkedIn" },
  { icon: Mail, href: EMAIL_URL, label: "Email" },
];

const COPY = {
  en: {
    badge: "> available_for_freelance --status=active",
    hello: "Hi,",
    name: "I'm Bruno",
    desc: "Backend & Full Stack Developer. I build REST APIs and production-ready systems — focused on architecture, automation and infrastructure, not just features.",
    location: "Based in Argentina",
    available: "Available now",
    hire: "Hire Me",
    cv: "Download CV",
    follow: "Follow me:",
    roles: [
      "Backend & DevOps Developer_",
      "API Architect_",
      "Docker & CI/CD_",
      "Ethical Hacking Student_",
    ],
  },
  es: {
    badge: "> disponible_para_freelance --status=active",
    hello: "Hola,",
    name: "soy Bruno",
    desc: "Desarrollador Backend & Full Stack. Construyo APIs REST y sistemas listos para producción — con foco en arquitectura, automatización e infraestructura, no solo features.",
    location: "Basado en Argentina",
    available: "Disponible ahora",
    hire: "Hire Me",
    cv: "Descargar CV",
    follow: "Sígueme en:",
    roles: [
      "Backend & DevOps Developer_",
      "Arquitecto de APIs_",
      "Docker & CI/CD_",
      "Estudiante de Ethical Hacking_",
    ],
  },
};

export function Hero() {
  const lang = useLang();
  const c = COPY[lang];
  const typed = useTypewriter(c.roles);

  return (
    <section id="top" className="relative overflow-hidden">
      <CommandRain />
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pt-16 pb-24 md:grid-cols-2 md:pt-24 md:pb-32">
        <div className="animate-hero-fade-up space-y-6">
          <div className="terminal-badge inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
            {c.badge}
          </div>

          <h1 className="font-display text-5xl font-bold leading-[1.03] tracking-tight text-foreground md:text-7xl">
            {c.hello}
            <br />
            {c.name}
          </h1>

          <div className="font-mono text-lg text-neon md:text-2xl h-8">
            {typed}
            <span className="ml-0.5 inline-block h-5 w-2 translate-y-0.5 bg-neon animate-cursor-blink" />
          </div>

          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {c.desc}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-neon" />
              {c.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-neon animate-pulse" />
              {c.available}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md bg-neon px-5 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_var(--neon-dim)]"
            >
              <Sparkles className="h-4 w-4" />
              {c.hire}
            </a>
            <a
              href={cv}
              download
              className="inline-flex items-center gap-2 rounded-md border border-neon/60 bg-transparent px-5 py-3 font-mono text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-neon/10 hover:shadow-[0_0_18px_var(--neon-dim)]"
            >
              <Download className="h-4 w-4 text-neon" />
              {c.cv}
            </a>
          </div>

          <div className="h-px w-full max-w-md bg-border/70" />

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-muted-foreground">{c.follow}</span>
            <div className="flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-neon/60 hover:text-neon"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {HERO_BADGES.map((b, i) => (
              <span
                key={b}
                style={{ animationDelay: `${200 + i * 60}ms` }}
                className="terminal-badge animate-hero-fade-up transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_16px_var(--neon-dim)]"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        <div
          className="animate-hero-fade-up hidden sm:block"
          style={{ animationDelay: "120ms" }}
        >
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
