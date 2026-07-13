import type { NavLink } from "../types";

export const NAV_LINKS: NavLink[] = [
  { id: "about", labelKey: "nav.about", href: "#about" },
  { id: "projects", labelKey: "nav.projects", href: "#projects" },
  { id: "techs", labelKey: "nav.techs", href: "#techs" },
  { id: "certifications", labelKey: "nav.certifications", href: "#certifications" },
  { id: "contact", labelKey: "nav.contact", href: "#contact" },
];

export const SECTION_IDS = ["about", "featured", "projects", "techs", "certifications", "contact"];
