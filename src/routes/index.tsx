import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Mail,
  Shield,
  Server,
  Database,
  Terminal,
  Lock,
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
} from "lucide-react";

import "@/lib/i18n";
import tuxHero from "@/assets/tux-hero.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Massocco Bruno — Backend Developer & Cybersecurity Student" },
      {
        name: "description",
        content:
          "Portfolio of Massocco Bruno — backend developer building scalable, secure systems and studying cybersecurity.",
      },
      { property: "og:title", content: "Massocco Bruno — Backend & Cybersecurity" },
      {
        property: "og:description",
        content: "Backend developer & cybersecurity student. Projects, stack, and credentials.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

function useTypewriter(words: string[], speed = 90, pause = 1600) {
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
    const delay = done ? pause : empty ? 400 : deleting ? speed / 2 : speed;

    const t = setTimeout(() => {
      if (done) setDeleting(true);
      else if (empty) {
        setDeleting(false);
        setWi((i) => i + 1);
      } else {
        setText(
          deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1),
        );
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, wi, words, speed, pause]);

  return text;
}

function Portfolio() {
  // Theme + language bootstrapping (client-only to keep SSR safe)
  const { i18n } = useTranslation();

  useEffect(() => {
    // Theme
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored ?? (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("light", theme === "light");

    // Language
    const savedLang = localStorage.getItem("lang");
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <CursorGlow />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Techs />
      <Certifications />
      <Mindset />
      <Workflow />
      <Contact />
      <Footer />
    </div>
  );
}

function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = document.createElement("div");
    el.className = "cursor-glow";
    document.body.appendChild(el);
    let raf = 0;
    let x = 0, y = 0, tx = 0, ty = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      el.style.opacity = "1";
    };
    const onLeave = () => { el.style.opacity = "0"; };
    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      el.remove();
    };
  }, []);
  return null;
}


