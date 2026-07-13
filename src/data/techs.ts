import {
  Brain,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Server,
  Terminal,
  Wrench,
  Workflow,
  Mail,
} from "lucide-react";

import type { TechGroup } from "../types";

export const TECH_GROUPS: TechGroup[] = [
  // ==========================
  // Core Stack
  // ==========================

  {
    key: "languages",
    label: { en: "Languages", es: "Lenguajes" },
    icon: Server,
    items: ["Python", "JavaScript", "TypeScript", "C#"],
  },

  {
    key: "frontend",
    label: { en: "Frontend", es: "Frontend" },
    icon: Code2,
    items: ["React", "Tailwind CSS", "HTML5", "CSS3"],
  },

  {
    key: "backend",
    label: { en: "Backend", es: "Backend" },
    icon: Server,
    items: ["FastAPI", "ASP.NET", "Node.js"],
  },

  {
    key: "database",
    label: { en: "Databases", es: "Bases de Datos" },
    icon: Database,
    items: ["PostgreSQL", "SQL Server", "MySQL", "MongoDB"],
  },

  // ==========================
  // Infrastructure
  // ==========================

  {
    key: "cloud",
    label: { en: "Cloud & DevOps", es: "Cloud y DevOps" },
    icon: Cloud,
    items: ["Docker", "Render", "Vercel", "Supabase", "Cloudflare"],
  },

  {
    key: "services",
    label: { en: "APIs & Services", es: "APIs y Servicios" },
    icon: Mail,
    items: ["Twilio", "Resend", "Mapbox"],
  },

  {
    key: "automation",
    label: { en: "Automation", es: "Automatización" },
    icon: Workflow,
    items: ["n8n"],
  },

  // ==========================
  // Development Tools
  // ==========================

  {
    key: "vcs",
    label: { en: "Version Control", es: "Control de Versiones" },
    icon: GitBranch,
    items: ["Git", "GitHub", "GitLab"],
  },

  {
    key: "tools",
    label: { en: "Development Tools", es: "Herramientas de Desarrollo" },
    icon: Wrench,
    items: ["VS Code", "Cursor", "Visual Studio", "Postman"],
  },

  {
    key: "os",
    label: { en: "Operating Systems", es: "Sistemas Operativos" },
    icon: Terminal,
    items: ["Linux", "Windows"],
  },

  {
    key: "ai",
    label: { en: "AI Assisted Development", es: "Desarrollo Asistido por IA" },
    icon: Brain,
    items: [
      "ChatGPT",
      "Claude",
      "GitHub Copilot",
      "Gemini",
      "OpenCode",
      "Lovable",
    ],
  },

  {
    key: "design",
    label: { en: "Design & Productivity", es: "Diseño y Productividad" },
    icon: Wrench,
    items: [
      "Figma",
      "Lucidchart",
      "Notion",
      "Trello",
      "Obsidian",
    ],
  },
];