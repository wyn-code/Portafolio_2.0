import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    title: "AuthVault API",
    desc: {
      en: "JWT authentication service with refresh rotation, brute-force protection and role scopes.",
      es: "Servicio de autenticación JWT con rotación de refresh, protección anti-fuerza bruta y roles.",
    },
    tags: ["FastAPI", "PostgreSQL", "JWT", "Docker"],
    github: "#",
    demo: "#",
  },
  {
    title: "Business Admin Panel",
    desc: {
      en: "Admin dashboard to manage clients, staff and revenue with role-based access.",
      es: "Panel administrativo para gestionar clientes, personal e ingresos con acceso por roles.",
    },
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL"],
    github: "#",
    demo: "#",
  },
  {
    title: "Automation Scripts",
    desc: {
      en: "Python scripts to automate repetitive tasks, exports and data pipelines.",
      es: "Scripts Python para automatizar tareas repetitivas, exportaciones y pipelines de datos.",
    },
    tags: ["Python", "SQL", "Linux"],
    github: "#",
  },
];
