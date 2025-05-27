"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface WaveBackgroundProps {
  className?: string
}

export default function WaveBackground({ className = "" }: WaveBackgroundProps) {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDark = theme === "dark"

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Couleurs adaptées au thème
    const darkPrimaryColor = "rgba(0, 64, 77, 0.9)"
    const darkSecondaryColor = "rgba(0, 48, 58, 0.8)"
    const darkTertiaryColor = "rgba(0, 40, 50, 0.7)"

    const lightPrimaryColor = "rgba(220, 252, 231, 0.95)" // green-100
    const lightSecondaryColor = "rgba(187, 247, 208, 0.85)" // green-200
    const lightTertiaryColor = "rgba(134, 239, 172, 0.75)" // green-300

    // Configuration des vagues
    const waves = [
      {
        y: height * 0.6,
        length: 0.5,
        amplitude: 90,
        frequency: 0.002,
        color: isDark ? darkPrimaryColor : lightPrimaryColor,
        speed: 0.0018, // Accéléré pour plus de fluidité
      },
      {
        y: height * 0.5,
        length: 0.7,
        amplitude: 60,
        frequency: 0.004,
        color: isDark ? darkSecondaryColor : lightSecondaryColor,
        speed: 0.0014, // Accéléré pour plus de fluidité
      },
      {
        y: height * 0.7,
        length: 0.3,
        amplitude: 40,
        frequency: 0.003,
        color: isDark ? darkTertiaryColor : lightTertiaryColor,
        speed: 0.0016, // Accéléré pour plus de fluidité
      },
      {
        y: height * 0.8,
        length: 0.4,
        amplitude: 50,
        frequency: 0.0015,
        color: isDark ? darkSecondaryColor : lightSecondaryColor,
        speed: 0.0022, // Accéléré pour plus de fluidité
      },
    ]

    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      waves[0].y = height * 0.6
      waves[1].y = height * 0.5
      waves[2].y = height * 0.7
      waves[3].y = height * 0.8
    }

    window.addEventListener("resize", resizeCanvas)

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Fond de base
      ctx.fillStyle = isDark ? "#000" : "#fff"
      ctx.fillRect(0, 0, width, height)

      // Dessiner les vagues
      for (const wave of waves) {
        ctx.beginPath()
        ctx.moveTo(0, wave.y)

        for (let x = 0; x < width; x++) {
          const dx = x * wave.frequency
          const dy = Math.sin(dx + time * wave.speed) * wave.amplitude
          ctx.lineTo(x, wave.y + dy)
        }

        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()
        ctx.fillStyle = wave.color
        ctx.fill()
      }

      time += 20 // Accéléré pour une animation plus fluide
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme, isDark])

  return (
    <motion.canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}
