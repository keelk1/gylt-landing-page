"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "next-themes"

interface AnimatedBackgroundProps {
  className?: string
  type?: "gradient" | "particles" | "waves"
  color1?: string
  color2?: string
  opacity?: number
}

export default function AnimatedBackground({
  className = "",
  type = "gradient",
  color1 = "#22c55e",
  color2 = "#16a34a",
  opacity = 1,
}: AnimatedBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollYProgress } = useScroll()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Ajuster les couleurs pour le mode sombre
  const darkColor1 = "#059669"
  const darkColor2 = "#047857"

  const bgColor1 = isDark ? darkColor1 : color1
  const bgColor2 = isDark ? darkColor2 : color2

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1])
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  useEffect(() => {
    if (type === "particles") {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      let width = (canvas.width = window.innerWidth)
      let height = (canvas.height = window.innerHeight)

      const resizeCanvas = () => {
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
      }

      window.addEventListener("resize", resizeCanvas)

      // Configuration des particules
      const particlesArray: {
        x: number
        y: number
        size: number
        speedX: number
        speedY: number
        color: string
      }[] = []

      for (let i = 0; i < 50; i++) {
        const size = Math.random() * 5 + 1
        const x = Math.random() * width
        const y = Math.random() * height
        const speedX = Math.random() * 3 - 1
        const speedY = Math.random() * 3 - 1
        const color = Math.random() > 0.5 ? bgColor1 : bgColor2

        particlesArray.push({ x, y, size, speedX, speedY, color })
      }

      const animate = () => {
        ctx.clearRect(0, 0, width, height)

        for (let i = 0; i < particlesArray.length; i++) {
          const particle = particlesArray[i]
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()

          // Mise à jour de la position
          particle.x += particle.speedX
          particle.y += particle.speedY

          // Rebond sur les bords
          if (particle.x > width || particle.x < 0) {
            particle.speedX = -particle.speedX
          }
          if (particle.y > height || particle.y < 0) {
            particle.speedY = -particle.speedY
          }
        }

        requestAnimationFrame(animate)
      }

      animate()

      return () => {
        window.removeEventListener("resize", resizeCanvas)
      }
    }
  }, [bgColor1, bgColor2, type])

  if (type === "particles") {
    return <canvas ref={canvasRef} className={`absolute inset-0 -z-10 ${className}`} style={{ opacity }} />
  }

  if (type === "waves") {
    return (
      <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`} style={{ opacity }}>
        <svg className="absolute bottom-0 left-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <motion.path
            fill={bgColor1}
            fillOpacity="0.3"
            style={{ y }}
            d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,186.7C672,213,768,235,864,224C960,213,1056,171,1152,149.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></motion.path>
          <motion.path
            fill={bgColor2}
            fillOpacity="0.4"
            style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
            d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,176C960,160,1056,128,1152,117.3C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></motion.path>
        </svg>
      </div>
    )
  }

  // Type gradient par défaut
  return (
    <motion.div
      ref={ref}
      className={`absolute inset-0 -z-10 ${className}`}
      style={{
        background: `linear-gradient(${rotate}deg, ${bgColor1}, ${bgColor2})`,
        scale,
        opacity,
      }}
    />
  )
}
