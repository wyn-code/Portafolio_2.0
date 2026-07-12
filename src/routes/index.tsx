import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type ComponentType } from "react";
import { useTranslation } from "react-i18next";
import {
  Github,
  Linkedin,
  ExternalLink,
  Mail,
  Shield,
  Server,
  Database,
  Terminal,
  Code2,
  Sun,
  Moon,
  Cloud,
  GitBranch,
  Wrench,
  Brain,
  Phone,
  FileText,
  ArrowRight,
  ArrowUpRight,
  Download,
  CheckCircle2,
} from "lucide-react";

import "@/lib/i18n";
import tuxHero from "@/assets/tux-hero.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Massocco Bruno — Backend & Full Stack Developer" },
      {
        name: "description",
        content:
          "Backend & Full Stack Developer building scalable web apps, REST APIs and business platforms with Python, FastAPI, React, Docker and PostgreSQL.",
      },
      { property: "og:title", content: "Massocco Bruno — Backend & Full Stack Developer" },
      {
        property: "og:description",
        content:
          "Scalable APIs and production-ready platforms. Python · FastAPI · React · Docker · PostgreSQL.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

// ---- helpers -----------------------------------------------------------
function useLang() {
  const { i18n } = useTranslation();
  return i18n.language?.startsWith("en") ? "en" : "es";
}
function L(en: string, es: string) {
  return { en, es };
}

// Typewriter
function useTypewriter(words: string[], speed = 80, pause = 1500) {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => { setText(""); setWi(0); setDeleting(false); }, [words.join("|")]);
  useEffect(() => {
    const current = words[wi % words.length];
    const done = !deleting && text === current;
    const empty = deleting && text === "";
    const delay = done ? pause : empty ? 350 : deleting ? speed / 2 : speed;
    const t = setTimeout(() => {
      if (done) setDeleting(true);
      else if (empty) { setDeleting(false); setWi((i) => i + 1); }
      else setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, wi, words, speed, pause]);
  return text;
}

// Reveal
function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } });
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}
function Reveal({
  children, delay = 0, className = "", variant = "up",
}: { children: ReactNode; delay?: number; className?: string; variant?: "up" | "scale" | "fade" }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const hidden =
    variant === "scale" ? "opacity-0 translate-y-4 scale-[0.97]"
    : variant === "fade" ? "opacity-0"
    : "opacity-0 translate-y-6";
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms`, willChange: "transform, opacity" }}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0 scale-100" : hidden} ${className}`}
    >
      {children}
    </div>
  );
}

// ---- Root --------------------------------------------------------------
function Portfolio() {
  const { i18n } = useTranslation();
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored ?? (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("light", theme === "light");
    const savedLang = localStorage.getItem("lang");
    if (savedLang && savedLang !== i18n.language) i18n.changeLanguage(savedLang);
  }, [i18n]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <Hero />
      <About />
      <FeaturedProject />
      <Projects />
      <Techs />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}

// ---- Toggles -----------------------------------------------------------
function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  useEffect(() => { setIsLight(document.documentElement.classList.contains("light")); }, []);
  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
  };
  return (
    <button onClick={toggle} aria-label="Toggle theme"
      className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card/40 backdrop-blur-md text-muted-foreground hover:text-neon hover:border-neon/60 hover:-translate-y-0.5 hover:shadow-[0_0_18px_var(--neon-dim)] transition-all duration-300">
      <Sun className={`h-4 w-4 absolute transition-all duration-500 ${isLight ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`} />
      <Moon className={`h-4 w-4 absolute transition-all duration-500 ${isLight ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`} />
    </button>
  );
}
function LangToggle() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<string>("es");
  useEffect(() => { setLang(i18n.language?.startsWith("en") ? "en" : "es"); }, [i18n.language]);
  const switchTo = (l: "es" | "en") => { i18n.changeLanguage(l); setLang(l); localStorage.setItem("lang", l); };
  const OPTIONS: { code: "es" | "en"; flag: string; label: string }[] = [
    { code: "es", flag: "🇦🇷", label: "Español" },
    { code: "en", flag: "🇬🇧", label: "English" },
  ];
  return (
    <div role="radiogroup" aria-label="Language"
      className="relative flex items-center gap-0.5 rounded-full border border-border/60 bg-card/30 backdrop-blur-xl p-1 shadow-sm hover:border-neon/50 transition-all">
      {OPTIONS.map((o) => {
        const active = lang === o.code;
        return (
          <button key={o.code} role="radio" aria-checked={active} aria-label={o.label} title={o.label}
            onClick={() => switchTo(o.code)}
            className={`relative flex h-7 w-7 items-center justify-center rounded-full text-base leading-none transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/60 ${active ? "bg-neon/15 shadow-[0_0_14px_var(--neon-dim)] scale-110" : "opacity-60 hover:opacity-100 hover:scale-105"}`}>
            <span aria-hidden>{o.flag}</span>
          </button>
        );
      })}
    </div>
  );
}

