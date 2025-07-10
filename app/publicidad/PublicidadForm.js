'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export default function PublicidadForm() {
  const [form, setForm] = useState({
    nombre_tienda: '',
    descripcion: '',
    email_contacto: '',
    tipo: '',
    duracion_dias: '',
  })
  const [archivo, setArchivo] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [subiendo, setSubiendo] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!archivo) {
      setMensaje('Por favor selecciona un archivo.')
      return
    }
    setSubiendo(true)

    const nombreArchivo = `${form.nombre_tienda}_${uuidv4()}`
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('publicidad')
      .upload(nombreArchivo, archivo)

    if (uploadError) {
      console.error(uploadError)
      setMensaje('Error al subir archivo.')
      setSubiendo(false)
      return
    }

    const { publicUrl } = supabase
      .storage
      .from('publicidad')
      .getPublicUrl(nombreArchivo).data

    const { error: insertError } = await supabase
      .from('publicidad_solicitudes')
      .insert([{
        ...form,
        archivo_url: publicUrl,
        estado: 'pendiente',
      }])

    if (insertError) {
      console.error(insertError)
      setMensaje('Error al enviar solicitud.')
    } else {
      setMensaje('✅ Solicitud enviada con éxito.')
      setForm({
        nombre_tienda: '',
        descripcion: '',
        email_contacto: '',
        tipo: '',
        duracion_dias: '',
      })
      setArchivo(null)
    }
    setSubiendo(false)
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Solicita Publicidad</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="nombre_tienda" value={form.nombre_tienda} onChange={handleChange} placeholder="Nombre de tienda" required className="w-full p-2 border rounded" />
        <input type="email" name="email_contacto" value={form.email_contacto} onChange={handleChange} placeholder="Correo de contacto" required className="w-full p-2 border rounded" />
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción del anuncio" required className="w-full p-2 border rounded" />
        <input type="text" name="tipo" value={form.tipo} onChange={handleChange} placeholder="Tipo de anuncio (ej: banner_home)" required className="w-full p-2 border rounded" />
        <input type="number" name="duracion_dias" value={form.duracion_dias} onChange={handleChange} placeholder="Duración en días" required className="w-full p-2 border rounded" />
        <input type="file" onChange={handleFileChange} required className="w-full" />
        <button type="submit" disabled={subiendo} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          {subiendo ? 'Subiendo...' : 'Enviar solicitud'}
        </button>
      </form>
      {mensaje && <p className="mt-4 text-center text-sm text-green-700">{mensaje}</p>}
    </div>
  )
}
