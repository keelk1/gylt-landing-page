"use client"

import { useCallback } from "react"

export function useScroll() {
  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Offset pour la navbar
        behavior: "smooth",
      })
    }
  }, [])

  return { scrollToSection }
}