// ---- Navbar ------------------------------------------------------------
function Navbar() {
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
    const ids = ["about", "featured", "projects", "techs", "certifications", "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const NAV = [
    { id: "about", label: t("nav.about"), href: "#about" },
    { id: "projects", label: t("nav.projects"), href: "#projects" },
    { id: "techs", label: t("nav.techs"), href: "#techs" },
    { id: "certifications", label: t("nav.certifications"), href: "#certifications" },
    { id: "contact", label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border/60" : "bg-transparent"}`}>
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-md border border-neon/50 font-mono text-sm font-bold text-neon transition-all group-hover:glow-border">
            MB
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-neon animate-pulse" />
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => {
            const isActive = active === item.id;
            return (
              <a key={item.href} href={item.href}
                className={`text-sm font-mono transition-colors relative group ${isActive ? "text-neon" : "text-muted-foreground hover:text-neon"}`}>
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-neon transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
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

// ---- Command Rain (very subtle) ---------------------------------------
const COMMAND_LINES = [
  "git status", "git push", "docker compose up", "docker ps",
  "uvicorn app.main:app --reload", "python main.py",
  "SELECT * FROM users;", "JWT verified", "REST API",
  "async / await", "FastAPI", "PostgreSQL", "Linux",
];
function CommandRain() {
  const [cols, setCols] = useState<{ id: number; left: number; delay: number; duration: number; opacity: number; lines: string[] }[]>([]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 5 : 10;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);
    setCols(Array.from({ length: count }, (_, i) => ({
      id: i,
      left: (i / count) * 100 + rand(-2, 2),
      delay: -rand(0, 24),
      duration: rand(28, 46),
      opacity: rand(0.02, 0.04),
      lines: shuffle(COMMAND_LINES).slice(0, 7),
    })));
  }, []);
  return (
    <div className="command-rain" aria-hidden>
      {cols.map((c) => (
        <div key={c.id} className="command-rain__col"
          style={{ left: `${c.left}%`, opacity: c.opacity, animationDuration: `${c.duration}s`, animationDelay: `${c.delay}s` }}>
          {c.lines.map((l, idx) => <div key={idx}>{l}</div>)}
        </div>
      ))}
    </div>
  );
}

// ---- Hero --------------------------------------------------------------
const HERO_BADGES = ["Python", "FastAPI", "React", "Docker", "PostgreSQL", "Linux", "Git"];

function Hero() {
  const { t } = useTranslation();
  const lang = useLang();
  const typed = useTypewriter([t("hero.role1"), t("hero.role2"), t("hero.role3"), t("hero.role4")]);

  const description = lang === "en"
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
              <span key={b} style={{ animationDelay: `${200 + i * 60}ms` }}
                className="animate-hero-fade-up inline-flex items-center rounded-md border border-border bg-card/50 backdrop-blur-md px-2.5 py-1 font-mono text-xs text-foreground hover:border-neon/60 hover:text-neon hover:-translate-y-0.5 hover:shadow-[0_0_16px_var(--neon-dim)] transition-all duration-300">
                {b}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-3">
            <a href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-neon px-5 py-3 text-sm font-mono font-semibold text-primary-foreground hover:shadow-[0_0_24px_var(--neon-dim)] hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300">
              {viewProjects}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#" download
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 backdrop-blur-md px-5 py-3 text-sm font-mono text-foreground hover:border-neon hover:text-neon hover:-translate-y-0.5 transition-all duration-300">
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

function HeroIllustration() {
  return (
    <div className="relative aspect-square max-w-md mx-auto">
      <div className="absolute inset-0 rounded-full blur-3xl animate-hero-glow"
        style={{ background: "radial-gradient(circle at 50% 50%, var(--cyber) 0%, transparent 55%), radial-gradient(circle at 60% 40%, var(--neon-dim) 0%, transparent 60%)" }}
        aria-hidden />
      <div className="relative animate-hero-float">
        <div className="relative rounded-full overflow-hidden border border-neon/30 shadow-[0_0_60px_var(--neon-dim)] backdrop-blur-sm">
          <img src={tuxHero} alt="Tux the Linux penguin in a black hoodie coding at a modern desk"
            width={1024} height={1024} loading="eager" decoding="async" className="w-full h-full object-cover" />
          <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
        </div>
      </div>
    </div>
  );
}

// ---- Section header ---------------------------------------------------
function SectionHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="mb-12">
      <div>
        {eyebrow && <div className="font-mono text-xs uppercase tracking-widest text-neon mb-3">{eyebrow}</div>}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="mt-3 text-muted-foreground max-w-2xl">{subtitle}</p>}
        <div className="mt-4 h-px w-16 bg-neon" />
      </div>
    </Reveal>
  );
}

// ---- About -------------------------------------------------------------
function About() {
  const { t } = useTranslation();
  const lang = useLang();
  const paragraphs = lang === "en"
    ? [
        "I'm a Backend & Full Stack Developer who enjoys turning real business problems into reliable software — REST APIs, clean data models and platforms designed to run in production, not just in a demo.",
        "I solve problems by thinking in systems: understand the domain, design a clean architecture, model the data, then build backend and frontend end-to-end so the product ships fast without cutting corners on quality.",
        "Backend engineering motivates me because it's where scalability, security and business logic meet. I care about clean code, secure authentication and building things I'd be comfortable running myself.",
      ]
    : [
        "Soy Desarrollador Backend & Full Stack y disfruto convertir problemas reales de negocio en software confiable — APIs REST, modelos de datos limpios y plataformas diseñadas para producción, no solo para una demo.",
        "Resuelvo problemas pensando en sistemas: entender el dominio, diseñar una arquitectura limpia, modelar los datos, y construir backend y frontend end-to-end para entregar rápido sin sacrificar calidad.",
        "El backend me motiva porque ahí se encuentran la escalabilidad, la seguridad y la lógica de negocio. Me importa el código limpio, la autenticación segura y construir sistemas que yo mismo pondría en producción.",
      ];
  return (
    <section id="about" className="relative py-24 md:py-28 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <SectionHeader eyebrow="01 · about" title={t("about.title")} />
        </div>
        <Reveal className="md:col-span-3" delay={100}>
          <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---- Featured Project -------------------------------------------------
function FeaturedProject() {
  const { t } = useTranslation();
  const lang = useLang();
  const shortDesc = lang === "en"
    ? "A production-ready SaaS for service businesses — appointments, clients, staff and revenue in one platform. Built end-to-end."
    : "SaaS listo para producción para negocios de servicios — turnos, clientes, personal e ingresos en una sola plataforma. Construido end-to-end.";
  const stack = ["React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Docker"];
  const viewCase = lang === "en" ? "View Case Study" : "Ver Caso de Estudio";

  return (
    <section id="featured" className="relative py-24 md:py-28 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow={lang === "en" ? "02 · featured project" : "02 · proyecto destacado"}
          title="TurnoGo"
          subtitle={t("featured.tagline")}
        />

        <Reveal variant="scale">
          <article className="group relative rounded-2xl border border-border/60 bg-card/30 backdrop-blur-xl overflow-hidden hover:border-neon/50 hover:shadow-[0_0_50px_var(--neon-dim)] transition-all duration-500">
            <div className="grid lg:grid-cols-2">
              {/* Screenshot */}
              <div className="relative border-b lg:border-b-0 lg:border-r border-border/60">
                <div className="flex items-center gap-1.5 px-4 py-2 border-b border-border/60 bg-background/40">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-neon/70" />
                  <span className="ml-3 font-mono text-[11px] text-muted-foreground">turnogo.app</span>
                </div>
                <div className="aspect-[16/10] relative">
                  <div className="absolute inset-0 opacity-30"
                    style={{ background: "radial-gradient(600px circle at 20% 0%, var(--neon-dim), transparent 55%), radial-gradient(500px circle at 90% 100%, var(--cyber), transparent 55%)" }}
                    aria-hidden />
                  <div className="relative p-6 md:p-8 grid grid-cols-6 gap-3 h-full">
                    <div className="col-span-2 rounded-lg border border-border/60 bg-background/50 p-4 space-y-2">
                      <div className="h-2 w-16 rounded bg-neon/60" />
                      <div className="h-2 w-24 rounded bg-muted-foreground/40" />
                      <div className="h-2 w-20 rounded bg-muted-foreground/30" />
                      <div className="mt-4 h-2 w-24 rounded bg-muted-foreground/40" />
                      <div className="h-2 w-16 rounded bg-muted-foreground/30" />
                    </div>
                    <div className="col-span-4 grid grid-rows-2 gap-3">
                      <div className="grid grid-cols-3 gap-3">
                        {[0,1,2].map((k) => (
                          <div key={k} className="rounded-lg border border-border/60 bg-background/50 p-3 flex flex-col justify-between">
                            <div className="h-3 w-3 rounded bg-neon" />
                            <div className="h-3 w-10 rounded bg-neon/50" />
                          </div>
                        ))}
                      </div>
                      <div className="rounded-lg border border-border/60 bg-background/50 p-3 flex items-end gap-2">
                        {[40, 65, 30, 80, 55, 90, 70].map((h, k) => (
                          <div key={k} className="flex-1 rounded-t bg-gradient-to-t from-neon/70 to-cyber/70" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Body */}
              <div className="p-6 md:p-10 flex flex-col gap-6">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{shortDesc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {stack.map((s) => (
                    <span key={s} className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded px-2 py-0.5">{s}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 pt-2 mt-auto">
                  <a href="#" className="inline-flex items-center gap-2 rounded-md bg-neon px-4 py-2.5 text-sm font-mono font-semibold text-primary-foreground hover:shadow-[0_0_22px_var(--neon-dim)] hover:-translate-y-0.5 transition-all">
                    <ExternalLink className="h-4 w-4" /> {t("featured.live")}
                  </a>
                  <a href="#" className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 px-4 py-2.5 text-sm font-mono hover:border-neon hover:text-neon hover:-translate-y-0.5 transition-all">
                    <Github className="h-4 w-4" /> {t("featured.github")}
                  </a>
                  <Link to="/case-study/turnogo"
                    className="inline-flex items-center gap-2 rounded-md border border-neon/50 bg-neon/10 px-4 py-2.5 text-sm font-mono text-neon hover:bg-neon/20 hover:-translate-y-0.5 transition-all">
                    <FileText className="h-4 w-4" /> {viewCase}
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

// ---- Other Projects ---------------------------------------------------
type Project = {
  title: string;
  desc: { en: string; es: string };
  tags: string[];
  github?: string;
  demo?: string;
};
const PROJECTS: Project[] = [
  {
    title: "AuthVault API",
    desc: {
      en: "JWT authentication service with refresh rotation, brute-force protection and role scopes.",
      es: "Servicio de autenticación JWT con rotación de refresh, protección anti-fuerza bruta y roles.",
    },
    tags: ["FastAPI", "PostgreSQL", "JWT", "Docker"],
    github: "#",
    demo: "#",
  },
  {
    title: "Business Admin Panel",
    desc: {
      en: "Admin dashboard to manage clients, staff and revenue with role-based access.",
      es: "Panel administrativo para gestionar clientes, personal e ingresos con acceso por roles.",
    },
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL"],
    github: "#",
    demo: "#",
  },
  {
    title: "Automation Scripts",
    desc: {
      en: "Python scripts to automate repetitive tasks, exports and data pipelines.",
      es: "Scripts Python para automatizar tareas repetitivas, exportaciones y pipelines de datos.",
    },
    tags: ["Python", "SQL", "Linux"],
    github: "#",
  },
];

function Projects() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <section id="projects" className="relative py-24 md:py-28 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow={lang === "en" ? "03 · other projects" : "03 · otros proyectos"}
          title={t("projects.title")}
        />
        <div className="grid md:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100} variant="scale">
              <article className="group relative h-full flex flex-col rounded-xl border border-border bg-card/40 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neon/60 hover:shadow-[0_0_30px_var(--neon-dim)]">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-neon transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {p.desc[lang]}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map((tg) => (
                    <span key={tg} className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded px-2 py-0.5">{tg}</span>
                  ))}
                </div>
                <div className="mt-auto pt-5 flex items-center gap-3">
                  {p.github && (
                    <a href={p.github} className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-neon transition-colors">
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-neon transition-colors">
                      <ExternalLink className="h-3.5 w-3.5" /> Demo
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Techs -------------------------------------------------------------
type TechGroup = { key: string; label: { en: string; es: string }; icon: ComponentType<{ className?: string }>; items: string[] };
const TECH_GROUPS: TechGroup[] = [
  { key: "backend", label: L("Backend", "Backend"), icon: Server, items: ["Python", "FastAPI", "C#", "ASP.NET"] },
  { key: "frontend", label: L("Frontend", "Frontend"), icon: Code2, items: ["React", "TypeScript", "Tailwind"] },
  { key: "databases", label: L("Databases", "Bases de Datos"), icon: Database, items: ["PostgreSQL", "SQL Server", "MySQL"] },
  { key: "cloud", label: L("Cloud", "Cloud"), icon: Cloud, items: ["Docker", "Render", "Vercel", "Supabase"] },
  { key: "os", label: L("Operating Systems", "Sistemas Operativos"), icon: Terminal, items: ["Linux", "Windows"] },
  { key: "ai", label: L("AI Tools", "Herramientas de IA"), icon: Brain, items: ["ChatGPT", "Claude", "GitHub Copilot", "Gemini"] },
  { key: "tools", label: L("Dev Tools", "Herramientas de Desarrollo"), icon: Wrench, items: ["VS Code", "Cursor", "Visual Studio", "Postman"] },
  { key: "cyber", label: L("Cybersecurity", "Ciberseguridad"), icon: Shield, items: ["OWASP", "Networking", "Secure APIs"] },
  { key: "vcs", label: L("Version Control", "Control de Versiones"), icon: GitBranch, items: ["Git", "GitHub"] },
];

function Techs() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <section id="techs" className="relative py-24 md:py-28 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow={lang === "en" ? "04 · tech stack" : "04 · stack técnico"}
          title={t("techs.title")}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TECH_GROUPS.map((g, i) => (
            <Reveal key={g.key} delay={i * 60}>
              <div className="group relative h-full rounded-xl border border-border/60 bg-card/30 backdrop-blur-xl p-5 hover:-translate-y-1 hover:border-neon/50 hover:shadow-[0_0_28px_var(--neon-dim)] transition-all duration-300">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md border border-neon/40 text-neon">
                    <g.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{g.label[lang]}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((name) => (
                    <span key={name}
                      className="font-mono text-xs px-2 py-0.5 rounded-md border border-border bg-background/40 text-foreground/90 hover:border-neon/60 hover:text-neon transition-colors">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Certifications ---------------------------------------------------
const CERTS = [
  { name: "CompTIA Security+", org: "CompTIA", status: "in_progress" as const },
  { name: "Cisco CCNA", org: "Cisco Networking Academy", status: "in_progress" as const },
  { name: "eJPT — Junior Penetration Tester", org: "INE / eLearnSecurity", status: "planned" as const },
  { name: "Backend Practitioner", org: "Backend Program", status: "completed" as const },
];
function Certifications() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <section id="certifications" className="relative py-24 md:py-28 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow={lang === "en" ? "05 · certifications" : "05 · certificaciones"}
          title={t("certs.title")}
        />
        <div className="grid md:grid-cols-2 gap-5">
          {CERTS.map((c, i) => (
            <Reveal key={c.name} delay={i * 80} variant="scale">
              <div className="group relative h-full rounded-xl border border-border bg-card/40 backdrop-blur-xl p-5 hover:border-neon/60 hover:-translate-y-1 hover:shadow-[0_0_30px_var(--neon-dim)] transition-all">
                <div className="flex items-start gap-4">
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neon/50 text-neon">
                    <Shield className="h-5 w-5" />
                    {c.status === "completed" && (
                      <CheckCircle2 className="absolute -bottom-1 -right-1 h-4 w-4 text-neon bg-background rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-semibold text-foreground truncate group-hover:text-neon transition-colors">{c.name}</div>
                        <div className="text-xs font-mono text-muted-foreground mt-0.5">{c.org}</div>
                      </div>
                      <span className={`shrink-0 font-mono text-[10px] uppercase tracking-wider rounded-full px-2.5 py-1 border ${
                        c.status === "completed" ? "border-neon/60 text-neon bg-neon/10"
                        : c.status === "in_progress" ? "border-cyber/50 text-cyber bg-cyber/10"
                        : "border-border text-muted-foreground"}`}>
                        {t(`certs.${c.status}`)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 flex justify-center">
          <a href="#" className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 backdrop-blur-md px-5 py-2.5 text-sm font-mono text-foreground hover:border-neon hover:text-neon hover:-translate-y-0.5 transition-all">
            {lang === "en" ? "View All Certifications" : "Ver Todas las Certificaciones"}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// ---- Contact -----------------------------------------------------------
function Contact() {
  const { t } = useTranslation();
  const LINKS = [
    { key: "github", icon: Github, href: "https://github.com/" },
    { key: "linkedin", icon: Linkedin, href: "https://linkedin.com/" },
    { key: "email", icon: Mail, href: "mailto:hello@masscocobruno.dev" },
    { key: "whatsapp", icon: Phone, href: "https://wa.me/" },
    { key: "resume", icon: FileText, href: "#" },
  ] as const;
  return (
    <section id="contact" className="relative py-24 md:py-28 border-t border-border/50">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader
          eyebrow="06 · contact"
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LINKS.map((l, i) => (
            <Reveal key={l.key} delay={i * 80} variant="scale">
              <a href={l.href} target="_blank" rel="noreferrer noopener"
                className="group relative flex items-center gap-4 rounded-xl border border-border/60 bg-card/30 backdrop-blur-xl p-5 md:p-6 hover:border-neon/60 hover:-translate-y-1 hover:shadow-[0_0_30px_var(--neon-dim)] transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-neon/40 bg-background/40 text-neon group-hover:scale-110 group-hover:shadow-[0_0_18px_var(--neon-dim)] transition-all">
                  <l.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base font-semibold text-foreground group-hover:text-neon transition-colors">{t(`contact.${l.key}`)}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-neon group-hover:translate-x-1 transition-all" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Footer ------------------------------------------------------------
function Footer() {
  const lang = useLang();
  return (
    <footer className="border-t border-border/50 py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <div className="font-semibold text-foreground">Massocco Bruno</div>
          <div className="font-mono text-xs text-muted-foreground mt-0.5">
            {lang === "en" ? "Backend & Full Stack Developer" : "Desarrollador Backend & Full Stack"}
          </div>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Massocco Bruno
        </div>
        <div className="flex items-center gap-2">
          {[
            { icon: Github, href: "#", label: "GitHub" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Mail, href: "mailto:hello@masscocobruno.dev", label: "Email" },
          ].map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label}
              className="p-2 rounded-md border border-border text-muted-foreground hover:text-neon hover:border-neon hover:bg-neon/10 hover:-translate-y-0.5 transition-all duration-300">
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
