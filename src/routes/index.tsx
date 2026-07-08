import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
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
} from "lucide-react";

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

const NAV = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Techs", href: "#techs" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

function useTypewriter(words: string[], speed = 90, pause = 1600) {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [deleting, setDeleting] = useState(false);

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
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Techs />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-background/70 border-b border-border"
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
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-md border border-neon/50 px-4 py-1.5 font-mono text-xs text-neon hover:bg-neon/10 hover:glow-border transition-all"
        >
          <Terminal className="h-3.5 w-3.5" />
          contact
        </a>

        <a
          href="#contact"
          className="md:hidden inline-flex items-center rounded-md border border-neon/50 px-3 py-1.5 font-mono text-xs text-neon"
        >
          <Terminal className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const typed = useTypewriter(["Backend Developer", "Cybersecurity Student"]);

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-28 md:pt-32 md:pb-40 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
            Available for opportunities
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
            I engineer resilient backend systems and explore the offensive side of security —
            building infrastructure that&apos;s meant to be broken, and hardened.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-neon px-5 py-2.5 text-sm font-mono font-semibold text-primary-foreground hover:shadow-[0_0_24px_var(--neon-dim)] transition-all"
            >
              view_projects()
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-mono text-foreground hover:border-neon hover:text-neon transition-all"
            >
              get_in_touch()
            </a>
          </div>
        </div>

        <div className="relative hidden md:block">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <div className="relative aspect-square max-w-md mx-auto">
      <div className="absolute inset-0 rounded-2xl border border-neon/20 glow-border" />
      <svg viewBox="0 0 400 400" className="relative w-full h-full" fill="none">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.88 0.22 145)" />
            <stop offset="100%" stopColor="oklch(0.75 0.18 220)" />
          </linearGradient>
        </defs>
        {/* Desk */}
        <line x1="40" y1="320" x2="360" y2="320" stroke="url(#g1)" strokeWidth="1.5" />
        {/* Monitor */}
        <rect x="120" y="110" width="200" height="140" rx="6" stroke="url(#g1)" strokeWidth="1.5" />
        <line x1="220" y1="250" x2="220" y2="285" stroke="url(#g1)" strokeWidth="1.5" />
        <line x1="190" y1="290" x2="250" y2="290" stroke="url(#g1)" strokeWidth="1.5" />
        {/* Code lines on screen */}
        <g stroke="oklch(0.88 0.22 145)" strokeWidth="1.2" opacity="0.85">
          <line x1="135" y1="130" x2="175" y2="130" />
          <line x1="180" y1="130" x2="220" y2="130" />
          <line x1="145" y1="145" x2="200" y2="145" />
          <line x1="205" y1="145" x2="260" y2="145" />
          <line x1="135" y1="160" x2="180" y2="160" />
          <line x1="145" y1="175" x2="240" y2="175" />
          <line x1="135" y1="190" x2="170" y2="190" />
          <line x1="175" y1="190" x2="230" y2="190" />
          <line x1="145" y1="205" x2="210" y2="205" />
          <line x1="135" y1="220" x2="270" y2="220" />
        </g>
        {/* Person silhouette (line art) */}
        <g stroke="url(#g1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <circle cx="70" cy="250" r="18" />
          <path d="M55 280 Q70 268 85 280 L92 320 L48 320 Z" />
          <path d="M85 285 Q105 290 118 305" />
        </g>
        {/* Server rack right */}
        <g stroke="url(#g1)" strokeWidth="1.5">
          <rect x="330" y="200" width="40" height="120" rx="3" />
          <line x1="335" y1="215" x2="365" y2="215" />
          <line x1="335" y1="230" x2="365" y2="230" />
          <line x1="335" y1="245" x2="365" y2="245" />
          <line x1="335" y1="260" x2="365" y2="260" />
          <line x1="335" y1="275" x2="365" y2="275" />
          <circle cx="360" cy="310" r="2" fill="oklch(0.88 0.22 145)" />
        </g>
        {/* Connecting network dots */}
        <g fill="oklch(0.88 0.22 145)">
          <circle cx="260" cy="80" r="2" />
          <circle cx="300" cy="60" r="2" />
          <circle cx="340" cy="90" r="2" />
          <circle cx="220" cy="60" r="2" />
        </g>
        <g stroke="oklch(0.75 0.18 220)" strokeWidth="0.8" opacity="0.6">
          <line x1="260" y1="80" x2="300" y2="60" />
          <line x1="300" y1="60" x2="340" y2="90" />
          <line x1="220" y1="60" x2="260" y2="80" />
          <line x1="220" y1="60" x2="200" y2="110" />
          <line x1="340" y1="90" x2="330" y2="200" />
        </g>
      </svg>
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
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <SectionHeader n="01" title="About Me" />
        </div>
        <div className="md:col-span-3 space-y-5 text-muted-foreground leading-relaxed">
          <p>
            I&apos;m a backend developer with a growing passion for cybersecurity. I spend my days
            designing <span className="text-foreground">scalable APIs</span>, tuning databases, and
            wiring together services that quietly do the heavy lifting.
          </p>
          <p>
            My nights lean darker — I study{" "}
            <span className="text-neon">ethical hacking, network security, and offensive tooling</span>,
            treating every system I build as one I&apos;ll eventually try to break.
          </p>
          <p>
            My goal: engineer software that&apos;s not just performant, but genuinely hard to
            compromise.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { k: "Focus", v: "Backend" },
              { k: "Studying", v: "InfoSec" },
              { k: "Based in", v: "Remote" },
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
    desc: "JWT-based authentication service with refresh rotation, brute-force protection, and role scopes.",
    tags: ["Node.js", "PostgreSQL", "Redis", "JWT"],
    github: "#",
    demo: "#",
  },
  {
    title: "PortScope",
    desc: "Async TCP port scanner with service fingerprinting and reporting — built to study network reconnaissance.",
    tags: ["Python", "asyncio", "Nmap"],
    github: "#",
    demo: "#",
  },
  {
    title: "LogHunter",
    desc: "Real-time log ingestion pipeline that flags suspicious auth patterns and privilege escalations.",
    tags: ["Go", "Kafka", "Elasticsearch"],
    github: "#",
    demo: "#",
  },
  {
    title: "SecureShare",
    desc: "End-to-end encrypted file sharing with zero-knowledge storage and expiring links.",
    tags: ["Node.js", "AES-256", "S3"],
    github: "#",
    demo: "#",
  },
  {
    title: "CTF Toolkit",
    desc: "Collection of small utilities I use for CTFs — crypto helpers, payload generators, and web fuzzers.",
    tags: ["Python", "OWASP", "Burp"],
    github: "#",
    demo: "#",
  },
  {
    title: "MicroMesh",
    desc: "Lightweight service mesh POC exploring mTLS, retries and circuit breakers between microservices.",
    tags: ["Go", "gRPC", "mTLS"],
    github: "#",
    demo: "#",
  },
];

