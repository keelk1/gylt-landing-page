"use client"

import { type ReactNode, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

interface SectionTransitionProps {
  children: ReactNode
  type?: "fade" | "slide" | "zoom" | "parallax" | "reveal"
  direction?: "up" | "down" | "left" | "right"
  className?: string
  delay?: number
  duration?: number
  threshold?: number
}

export default function SectionTransition({
  children,
  type = "fade",
  direction = "up",
  className = "",
  delay = 0,
  duration = 0.8,
  threshold = 0.3,
}: SectionTransitionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Appliquer un ressort pour des animations plus fluides
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Définir les valeurs initiales pour chaque transformation
  const initialOpacity = useTransform(smoothProgress, [0, threshold, 0.6, 1], [0, 1, 1, 1])
  const initialYUp = useTransform(smoothProgress, [0, threshold, 0.6, 1], [100, 0, 0, 0])
  const initialYDown = useTransform(smoothProgress, [0, threshold, 0.6, 1], [-100, 0, 0, 0])
  const initialXLeft = useTransform(smoothProgress, [0, threshold, 0.6, 1], [100, 0, 0, 0])
  const initialXRight = useTransform(smoothProgress, [0, threshold, 0.6, 1], [-100, 0, 0, 0])
  const initialScale = useTransform(smoothProgress, [0, threshold, 0.6, 1], [0.8, 1, 1, 1])
  const initialParallax = useTransform(smoothProgress, [0, 1], [50, -50])
  const initialClipPath = useTransform(
    smoothProgress,
    [0, threshold, 0.6, 1],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
  )

  // Différentes transformations basées sur le type d'animation
  const getAnimationProps = () => {
    switch (type) {
      case "fade":
        return {
          opacity: initialOpacity,
        }
      case "slide":
        if (direction === "up") {
          return {
            opacity: initialOpacity,
            y: initialYUp,
          }
        } else if (direction === "down") {
          return {
            opacity: initialOpacity,
            y: initialYDown,
          }
        } else if (direction === "left") {
          return {
            opacity: initialOpacity,
            x: initialXLeft,
          }
        } else if (direction === "right") {
          return {
            opacity: initialOpacity,
            x: initialXRight,
          }
        }
        break
      case "zoom":
        return {
          opacity: initialOpacity,
          scale: initialScale,
        }
      case "parallax":
        return {
          y: initialParallax,
        }
      case "reveal":
        return {
          clipPath: initialClipPath,
        }
      default:
        return {}
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay }}
      style={getAnimationProps()}
    >
      {children}
    </motion.div>
  )
}
