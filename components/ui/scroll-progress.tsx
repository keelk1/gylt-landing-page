"use client"

import { useScroll, motion, useSpring } from "framer-motion"

interface ScrollProgressProps {
  color?: string
  height?: number
  zIndex?: number
}

export default function ScrollProgress({ color = "#22c55e", height = 4, zIndex = 50 }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0"
      style={{
        scaleX,
        transformOrigin: "0%",
        backgroundColor: color,
        height,
        zIndex,
      }}
    />
  )
}
