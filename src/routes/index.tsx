import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/features/about/About";
import { Certifications } from "@/features/certifications/Certifications";
import { Contact } from "@/features/contact/Contact";
import { Hero } from "@/features/hero/Hero";
import { FeaturedProject } from "@/features/projects/FeaturedProject";
import { Projects } from "@/features/projects/Projects";
import { Techs } from "@/features/techs/Techs";
import { restoreStoredLanguage } from "@/hooks/useLanguage";
import { applyStoredTheme } from "@/hooks/useTheme";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Massocco Bruno — Backend & Full Stack Developer" },
      {
        name: "description",
        content:
          "Backend & Full Stack Developer building scalable web apps, REST APIs and business platforms with Python, FastAPI, React, Docker and PostgreSQL.",
      },
      { property: "og:title", content: "Massocco Bruno — Backend & Full Stack Developer" },
      {
        property: "og:description",
        content:
          "Scalable APIs and production-ready platforms. Python · FastAPI · React · Docker · PostgreSQL.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const { i18n } = useTranslation();

  useEffect(() => {
    applyStoredTheme();
    restoreStoredLanguage(i18n);
  }, [i18n]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <Hero />
      <About />
      <FeaturedProject />
      <Projects />
      <Techs />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}
