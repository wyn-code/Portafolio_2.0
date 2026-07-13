import {
  Brain,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Server,
  Shield,
  Terminal,
  Wrench,
} from "lucide-react";

import type { TechGroup } from "@/types";

export const TECH_GROUPS: TechGroup[] = [
  { key: "backend", label: { en: "Backend", es: "Backend" }, icon: Server, items: ["Python", "FastAPI", "C#", "ASP.NET"] },
  { key: "frontend", label: { en: "Frontend", es: "Frontend" }, icon: Code2, items: ["React", "TypeScript", "Tailwind"] },
  { key: "databases", label: { en: "Databases", es: "Bases de Datos" }, icon: Database, items: ["PostgreSQL", "SQL Server", "MySQL"] },
  { key: "cloud", label: { en: "Cloud", es: "Cloud" }, icon: Cloud, items: ["Docker", "Render", "Vercel", "Supabase"] },
  { key: "os", label: { en: "Operating Systems", es: "Sistemas Operativos" }, icon: Terminal, items: ["Linux", "Windows"] },
  { key: "ai", label: { en: "AI Tools", es: "Herramientas de IA" }, icon: Brain, items: ["ChatGPT", "Claude", "GitHub Copilot", "Gemini"] },
  { key: "tools", label: { en: "Dev Tools", es: "Herramientas de Desarrollo" }, icon: Wrench, items: ["VS Code", "Cursor", "Visual Studio", "Postman"] },
  { key: "cyber", label: { en: "Cybersecurity", es: "Ciberseguridad" }, icon: Shield, items: ["OWASP", "Networking", "Secure APIs"] },
  { key: "vcs", label: { en: "Version Control", es: "Control de Versiones" }, icon: GitBranch, items: ["Git", "GitHub"] },
];
