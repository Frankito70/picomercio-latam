export default function CrearTienda() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">
          Crear Nueva Tienda
        </h1>

        <form className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Nombre de Tienda</label>
            <input
              type="text"
              placeholder="Ej: Tienda Don Pepe"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Rubro o Categoría</label>
            <input
              type="text"
              placeholder="Ej: Comida, Ropa, Tecnología"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Descripción</label>
            <textarea
              rows="4"
              placeholder="Cuéntanos sobre tu tienda..."
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Imagen de portada (URL)</label>
            <input
              type="url"
              placeholder="https://ejemplo.com/imagen.jpg"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Guardar Tienda
          </button>
        </form>
      </div>
    </div>
  );
}
