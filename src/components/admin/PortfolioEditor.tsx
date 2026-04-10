import { useSiteStore } from '@/store/siteStore';
import ImageUpload from './ImageUpload';
import { Trash2 } from 'lucide-react';

const PortfolioEditor = () => {
  const { portfolio } = useSiteStore((s) => s.data);
  const updatePortfolio = useSiteStore((s) => s.updatePortfolio);
  const updatePortfolioItem = useSiteStore((s) => s.updatePortfolioItem);
  const addPortfolioItem = useSiteStore((s) => s.addPortfolioItem);
  const removePortfolioItem = useSiteStore((s) => s.removePortfolioItem);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Projetos / Portfolio</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Título da Seção</label>
          <input
            type="text"
            value={portfolio.title}
            onChange={(e) => updatePortfolio({ title: e.target.value })}
            className="w-full px-3 py-2 bg-secondary text-foreground rounded-lg border border-border text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Descrição</label>
          <textarea
            value={portfolio.description}
            onChange={(e) => updatePortfolio({ description: e.target.value })}
            className="w-full px-3 py-2 bg-secondary text-foreground rounded-lg border border-border text-sm resize-none"
            rows={3}
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-foreground">Itens</label>
          {portfolio.items.map((item) => (
            <div key={item.id} className="p-4 bg-muted rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => updatePortfolioItem(item.id, { title: e.target.value })}
                  placeholder="Título do projeto"
                  className="px-3 py-1 bg-secondary text-foreground rounded border border-border text-sm"
                />
                <button
                  onClick={() => removePortfolioItem(item.id)}
                  className="text-destructive hover:opacity-70"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {item.images.map((img, i) => (
                  <ImageUpload
                    key={i}
                    currentImage={img}
                    onImageChange={(url) => {
                      const newImages = [...item.images];
                      newImages[i] = url;
                      updatePortfolioItem(item.id, { images: newImages });
                    }}
                  />
                ))}
                <button
                  onClick={() => updatePortfolioItem(item.id, { images: [...item.images, ''] })}
                  className="text-sm text-primary hover:opacity-70"
                >
                  + Imagem
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() =>
              addPortfolioItem({
                id: Date.now().toString(),
                images: [],
                title: 'Novo Projeto',
              })
            }
            className="text-sm text-primary hover:opacity-70"
          >
            + Adicionar projeto
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioEditor;
