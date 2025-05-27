"use client"

import { useState } from "react"
import DebugImage from "@/components/debug-image"

export default function DebugPage() {
  const [imagePath, setImagePath] = useState("/images/prototype1.jpeg")

  const prototypeImages = [
    "/images/prototype1.jpeg",
    "/images/prototype2.jpeg",
    "/images/prototype3.jpeg",
    "/images/prototype4.jpeg",
    "/images/prototype5.jpeg",
    "/images/prototype6.jpeg",
    "/images/prototype7.jpeg",
    "/images/prototype8.jpeg",
  ]

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Débogage des images</h1>

      <div className="mb-6">
        <label className="block mb-2">Sélectionner une image à tester:</label>
        <select
          value={imagePath}
          onChange={(e) => setImagePath(e.target.value)}
          className="p-2 border rounded w-full max-w-md"
        >
          {prototypeImages.map((path) => (
            <option key={path} value={path}>
              {path}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Test d'image individuelle</h2>
        <DebugImage src={imagePath} alt="Image de test" />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Toutes les images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prototypeImages.map((path) => (
            <div key={path} className="border p-4 rounded">
              <DebugImage src={path} alt={`Image ${path}`} width={200} height={350} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
