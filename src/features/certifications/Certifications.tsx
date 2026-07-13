import { ArrowUpRight, CheckCircle2, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Reveal } from "@/components/animations/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CERTIFICATIONS } from "@/data/certifications";
import { useLang } from "@/hooks/useLang";

export function Certifications() {
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
          {CERTIFICATIONS.map((c, i) => (
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
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 backdrop-blur-md px-5 py-2.5 text-sm font-mono text-foreground hover:border-neon hover:text-neon hover:-translate-y-0.5 transition-all"
          >
            {lang === "en" ? "View All Certifications" : "Ver Todas las Certificaciones"}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
