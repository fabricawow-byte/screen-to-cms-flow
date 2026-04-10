import { useSiteStore } from '@/store/siteStore';
import ImageUpload from './ImageUpload';
import { Trash2 } from 'lucide-react';

const CategoriesEditor = () => {
  const { categories } = useSiteStore((s) => s.data);
  const updateCategory = useSiteStore((s) => s.updateCategory);
  const addCategory = useSiteStore((s) => s.addCategory);
  const removeCategory = useSiteStore((s) => s.removeCategory);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Categorias</h3>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.id} className="p-4 bg-muted rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">#{cat.id}</span>
              <button onClick={() => removeCategory(cat.id)} className="text-destructive hover:opacity-70">
                <Trash2 size={16} />
              </button>
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1">Label</label>
              <input
                type="text"
                value={cat.label}
                onChange={(e) => updateCategory(cat.id, { label: e.target.value })}
                className="w-full px-3 py-2 bg-secondary text-foreground rounded border border-border text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1">Título</label>
              <input
                type="text"
                value={cat.title}
                onChange={(e) => updateCategory(cat.id, { title: e.target.value })}
                className="w-full px-3 py-2 bg-secondary text-foreground rounded border border-border text-sm"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {cat.images.map((img, i) => (
                <ImageUpload
                  key={i}
                  currentImage={img}
                  onImageChange={(url) => {
                    const newImages = [...cat.images];
                    newImages[i] = url;
                    updateCategory(cat.id, { images: newImages });
                  }}
                />
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={() =>
            addCategory({
              id: Date.now().toString(),
              label: 'Nova Categoria',
              title: 'Novo Título',
              images: [],
            })
          }
          className="text-sm text-primary hover:opacity-70"
        >
          + Adicionar categoria
        </button>
      </div>
    </div>
  );
};

export default CategoriesEditor;
