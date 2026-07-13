import { FOOTER_SOCIALS } from "@/data/socialLinks";
import { useLang } from "@/hooks/useLang";

export function Footer() {
  const lang = useLang();

  return (
    <footer className="border-t border-border/50 py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <div className="font-semibold text-foreground">Massocco Bruno</div>
          <div className="font-mono text-xs text-muted-foreground mt-0.5">
            {lang === "en" ? "Backend & Full Stack Developer" : "Desarrollador Backend & Full Stack"}
          </div>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Massocco Bruno
        </div>
        <div className="flex items-center gap-2">
          {FOOTER_SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="p-2 rounded-md border border-border text-muted-foreground hover:text-neon hover:border-neon hover:bg-neon/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
