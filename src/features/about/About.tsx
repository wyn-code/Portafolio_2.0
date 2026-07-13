import { useTranslation } from "react-i18next";

import { Reveal } from "@/components/animations/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLang } from "@/hooks/useLang";

const PARAGRAPHS = {
  en: [
    "I'm a Backend & Full Stack Developer who enjoys turning real business problems into reliable software — REST APIs, clean data models and platforms designed to run in production, not just in a demo.",
    "I solve problems by thinking in systems: understand the domain, design a clean architecture, model the data, then build backend and frontend end-to-end so the product ships fast without cutting corners on quality.",
    "Backend engineering motivates me because it's where scalability, security and business logic meet. I care about clean code, secure authentication and building things I'd be comfortable running myself.",
  ],
  es: [
    "Soy Desarrollador Backend & Full Stack y disfruto convertir problemas reales de negocio en software confiable — APIs REST, modelos de datos limpios y plataformas diseñadas para producción, no solo para una demo.",
    "Resuelvo problemas pensando en sistemas: entender el dominio, diseñar una arquitectura limpia, modelar los datos, y construir backend y frontend end-to-end para entregar rápido sin sacrificar calidad.",
    "El backend me motiva porque ahí se encuentran la escalabilidad, la seguridad y la lógica de negocio. Me importa el código limpio, la autenticación segura y construir sistemas que yo mismo pondría en producción.",
  ],
};

export function About() {
  const { t } = useTranslation();
  const lang = useLang();
  const paragraphs = PARAGRAPHS[lang];

  return (
    <section id="about" className="relative py-24 md:py-28 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <SectionHeader eyebrow="01 · about" title={t("about.title")} />
        </div>
        <Reveal className="md:col-span-3" delay={100}>
          <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
