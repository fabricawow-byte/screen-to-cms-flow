import { useRef, useState, useCallback } from 'react';
import { useSiteStore } from '@/store/siteStore';
import ImageUpload from './ImageUpload';

const HeroEditor = () => {
  const { hero } = useSiteStore((s) => s.data);
  const updateHero = useSiteStore((s) => s.updateHero);
  const logo = hero.logo || { image: '', x: 50, y: 30, size: 15 };

  const previewRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging || !previewRef.current) return;
      const rect = previewRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      updateHero({ logo: { ...logo, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 } });
    },
    [dragging, logo, updateHero]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Hero</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Título</label>
          <input
            type="text"
            value={hero.title}
            onChange={(e) => updateHero({ title: e.target.value })}
            className="w-full px-3 py-2 bg-secondary text-foreground rounded-lg border border-border text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Subtítulo</label>
          <input
            type="text"
            value={hero.subtitle}
            onChange={(e) => updateHero({ subtitle: e.target.value })}
            className="w-full px-3 py-2 bg-secondary text-foreground rounded-lg border border-border text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Texto do Botão</label>
          <input
            type="text"
            value={hero.buttonText}
            onChange={(e) => updateHero({ buttonText: e.target.value })}
            className="w-full px-3 py-2 bg-secondary text-foreground rounded-lg border border-border text-sm"
          />
        </div>

        <ImageUpload
          label="Imagem de Fundo"
          currentImage={hero.backgroundImage}
          onImageChange={(url) => updateHero({ backgroundImage: url })}
        />

        <ImageUpload
          label="Logo"
          currentImage={logo.image}
          onImageChange={(url) => updateHero({ logo: { ...logo, image: url } })}
        />

        {/* Logo size slider */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Tamanho do Logo ({logo.size}%)
          </label>
          <input
            type="range"
            min={5}
            max={50}
            value={logo.size}
            onChange={(e) => updateHero({ logo: { ...logo, size: Number(e.target.value) } })}
            className="w-full accent-primary"
          />
        </div>

        {/* Interactive position preview */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Posição do Logo (clique e arraste)
          </label>
          <div
            ref={previewRef}
            className="relative w-full h-48 rounded-lg overflow-hidden border border-border cursor-crosshair select-none"
            style={{
              backgroundImage: `url(${hero.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="absolute inset-0 bg-background/30" />
            {logo.image && (
              <img
                src={logo.image}
                alt="Logo preview"
                className="absolute cursor-grab active:cursor-grabbing z-10"
                style={{
                  left: `${logo.x}%`,
                  top: `${logo.y}%`,
                  width: `${logo.size}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseDown={handleMouseDown}
                draggable={false}
              />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            X: {logo.x}% · Y: {logo.y}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroEditor;
