import type { ComponentType } from "react";

export type Locale = "en" | "es";

export interface LocalizedText {
  en: string;
  es: string;
}

export interface Project {
  title: string;
  desc: LocalizedText;
  tags: string[];
  github?: string;
  demo?: string;
}

export interface TechGroup {
  key: string;
  label: LocalizedText;
  icon: ComponentType<{ className?: string }>;
  items: string[];
}

export type CertStatus = "completed" | "in_progress" | "planned";

export interface Certification {
  name: LocalizedText;
  org: string;
  status: CertStatus;
}

export interface NavLink {
  id: string;
  labelKey: string;
  href: string;
}
