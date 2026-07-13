import { FileText, Github, Linkedin, Mail, Phone } from "lucide-react";
import type { ComponentType } from "react";

export interface SocialLink {
  key: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
}

export const CONTACT_LINKS: SocialLink[] = [
  { key: "github", icon: Github, href: "https://github.com/" },
  { key: "linkedin", icon: Linkedin, href: "https://linkedin.com/" },
  { key: "email", icon: Mail, href: "mailto:hello@masscocobruno.dev" },
  { key: "whatsapp", icon: Phone, href: "https://wa.me/" },
  { key: "resume", icon: FileText, href: "#" },
];

export const FOOTER_SOCIALS = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@masscocobruno.dev", label: "Email" },
];
