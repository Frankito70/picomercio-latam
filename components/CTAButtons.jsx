import Link from 'next/link';

export default function CTAButtons() {
  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
        Bienvenido a LATAM PiComercio
      </h1>

      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <Link href="/crear-tienda">
          <button style={{
            backgroundColor: '#facc15',
            color: '#000',
            padding: '1rem 2rem',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer'
          }}>
            Crear Tienda
          </button>
        </Link>

        <Link href="/explorar">
          <button style={{
            backgroundColor: '#fff',
            color: '#000',
            padding: '1rem 2rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            cursor: 'pointer'
          }}>
            Explorar Tiendas
          </button>
        </Link>

        <Link href="/promocionar">
          <button style={{
            backgroundColor: '#6366f1',
            color: '#fff',
            padding: '1rem 2rem',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer'
          }}>
            Promocionar Productos
          </button>
        </Link>
      </div>
    </section>
  );
}