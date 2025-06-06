"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface PrototypeVideoProps {
  className?: string
}

export default function PrototypeVideo({ className = "" }: PrototypeVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Assurer que la vidéo est en autoplay, loop et muted
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Erreur lors de la lecture automatique de la vidéo:", error)
      })
    }
  }, [])

  return (
    <motion.div
      className={`relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(8,_112,_84,_0.7)] dark:shadow-[0_20px_50px_rgba(34,_197,_94,_0.4)] ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <video
        ref={videoRef}
        className="w-full max-w-[340px] h-auto object-contain rounded-2xl mx-auto"
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
