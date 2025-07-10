import Image from 'next/image'
import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="bg-white shadow p-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png" // ← usa la ruta absoluta desde /public
          alt="LATAM PiComercio"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="font-bold text-purple-800 text-lg">LATAM PiComercio</span>
      </Link>
      {/* otros botones aquí */}
    </nav>
  )
}
