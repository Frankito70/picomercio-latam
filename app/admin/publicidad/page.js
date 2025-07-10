'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function PanelPublicidadAdmin() {
  const [solicitudes, setSolicitudes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    fetchSolicitudes()
  }, [])

  const fetchSolicitudes = async () => {
    setCargando(true)
    const { data, error } = await supabase
      .from('publicidad_solicitudes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      setMensaje('Error al cargar solicitudes.')
    } else {
      setSolicitudes(data)
    }
    setCargando(false)
  }

  const actualizarEstado = async (id, nuevoEstado) => {
    const { error } = await supabase
      .from('publicidad_solicitudes')
      .update({ estado: nuevoEstado })
      .eq('id', id)

    if (error) {
      console.error(error)
      setMensaje('Error al actualizar estado.')
    } else {
      setMensaje(`Solicitud ${nuevoEstado}`)
      fetchSolicitudes()
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Publicidad</h1>
      {mensaje && <p className="mb-4 text-green-600">{mensaje}</p>}
      {cargando ? (
        <p>Cargando solicitudes...</p>
      ) : solicitudes.length === 0 ? (
        <p>No hay solicitudes por mostrar.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Tienda</th>
                <th className="p-2">Tipo</th>
                <th className="p-2">Días</th>
                <th className="p-2">Email</th>
                <th className="p-2">Archivo</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="p-2">{s.nombre_tienda}</td>
                  <td className="p-2">{s.tipo}</td>
                  <td className="p-2">{s.duracion_dias} días</td>
                  <td className="p-2 text-sm">{s.email_contacto}</td>
                  <td className="p-2">
                    {s.archivo_url ? (
                      <a
                        href={s.archivo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Ver archivo
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="p-2 capitalize">{s.estado}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => actualizarEstado(s.id, 'aprobado')}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => actualizarEstado(s.id, 'rechazado')}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                    >
                      Rechazar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
