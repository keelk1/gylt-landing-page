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
    <div className="w-full flex justify-center">
      <motion.div
        className={`relative overflow-hidden rounded-[32px] shadow-[0_0_50px_rgba(8,112,84,0.4)] ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{ width: '840px', height: '1860px' }}
      >
        <video
          ref={videoRef}
          className="w-[840px] h-[1860px] object-cover rounded-[32px]"
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
    </div>
  )
}
