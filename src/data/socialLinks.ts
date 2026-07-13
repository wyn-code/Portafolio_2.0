import { FileText, Github, Linkedin, Mail } from "lucide-react";
import type { ComponentType } from "react";
import cv from "../assets/CV_Massocco_Bruno.pdf";

export interface SocialLink {
  key: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
}

export const CONTACT_LINKS: SocialLink[] = [
  { key: "github", icon: Github, href: "https://github.com/wyn-code" },
  { key: "linkedin", icon: Linkedin, href: "https://www.linkedin.com/in/bruno-massocco-49b113307/" },
  { key: "email", icon: Mail, href: "mailto:brunoo6.massocco@gmail.com" },
  { key: "resume", icon: FileText, href: cv },
];

export const FOOTER_SOCIALS = [
  { icon: Github, href: "https://github.com/wyn-code", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/bruno-massocco-49b113307/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:brunoo6.massocco@gmail.com", label: "Email" },
];
