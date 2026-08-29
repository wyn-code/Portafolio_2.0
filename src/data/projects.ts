import type { Project } from "../types";

export const PROJECTS: Project[] = [
  {
    title: "Portfolio 2.0",
    desc: {
      en: "Personal portfolio built as a production-grade frontend: typed component architecture, i18n, accessibility and an automated build pipeline deployed on edge infrastructure.",
      es: "Portfolio personal construido como frontend de nivel producción: arquitectura de componentes tipada, i18n, accesibilidad y pipeline de build automatizado desplegado en infraestructura edge.",
    },
    tags: [
      "React",
      "TypeScript",
      "TanStack Router",
      "Tailwind CSS",
      "Vite",
    ],
    github: "https://github.com/wyn-code/Portafolio_2.0",
    demo: "https://www.wyn-code.dev",
  },
  {
    title: "Car Dealer Management API",
    desc: {
      en: "REST API for managing vehicles, customers and sales, built as a university team project. Layered architecture, relational data modeling with Entity Framework and SQL Server, versioned endpoints and role-based access control.",
      es: "API REST para gestionar vehículos, clientes y ventas, desarrollada como proyecto universitario en equipo. Arquitectura por capas, modelado relacional con Entity Framework y SQL Server, endpoints versionados y control de acceso por roles.",
    },
    tags: [
      "ASP.NET",
      "C#",
      "Entity Framework",
      "SQL Server",
      "REST API",
    ],
    github: "https://github.com/wyn-code/API_car",
  },
];