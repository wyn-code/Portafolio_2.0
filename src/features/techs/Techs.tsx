import { useTranslation } from "react-i18next";

import { Reveal } from "@/components/animations/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TECH_GROUPS } from "@/data/techs";
import { useLang } from "@/hooks/useLang";

export function Techs() {
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
                    <span
                      key={name}
                      className="font-mono text-xs px-2 py-0.5 rounded-md border border-border bg-background/40 text-foreground/90 hover:border-neon/60 hover:text-neon transition-colors"
                    >
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
