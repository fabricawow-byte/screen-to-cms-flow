import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ImageUploadProps {
  currentImage: string;
  onImageChange: (url: string) => void;
  label?: string;
}

const BUCKET = 'site-images';

const ImageUpload = ({ currentImage, onImageChange, label }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setUploading(true);

    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { cacheControl: '3600', upsert: false, contentType: file.type });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      onImageChange(data.publicUrl);
      setPreview(null);
    } catch (err) {
      console.error('Upload falhou', err);
      setError('Falha no upload. Verifique permissões.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <div className="flex items-center gap-4">
        <img
          src={preview || currentImage}
          alt="Preview"
          className="w-20 h-20 object-cover rounded-lg border border-border"
        />
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {uploading ? 'A enviar...' : 'Trocar imagem'}
          </button>
          {error && <span className="text-xs text-destructive">{error}</span>}
        </div>
      </div>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
};

export default ImageUpload;
