import { useSiteStore } from '@/store/siteStore';

const About = () => {
  const { about } = useSiteStore((s) => s.data);

  return (
    <section id="sobre" className="py-24 md:py-32 px-8 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden">
          <img
            src={about.image}
            alt="Sobre nós"
            className="w-full h-[400px] md:h-[600px] object-cover"
            loading="lazy"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-6">
          <span className="text-section-label text-xs tracking-[0.3em] font-body">
            {about.label}
          </span>
          <h2 className="font-heading text-foreground text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
            {about.title}
          </h2>
          <div className="flex flex-col gap-4">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-muted-foreground font-body text-sm leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <p className="text-muted-foreground font-body text-sm mt-4 italic">
            {about.tagline}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