function useReveal<T extends HTMLElement>() {
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
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

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


function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.techs"), href: "#techs" },
    { label: t("nav.certifications"), href: "#certifications" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/60 border-b border-border/60"
          : "bg-transparent"
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
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-mono text-muted-foreground hover:text-neon transition-colors relative group"
            >
              <span className="text-neon/60 mr-1">0{i + 1}.</span>
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

const COMMAND_LINES = [
  "git status",
  "git pull",
  "git push origin main",
  'git commit -m "Initial commit"',
  "git checkout main",
  "git merge feature/auth",
  "docker compose up -d",
  "docker ps",
  "docker logs -f api",
  "docker build .",
  "docker exec -it api bash",
  "python main.py",
  "uvicorn app.main:app --reload",
  "pip install fastapi",
  "pytest -q",
  "sudo apt update",
  "sudo apt upgrade -y",
  "sudo systemctl restart nginx",
  "chmod +x deploy.sh",
  "npm install",
  "pnpm install",
  "pnpm dev",
  "npm run build",
  "SELECT * FROM users;",
  "SELECT * FROM appointments;",
  "INSERT INTO businesses ...",
  "UPDATE appointments SET status='ok'",
  "DELETE FROM sessions WHERE expired",
  "HTTP/1.1 200 OK",
  "JWT verified ✓",
  "REST API",
  "FastAPI",
  "React + TypeScript",
  "PostgreSQL",
  "Docker",
  "Linux",
  "{ \"json\": true }",
  "async / await",
];

function CommandRain() {
  const [cols, setCols] = useState<
    { id: number; left: number; delay: number; duration: number; opacity: number; lines: string[] }[]
  >([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 10 : 22;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);
    const generated = Array.from({ length: count }, (_, i) => {
      const lineCount = Math.floor(rand(6, 12));
      return {
        id: i,
        left: (i / count) * 100 + rand(-2, 2),
        delay: -rand(0, 20),
        duration: rand(16, 32),
        opacity: rand(0.05, 0.1),
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

function Hero() {

  const { t } = useTranslation();
  const typed = useTypewriter([t("hero.role1"), t("hero.role2")]);

  return (
    <section id="top" className="relative overflow-hidden">
      <CommandRain />
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-28 md:pt-32 md:pb-40 grid md:grid-cols-2 gap-12 items-center">

        <div className="space-y-6 animate-hero-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 backdrop-blur-md px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
            {t("hero.available")}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Massocco <br />
            <span className="text-neon">Bruno</span>
          </h1>
          <div className="font-mono text-lg md:text-xl text-muted-foreground h-8">
            <span className="text-neon">&gt;</span> {typed}
            <span className="inline-block w-2 h-5 bg-neon ml-1 align-middle animate-pulse" />
          </div>
          <p className="text-muted-foreground max-w-md leading-relaxed">
            {t("hero.description")}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-neon px-5 py-2.5 text-sm font-mono font-semibold text-primary-foreground hover:shadow-[0_0_24px_var(--neon-dim)] hover:-translate-y-0.5 transition-all duration-300"
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
      {/* Soft glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl animate-hero-glow"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--cyber) 0%, transparent 55%), radial-gradient(circle at 60% 40%, var(--neon-dim) 0%, transparent 60%)",
        }}
        aria-hidden
      />
      {/* Floating framed illustration */}
      <div className="relative animate-hero-float">
        <div className="relative rounded-full overflow-hidden border border-neon/30 shadow-[0_0_60px_var(--neon-dim)] backdrop-blur-sm">
          <img
            src={tuxHero}
            alt="Tux the Linux penguin in a black hoodie coding at a modern desk"
            width={1024}
            height={1024}
            className="w-full h-full object-cover"
          />
          {/* Inner ring highlight */}
          <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
        </div>
        {/* Orbiting accents */}
        <span className="absolute -top-2 left-8 h-2 w-2 rounded-full bg-neon shadow-[0_0_12px_var(--neon)]" />
        <span className="absolute bottom-6 -right-1 h-2 w-2 rounded-full bg-cyber shadow-[0_0_12px_var(--cyber)]" />
      </div>
    </div>
  );
}

function SectionHeader({ n, title, subtitle }: { n: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-12">
      <div className="font-mono text-sm text-neon mb-2">
        <span className="opacity-60">{n}.</span> {title.toLowerCase().replace(/\s/g, "_")}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground max-w-2xl">{subtitle}</p>}
      <div className="mt-4 h-px w-16 bg-neon" />
    </div>
  );
}

function About() {
  const { t } = useTranslation();
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <SectionHeader n={t("about.n")} title={t("about.title")} />
        </div>
        <div className="md:col-span-3 space-y-5 text-muted-foreground leading-relaxed">
          <p>
            {t("about.p1_a")}
            <span className="text-foreground">{t("about.p1_b")}</span>
            {t("about.p1_c")}
          </p>
          <p>
            {t("about.p2_a")}
            <span className="text-neon">{t("about.p2_b")}</span>
            {t("about.p2_c")}
          </p>
          <p>{t("about.p3")}</p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { k: t("about.focus"), v: t("about.focus_v") },
              { k: t("about.studying"), v: t("about.studying_v") },
              { k: t("about.based"), v: t("about.based_v") },
            ].map((s) => (
              <div key={s.k} className="rounded-md border border-border bg-card/40 p-4">
                <div className="font-mono text-xs text-neon">{s.k}</div>
                <div className="mt-1 text-sm font-semibold text-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    title: "AuthVault API",
    desc: {
      en: "JWT-based authentication service with refresh rotation, brute-force protection, and role scopes.",
      es: "Servicio de autenticación basado en JWT con rotación de refresh, protección anti-fuerza bruta y roles.",
    },
    tags: ["Node.js", "PostgreSQL", "Redis", "JWT"],
  },
  {
    title: "PortScope",
    desc: {
      en: "Async TCP port scanner with service fingerprinting and reporting — built to study network reconnaissance.",
      es: "Escáner de puertos TCP asíncrono con fingerprinting de servicios y reportes — hecho para estudiar reconocimiento de red.",
    },
    tags: ["Python", "asyncio", "Nmap"],
  },
  {
    title: "LogHunter",
    desc: {
      en: "Real-time log ingestion pipeline that flags suspicious auth patterns and privilege escalations.",
      es: "Pipeline de ingesta de logs en tiempo real que detecta patrones sospechosos de autenticación y escaladas de privilegios.",
    },
    tags: ["Go", "Kafka", "Elasticsearch"],
  },
  {
    title: "SecureShare",
    desc: {
      en: "End-to-end encrypted file sharing with zero-knowledge storage and expiring links.",
      es: "Compartición de archivos con cifrado de extremo a extremo, almacenamiento zero-knowledge y enlaces con caducidad.",
    },
    tags: ["Node.js", "AES-256", "S3"],
  },
  {
    title: "CTF Toolkit",
    desc: {
      en: "Collection of small utilities I use for CTFs — crypto helpers, payload generators, and web fuzzers.",
      es: "Colección de utilidades para CTFs — helpers de cripto, generadores de payloads y fuzzers web.",
    },
    tags: ["Python", "OWASP", "Burp"],
  },
  {
    title: "MicroMesh",
    desc: {
      en: "Lightweight service mesh POC exploring mTLS, retries and circuit breakers between microservices.",
      es: "POC ligero de service mesh explorando mTLS, reintentos y circuit breakers entre microservicios.",
    },
    tags: ["Go", "gRPC", "mTLS"],
  },
];

function Projects() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "es";
  return (
    <section id="projects" className="relative py-24 md:py-32 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          n={t("projects.n")}
          title={t("projects.title")}
          subtitle={t("projects.subtitle")}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              className="group relative rounded-lg border border-border bg-card/40 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neon/60 hover:shadow-[0_0_30px_var(--neon-dim)]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background/60 text-neon">
                  <FileCode className="h-5 w-5" />
                </div>
                <div className="flex gap-1">
                  <a
                    href="#"
                    aria-label="GitHub"
                    className="p-2 rounded-md text-muted-foreground hover:text-neon hover:bg-neon/10 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    aria-label="Live demo"
                    className="p-2 rounded-md text-muted-foreground hover:text-neon hover:bg-neon/10 transition-colors"
                  >
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const TECH_GROUPS = [
  {
    key: "backend",
    icon: Server,
    items: [
      { name: "Node.js", icon: Code2 },
      { name: "Python", icon: Code2 },
      { name: "Go", icon: Cpu },
      { name: "PostgreSQL", icon: Database },
      { name: "Redis", icon: Database },
      { name: "Docker", icon: Server },
    ],
  },
  {
    key: "cybersecurity",
    icon: Shield,
    items: [
      { name: "Linux", icon: Terminal },
      { name: "OWASP", icon: Bug },
      { name: "Wireshark", icon: Network },
      { name: "Burp Suite", icon: Bug },
      { name: "Nmap", icon: Network },
      { name: "Kali", icon: KeyRound },
    ],
  },
];

function Techs() {
  const { t } = useTranslation();
  return (
    <section id="techs" className="relative py-24 md:py-32 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          n={t("techs.n")}
          title={t("techs.title")}
          subtitle={t("techs.subtitle")}
        />
        <div className="grid md:grid-cols-2 gap-6">
          {TECH_GROUPS.map((g) => (
            <div key={g.key} className="rounded-lg border border-border bg-card/40 backdrop-blur-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-neon/40 text-neon">
                  <g.icon className="h-4 w-4" />
                </div>
                <h3 className="font-mono text-sm text-muted-foreground">
                  <span className="text-neon">./</span>
                  {t(`techs.${g.key}`).toLowerCase()}
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {g.items.map((it) => (
                  <div
                    key={it.name}
                    className="group flex flex-col items-center justify-center gap-2 rounded-md border border-border bg-background/40 p-4 hover:border-neon/60 hover:-translate-y-0.5 transition-all"
                  >
                    <it.icon className="h-5 w-5 text-muted-foreground group-hover:text-neon transition-colors" />
                    <span className="text-xs font-mono text-foreground">{it.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CERTS = [
  { name: "CompTIA Security+", org: "CompTIA", status: "in_progress" },
  { name: "Cisco CCNA", org: "Cisco Networking Academy", status: "in_progress" },
  { name: "eJPT — Junior Penetration Tester", org: "INE / eLearnSecurity", status: "planned" },
  { name: "BPN — Backend Practitioner", org: "Backend Program", status: "completed" },
];

function Certifications() {
  const { t } = useTranslation();
  return (
    <section id="certifications" className="relative py-24 md:py-32 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          n={t("certs.n")}
          title={t("certs.title")}
          subtitle={t("certs.subtitle")}
        />
        <div className="grid md:grid-cols-2 gap-4">
          {CERTS.map((c) => (
            <div
              key={c.name}
              className="group flex items-center gap-4 rounded-lg border border-border bg-card/40 backdrop-blur-sm p-5 hover:border-neon/60 transition-all"
            >
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-neon/50 text-neon">
                <Shield className="h-5 w-5" />
                <CheckCircle2 className="absolute -bottom-1 -right-1 h-4 w-4 text-neon bg-background rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-foreground truncate">{c.name}</div>
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
          ))}
        </div>
      </div>
    </section>
  );
}

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
    <section id="mindset" className="relative py-24 md:py-32 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          n={t("mindset.n")}
          title={t("mindset.title")}
          subtitle={t("mindset.subtitle")}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MINDSET.map((m, i) => (
            <Reveal key={m.key} delay={i * 80}>
              <article
                className="group relative h-full rounded-xl border border-border/60 bg-card/30 backdrop-blur-xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-neon/60 hover:shadow-[0_0_36px_var(--neon-dim)]"
              >
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(400px circle at 30% 0%, var(--neon-dim), transparent 60%)",
                  }}
                  aria-hidden
                />
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-neon/40 bg-background/40 text-neon mb-4 group-hover:shadow-[0_0_20px_var(--neon-dim)] transition-shadow">
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
    <section id="workflow" className="relative py-24 md:py-32 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          n={t("workflow.n")}
          title={t("workflow.title")}
          subtitle={t("workflow.subtitle")}
        />

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block relative">
          <div className="relative">
            <div className="absolute left-0 right-0 top-6 h-px bg-border/60" />
            <div className="absolute left-0 top-6 h-px bg-gradient-to-r from-neon via-cyber to-transparent workflow-line" />
            <div className="grid grid-cols-8 gap-4">
              {WORKFLOW.map((s, i) => (
                <Reveal key={s.key} delay={i * 150}>
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

        {/* Mobile / tablet vertical timeline */}
        <div className="lg:hidden relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border/60" />
          <div className="absolute left-6 top-0 w-px bg-gradient-to-b from-neon via-cyber to-transparent workflow-line-v" />
          <div className="space-y-6">
            {WORKFLOW.map((s, i) => (
              <Reveal key={s.key} delay={i * 120}>
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

function Contact() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "");
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      setError(t("contact.invalid_email"));
      return;
    }
    setError(null);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    form.reset();
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 border-t border-border/50">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeader
          n={t("contact.n")}
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
        />
        <form
          onSubmit={onSubmit}
          className="rounded-lg border border-border bg-card/40 backdrop-blur-sm p-6 md:p-8 space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <Field label={t("contact.name")} name="name" type="text" placeholder={t("contact.name_ph")} />
            <Field label={t("contact.email")} name="email" type="email" placeholder={t("contact.email_ph")} />
          </div>
          <div>
            <label className="block font-mono text-xs text-neon mb-2">
              <span className="opacity-60">&gt;</span> {t("contact.message")}
            </label>
            <textarea
              required
              name="message"
              rows={5}
              placeholder={t("contact.message_ph")}
              className="w-full rounded-md border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 font-mono outline-none transition-all focus:border-neon focus:shadow-[0_0_0_3px_var(--neon-dim),0_0_18px_var(--neon-dim)] resize-none"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="font-mono text-xs text-muted-foreground">
              {error ? (
                <span className="text-destructive">{error}</span>
              ) : sent ? (
                <span className="text-neon">{t("contact.sent")}</span>
              ) : (
                <span>{t("contact.transport")}</span>
              )}
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-neon px-5 py-2.5 text-sm font-mono font-semibold text-primary-foreground hover:shadow-[0_0_24px_var(--neon-dim)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Mail className="h-4 w-4" />
              {t("contact.send")}
            </button>
          </div>
        </form>
        <div className="mt-6 flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5 text-neon" />
          {t("contact.or")}{" "}
          <a href="mailto:hello@masscocobruno.dev" className="text-neon hover:underline">
            hello@masscocobruno.dev
          </a>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block font-mono text-xs text-neon mb-2">
        <span className="opacity-60">&gt;</span> {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-md border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 font-mono outline-none transition-all focus:border-neon focus:shadow-[0_0_0_3px_var(--neon-dim),0_0_18px_var(--neon-dim)]"
      />
    </div>
  );
}

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border/50 py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Massocco Bruno —{" "}
          <span className="text-neon">{t("footer.built")}</span>
        </div>
        <div className="flex items-center gap-2">
          {[
            { icon: Github, href: "#", label: "GitHub" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Twitter, href: "#", label: "Twitter" },
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
    </footer>
  );
}
