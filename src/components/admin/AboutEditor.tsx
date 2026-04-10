import { useSiteStore } from '@/store/siteStore';
import ImageUpload from './ImageUpload';

const AboutEditor = () => {
  const { about } = useSiteStore((s) => s.data);
  const updateAbout = useSiteStore((s) => s.updateAbout);

  const updateParagraph = (index: number, value: string) => {
    const newParagraphs = [...about.paragraphs];
    newParagraphs[index] = value;
    updateAbout({ paragraphs: newParagraphs });
  };

  const addParagraph = () => {
    updateAbout({ paragraphs: [...about.paragraphs, ''] });
  };

  const removeParagraph = (index: number) => {
    updateAbout({ paragraphs: about.paragraphs.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Sobre Nós</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Label</label>
          <input
            type="text"
            value={about.label}
            onChange={(e) => updateAbout({ label: e.target.value })}
            className="w-full px-3 py-2 bg-secondary text-foreground rounded-lg border border-border text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Título</label>
          <input
            type="text"
            value={about.title}
            onChange={(e) => updateAbout({ title: e.target.value })}
            className="w-full px-3 py-2 bg-secondary text-foreground rounded-lg border border-border text-sm"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">Parágrafos</label>
          {about.paragraphs.map((p, i) => (
            <div key={i} className="flex gap-2">
              <textarea
                value={p}
                onChange={(e) => updateParagraph(i, e.target.value)}
                className="flex-1 px-3 py-2 bg-secondary text-foreground rounded-lg border border-border text-sm resize-none"
                rows={3}
              />
              <button
                onClick={() => removeParagraph(i)}
                className="px-2 text-destructive text-sm hover:opacity-70"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={addParagraph}
            className="text-sm text-primary hover:opacity-70"
          >
            + Adicionar parágrafo
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Tagline</label>
          <input
            type="text"
            value={about.tagline}
            onChange={(e) => updateAbout({ tagline: e.target.value })}
            className="w-full px-3 py-2 bg-secondary text-foreground rounded-lg border border-border text-sm"
          />
        </div>

        <ImageUpload
          label="Imagem"
          currentImage={about.image}
          onImageChange={(url) => updateAbout({ image: url })}
        />
      </div>
    </div>
  );
};

export default AboutEditor;
