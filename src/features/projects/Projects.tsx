import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Reveal } from "@/components/animations/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PROJECTS } from "@/data/projects";
import { useLang } from "@/hooks/useLang";

export function Projects() {
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
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc[lang]}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
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
                  {p.github && (
                    <a
                      href={p.github}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-neon transition-colors"
                    >
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-neon transition-colors"
                    >
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
