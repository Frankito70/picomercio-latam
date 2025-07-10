import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ListadoProductos({ tiendaId }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function fetchProductos() {
      let query = supabase
        .from('productos')
        .select('id, nombre, precio, imagen, stock')
        .order('created_at', { ascending: false });

      if (tiendaId) {
        query = query.eq('tienda_id', tiendaId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error cargando productos:', error.message);
      } else {
        setProductos(data);
      }
      setCargando(false);
    }

    fetchProductos();
  }, [tiendaId]);

  if (cargando) return <p className="text-center">Cargando productos...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {productos.map((producto) => (
        <div key={producto.id} className="border rounded-lg p-4 shadow hover:shadow-md">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-40 object-cover rounded mb-2"
          />
          <h3 className="text-lg font-semibold">{producto.nombre}</h3>
          <p className="text-purple-600 font-bold">{producto.precio} Pi</p>
          <p className="text-sm text-gray-600">Stock: {producto.stock}</p>
        </div>
      ))}
    </div>
  );
}
