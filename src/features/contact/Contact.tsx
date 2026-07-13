import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Reveal } from "@/components/animations/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CONTACT_LINKS } from "@/data/socialLinks";

export function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="relative py-24 md:py-28 border-t border-border/50">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader eyebrow="06 · contact" title={t("contact.title")} subtitle={t("contact.subtitle")} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONTACT_LINKS.map((l, i) => (
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
