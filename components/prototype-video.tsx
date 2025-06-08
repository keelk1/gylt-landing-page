"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface PrototypeVideoProps {
  className?: string
}

export default function PrototypeVideo({ className = "" }: PrototypeVideoProps) {
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
        className="rounded-[40px] object-cover"
        style={{
          width: '100%',
          height: '100%',
        }}
        autoPlay
        loop
        muted
        playsInline
        src="/videos/prototype-demo.mp4"
      >
        <source src="/videos/prototype-demo.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
    </motion.div>
  )
}
