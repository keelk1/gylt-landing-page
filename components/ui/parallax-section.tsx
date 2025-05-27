"use client"

import { type ReactNode, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  children: ReactNode
  bgImage?: string
  overlayColor?: string
  overlayOpacity?: number
  speed?: number
  className?: string
}

export default function ParallaxSection({
  children,
  bgImage,
  overlayColor = "rgba(0, 0, 0, 0.4)",
  overlayOpacity = 0.4,
  speed = 0.5,
  className = "",
}: ParallaxSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])

  return (
    <motion.div ref={ref} className={`relative overflow-hidden ${className}`}>
      {bgImage && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            y,
          }}
        />
      )}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
