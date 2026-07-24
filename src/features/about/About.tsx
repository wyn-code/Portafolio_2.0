import { Globe, Heart, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Reveal } from "@/components/animations/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLang } from "@/hooks/useLang";

const CONTENT = {
  en: {
    paragraphs: [
      "I'm Massocco Bruno, a Backend & Full Stack Developer based in Buenos Aires, Argentina. I enjoy turning real business problems into reliable software — REST APIs, clean data models and platforms designed to run in production, not just in a demo.",
      "I solve problems by thinking in systems: understand the domain, design a clean architecture, model the data, then build backend and frontend end-to-end so the product ships fast without cutting corners on quality.",
      "Backend engineering motivates me because it's where scalability, security and business logic meet. Right now I'm also deepening my knowledge in Linux, cloud infrastructure and cybersecurity to build systems I'd be comfortable running myself.",
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
      "Soy Massocco Bruno, Desarrollador Backend & Full Stack radicado en Buenos Aires, Argentina. Disfruto convertir problemas reales de negocio en software confiable — APIs REST, modelos de datos limpios y plataformas diseñadas para producción, no solo para una demo.",
      "Resuelvo problemas pensando en sistemas: entender el dominio, diseñar una arquitectura limpia, modelar los datos, y construir backend y frontend end-to-end para entregar rápido sin sacrificar calidad.",
      "El backend me motiva porque ahí se encuentran la escalabilidad, la seguridad y la lógica de negocio. Actualmente también profundizo en Linux, infraestructura cloud y ciberseguridad para construir sistemas que yo mismo pondría en producción.",
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
    <section id="about" className="relative py-24 md:py-28 border-t border-border/50">
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
