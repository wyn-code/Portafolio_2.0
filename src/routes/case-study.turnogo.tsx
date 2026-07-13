import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Server,
  Database,
  Shield,
  Cloud,
  Code2,
  Rocket,
  CheckCircle2,
  Github,
  ExternalLink,
  Network,
  KeyRound,
} from "lucide-react";
import "@/i18n";

export const Route = createFileRoute("/case-study/turnogo")({
  head: () => ({
    meta: [
      { title: "TurnoGo — Case Study · Massocco Bruno" },
      { name: "description", content: "Technical case study of TurnoGo: architecture, database, JWT auth, deployment with Docker, and key engineering challenges." },
      { property: "og:title", content: "TurnoGo — Case Study" },
      { property: "og:description", content: "Architecture, database, authentication, deployment and lessons from building TurnoGo." },
      { property: "og:type", content: "article" },
    ],
  }),
  component: CaseStudy,
});

function CaseStudy() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "es";
  const c = COPY[lang];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-neon transition-colors mb-10">
          <ArrowLeft className="h-4 w-4" /> {c.back}
        </Link>

        <div className="font-mono text-xs uppercase tracking-widest text-neon mb-3">{c.eyebrow}</div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">TurnoGo</h1>
        <p className="mt-3 text-lg text-muted-foreground">{c.tagline}</p>
        <div className="mt-4 h-px w-16 bg-neon" />

        <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed">{c.intro}</p>

        <div className="flex flex-wrap gap-2 mt-6">
          <a href="#" className="inline-flex items-center gap-2 rounded-md bg-neon px-4 py-2 text-sm font-mono font-semibold text-primary-foreground hover:shadow-[0_0_22px_var(--neon-dim)] hover:-translate-y-0.5 transition-all">
            <ExternalLink className="h-4 w-4" /> {c.live}
          </a>
          <a href="#" className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 px-4 py-2 text-sm font-mono hover:border-neon hover:text-neon hover:-translate-y-0.5 transition-all">
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>

        {/* Architecture */}
        <Section title={c.sections.arch.title} icon={Network}>
          <p className="text-muted-foreground leading-relaxed">{c.sections.arch.body}</p>
          <div className="mt-6 rounded-xl border border-border/60 bg-card/30 backdrop-blur-xl p-6">
            <div className="flex flex-col items-stretch gap-3">
              {ARCH_STEPS.map((s, i) => (
                <div key={s.label} className="flex flex-col items-center">
                  <div className="w-full max-w-sm mx-auto flex items-center gap-3 rounded-lg border border-neon/30 bg-background/50 px-4 py-3 shadow-[0_0_18px_var(--neon-dim)]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-neon/40 text-neon">
                      <s.icon className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-sm text-foreground">{s.label}</span>
                  </div>
                  {i < ARCH_STEPS.length - 1 && (
                    <div className="h-6 w-px bg-gradient-to-b from-neon to-cyber my-1" aria-hidden />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Database */}
        <Section title={c.sections.db.title} icon={Database}>
          <p className="text-muted-foreground leading-relaxed">{c.sections.db.body}</p>
          <ul className="mt-4 space-y-2">
            {c.sections.db.points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-foreground/90">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-neon shrink-0" /> {p}
              </li>
            ))}
          </ul>
        </Section>

        {/* Authentication */}
        <Section title={c.sections.auth.title} icon={KeyRound}>
          <p className="text-muted-foreground leading-relaxed">{c.sections.auth.body}</p>
          <ul className="mt-4 space-y-2">
            {c.sections.auth.points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-foreground/90">
                <Shield className="h-4 w-4 mt-0.5 text-neon shrink-0" /> {p}
              </li>
            ))}
          </ul>
        </Section>

        {/* Deployment */}
        <Section title={c.sections.deploy.title} icon={Rocket}>
          <p className="text-muted-foreground leading-relaxed">{c.sections.deploy.body}</p>
        </Section>

        {/* API */}
        <Section title={c.sections.api.title} icon={Server}>
          <p className="text-muted-foreground leading-relaxed">{c.sections.api.body}</p>
        </Section>

        {/* Challenges */}
        <Section title={c.sections.challenges.title} icon={Code2}>
          <div className="space-y-4">
            {c.sections.challenges.items.map((it) => (
              <div key={it.t} className="rounded-lg border border-border/60 bg-card/30 backdrop-blur-xl p-5">
                <div className="font-semibold text-foreground">{it.t}</div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{it.d}</p>
              </div>
            ))}
          </div>
        </Section>

        <div className="mt-16 pt-8 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-neon transition-colors">
            <ArrowLeft className="h-4 w-4" /> {c.back}
          </Link>
          <Link to="/" hash="contact" className="inline-flex items-center gap-2 rounded-md bg-neon px-4 py-2 text-sm font-mono font-semibold text-primary-foreground hover:shadow-[0_0_22px_var(--neon-dim)] hover:-translate-y-0.5 transition-all">
            {c.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-md border border-neon/40 bg-background/40 text-neon">
          <Icon className="h-4 w-4" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}

const ARCH_STEPS = [
  { label: "React + TypeScript (Frontend)", icon: Code2 },
  { label: "FastAPI (REST API)", icon: Server },
  { label: "JWT Authentication + RBAC", icon: Shield },
  { label: "PostgreSQL (Relational DB)", icon: Database },
  { label: "Supabase Storage (Assets)", icon: Cloud },
  { label: "Docker + Render (Deployment)", icon: Rocket },
];

