"use client"

import type React from "react"

import { motion } from "framer-motion"

interface AnimatedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  type?: "button" | "submit" | "reset"
}

export default function AnimatedButton({ children, onClick, className = "", type = "button" }: AnimatedButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`relative overflow-hidden group ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-white/20 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.5, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
    </motion.button>
  )
}
