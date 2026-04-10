import { useState, useRef } from 'react';
import { uploadToCloudinary, isCloudinaryConfigured } from '@/services/cloudinary';

interface ImageUploadProps {
  currentImage: string;
  onImageChange: (url: string) => void;
  label?: string;
}

const ImageUpload = ({ currentImage, onImageChange, label }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    if (isCloudinaryConfigured()) {
      setUploading(true);
      try {
        const url = await uploadToCloudinary(file);
        onImageChange(url);
        setPreview(null);
      } catch {
        console.error('Upload falhou, usando imagem local');
        onImageChange(localUrl);
      } finally {
        setUploading(false);
      }
    } else {
      onImageChange(localUrl);
      setPreview(null);
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
          {!isCloudinaryConfigured() && (
            <span className="text-xs text-muted-foreground">Cloudinary não configurado – usando local</span>
          )}
        </div>
      </div>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
};

export default ImageUpload;
