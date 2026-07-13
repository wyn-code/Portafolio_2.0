import type { Project } from "../types";

export const PROJECTS: Project[] = [
  {
    title: "Portfolio 2.0",
    desc: {
      en: "Selected projects that showcase my experience building backend, frontend and full stack applications.",
      es: "Proyectos seleccionados que muestran mi experiencia desarrollando aplicaciones backend, frontend y full stack.",
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
      en: "REST API developed as a university team project for managing vehicles, customers and sales. Built with ASP.NET, Entity Framework and SQL Server following layered architecture principles.",
      es: "API REST desarrollada como proyecto universitario en equipo para gestionar vehículos, clientes y ventas. Construida con ASP.NET, Entity Framework y SQL Server siguiendo una arquitectura por capas.",
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