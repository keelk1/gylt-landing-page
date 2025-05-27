"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface LogoProps {
  size?: "small" | "medium" | "large"
  className?: string
}

export default function Logo({ size = "medium", className = "" }: LogoProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Éviter l'hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Définir les tailles en fonction du paramètre
  const sizes = {
    small: { nameWidth: 60, gemWidth: 24, gemHeight: 24 },
    medium: { nameWidth: 80, gemWidth: 32, gemHeight: 32 },
    large: { nameWidth: 120, gemWidth: 48, gemHeight: 48 },
  }

  const { nameWidth, gemWidth, gemHeight } = sizes[size]

  // Si le composant n'est pas encore monté, on retourne un placeholder
  if (!mounted) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div
          className="h-auto bg-gray-200 dark:bg-gray-700 animate-pulse"
          style={{ width: nameWidth, height: nameWidth * 0.4 }}
        />
        <div
          className="h-auto bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full"
          style={{ width: gemWidth, height: gemHeight }}
        />
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src={theme === "dark" ? "/images/name-gylt-white.png" : "/images/name-gylt-black.png"}
        alt="gYlt"
        width={nameWidth}
        height={nameWidth * 0.4}
        className="h-auto"
      />
      <Image src="/images/logo-gylt-gem.png" alt="gYlt Gem" width={gemWidth} height={gemHeight} className="h-auto" />
    </div>
  )
}
