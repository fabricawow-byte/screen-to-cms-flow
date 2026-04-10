import { useState } from 'react';
import { useSiteStore } from '@/store/siteStore';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const Portfolio = () => {
  const { portfolio } = useSiteStore((s) => s.data);
  const [currentSlides, setCurrentSlides] = useState<Record<string, number>>({});

  const getSlide = (id: string) => currentSlides[id] || 0;

  const nextSlide = (id: string, total: number) => {
    setCurrentSlides((prev) => ({ ...prev, [id]: ((prev[id] || 0) + 1) % total }));
  };

  const prevSlide = (id: string, total: number) => {
    setCurrentSlides((prev) => ({ ...prev, [id]: ((prev[id] || 0) - 1 + total) % total }));
  };

  return (
    <section id="projetos" className="py-24 md:py-32 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <h2 className="font-heading text-foreground text-4xl md:text-5xl lg:text-6xl font-light">
            {portfolio.title}
          </h2>
          <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-md">
            {portfolio.description}
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolio.items.map((item) => (
            <div key={item.id} className="relative group rounded-2xl overflow-hidden">
              <img
                src={item.images[getSlide(item.id)]}
                alt={item.title || 'Projeto'}
                className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-500"
                loading="lazy"
              />

              {/* Arrow icon */}
              <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-foreground/20 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-foreground/30 transition-colors">
                <ArrowUpRight size={18} />
              </button>

              {/* Carousel controls */}
              {item.images.length > 1 && (
                <>
                  <button
                    onClick={() => prevSlide(item.id, item.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground/20 backdrop-blur-sm flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => nextSlide(item.id, item.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground/20 backdrop-blur-sm flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {item.images.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i === getSlide(item.id) ? 'bg-foreground' : 'bg-foreground/40'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
