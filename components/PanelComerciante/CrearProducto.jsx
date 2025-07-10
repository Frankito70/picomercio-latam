// components/PanelComerciante/CrearProducto.jsx
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ImagenProductoUploader from '../ImagenProductoUploader';

export default function CrearProducto() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !precio || !stock || !imagenUrl) {
      setMensaje('Por favor completa todos los campos, incluida la imagen.');
      return;
    }

    const { error } = await supabase.from('productos').insert([
      {
        nombre,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        imagen: imagenUrl,
      },
    ]);

    if (error) {
      console.error('Error insertando producto:', error.message);
      setMensaje('Error al guardar el producto.');
    } else {
      setMensaje('Producto guardado exitosamente.');
      setNombre('');
      setPrecio('');
      setStock('');
      setImagenUrl('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Registrar nuevo producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nombre del producto</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Precio en Pi</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Stock disponible</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <ImagenProductoUploader onUpload={(url) => setImagenUrl(url)} />

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Guardar Producto
        </button>
      </form>
      {mensaje && <p className="mt-4 text-sm text-gray-700">{mensaje}</p>}
    </div>
  );
}
