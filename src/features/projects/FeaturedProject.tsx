import { Link } from "@tanstack/react-router";
import { ExternalLink, FileText, Github } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Reveal } from "@/components/animations/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLang } from "@/hooks/useLang";

const STACK = ["React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Docker"];

export function FeaturedProject() {
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
                        {[0, 1, 2].map((k) => (
                          <div
                            key={k}
                            className="rounded-lg border border-border/60 bg-background/50 p-3 flex flex-col justify-between"
                          >
                            <div className="h-3 w-3 rounded bg-neon" />
                            <div className="h-3 w-10 rounded bg-neon/50" />
                          </div>
                        ))}
                      </div>
                      <div className="rounded-lg border border-border/60 bg-background/50 p-3 flex items-end gap-2">
                        {[40, 65, 30, 80, 55, 90, 70].map((h, k) => (
                          <div
                            key={k}
                            className="flex-1 rounded-t bg-gradient-to-t from-neon/70 to-cyber/70"
                            style={{ height: `${h}%` }}
                          />
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
                    href="#"
                    className="inline-flex items-center gap-2 rounded-md bg-neon px-4 py-2.5 text-sm font-mono font-semibold text-primary-foreground hover:shadow-[0_0_22px_var(--neon-dim)] hover:-translate-y-0.5 transition-all"
                  >
                    <ExternalLink className="h-4 w-4" /> {t("featured.live")}
                  </a>
                  <a
                    href="#"
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
