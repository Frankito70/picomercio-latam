'use client'
import { useEffect, useState } from 'react'

export default function SelectorUsuario() {
  const [seleccionado, setSeleccionado] = useState(null)

  useEffect(() => {
    const guardado = localStorage.getItem('tipoUsuario')
    if (!guardado) setSeleccionado(null)
    else setSeleccionado(guardado)
  }, [])

  const seleccionar = (tipo) => {
    localStorage.setItem('tipoUsuario', tipo)
    setSeleccionado(tipo)
  }

  if (seleccionado) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full text-center space-y-4 shadow-2xl">
        <h2 className="text-xl font-bold text-piPurple">¡Bienvenido a LATAM PiComercio!</h2>
        <p className="text-gray-600">¿Eres un pionero Pi o un visitante común?</p>
        <div className="flex justify-center gap-4">
          <button
            className="btn-gold"
            onClick={() => seleccionar('pionero')}
          >
            Soy Pionero Pi
          </button>
          <button
            className="btn-primary"
            onClick={() => seleccionar('visitante')}
          >
            Soy Visitante
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Si eres visitante, puedes unirte a Pi Network con el código de invitación:
        </p>
        <a
          href="https://minepi.com/frankito70"
          target="_blank"
          rel="noopener noreferrer"
          className="text-piPurple font-semibold underline"
        >
          minepi.com/frankito70
        </a>
      </div>
    </div>
  )
}