function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          n="02"
          title="Projects"
          subtitle="Selected work — backend systems, security tooling and side experiments."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              className="group relative rounded-lg border border-border bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neon/60 hover:shadow-[0_0_30px_oklch(0.88_0.22_145/0.1)]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background/60 text-neon">
                  <FileCode className="h-5 w-5" />
                </div>
                <div className="flex gap-1">
                  <a
                    href={p.github}
                    aria-label="GitHub"
                    className="p-2 rounded-md text-muted-foreground hover:text-neon hover:bg-neon/10 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href={p.demo}
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
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded px-2 py-0.5"
                  >
                    {t}
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
    title: "Backend",
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
    title: "Cybersecurity",
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
  return (
    <section id="techs" className="relative py-24 md:py-32 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          n="03"
          title="Technologies"
          subtitle="The stack I lean on for building services — and for taking them apart."
        />
        <div className="grid md:grid-cols-2 gap-6">
          {TECH_GROUPS.map((g) => (
            <div key={g.title} className="rounded-lg border border-border bg-card/40 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-neon/40 text-neon">
                  <g.icon className="h-4 w-4" />
                </div>
                <h3 className="font-mono text-sm text-muted-foreground">
                  <span className="text-neon">./</span>
                  {g.title.toLowerCase()}
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
  { name: "CompTIA Security+", org: "CompTIA", status: "In progress" },
  { name: "Cisco CCNA", org: "Cisco Networking Academy", status: "In progress" },
  { name: "eJPT — Junior Penetration Tester", org: "INE / eLearnSecurity", status: "Planned" },
  { name: "BPN — Backend Practitioner", org: "Backend Program", status: "Completed" },
];

function Certifications() {
  return (
    <section id="certifications" className="relative py-24 md:py-32 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          n="04"
          title="Certifications"
          subtitle="Credentials — earned, in-progress, and on the roadmap."
        />
        <div className="grid md:grid-cols-2 gap-4">
          {CERTS.map((c) => (
            <div
              key={c.name}
              className="group flex items-center gap-4 rounded-lg border border-border bg-card/40 p-5 hover:border-neon/60 transition-all"
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
                  c.status === "Completed"
                    ? "border-neon/60 text-neon bg-neon/10"
                    : c.status === "In progress"
                      ? "border-cyber/50 text-cyber bg-cyber/10"
                      : "border-border text-muted-foreground"
                }`}
              >
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 border-t border-border/50">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeader
          n="05"
          title="Contact"
          subtitle="Got an idea, a role, or a system worth breaking? Let's talk."
        />
        <form
          onSubmit={onSubmit}
          className="rounded-lg border border-border bg-card/40 p-6 md:p-8 space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="name" name="name" type="text" placeholder="Your name" />
            <Field label="email" name="email" type="email" placeholder="you@domain.com" />
          </div>
          <div>
            <label className="block font-mono text-xs text-neon mb-2">
              <span className="opacity-60">&gt;</span> message
            </label>
            <textarea
              required
              name="message"
              rows={5}
              placeholder="Say something..."
              className="w-full rounded-md border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 font-mono outline-none transition-all focus:border-neon focus:shadow-[0_0_0_3px_oklch(0.88_0.22_145/0.15),0_0_18px_oklch(0.88_0.22_145/0.25)] resize-none"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="font-mono text-xs text-muted-foreground">
              {sent ? (
                <span className="text-neon">✓ message_sent — I&apos;ll reply soon.</span>
              ) : (
                <span>encrypted transport · no tracking</span>
              )}
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-neon px-5 py-2.5 text-sm font-mono font-semibold text-primary-foreground hover:shadow-[0_0_24px_var(--neon-dim)] transition-all"
            >
              <Mail className="h-4 w-4" />
              send()
            </button>
          </div>
        </form>
        <div className="mt-6 flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5 text-neon" />
          or reach out at{" "}
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
        className="w-full rounded-md border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 font-mono outline-none transition-all focus:border-neon focus:shadow-[0_0_0_3px_oklch(0.88_0.22_145/0.15),0_0_18px_oklch(0.88_0.22_145/0.25)]"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Massocco Bruno — <span className="text-neon">built with intent.</span>
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
              className="p-2 rounded-md border border-border text-muted-foreground hover:text-neon hover:border-neon hover:bg-neon/10 transition-all"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
