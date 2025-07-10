// components/LogoUploader.js
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function LogoUploader({ onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from('tiendas-logos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      alert('Error al subir imagen: ' + error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from('tiendas-logos')
      .getPublicUrl(filePath);

    setPreview(data.publicUrl);
    setUploading(false);
    if (onUpload) onUpload(data.publicUrl);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Logo de la tienda</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="mt-1"
      />
      {preview && (
        <img
          src={preview}
          alt="Vista previa"
          className="mt-2 w-24 h-24 object-cover rounded-full"
        />
      )}
    </div>
  );
}
