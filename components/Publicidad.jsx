import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const getSeason = () => {
  const month = new Date().getMonth();
  if (month >= 11 || month <= 2) return 'verano';
  if (month >= 3 && month <= 5) return 'otoño';
  if (month >= 6 && month <= 8) return 'invierno';
  return 'primavera';
};

export default function Publicidad() {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const season = getSeason();

  useEffect(() => {
    const fetchPublicidad = async () => {
      const { data, error } = await supabase
        .from('publicidad')
        .select('*')
        .eq('activo', true)
        .or(`estacion.eq.${season},estacion.is.null`)
        .order('created_at', { ascending: false });

      if (!error) setAnuncios(data || []);
      setLoading(false);
    };

    fetchPublicidad();
  }, [season]);

  if (loading) return <p className="text-center p-4">Cargando promociones…</p>;
  if (anuncios.length === 0) return null;

  return (
    <section style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '1rem' }}>
        📢 Publicidad destacada
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {anuncios.map((promo) => (
          <div key={promo.id} style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            padding: '1rem',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.2rem', margin