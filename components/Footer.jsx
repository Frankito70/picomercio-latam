// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-piPurple text-white py-6 mt-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} LATAM PiComercio. Todos los derechos reservados.
        </p>
        <p className="text-sm mt-1">
          Producción de Pi Network Hispanoamérica · Usuario Pi: <strong>@frankito70</strong>
        </p>
      </div>
    </footer>
  )
}
