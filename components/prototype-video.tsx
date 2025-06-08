"use client"

import { useRef, useEffect } from "react"

interface PrototypeVideoProps {
  className?: string
  width?: number
  height?: number
}

export default function PrototypeVideo({
  className = "",
  width = 280,
  height = 620
}: PrototypeVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Erreur lors de la lecture automatique de la vidéo:", error)
      })
    }
  }, [])

  return (
    <video
      ref={videoRef}
      width={width}
      height={height}
      className={`object-cover ${className}`}
      autoPlay
      loop
      muted
      playsInline
      src="/videos/prototype-demo.mp4"
    >
      <source src="/videos/prototype-demo.mp4" type="video/mp4" />
      Votre navigateur ne supporte pas la lecture de vidéos.
    </video>
  )
}
