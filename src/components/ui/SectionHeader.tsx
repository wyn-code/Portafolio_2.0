import { Reveal } from "@/components/animations/Reveal";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <Reveal className="mb-12">
      <div>
        {eyebrow && (
          <div className="font-mono text-xs uppercase tracking-widest text-neon mb-3">{eyebrow}</div>
        )}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="mt-3 text-muted-foreground max-w-2xl">{subtitle}</p>}
        <div className="mt-4 h-px w-16 bg-neon" />
      </div>
    </Reveal>
  );
}
