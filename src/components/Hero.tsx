import { useSiteStore } from '@/store/siteStore';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  const { hero } = useSiteStore((s) => s.data);
  const loaded = useSiteStore((s) => s.loaded);
  const logo = hero.logo;

  if (!loaded) {
    return (
      <section id="inicio" className="relative h-screen w-full flex items-center justify-center bg-background">
        <div className="w-px h-16 bg-foreground/20 animate-pulse" />
      </section>
    );
  }

  return (
    <section
      id="inicio"
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-background/30" />

      {/* Logo overlay */}
      {logo?.image && (
        <img
          src={logo.image}
          alt="Logo"
          className="absolute z-10 pointer-events-none"
          style={{
            left: `${logo.x}%`,
            top: `${logo.y}%`,
            width: `${logo.size}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Content — positioned below the logo */}
      <div
        className="absolute z-10 flex flex-col items-center text-center gap-4"
        style={{
          top: `${(logo?.y ?? 30) + (logo?.size ?? 15) / 1.5}%`,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <h1 className="font-heading text-foreground text-4xl md:text-6xl lg:text-7xl font-light tracking-wide">
          {hero.title}
        </h1>
        <p className="text-hero-subtitle font-body text-[10px] md:text-xs tracking-[0.15em]">
          {hero.subtitle}
        </p>
        <a
          href="#projetos"
          className="mt-6 flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full font-body text-sm tracking-wide hover:opacity-90 transition-opacity"
        >
          {hero.buttonText}
          <ChevronRight size={18} />
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-foreground/30" />
      </div>
    </section>
  );
};

export default Hero;