const COPY = {
  en: {
    eyebrow: "case study",
    back: "Back to portfolio",
    tagline: "Booking & business management platform",
    intro:
      "TurnoGo is a production-ready SaaS that lets service businesses manage appointments, clients, staff and revenue. This case study walks through the architecture, data model, authentication, deployment and the technical challenges I solved along the way.",
    live: "Live demo",
    cta: "Get in touch",
    sections: {
      arch: {
        title: "Architecture",
        body:
          "The system follows a clean separation between frontend, API and persistence. React consumes a typed REST API served by FastAPI, which talks to PostgreSQL for relational data and Supabase Storage for business assets. Every layer is stateless and horizontally scalable behind Docker.",
      },
      db: {
        title: "Database Design",
        body:
          "PostgreSQL schema modeled around the business domain — businesses, staff, services, appointments, clients and time slots. Designed for multi-tenant use with strict referential integrity.",
        points: [
          "Normalized relational schema with foreign keys and indexes on hot query paths.",
          "Conflict detection at the database level to prevent overlapping appointments.",
          "Migrations version-controlled and reproducible across environments.",
        ],
      },
      auth: {
        title: "Authentication (JWT)",
        body:
          "Auth is handled with JWT access tokens plus refresh rotation. Passwords are hashed with a modern algorithm, and every protected endpoint validates scope and role before touching the database.",
        points: [
          "Access + refresh tokens with rotation and revocation.",
          "Role-based access control for admin, staff and client scopes.",
          "Password hashing with bcrypt-style KDF and rate-limited login endpoints.",
        ],
      },
      deploy: {
        title: "Deployment (Docker)",
        body:
          "The API and frontend are containerized with Docker and deployed to Render. Environment configuration is injected at runtime, images are reproducible, and rollouts are zero-downtime. Storage lives on Supabase.",
      },
      api: {
        title: "API Design",
        body:
          "RESTful, resource-oriented endpoints with clear versioning, consistent error responses and OpenAPI docs generated automatically by FastAPI. Pagination, filtering and validation are handled through Pydantic schemas.",
      },
      challenges: {
        title: "Challenges & Solutions",
        items: [
          { t: "Preventing appointment conflicts", d: "Solved with server-side validation plus a database exclusion constraint so two overlapping bookings are physically impossible." },
          { t: "Safe JWT refresh flow", d: "Refresh tokens are single-use and rotated on every call, with revocation on logout to reduce token theft impact." },
          { t: "Multi-tenant data isolation", d: "Every query is scoped by business_id via a shared middleware, so business data never leaks between accounts." },
        ],
      },
    },
  },
  es: {
    eyebrow: "caso de estudio",
    back: "Volver al portfolio",
    tagline: "Plataforma de reservas y gestión de negocios",
    intro:
      "TurnoGo es un SaaS listo para producción que permite a negocios de servicios gestionar turnos, clientes, personal e ingresos. Este caso de estudio recorre la arquitectura, el modelo de datos, la autenticación, el despliegue y los desafíos técnicos que resolví.",
    live: "Demo en vivo",
    cta: "Contactar",
    sections: {
      arch: {
        title: "Arquitectura",
        body:
          "El sistema separa claramente frontend, API y persistencia. React consume una API REST tipada servida por FastAPI, que se comunica con PostgreSQL para datos relacionales y con Supabase Storage para activos del negocio. Cada capa es stateless y escalable horizontalmente sobre Docker.",
      },
      db: {
        title: "Diseño de Base de Datos",
        body:
          "Esquema PostgreSQL modelado alrededor del dominio — negocios, personal, servicios, turnos, clientes y bloques horarios. Pensado para multi-tenant con integridad referencial estricta.",
        points: [
          "Esquema normalizado con foreign keys e índices en las consultas más frecuentes.",
          "Detección de conflictos a nivel de base de datos para evitar turnos superpuestos.",
          "Migraciones versionadas y reproducibles entre entornos.",
        ],
      },
      auth: {
        title: "Autenticación (JWT)",
        body:
          "La autenticación usa JWT con rotación de refresh tokens. Las contraseñas se hashean con un algoritmo moderno y cada endpoint protegido valida rol y scope antes de tocar la base de datos.",
        points: [
          "Access + refresh tokens con rotación y revocación.",
          "Control de acceso por roles para admin, staff y clientes.",
          "Hashing de contraseñas con KDF tipo bcrypt y rate limiting en login.",
        ],
      },
      deploy: {
        title: "Despliegue (Docker)",
        body:
          "API y frontend se empaquetan con Docker y se despliegan en Render. La configuración se inyecta en runtime, las imágenes son reproducibles y los rollouts son sin downtime. El storage vive en Supabase.",
      },
      api: {
        title: "Diseño de API",
        body:
          "Endpoints REST orientados a recursos, con versionado claro, respuestas de error consistentes y documentación OpenAPI generada automáticamente por FastAPI. Paginación, filtros y validación se manejan con Pydantic.",
      },
      challenges: {
        title: "Desafíos y Soluciones",
        items: [
          { t: "Evitar conflictos de turnos", d: "Resuelto con validación en servidor más un exclusion constraint en la base, para que dos turnos superpuestos sean físicamente imposibles." },
          { t: "Flujo seguro de refresh JWT", d: "Los refresh tokens son de un solo uso y rotan en cada llamada, con revocación al logout para reducir el impacto de robo de tokens." },
          { t: "Aislamiento multi-tenant", d: "Cada consulta se filtra por business_id en un middleware compartido, evitando fugas de datos entre cuentas." },
        ],
      },
    },
  },
};
