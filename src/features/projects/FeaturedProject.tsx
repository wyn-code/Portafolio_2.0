import { Link } from "@tanstack/react-router";
import { ExternalLink, FileText, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import turnogoHome from "@/assets/images/Captura desde 2026-07-13 10-09-37.png";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLang } from "@/hooks/useLang";
import {TURNOGO_LINKS} from "@/data/featuredProyect"

const STACK = ["React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Docker"];

export function   FeaturedProject() {
  const { t } = useTranslation();
  const lang = useLang();
  const shortDesc =
    lang === "en"
      ? "A production-ready SaaS for service businesses — appointments, clients, staff and revenue in one platform. Built end-to-end."
      : "SaaS listo para producción para negocios de servicios — turnos, clientes, personal e ingresos en una sola plataforma. Construido end-to-end.";
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
                <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src={turnogoHome}
                  alt="TurnoGo homepage"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div
                  className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent"
                  aria-hidden
                />
              </div>
              </div>
              {/* Body */}
              <div className="p-6 md:p-10 flex flex-col gap-6">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{shortDesc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {STACK.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded px-2 py-0.5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 pt-2 mt-auto">
                  <a
                    href={TURNOGO_LINKS.demo}
                    target="_blank" 
                    className="inline-flex items-center gap-2 rounded-md bg-neon px-4 py-2.5 text-sm font-mono font-semibold text-primary-foreground hover:shadow-[0_0_22px_var(--neon-dim)] hover:-translate-y-0.5 transition-all"
                  >
                    <ExternalLink className="h-4 w-4" /> {t("featured.live")}
                  </a>
                  <a
                    href={TURNOGO_LINKS.github}
                    target="_blank" 
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 px-4 py-2.5 text-sm font-mono hover:border-neon hover:text-neon hover:-translate-y-0.5 transition-all"
                  >
                    <Github className="h-4 w-4" /> {t("featured.github")}
                  </a>
                  <Link
                    to="/case-study/turnogo"
                    className="inline-flex items-center gap-2 rounded-md border border-neon/50 bg-neon/10 px-4 py-2.5 text-sm font-mono text-neon hover:bg-neon/20 hover:-translate-y-0.5 transition-all"
                  >
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
