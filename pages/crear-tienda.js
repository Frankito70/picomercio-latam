// pages/crear-tienda.js
import Head from 'next/head'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import LogoUploader from '@/components/LogoUploader'

export default function CrearTienda() {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    ubicacion: '',
    enlace: '',
  })
  const [logoUrl, setLogoUrl] = useState(null)
  const [mensaje, setMensaje] = useState(null)

  // ⚠️ Asegúrate de tener user.id disponible aquí si usas Supabase Auth
  const userId = 'demo-user-id' // reemplaza por auth.user().id si tienes login

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { error } = await supabase.from('tiendas').insert([
        {
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          ubicacion: formData.ubicacion,
          enlace: formData.enlace || null,
          logo: logoUrl || null, // ⭐ Guardamos la URL aquí
          usuario_id: userId     // opcional: guardar id del negocio/usuario
        }
      ])

      if (error) {
        console.error('❌ Error al guardar en Supabase:', error)
        setMensaje('❌ Ocurrió un error al guardar la tienda.')
      } else {
        setMensaje('✅ ¡Tienda registrada con éxito!')
        setFormData({ nombre: '', descripcion: '', ubicacion: '', enlace: '' })
        setLogoUrl(null)
      }
    } catch (err) {
      console.error('❌ Error inesperado:', err)
      setMensaje('❌ Error inesperado al guardar la tienda.')
    }
  }

  return (
    <>
      <Head>
        <title>Crear tienda | LATAM PiComercio</title>
        <meta name="description" content="Publica tu tienda y acepta Pi en América Latina" />
      </Head>

      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 border border-piPurple">
          <h1 className="text-3xl font-bold text-piPurple mb-6 text-center">Publica tu tienda</h1>

          {mensaje && <div className="text-center mb-4 text-sm text-red-600">{mensaje}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campos del formulario */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del comercio</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-piPurple"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción breve</label>
              <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-piPurple"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad y país</label>
              <input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-piPurple"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enlace o red social (opcional)</label>
              <input type="url" name="enlace" value={formData.enlace} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-piPurple"
              />
            </div>

            {/* 📤 Componente para subir el logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sube tu logo</label>
              <LogoUploader userId={userId} onUpload={(url) => setLogoUrl(url)} />
            </div>

            <button type="submit"
              className="w-full bg-piPurple text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition duration-300"
            >
              Guardar Tienda
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
