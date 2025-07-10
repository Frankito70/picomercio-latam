import Image from 'next/image';

export default function Header() {
  return (
    <header style={{
      backgroundColor: '#121212',
      color: '#fff',
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Image src="/logo.png" alt="Logo" width={40} height={40} priority />
      <nav>
        {/* Puedes agregar enlaces o íconos aquí en el futuro */}
      </nav>
    </header>
  );
}