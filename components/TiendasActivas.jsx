import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function TiendasActivas() {
  const [tiendas, setTiendas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTiendas = async () => {
      const { data, error } = await supabase
        .from('tiendas')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setTiendas(data);
      setLoading(false);
    };

    fetchTiendas();
  }, []);

  return (
    <section style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>
        🛍️ Tiendas activas en LATAM
      </h2>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Cargando tiendas...</p>
      ) : tiendas.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No hay tiendas registradas todavía.</p>
      ) : (
        <ul style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          listStyle: 'none',
          padding: 0
        }}>
          {tiendas.map((tienda) => (
            <li key={tienda.id} style={{
              background: '#fff',
              borderRadius: '8px',
              padding: '1rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{tienda.nombre}</h3>
              {tienda.logo_url && (
                <img src={tienda.logo_url} alt={tienda.nombre} style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'contain',
                  margin: '0 auto'
                }} />
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}