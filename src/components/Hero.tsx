import { useSiteStore } from '@/store/siteStore';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  const { hero } = useSiteStore((s) => s.data);
  const logo = hero.logo;

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

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6">
        <h1 className="font-heading text-foreground text-5xl md:text-7xl lg:text-8xl font-light tracking-wide">
          {hero.title}
        </h1>
        <p className="text-hero-subtitle font-body text-sm md:text-base tracking-[0.15em]">
          {hero.subtitle}
        </p>
        <a
          href="#projetos"
          className="mt-8 flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full font-body text-sm tracking-wide hover:opacity-90 transition-opacity"
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
