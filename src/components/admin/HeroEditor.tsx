import { useSiteStore } from '@/store/siteStore';
import ImageUpload from './ImageUpload';

const HeroEditor = () => {
  const { hero } = useSiteStore((s) => s.data);
  const updateHero = useSiteStore((s) => s.updateHero);

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
      </div>
    </div>
  );
};

export default HeroEditor;
