"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface SectionDividerProps {
  className?: string
  color?: string
  type?: "wave" | "curve" | "triangle" | "zigzag"
}

export default function SectionDivider({ className = "", color = "white", type = "wave" }: SectionDividerProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Modifier la fonction renderDivider pour améliorer les couleurs en mode sombre
  const colorClasses = {
    white: isDark ? "text-gray-900" : "text-white",
    green: isDark ? "text-green-900" : "text-green-50",
    gray: isDark ? "text-gray-800" : "text-gray-50",
  }

  const renderDivider = () => {
    switch (type) {
      case "wave":
        return (
          // Remplacer la ligne suivante dans la fonction renderDivider pour le type "wave"
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className={`w-full h-16 md:h-24 ${colorClasses[color as keyof typeof colorClasses] || "text-white"}`}
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="currentColor"
            ></path>
          </svg>
        )
      case "curve":
        return (
          // Remplacer la ligne suivante dans la fonction renderDivider pour le type "curve"
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className={`w-full h-16 md:h-24 ${colorClasses[color as keyof typeof colorClasses] || "text-white"}`}
          >
            <path
              d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
              fill="currentColor"
            ></path>
          </svg>
        )
      case "triangle":
        return (
          // Remplacer la ligne suivante dans la fonction renderDivider pour le type "triangle"
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className={`w-full h-16 md:h-24 ${colorClasses[color as keyof typeof colorClasses] || "text-white"}`}
          >
            <path d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z" fill="currentColor"></path>
          </svg>
        )
      case "zigzag":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className={`w-full h-16 md:h-24 ${colorClasses[color as keyof typeof colorClasses] || "text-white"}`}
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="currentColor"
            ></path>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      className={`absolute bottom-0 left-0 right-0 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {renderDivider()}
    </motion.div>
  )
}
