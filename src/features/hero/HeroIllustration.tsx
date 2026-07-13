import tuxHero from "@/assets/images/tux-hero.png";

export function HeroIllustration() {
  return (
    <div className="relative aspect-square max-w-md mx-auto">
      <div
        className="absolute inset-0 rounded-full blur-3xl animate-hero-glow"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--cyber) 0%, transparent 55%), radial-gradient(circle at 60% 40%, var(--neon-dim) 0%, transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative animate-hero-float">
        <div className="relative rounded-full overflow-hidden border border-neon/30 shadow-[0_0_60px_var(--neon-dim)] backdrop-blur-sm">
          <img
            src={tuxHero}
            alt="Tux the Linux penguin in a black hoodie coding at a modern desk"
            width={1024}
            height={1024}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
        </div>
      </div>
    </div>
  );
}
