import {
  Briefcase,
  CheckCircle2,
  Code2,
  Globe,
  LifeBuoy,
  MessageSquare,
  Rocket,
  Search,
  TestTube2,
  Workflow,
} from "lucide-react";

import { Reveal } from "@/components/animations/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLang } from "@/hooks/useLang";

const COPY = {
  en: {
    eyebrow: "05 · how i work",
    title: "How I Work",
    subtitle:
      "What working with me actually looks like — availability, process and communication.",
    modality: "Work modality",
    modalityItems: [
      { icon: Briefcase, label: "Open to freelance & full-time roles" },
      { icon: Globe, label: "Remote-first · hybrid friendly" },
      { icon: Workflow, label: "Flexible: Agile / Scrum / Kanban" },
    ],
    processTitle: "Process",
    steps: [
      { icon: Search, title: "Discovery", desc: "Understand goals, users and constraints." },
      { icon: Workflow, title: "Planning", desc: "Scope, architecture and data model." },
      { icon: Code2, title: "Development", desc: "Backend + frontend, small iterations." },
      { icon: TestTube2, title: "Testing", desc: "Manual + automated on critical paths." },
      { icon: Rocket, title: "Delivery", desc: "Deploy to production with Docker / CI." },
      { icon: LifeBuoy, title: "Support", desc: "Monitoring, fixes and improvements." },
    ],
    commTitle: "Communication",
    commItems: [
      "Regular check-ins + async written updates",
      "Slack, Discord, email or the client's tool of choice",
      "Short demos at the end of each iteration",
      "Clear docs: README, API reference and setup guide",
    ],
  },
  es: {
    eyebrow: "05 · cómo trabajo",
    title: "Cómo Trabajo",
    subtitle:
      "Cómo es trabajar conmigo en la práctica — disponibilidad, proceso y comunicación.",
    modality: "Modalidad",
    modalityItems: [
      { icon: Briefcase, label: "Disponible para freelance y full-time" },
      { icon: Globe, label: "Remoto · también híbrido" },
      { icon: Workflow, label: "Flexible: Agile / Scrum / Kanban" },
    ],
    processTitle: "Proceso",
    steps: [
      { icon: Search, title: "Descubrimiento", desc: "Entender objetivos, usuarios y limitaciones." },
      { icon: Workflow, title: "Planificación", desc: "Alcance, arquitectura y modelo de datos." },
      { icon: Code2, title: "Desarrollo", desc: "Backend + frontend, iteraciones cortas." },
      { icon: TestTube2, title: "Testing", desc: "Manual y automatizado en flujos críticos." },
      { icon: Rocket, title: "Entrega", desc: "Deploy a producción con Docker / CI." },
      { icon: LifeBuoy, title: "Soporte", desc: "Monitoreo, correcciones y mejoras." },
    ],
    commTitle: "Comunicación",
    commItems: [
      "Check-ins regulares + updates async por escrito",
      "Slack, Discord, email o la herramienta que use el equipo",
      "Demos cortas al final de cada iteración",
      "Documentación clara: README, API y guía de setup",
    ],
  },
} as const;

export function HowIWork() {
  const lang = useLang();
  const c = COPY[lang];

  return (
    <section id="how-i-work" className="relative py-24 md:py-28 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

        <div className="grid gap-5 md:grid-cols-2 mb-6">
          <Reveal>
            <div className="h-full rounded-xl border border-border/60 bg-card/30 backdrop-blur-xl p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-neon" />
                {c.modality}
              </h3>
              <ul className="space-y-3">
                {c.modalityItems.map((item) => (
                  <li key={item.label} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md border border-neon/40 text-neon">
                      <item.icon className="h-4 w-4" />
                    </span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="h-full rounded-xl border border-border/60 bg-card/30 backdrop-blur-xl p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-neon" />
                {c.commTitle}
              </h3>
              <ul className="space-y-2.5">
                {c.commItems.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-neon shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="rounded-xl border border-border/60 bg-card/30 backdrop-blur-xl p-6 md:p-8">
            <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
              <Workflow className="h-4 w-4 text-neon" />
              {c.processTitle}
            </h3>

            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="group relative rounded-lg border border-border bg-background/40 p-4 transition-all hover:border-neon/60 hover:-translate-y-0.5 hover:shadow-[0_0_24px_var(--neon-dim)]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[10px] text-neon">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-md border border-neon/40 text-neon">
                      <step.icon className="h-4 w-4" />
                    </span>
                    <h4 className="font-semibold text-foreground text-sm">{step.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
