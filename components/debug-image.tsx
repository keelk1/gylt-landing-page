"use client"

import { useState } from "react"
import Image from "next/image"

interface DebugImageProps {
  src: string
  alt: string
  width?: number
  height?: number
}

export default function DebugImage({ src, alt, width = 300, height = 500 }: DebugImageProps) {
  const [error, setError] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative">
      <div className="mb-2 text-sm text-gray-500">Tentative de chargement de: {src}</div>

      <div className="relative" style={{ width, height }}>
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover"
          onError={(e) => {
            setError(`Erreur de chargement: ${(e as any).target?.src || src}`)
          }}
          onLoad={() => setLoaded(true)}
        />
      </div>

      {error && <div className="mt-2 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

      {loaded && <div className="mt-2 p-2 bg-green-100 text-green-700 rounded">Image chargée avec succès!</div>}
    </div>
  )
}
