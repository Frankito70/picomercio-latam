// pages/tiendas.js
import Link from 'next/link';

const tiendasMock = [
  {
    id: 1,
    nombre: 'Tienda Don Pepe',
    rubro: 'Comida',
    imagen: 'https://via.placeholder.com/300x180?text=Tienda+Don+Pepe'
  },
  {
    id: 2,
    nombre: 'Moda Latina',
    rubro: 'Ropa',
    imagen: 'https://via.placeholder.com/300x180?text=Moda+Latina'
  },
  {
    id: 3,
    nombre: 'Tecno Pi',
    rubro: 'Electrónica',
    imagen: 'https://via.placeholder.com/300x180?text=Tecno+Pi'
  }
];

export default function Tiendas() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-center text-blue-800 mb-8">Explora Tiendas en PiComercio LATAM</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tiendasMock.map(tienda => (
          <div key={tienda.id} className="bg-white rounded-xl shadow p-4">
            <img src={tienda.imagen} alt={tienda.nombre} className="w-full rounded-md mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">{tienda.nombre}</h2>
            <p className="text-gray-600 mb-2">Rubro: {tienda.rubro}</p>
            <Link href={`/tienda/${tienda.id}`}>
              <span className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
                Ver productos
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
