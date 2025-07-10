export default function SandboxLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* 🔹 Panel lateral */}
      <aside className="w-64 bg-piPurple text-piLavender p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-6">LATAM PiComercio</h2>
        <nav className="flex flex-col space-y-4">
          <a href="/sandbox" className="hover:text-white">Sandbox</a>
          <a href="/tiendas" className="hover:text-white">Tiendas</a>
          <a href="/tiendas/new" className="hover:text-white">Registrar</a>
        </nav>
        <footer className="mt-auto text-xs opacity-60 pt-12">
          Versión de pruebas · Pi Network
        </footer>
      </aside>

      {/* 🔸 Contenido principal */}
      <main className="flex-1 bg-piGray p-8">
        {children}
      </main>
    </div>
  );
}
