// pages/panel/mis-productos.js

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ListadoProductos from '../../components/PanelComerciante/ListadoProductos';

export default function MisProductos() {
  const [tiendaId, setTiendaId] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function loadTienda() {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        console.error('No hay usuario autenticado');
        setCargando(false);
        return;
      }

      const userId = sessionData.session.user.id;

      const { data: tienda, error: tiendaError } = await supabase
        .from('tiendas')
        .select('id')
        .eq('usuario_id', userId)
        .single();

      if (tiendaError || !tienda) {
        console.error('Tienda no encontrada', tiendaError);
      } else {
        setTiendaId(tienda.id);
      }

      setCargando(false);
    }

    loadTienda();
  }, []);

  if (cargando) return <p className="p-4 text-center">Cargando tus productos…</p>;
  if (!tiendaId) return <p className="p-4 text-center text-red-600">No se encontró tu tienda.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mis productos</h1>
      <ListadoProductos tiendaId={tiendaId} />
    </div>
  );
}
