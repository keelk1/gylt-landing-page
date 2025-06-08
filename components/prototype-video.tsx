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
    <motion.div
      className={`relative overflow-hidden rounded-[40px] shadow-2xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      style={{
        width: '326px',
        height: '720px',
        background: 'linear-gradient(135deg, #1f2937, #0f172a)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
