const CLOUD_NAME = 'dzk3ljdnh';
const UPLOAD_PRESET = 'ml_default';

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!response.ok) {
    throw new Error('Falha no upload da imagem');
  }

  const data = await response.json();
  return data.secure_url;
};

export const isCloudinaryConfigured = (): boolean => {
  return CLOUD_NAME.length > 0 && UPLOAD_PRESET.length > 0;
};
