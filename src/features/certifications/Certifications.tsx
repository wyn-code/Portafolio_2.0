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
    <section
      id="certifications"
      className="relative border-t border-border/50 py-24 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow={lang === "en" ? "05 · certifications" : "05 · certificaciones"}
          title={t("certs.title")}
        />

        <div className="grid gap-5 md:grid-cols-2">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal
              key={`${c.org}-${c.name.en}`}
              delay={i * 80}
              variant="scale"
            >
              <div className="group relative h-full rounded-xl border border-border bg-card/40 p-5 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-neon/60 hover:shadow-[0_0_30px_var(--neon-dim)]">
                <div className="flex items-start gap-4">
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neon/50 text-neon">
                    <Shield className="h-5 w-5" />

                    {c.status === "completed" && (
                      <CheckCircle2 className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-background text-neon" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-foreground transition-colors group-hover:text-neon">
                          {c.name[lang]}
                        </h3>

                        <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                          {c.org}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${
                          c.status === "completed"
                            ? "border-neon/60 bg-neon/10 text-neon"
                            : c.status === "in_progress"
                              ? "border-cyber/50 bg-cyber/10 text-cyber"
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
      </div>
    </section>
  );
}