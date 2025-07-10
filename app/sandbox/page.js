'use client'
import Image from 'next/image'

export default function SandboxPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      {/* <Image
        src="/logo.png"
        alt="Logo LATAM PiComercio"
        width={120}
        height={120}
      /> */}
      <h1 className="text-2xl mt-4 text-purple-800 font-bold">Vista Sandbox</h1>
    </div>
  )
}