import { createFileRoute } from "@tanstack/react-router";
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
  Cpu,
  Code2,
  Network,
  Bug,
  KeyRound,
  FileCode,
  CheckCircle2,
  Sun,
  Moon,
  Layers,
  Boxes,
  Gauge,
  Sparkles,
  Users,
  GraduationCap,
  ClipboardList,
  Workflow as WorkflowIcon,
  Code,
  TestTube2,
  Rocket,
  RefreshCw,
  Cloud,
  GitBranch,
  Container,
  Palette,
  Wrench,
  Brain,
  BookOpen,
  Calendar,
  LayoutDashboard,
  ClipboardCheck,
  Zap,
  Building2,
  Globe,
  Phone,
  FileText,
  ArrowRight,
  ChevronRight,
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
          "Portfolio of Massocco Bruno — Backend & Full Stack Developer building scalable APIs and production-ready web applications with Python, FastAPI, React, Docker and PostgreSQL.",
      },
      { property: "og:title", content: "Massocco Bruno — Backend & Full Stack Developer" },
      {
        property: "og:description",
        content:
          "Scalable APIs, business platforms and production-ready software. Python · FastAPI · React · Docker · PostgreSQL.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

// ============================================================
// Typewriter
// ============================================================
function useTypewriter(words: string[], speed = 80, pause = 1500) {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setText("");
    setWi(0);
    setDeleting(false);
  }, [words.join("|")]);

  useEffect(() => {
    const current = words[wi % words.length];
    const done = !deleting && text === current;
    const empty = deleting && text === "";
    const delay = done ? pause : empty ? 350 : deleting ? speed / 2 : speed;
    const t = setTimeout(() => {
      if (done) setDeleting(true);
      else if (empty) {
        setDeleting(false);
        setWi((i) => i + 1);
      } else {
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, wi, words, speed, pause]);
  return text;
}

// ============================================================
// Reveal (IntersectionObserver, animate-once)
// ============================================================
function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

type RevealVariant = "up" | "scale" | "fade";
function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const hidden =
    variant === "scale"
      ? "opacity-0 translate-y-4 scale-[0.97]"
      : variant === "fade"
        ? "opacity-0"
        : "opacity-0 translate-y-6";
  const shown = "opacity-100 translate-y-0 scale-100";
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms`, willChange: "transform, opacity" }}
      className={`transition-all duration-700 ease-out ${visible ? shown : hidden} ${className}`}
    >
      {children}
    </div>
  );
}

// ============================================================
// Portfolio Root
// ============================================================
function Portfolio() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored ?? (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("light", theme === "light");

    const savedLang = localStorage.getItem("lang");
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <Hero />
      <FeaturedProject />
      <About />
      <Capabilities />
      <Projects />
      <Techs />
      <Mindset />
      <Workflow />
      <Certifications />
      <Languages />
      <Contact />
      <Footer />
    </div>
  );
}

// ============================================================
// Theme + Language toggles
// ============================================================
function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);
  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card/40 backdrop-blur-md text-muted-foreground hover:text-neon hover:border-neon/60 hover:-translate-y-0.5 hover:shadow-[0_0_18px_var(--neon-dim)] transition-all duration-300"
    >
      <Sun
        className={`h-4 w-4 absolute transition-all duration-500 ${isLight ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`}
      />
      <Moon
        className={`h-4 w-4 absolute transition-all duration-500 ${isLight ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`}
      />
    </button>
  );
}

function LangToggle() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<string>("es");
  useEffect(() => {
    setLang(i18n.language?.startsWith("en") ? "en" : "es");
  }, [i18n.language]);
  const switchTo = (l: "es" | "en") => {
    i18n.changeLanguage(l);
    setLang(l);
    localStorage.setItem("lang", l);
  };
  const OPTIONS: { code: "es" | "en"; flag: string; label: string }[] = [
    { code: "es", flag: "🇦🇷", label: "Español (Argentina)" },
    { code: "en", flag: "🇬🇧", label: "English (United Kingdom)" },
  ];
  return (
    <div
      role="radiogroup"
      aria-label="Language"
      className="relative flex items-center gap-0.5 rounded-full border border-border/60 bg-card/30 backdrop-blur-xl p-1 shadow-sm transition-all duration-300 hover:border-neon/50"
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
            className={`relative flex h-7 w-7 items-center justify-center rounded-full text-base leading-none transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/60 ${active ? "bg-neon/15 shadow-[0_0_14px_var(--neon-dim)] scale-110" : "opacity-60 hover:opacity-100 hover:scale-105"}`}
          >
            <span aria-hidden>{o.flag}</span>
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
// Navbar with active-section indicator
// ============================================================
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
    const ids = ["about", "projects", "techs", "certifications", "contact"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
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

  const NAV = [
    { id: "about", label: t("nav.about"), href: "#about" },
    { id: "projects", label: t("nav.projects"), href: "#projects" },
    { id: "techs", label: t("nav.techs"), href: "#techs" },
    { id: "certifications", label: t("nav.certifications"), href: "#certifications" },
    { id: "contact", label: t("nav.contact"), href: "#contact" },
  ];

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
          <span className="font-mono text-sm text-muted-foreground hidden sm:block">
            <span className="text-neon">~/</span>massocco
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item, i) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-mono transition-colors relative group ${isActive ? "text-neon" : "text-muted-foreground hover:text-neon"}`}
              >
                <span className="text-neon/60 mr-1">0{i + 1}.</span>
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-neon transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
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

// ============================================================
// Command Rain (subtle)
// ============================================================
const COMMAND_LINES = [
  "git status",
  "git pull",
  "git push",
  "git commit -m 'feat: booking flow'",
  "docker compose up",
  "docker ps",
  "docker logs -f api",
  "python main.py",
  "uvicorn app.main:app --reload",
  "sudo apt update",
  "sudo apt upgrade",
  "pnpm install",
  "pnpm dev",
  "npm run build",
  "SELECT * FROM users;",
  "UPDATE appointments",
  "REST API",
  "JWT Verified",
  "FastAPI",
  "Docker",
  "Linux",
  "React",
  "PostgreSQL",
  "JSON",
  "async / await",
];

function CommandRain() {
  const [cols, setCols] = useState<
    { id: number; left: number; delay: number; duration: number; opacity: number; lines: string[] }[]
  >([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 6 : 12;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);
    const generated = Array.from({ length: count }, (_, i) => {
      const lineCount = Math.floor(rand(5, 10));
      return {
        id: i,
        left: (i / count) * 100 + rand(-2, 2),
        delay: -rand(0, 24),
        duration: rand(24, 44),
        opacity: rand(0.02, 0.045),
        lines: shuffle(COMMAND_LINES).slice(0, lineCount),
      };
    });
    setCols(generated);
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

// ============================================================
// Hero
// ============================================================
const HERO_BADGES = [
  "Python",
  "FastAPI",
  "React",
  "Docker",
  "PostgreSQL",
  "Linux",
  "Git",
  "SQL",
  "TypeScript",
];

function Hero() {
  const { t } = useTranslation();
  const typed = useTypewriter([
    t("hero.role1"),
    t("hero.role2"),
    t("hero.role3"),
    t("hero.role4"),
  ]);

  return (
    <section id="top" className="relative overflow-hidden">
      <CommandRain />
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32 grid md:grid-cols-2 gap-12 items-center">
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
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            {t("hero.description")}
          </p>

          {/* Tech badges */}
          <div className="pt-2">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
              <span className="text-neon">$</span> {t("hero.stack_label")}
            </div>
            <div className="flex flex-wrap gap-1.5">
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

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#featured"
              className="inline-flex items-center gap-2 rounded-md bg-neon px-5 py-2.5 text-sm font-mono font-semibold text-primary-foreground hover:shadow-[0_0_24px_var(--neon-dim)] hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300"
            >
              {t("hero.view_projects")}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 backdrop-blur-md px-5 py-2.5 text-sm font-mono text-foreground hover:border-neon hover:text-neon hover:-translate-y-0.5 transition-all duration-300"
            >
              {t("hero.get_in_touch")}
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
      <div
        className="absolute inset-0 rounded-full blur-3xl animate-hero-glow"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--cyber) 0%, transparent 55%), radial-gradient(circle at 60% 40%, var(--neon-dim) 0%, transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative animate-hero-float">
        <div className="relative rounded-full overflow-hidden border border-neon/30 shadow-[0_0_60px_var(--neon-dim)] backdrop-blur-sm">
          <img
            src={tuxHero}
            alt="Tux the Linux penguin in a black hoodie coding at a modern desk"
            width={1024}
            height={1024}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
        </div>
        <span className="absolute -top-2 left-8 h-2 w-2 rounded-full bg-neon shadow-[0_0_12px_var(--neon)]" />
        <span className="absolute bottom-6 -right-1 h-2 w-2 rounded-full bg-cyber shadow-[0_0_12px_var(--cyber)]" />
      </div>
    </div>
  );
}

// ============================================================
// Section Header
// ============================================================
function SectionHeader({ n, title, subtitle }: { n: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="mb-12">
      <div>
        <div className="font-mono text-sm text-neon mb-2">
          <span className="opacity-60">{n}.</span> {title.toLowerCase().replace(/\s/g, "_")}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="mt-3 text-muted-foreground max-w-2xl">{subtitle}</p>}
        <div className="mt-4 h-px w-16 bg-neon" />
      </div>
    </Reveal>
  );
}

// ============================================================
// Featured Project — TurnoGo
// ============================================================
const ARCH_STEPS = [
  { label: "React", icon: Code2 },
  { label: "FastAPI", icon: Server },
  { label: "JWT Authentication", icon: Shield },
  { label: "PostgreSQL", icon: Database },
  { label: "Supabase Storage", icon: Cloud },
  { label: "Render", icon: Rocket },
];

function ArchitectureDiagram() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.25);
  return (
    <div ref={ref} className="rounded-xl border border-border/60 bg-card/30 backdrop-blur-xl p-6 md:p-8">
      <div className="flex flex-col items-stretch gap-3">
        {ARCH_STEPS.map((s, i) => (
          <div key={s.label} className="flex flex-col items-center">
            <div
              className={`arch-step ${visible ? "in" : ""} w-full max-w-sm mx-auto flex items-center gap-3 rounded-lg border border-neon/30 bg-background/50 px-4 py-3 shadow-[0_0_18px_var(--neon-dim)]`}
              style={{ animationDelay: `${i * 220}ms` }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md border border-neon/40 text-neon">
                <s.icon className="h-4 w-4" />
              </div>
              <span className="font-mono text-sm text-foreground">{s.label}</span>
            </div>
            {i < ARCH_STEPS.length - 1 && (
              <div
                className={`arch-step ${visible ? "in" : ""} h-6 w-px bg-gradient-to-b from-neon to-cyber my-1`}
                style={{ animationDelay: `${i * 220 + 110}ms` }}
                aria-hidden
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturedProject() {
  const { t } = useTranslation();
  const features = t("featured.features", { returnObjects: true }) as string[];
  const stack = ["React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "JWT", "Docker", "Supabase", "Render"];

  return (
    <section id="featured" className="relative py-24 md:py-28 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-widest text-neon mb-3">
            <span className="opacity-60">{t("featured.n")}.</span> {t("featured.label")}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                {t("featured.title")}
              </h2>
              <p className="mt-2 text-lg text-muted-foreground">{t("featured.tagline")}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-md bg-neon px-4 py-2 text-sm font-mono font-semibold text-primary-foreground hover:shadow-[0_0_22px_var(--neon-dim)] hover:-translate-y-0.5 transition-all"
              >
                <ExternalLink className="h-4 w-4" />
                {t("featured.live")}
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 px-4 py-2 text-sm font-mono hover:border-neon hover:text-neon hover:-translate-y-0.5 transition-all"
              >
                <Github className="h-4 w-4" />
                {t("featured.github")}
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 px-4 py-2 text-sm font-mono hover:border-neon hover:text-neon hover:-translate-y-0.5 transition-all"
              >
                <FileText className="h-4 w-4" />
                {t("featured.case")}
              </a>
            </div>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Screenshot / mock */}
          <Reveal variant="scale" className="lg:col-span-3">
            <div className="relative rounded-xl border border-border/60 bg-card/30 backdrop-blur-xl overflow-hidden group hover:border-neon/50 hover:shadow-[0_0_40px_var(--neon-dim)] transition-all duration-500">
              <div className="flex items-center gap-1.5 px-4 py-2 border-b border-border/60 bg-background/40">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-neon/70" />
                <span className="ml-3 font-mono text-[11px] text-muted-foreground">turnogo.app — dashboard</span>
              </div>
              <div className="aspect-[16/10] relative">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background:
                      "radial-gradient(600px circle at 20% 0%, var(--neon-dim), transparent 55%), radial-gradient(500px circle at 90% 100%, var(--cyber), transparent 55%)",
                  }}
                  aria-hidden
                />
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
                      {[Calendar, Users, LayoutDashboard].map((Ic, k) => (
                        <div key={k} className="rounded-lg border border-border/60 bg-background/50 p-3 flex flex-col justify-between">
                          <Ic className="h-4 w-4 text-neon" />
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
          </Reveal>

          {/* Description + features */}
          <Reveal variant="up" delay={120} className="lg:col-span-2">
            <div className="h-full rounded-xl border border-border/60 bg-card/30 backdrop-blur-xl p-6 md:p-8 flex flex-col gap-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("featured.description")}
              </p>
              <div>
                <div className="font-mono text-xs text-neon mb-2">{t("featured.features_title")}</div>
                <ul className="space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-neon shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md border border-border bg-background/40 p-3">
                  <div className="font-mono text-[10px] text-neon uppercase">{t("featured.role")}</div>
                  <div className="text-sm text-foreground mt-1">{t("featured.role_v")}</div>
                </div>
                <div className="rounded-md border border-border bg-background/40 p-3">
                  <div className="font-mono text-[10px] text-neon uppercase">{t("featured.duration")}</div>
                  <div className="text-sm text-foreground mt-1">{t("featured.duration_v")}</div>
                </div>
              </div>
              <div>
                <div className="font-mono text-xs text-neon mb-2">{t("featured.stack")}</div>
                <div className="flex flex-wrap gap-1.5">
                  {stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded px-2 py-0.5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Architecture Diagram */}
        <Reveal className="mt-10">
          <div className="font-mono text-sm text-neon mb-3">{t("featured.arch_title")}</div>
        </Reveal>
        <ArchitectureDiagram />
      </div>
    </section>
  );
}

// ============================================================
// About
// ============================================================
function About() {
  const { t } = useTranslation();
  return (
    <section id="about" className="relative py-24 md:py-28 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <SectionHeader n={t("about.n")} title={t("about.title")} subtitle={t("about.subtitle")} />
        </div>
        <Reveal className="md:col-span-3" delay={100}>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { k: t("about.focus"), v: t("about.focus_v") },
                { k: t("about.studying"), v: t("about.studying_v") },
                { k: t("about.based"), v: t("about.based_v") },
              ].map((s) => (
                <div key={s.k} className="rounded-md border border-border bg-card/40 p-4 hover:border-neon/50 hover:-translate-y-0.5 transition-all">
                  <div className="font-mono text-xs text-neon">{s.k}</div>
                  <div className="mt-1 text-sm font-semibold text-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// Capabilities — "What I Can Build"
// ============================================================
const CAPABILITIES: { key: string; icon: ComponentType<{ className?: string }> }[] = [
  { key: "rest", icon: Network },
  { key: "auth", icon: KeyRound },
  { key: "admin", icon: LayoutDashboard },
  { key: "booking", icon: Calendar },
  { key: "business", icon: Building2 },
  { key: "automation", icon: Zap },
  { key: "db", icon: Database },
  { key: "fullstack", icon: Layers },
];

function Capabilities() {
  const { t } = useTranslation();
  return (
    <section id="capabilities" className="relative py-24 md:py-28 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          n={t("capabilities.n")}
          title={t("capabilities.title")}
          subtitle={t("capabilities.subtitle")}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.key} delay={i * 70} variant="scale">
              <article className="group relative h-full rounded-xl border border-border/60 bg-card/30 backdrop-blur-xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-neon/60 hover:shadow-[0_0_30px_var(--neon-dim)]">
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(400px circle at 30% 0%, var(--neon-dim), transparent 60%)",
                  }}
                  aria-hidden
                />
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-neon/40 bg-background/40 text-neon mb-4 group-hover:scale-110 transition-transform">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground group-hover:text-neon transition-colors">
                    {t(`capabilities.items.${c.key}.t`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {t(`capabilities.items.${c.key}.d`)}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Other Projects
// ============================================================
type Project = {
  title: string;
  desc: { en: string; es: string };
  role: { en: string; es: string };
  duration: { en: string; es: string };
  tags: string[];
  challenges: { en: string; es: string };
};

const PROJECTS: Project[] = [
  {
    title: "AuthVault API",
    desc: {
      en: "JWT-based authentication service with refresh rotation, brute-force protection and role scopes.",
      es: "Servicio de autenticación JWT con rotación de refresh, protección anti-fuerza bruta y roles.",
    },
    role: { en: "Backend Developer", es: "Backend Developer" },
    duration: { en: "1 month", es: "1 mes" },
    tags: ["FastAPI", "PostgreSQL", "JWT", "Docker"],
    challenges: {
      en: "Designing safe refresh-token rotation and rate limiting.",
      es: "Rotación segura de refresh-token y rate limiting.",
    },
  },
  {
    title: "Business Admin Panel",
    desc: {
      en: "Admin dashboard to manage clients, staff and revenue with role-based access.",
      es: "Panel administrativo para gestionar clientes, personal e ingresos con acceso por roles.",
    },
    role: { en: "Full Stack Developer", es: "Full Stack Developer" },
    duration: { en: "2 months", es: "2 meses" },
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL"],
    challenges: {
      en: "Modeling permissions and clean separation between UI and API layers.",
      es: "Modelar permisos y separar limpiamente la UI de la API.",
    },
  },
  {
    title: "Automation Scripts",
    desc: {
      en: "Python scripts to automate repetitive tasks, exports and data pipelines.",
      es: "Scripts Python para automatizar tareas repetitivas, exportaciones y pipelines de datos.",
    },
    role: { en: "Backend Developer", es: "Backend Developer" },
    duration: { en: "Ongoing", es: "En curso" },
    tags: ["Python", "SQL", "Linux"],
    challenges: {
      en: "Robust error handling and safe scheduling on Linux.",
      es: "Manejo robusto de errores y programación segura en Linux.",
    },
  },
];

function Projects() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "es";
  return (
    <section id="projects" className="relative py-24 md:py-28 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          n={t("projects.n")}
          title={t("projects.title")}
          subtitle={t("projects.subtitle")}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100} variant="scale">
              <article className="group relative h-full flex flex-col rounded-xl border border-border bg-card/40 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neon/60 hover:shadow-[0_0_30px_var(--neon-dim)]">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background/60 text-neon">
                    <FileCode className="h-5 w-5" />
                  </div>
                  <div className="flex gap-1">
                    <a href="#" aria-label={t("projects.github")} className="p-2 rounded-md text-muted-foreground hover:text-neon hover:bg-neon/10 hover:scale-110 transition-all">
                      <Github className="h-4 w-4" />
                    </a>
                    <a href="#" aria-label={t("projects.live")} className="p-2 rounded-md text-muted-foreground hover:text-neon hover:bg-neon/10 hover:scale-110 transition-all">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-neon transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {p.desc[lang as "en" | "es"]}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="font-mono text-[10px] uppercase text-neon">{t("projects.role")}</div>
                    <div className="text-foreground/90 mt-0.5">{p.role[lang as "en" | "es"]}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase text-neon">{t("projects.duration")}</div>
                    <div className="text-foreground/90 mt-0.5">{p.duration[lang as "en" | "es"]}</div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="font-mono text-[10px] uppercase text-neon mb-1">{t("projects.challenges")}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {p.challenges[lang as "en" | "es"]}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((tg) => (
                    <span
                      key={tg}
                      className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded px-2 py-0.5"
                    >
                      {tg}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-5 flex items-center gap-3">
                  <a href="#" className="inline-flex items-center gap-1 text-xs font-mono text-neon hover:underline">
                    {t("projects.case")} <ChevronRight className="h-3 w-3" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Techs / Skills — glass cards, animated badges
// ============================================================
type TechGroup = {
  key: string;
  icon: ComponentType<{ className?: string }>;
  items: string[];
  desc?: string;
};

const TECH_GROUPS: TechGroup[] = [
  { key: "backend", icon: Server, items: ["Python", "FastAPI", "C#", "ASP.NET", "Node.js", "REST APIs", "JWT"] },
  { key: "frontend", icon: Code2, items: ["React", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"] },
  { key: "databases", icon: Database, items: ["PostgreSQL", "SQL Server", "MySQL", "Supabase"] },
  { key: "cloud", icon: Cloud, items: ["Docker", "Render", "Vercel", "Supabase", "GitHub Actions"] },
  { key: "os", icon: Terminal, items: ["Linux", "Windows"] },
  { key: "vcs", icon: GitBranch, items: ["Git", "GitHub"] },
  { key: "tools", icon: Wrench, items: ["VS Code", "Visual Studio", "Cursor", "Figma", "Postman", "Swagger"] },
  { key: "cyber", icon: Shield, items: ["Networking", "OWASP", "Secure Authentication", "Secure APIs"] },
];

function TechCard({ group }: { group: TechGroup }) {
  const { t } = useTranslation();
  return (
    <div className="group relative rounded-xl border border-border/60 bg-card/30 backdrop-blur-xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-neon/50 hover:shadow-[0_0_28px_var(--neon-dim)]">
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(400px circle at 30% 0%, var(--neon-dim), transparent 60%)" }}
        aria-hidden
      />
      <div className="relative">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-neon/40 text-neon">
            <group.icon className="h-4 w-4" />
          </div>
          <h3 className="font-mono text-sm text-muted-foreground">
            <span className="text-neon">./</span>
            {t(`techs.${group.key}`).toLowerCase().replace(/\s/g, "_")}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {group.items.map((name, i) => (
            <span
              key={name}
              style={{ transitionDelay: `${i * 30}ms` }}
              className="font-mono text-xs px-2.5 py-1 rounded-md border border-border bg-background/40 text-foreground hover:border-neon/60 hover:text-neon hover:-translate-y-0.5 hover:shadow-[0_0_14px_var(--neon-dim)] transition-all duration-300"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Techs() {
  const { t } = useTranslation();
  return (
    <section id="techs" className="relative py-24 md:py-28 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader n={t("techs.n")} title={t("techs.title")} subtitle={t("techs.subtitle")} />

        <div className="grid md:grid-cols-2 gap-5">
          {TECH_GROUPS.map((g, i) => (
            <Reveal key={g.key} delay={i * 60} variant="up">
              <TechCard group={g} />
            </Reveal>
          ))}
        </div>

        {/* AI category — highlighted */}
        <Reveal className="mt-6" delay={120}>
          <div className="group relative rounded-xl border border-neon/40 bg-card/30 backdrop-blur-xl p-6 md:p-8 overflow-hidden hover:shadow-[0_0_36px_var(--neon-dim)] transition-all">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(500px circle at 15% 0%, var(--neon-dim), transparent 55%), radial-gradient(400px circle at 90% 100%, var(--cyber), transparent 55%)",
              }}
              aria-hidden
            />
            <div className="relative flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-neon/50 text-neon">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-xs text-neon">./{t("techs.ai").toLowerCase().replace(/\s/g, "_")}</div>
                  <div className="text-lg font-semibold text-foreground">{t("techs.ai")}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed md:flex-1">
                {t("techs.ai_desc")}
              </p>
              <div className="flex flex-wrap gap-2">
                {["ChatGPT", "GitHub Copilot", "Claude", "Gemini"].map((n) => (
                  <span
                    key={n}
                    className="font-mono text-xs px-2.5 py-1 rounded-md border border-neon/40 bg-background/50 text-foreground hover:text-neon hover:-translate-y-0.5 hover:shadow-[0_0_14px_var(--neon-dim)] transition-all"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// Mindset
// ============================================================
const MINDSET = [
  { key: "arch", icon: Layers },
  { key: "solid", icon: Boxes },
  { key: "sec", icon: Shield },
  { key: "api", icon: Network },
  { key: "perf", icon: Gauge },
  { key: "db", icon: Database },
  { key: "clean", icon: Sparkles },
  { key: "user", icon: Users },
  { key: "learn", icon: GraduationCap },
] as const;

function Mindset() {
  const { t } = useTranslation();
  return (
    <section id="mindset" className="relative py-24 md:py-28 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          n={t("mindset.n")}
          title={t("mindset.title")}
          subtitle={t("mindset.subtitle")}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MINDSET.map((m, i) => (
            <Reveal key={m.key} delay={i * 70} variant="scale">
              <article className="group relative h-full rounded-xl border border-border/60 bg-card/30 backdrop-blur-xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-neon/60 hover:shadow-[0_0_36px_var(--neon-dim)]">
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(400px circle at 30% 0%, var(--neon-dim), transparent 60%)",
                  }}
                  aria-hidden
                />
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-neon/40 bg-background/40 text-neon mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_var(--neon-dim)] transition-all">
                    <m.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground group-hover:text-neon transition-colors">
                    {t(`mindset.items.${m.key}_t`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {t(`mindset.items.${m.key}_d`)}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-10">
          <blockquote className="relative rounded-2xl border border-neon/30 bg-card/30 backdrop-blur-xl p-8 md:p-10 shadow-[0_0_40px_var(--neon-dim)] overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(600px circle at 20% 0%, var(--neon-dim), transparent 55%), radial-gradient(500px circle at 90% 100%, var(--cyber), transparent 55%)",
              }}
              aria-hidden
            />
            <div className="relative">
              <div className="font-mono text-4xl text-neon leading-none mb-3">“</div>
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed italic">
                {t("mindset.quote")}
              </p>
              <div className="mt-4 font-mono text-xs text-neon">— Massocco Bruno</div>
            </div>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// Workflow
// ============================================================
const WORKFLOW = [
  { key: "s1", icon: ClipboardList },
  { key: "s2", icon: WorkflowIcon },
  { key: "s3", icon: Database },
  { key: "s4", icon: Server },
  { key: "s5", icon: Code },
  { key: "s6", icon: TestTube2 },
  { key: "s7", icon: Rocket },
  { key: "s8", icon: RefreshCw },
] as const;

function Workflow() {
  const { t } = useTranslation();
  return (
    <section id="workflow" className="relative py-24 md:py-28 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          n={t("workflow.n")}
          title={t("workflow.title")}
          subtitle={t("workflow.subtitle")}
        />

        <div className="hidden lg:block relative">
          <div className="relative">
            <div className="absolute left-0 right-0 top-6 h-px bg-border/60" />
            <div className="absolute left-0 top-6 h-px bg-gradient-to-r from-neon via-cyber to-transparent workflow-line" />
            <div className="grid grid-cols-8 gap-4">
              {WORKFLOW.map((s, i) => (
                <Reveal key={s.key} delay={i * 130}>
                  <div className="group flex flex-col items-center text-center">
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-neon/50 bg-background text-neon shadow-[0_0_20px_var(--neon-dim)] group-hover:scale-110 group-hover:shadow-[0_0_28px_var(--neon-dim)] transition-all duration-300">
                      <s.icon className="h-5 w-5" />
                      <span className="absolute -top-2 -right-2 font-mono text-[10px] bg-background border border-neon/50 text-neon rounded-full h-5 w-5 flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-foreground group-hover:text-neon transition-colors">
                      {t(`workflow.steps.${s.key}_t`)}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {t(`workflow.steps.${s.key}_d`)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:hidden relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border/60" />
          <div className="absolute left-6 top-0 w-px bg-gradient-to-b from-neon via-cyber to-transparent workflow-line-v" />
          <div className="space-y-6">
            {WORKFLOW.map((s, i) => (
              <Reveal key={s.key} delay={i * 100}>
                <div className="group relative pl-16">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-neon/50 bg-background text-neon shadow-[0_0_18px_var(--neon-dim)]">
                    <s.icon className="h-5 w-5" />
                    <span className="absolute -top-2 -right-2 font-mono text-[10px] bg-background border border-neon/50 text-neon rounded-full h-5 w-5 flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-card/30 backdrop-blur-xl p-4 group-hover:border-neon/50 transition-all">
                    <h3 className="text-sm font-semibold text-foreground">
                      {t(`workflow.steps.${s.key}_t`)}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {t(`workflow.steps.${s.key}_d`)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Certifications — with "what it taught me"
// ============================================================
const CERTS = [
  {
    name: "CompTIA Security+",
    org: "CompTIA",
    status: "in_progress",
    learned: {
      en: "Security fundamentals: network defense, cryptography, risk management and incident response.",
      es: "Fundamentos de seguridad: defensa de red, criptografía, gestión de riesgos y respuesta a incidentes.",
    },
  },
  {
    name: "Cisco CCNA",
    org: "Cisco Networking Academy",
    status: "in_progress",
    learned: {
      en: "Networking fundamentals — routing, switching, IP subnetting and secure network design.",
      es: "Fundamentos de redes — routing, switching, subnetting IP y diseño seguro de redes.",
    },
  },
  {
    name: "eJPT — Junior Penetration Tester",
    org: "INE / eLearnSecurity",
    status: "planned",
    learned: {
      en: "Hands-on offensive security: reconnaissance, exploitation and web application testing.",
      es: "Seguridad ofensiva práctica: reconocimiento, explotación y testing de aplicaciones web.",
    },
  },
  {
    name: "Backend Practitioner",
    org: "Backend Program",
    status: "completed",
    learned: {
      en: "Building production-grade REST APIs with clean architecture, testing and deployment workflows.",
      es: "Construir APIs REST de producción con arquitectura limpia, testing y flujos de despliegue.",
    },
  },
];

function Certifications() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "es";
  return (
    <section id="certifications" className="relative py-24 md:py-28 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          n={t("certs.n")}
          title={t("certs.title")}
          subtitle={t("certs.subtitle")}
        />
        <div className="grid md:grid-cols-2 gap-5">
          {CERTS.map((c, i) => (
            <Reveal key={c.name} delay={i * 80} variant="scale">
              <div className="group relative h-full rounded-xl border border-border bg-card/40 backdrop-blur-xl p-6 hover:border-neon/60 hover:-translate-y-1 hover:shadow-[0_0_30px_var(--neon-dim)] transition-all">
                <div className="flex items-start gap-4">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-neon/50 text-neon">
                    <Shield className="h-5 w-5" />
                    <CheckCircle2 className="absolute -bottom-1 -right-1 h-4 w-4 text-neon bg-background rounded-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-semibold text-foreground truncate group-hover:text-neon transition-colors">
                          {c.name}
                        </div>
                        <div className="text-xs font-mono text-muted-foreground mt-0.5">{c.org}</div>
                      </div>
                      <span
                        className={`shrink-0 font-mono text-[10px] uppercase tracking-wider rounded-full px-2.5 py-1 border ${
                          c.status === "completed"
                            ? "border-neon/60 text-neon bg-neon/10"
                            : c.status === "in_progress"
                              ? "border-cyber/50 text-cyber bg-cyber/10"
                              : "border-border text-muted-foreground"
                        }`}
                      >
                        {t(`certs.${c.status}`)}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="font-mono text-[10px] uppercase text-neon mb-1 flex items-center gap-1.5">
                        <BookOpen className="h-3 w-3" /> {t("certs.learned")}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {c.learned[lang as "en" | "es"]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Languages
// ============================================================
function Languages() {
  const { t } = useTranslation();
  const LANGS = [
    { flag: "🇪🇸", name: t("languages.spanish"), level: t("languages.spanish_level"), value: 100 },
    { flag: "🇬🇧", name: t("languages.english"), level: t("languages.english_level"), value: 65 },
  ];
  return (
    <section id="languages" className="relative py-24 md:py-28 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          n={t("languages.n")}
          title={t("languages.title")}
          subtitle={t("languages.subtitle")}
        />
        <div className="grid md:grid-cols-2 gap-5">
          {LANGS.map((l, i) => (
            <Reveal key={l.name} delay={i * 100} variant="scale">
              <div className="group relative rounded-xl border border-border/60 bg-card/30 backdrop-blur-xl p-6 hover:border-neon/60 hover:-translate-y-1 hover:shadow-[0_0_30px_var(--neon-dim)] transition-all">
                <div className="flex items-center gap-4">
                  <div className="text-3xl" aria-hidden>{l.flag}</div>
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-foreground group-hover:text-neon transition-colors">
                      {l.name}
                    </div>
                    <div className="text-xs font-mono text-muted-foreground mt-0.5">{l.level}</div>
                  </div>
                </div>
                <div className="mt-4 h-1.5 w-full rounded-full bg-background/60 overflow-hidden border border-border/60">
                  <div
                    className="h-full bg-gradient-to-r from-neon to-cyber transition-all duration-1000 group-hover:shadow-[0_0_14px_var(--neon-dim)]"
                    style={{ width: `${l.value}%` }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Contact — large buttons
// ============================================================
function Contact() {
  const { t } = useTranslation();
  const LINKS = [
    { key: "github", icon: Github, href: "https://github.com/", color: "neon" },
    { key: "linkedin", icon: Linkedin, href: "https://linkedin.com/", color: "cyber" },
    { key: "resume", icon: FileText, href: "#", color: "neon" },
    { key: "email", icon: Mail, href: "mailto:hello@masscocobruno.dev", color: "cyber" },
    { key: "whatsapp", icon: Phone, href: "https://wa.me/", color: "neon" },
  ] as const;
  return (
    <section id="contact" className="relative py-24 md:py-28 border-t border-border/50">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader
          n={t("contact.n")}
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LINKS.map((l, i) => (
            <Reveal key={l.key} delay={i * 80} variant="scale">
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group relative flex items-center gap-4 rounded-xl border border-border/60 bg-card/30 backdrop-blur-xl p-5 md:p-6 hover:border-neon/60 hover:-translate-y-1 hover:shadow-[0_0_30px_var(--neon-dim)] transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-neon/40 bg-background/40 text-neon group-hover:scale-110 group-hover:shadow-[0_0_18px_var(--neon-dim)] transition-all">
                  <l.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base font-semibold text-foreground group-hover:text-neon transition-colors">
                    {t(`contact.${l.key}`)}
                  </div>
                  <div className="font-mono text-[11px] text-muted-foreground truncate">
                    {l.href.replace(/^https?:\/\//, "").replace(/^mailto:/, "")}
                  </div>
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

// ============================================================
// Footer
// ============================================================
function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border/50 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal variant="fade">
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="rounded-xl border border-border/60 bg-card/30 backdrop-blur-xl p-5">
              <div className="flex items-center gap-2 font-mono text-xs text-neon mb-2">
                <Rocket className="h-3.5 w-3.5" /> {t("footer.building")}
              </div>
              <div className="text-lg font-semibold text-foreground">{t("footer.building_v")}</div>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/30 backdrop-blur-xl p-5">
              <div className="flex items-center gap-2 font-mono text-xs text-neon mb-2">
                <GraduationCap className="h-3.5 w-3.5" /> {t("footer.learning")}
              </div>
              <div className="text-sm text-foreground/90">{t("footer.learning_v")}</div>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/30 backdrop-blur-xl p-5">
              <div className="flex items-center gap-2 font-mono text-xs text-neon mb-2">
                <ClipboardCheck className="h-3.5 w-3.5" /> {t("footer.looking")}
              </div>
              <ul className="text-sm text-foreground/90 space-y-1">
                <li>· {t("footer.looking_1")}</li>
                <li>· {t("footer.looking_2")}</li>
                <li>· {t("footer.looking_3")}</li>
              </ul>
            </div>
          </div>
        </Reveal>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Massocco Bruno —{" "}
            <span className="text-neon">{t("footer.built")}</span>
          </div>
          <div className="flex items-center gap-2">
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Mail, href: "mailto:hello@masscocobruno.dev", label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="p-2 rounded-md border border-border text-muted-foreground hover:text-neon hover:border-neon hover:bg-neon/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Silence unused-import warnings for icons that may not appear directly.
// (Palette is intentionally unused; left for future design tokens.)
void Palette;
