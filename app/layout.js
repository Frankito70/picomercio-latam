import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-[#F7E7CE] text-piPurple font-sans">
        {/* 🟣 Header fijo con contraste */}
        <header className="w-full bg-piPurple text-white px-4 py-3 flex items-center justify-between shadow-md">
          {/* Logo miniatura */}
          <img
            src="/logo-latam-picomercio.png"
            alt="LATAM PiComercio"
            className="w-12 h-auto"
          />

          {/* Título central */}
          <h1 className="text-lg font-semibold tracking-wide">
            PiComercio LATAM
          </h1>

          {/* Acción rápida */}
          <a
            href="/tiendas/new"
            className="text-sm bg-white text-piPurple px-3 py-1 rounded hover:bg-piGold transition"
          >
            Publicar Tienda
          </a>
        </header>

        {/* 🧩 Contenido principal */}
        <main>{children}</main>
      </body>
    </html>
  );
}