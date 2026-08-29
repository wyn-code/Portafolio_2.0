import { useTranslation } from "react-i18next";

import { Reveal } from "@/components/animations/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TECH_GROUPS, TECH_YEARS } from "@/data/techs";
import { useLang } from "@/hooks/useLang";

export function Techs() {
  const { t } = useTranslation();
  const lang = useLang();

  const coreStack = TECH_GROUPS.filter((g) =>
    ["languages", "frontend", "backend", "database"].includes(g.key)
  );

  const cloud = TECH_GROUPS.find((g) => g.key === "cloud");

  const infrastructure = TECH_GROUPS.filter((g) =>
    ["services", "automation"].includes(g.key)
  );

  const tools = TECH_GROUPS.filter((g) =>
    ["vcs", "tools", "os", "ai", "design"].includes(g.key)
  );

  const renderSection = (
    title: string,
    description: string,
    groups: typeof TECH_GROUPS
  ) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <Reveal key={g.key} delay={i * 60}>
            <div className="group h-full rounded-xl border border-border/60 bg-card/30 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-neon/50 hover:shadow-[0_0_28px_var(--neon-dim)]">

              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-neon/40 text-neon">
                  <g.icon className="h-4 w-4" />
                </div>

                <h4 className="font-semibold text-foreground">
                  {g.label[lang]}
                </h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/40 px-2.5 py-1 font-mono text-xs text-foreground/90 transition-colors hover:border-neon/60 hover:text-neon"
                  >
                    {item}
                    {TECH_YEARS[item] && (
                      <span className="text-[10px] text-muted-foreground">· {TECH_YEARS[item]}</span>
                    )}
                  </span>
                ))}

              </div>

            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );

  return (
    <section
      id="techs"
      className="relative border-t border-border/50 py-24 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">

        <SectionHeader
          eyebrow={lang === "en" ? "04 · Tech Stack" : "04 · Stack Tecnológico"}
          title={t("techs.title")}
        />

        <div className="space-y-20">

          {renderSection(
            lang === "en" ? "Core Stack" : "Stack Principal",
            lang === "en"
              ? "Technologies I use to build production-ready applications."
              : "Tecnologías con las que desarrollo aplicaciones de forma habitual.",
            coreStack
          )}

          {cloud && (
            <Reveal>
              <div className="rounded-2xl border border-neon/45 bg-card/40 p-6 backdrop-blur-xl shadow-[0_0_40px_var(--neon-dim)] md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-md">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-neon/50 text-neon">
                        <cloud.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-2xl font-bold tracking-tight text-foreground">
                        {cloud.label[lang]}
                      </h3>
                    </div>
                    <p className="font-mono text-xs leading-relaxed text-muted-foreground">
                      {lang === "en"
                        ? "$ containerize --docker · deploy --ci-cd · monitor --prod"
                        : "$ containerizar --docker · desplegar --ci-cd · monitorear --prod"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {cloud.items.map((item) => (
                      <span
                        key={item}
                        className="terminal-badge text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_18px_var(--neon-dim)]"
                      >
                        {item}
                        {TECH_YEARS[item] && (
                          <span className="ml-1.5 text-[10px] text-muted-foreground">
                            · {TECH_YEARS[item]}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {renderSection(
            lang === "en"
              ? "Infrastructure & Integrations"
              : "Infraestructura e Integraciones",
            lang === "en"
              ? "Deployment platforms, cloud services and third-party integrations."
              : "Plataformas de despliegue, servicios cloud e integraciones.",
            infrastructure
          )}

          {renderSection(
            lang === "en"
              ? "Development Tools"
              : "Herramientas de Desarrollo",
            lang === "en"
              ? "Tools that are part of my daily workflow."
              : "Herramientas que forman parte de mi flujo de trabajo diario.",
            tools
          )}

        </div>

      </div>
    </section>
  );
}