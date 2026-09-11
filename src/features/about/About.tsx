import { Globe, Heart, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Reveal } from "@/components/animations/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLang } from "@/hooks/useLang";

const CONTENT = {
  en: {
    paragraphs: [
      "I'm Massocco Bruno, a Backend & Full Stack Developer based in Buenos Aires, Argentina. I design and build REST APIs and platforms that are meant to run in production: clean layered architecture, solid data models and deployments I can reason about.",
      "My work leans on infrastructure and good delivery practices — containerizing services with Docker, automating builds and CI/CD pipelines, managing PostgreSQL databases in production, and monitoring what happens after release, not just before it.",
      "Security is part of the design, not an afterthought: JWT auth, least-privilege access and hardened deployments. I'm also certified in Ethical Hacking, which gives me an attacker's perspective when reviewing my own systems.",
    ],
    location: "Buenos Aires, Argentina — open to remote roles worldwide",
    languagesLabel: "Languages I speak",
    languages: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "Professional working" },
    ],
    interestsLabel: "Beyond the keyboard",
    interests: [
      "Self-hosting & Linux tinkering",
      "Cybersecurity & CTF challenges",
      "Reading about system design",
      "Football & outdoor running",
    ],
  },
  es: {
    paragraphs: [
      "Soy Massocco Bruno, Desarrollador Backend & Full Stack radicado en Buenos Aires, Argentina. Diseño y construyo APIs REST y plataformas pensadas para correr en producción: arquitectura limpia por capas, modelos de datos sólidos y despliegues que puedo explicar de punta a punta.",
      "Mi trabajo se apoya en la infraestructura y en buenas prácticas de entrega — containerizar servicios con Docker, automatizar builds y pipelines de CI/CD, administrar bases PostgreSQL en producción y monitorear lo que pasa después del release, no solo antes.",
      "La seguridad es parte del diseño, no un extra: autenticación JWT, mínimo privilegio y despliegues endurecidos. Además cuento con certificación en Ethical Hacking, lo que me da la mirada del atacante al revisar mis propios sistemas.",
    ],
    location: "Buenos Aires, Argentina — abierto a roles remotos en cualquier país",
    languagesLabel: "Idiomas que hablo",
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "Profesional" },
    ],
    interestsLabel: "Más allá del teclado",
    interests: [
      "Self-hosting y experimentos con Linux",
      "Ciberseguridad y retos CTF",
      "Lectura sobre diseño de sistemas",
      "Fútbol y running al aire libre",
    ],
  },
};

export function About() {
  const { t } = useTranslation();
  const lang = useLang();
  const c = CONTENT[lang];

  return (
    <section id="about" className="relative py-16 md:py-20 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <SectionHeader eyebrow="01 · about" title={t("about.title")} />
        </div>
        <Reveal className="md:col-span-3 space-y-8" delay={100}>
          <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
            {c.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="rounded-xl border border-border/60 bg-card/30 backdrop-blur-xl p-5">
              <div className="flex items-center gap-2 text-neon mb-2">
                <MapPin className="h-4 w-4" />
                <span className="font-mono text-xs uppercase tracking-wider">
                  {lang === "en" ? "Based in" : "Ubicación"}
                </span>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">{c.location}</p>
            </div>

            <div className="rounded-xl border border-border/60 bg-card/30 backdrop-blur-xl p-5">
              <div className="flex items-center gap-2 text-neon mb-2">
                <Globe className="h-4 w-4" />
                <span className="font-mono text-xs uppercase tracking-wider">{c.languagesLabel}</span>
              </div>
              <ul className="space-y-1">
                {c.languages.map((l) => (
                  <li key={l.name} className="text-sm text-foreground/90 flex justify-between gap-2">
                    <span>{l.name}</span>
                    <span className="text-muted-foreground text-xs">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border/60 bg-card/30 backdrop-blur-xl p-5">
              <div className="flex items-center gap-2 text-neon mb-2">
                <Heart className="h-4 w-4" />
                <span className="font-mono text-xs uppercase tracking-wider">{c.interestsLabel}</span>
              </div>
              <ul className="space-y-1 text-sm text-foreground/90">
                {c.interests.map((i) => (
                  <li key={i}>· {i}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
