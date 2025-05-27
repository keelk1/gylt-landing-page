"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { useTheme } from "next-themes"

interface HighlightTextProps {
  children: ReactNode
  className?: string
  isSpecial?: boolean
}

export default function HighlightText({ children, className = "", isSpecial = false }: HighlightTextProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <motion.span
      className={`relative inline-block px-4 py-1 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 rounded-md -z-0"
        style={{
          backgroundColor:
            isSpecial && !isDark
              ? "#ffffff" // Fond blanc pour le titre spécial en mode clair
              : "rgba(123, 240, 162, 0.25)", // Fond vert transparent à 25% pour tous les autres titres
        }}
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.4, delay: 0.5 }}
      />
    </motion.span>
  )
}
