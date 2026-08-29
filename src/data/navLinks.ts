import { FolderGit2, Home, Mail, Terminal, User } from "lucide-react";
import type { ComponentType } from "react";

import type { LocalizedText } from "../types";

export interface NavItem {
  id: string;
  href: string;
  label: LocalizedText;
  icon: ComponentType<{ className?: string }>;
}

export const NAV_LINKS: NavItem[] = [
  { id: "top", href: "#top", label: { en: "Home", es: "Inicio" }, icon: Home },
  { id: "about", href: "#about", label: { en: "About", es: "Sobre mí" }, icon: User },
  { id: "projects", href: "#projects", label: { en: "Projects", es: "Proyectos" }, icon: FolderGit2 },
  { id: "techs", href: "#techs", label: { en: "Skills", es: "Skills" }, icon: Terminal },
  { id: "contact", href: "#contact", label: { en: "Contact", es: "Contacto" }, icon: Mail },
];

export const SECTION_IDS = ["top", "about", "featured", "projects", "techs", "certifications", "contact"];
