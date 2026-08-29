import tuxDevops from "@/assets/images/tux-devops.png";

export function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div
        className="absolute inset-6 rounded-3xl blur-3xl animate-hero-glow"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, var(--neon-dim) 0%, transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative animate-hero-float">
        <div className="overflow-hidden rounded-2xl border border-neon/25 bg-card/40 backdrop-blur-sm shadow-[0_0_50px_var(--neon-dim)]">
          <div className="flex items-center gap-1.5 border-b border-border/70 bg-background/60 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-destructive/70" />
            <span className="h-2 w-2 rounded-full bg-muted-foreground/50" />
            <span className="h-2 w-2 rounded-full bg-neon/70" />
            <span className="ml-2 font-mono text-[10px] text-muted-foreground">
              bruno@devops:~
            </span>
          </div>
          <img
            src={tuxDevops}
            alt="Tux the Linux penguin working on a laptop running docker-compose and kubectl commands in a terminal"
            width={1024}
            height={1024}
            loading="eager"
            decoding="async"
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
