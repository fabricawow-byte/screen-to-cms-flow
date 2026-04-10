import { useState } from 'react';
import { useSiteStore } from '@/store/siteStore';
import { ArrowUpRight } from 'lucide-react';

const Categories = () => {
  const { categories } = useSiteStore((s) => s.data);
  const [currentSlides, setCurrentSlides] = useState<Record<string, number>>({});

  const getSlide = (id: string) => currentSlides[id] || 0;

  return (
    <section className="py-16 px-8 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="flex flex-col gap-3">
            <span className="text-section-label font-body text-sm tracking-wide">
              {cat.label}
            </span>
            <div className="relative rounded-2xl overflow-hidden group">
              <img
                src={cat.images[getSlide(cat.id)]}
                alt={cat.title}
                className="w-full h-[350px] md:h-[450px] object-cover"
                loading="lazy"
              />
              <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-foreground/20 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-foreground/30 transition-colors">
                <ArrowUpRight size={18} />
              </button>

              {cat.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {cat.images.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i === getSlide(cat.id) ? 'bg-foreground' : 'bg-foreground/40'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            <span className="text-foreground font-body text-sm">{cat.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
