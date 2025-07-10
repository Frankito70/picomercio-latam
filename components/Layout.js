import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-[#8B5CF6] text-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">LATAM PiComercio</h1>
          <nav className="space-x-4">
            <a href="/" className="hover:underline">Inicio</a>
            <a href="/tiendas" className="hover:underline">Tiendas</a>
            <a href="/crear-tienda" className="hover:underline">Crear tienda</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>

      <Footer />
    </div>
  )
}
