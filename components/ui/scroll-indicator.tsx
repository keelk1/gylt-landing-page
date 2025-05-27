"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

interface ScrollIndicatorProps {
  sections: string[]
  activeColor?: string
  inactiveColor?: string
  orientation?: "vertical" | "horizontal"
  position?: "left" | "right" | "top" | "bottom"
  className?: string
}

export default function ScrollIndicator({
  sections,
  activeColor = "#22c55e",
  inactiveColor = "#e5e7eb",
  orientation = "vertical",
  position = "right",
  className = "",
}: ScrollIndicatorProps) {
  const [activeSection, setActiveSection] = useState(0)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((id) => document.getElementById(id))
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(i)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const getPositionClasses = () => {
    switch (position) {
      case "left":
        return "fixed left-4 top-1/2 transform -translate-y-1/2"
      case "right":
        return "fixed right-4 top-1/2 transform -translate-y-1/2"
      case "top":
        return "fixed top-4 left-1/2 transform -translate-x-1/2"
      case "bottom":
        return "fixed bottom-4 left-1/2 transform -translate-x-1/2"
      default:
        return "fixed right-4 top-1/2 transform -translate-y-1/2"
    }
  }

  return (
    <div className={`${getPositionClasses()} z-50 ${className}`}>
      <div className={`flex ${orientation === "vertical" ? "flex-col space-y-3" : "flex-row space-x-3"} items-center`}>
        {sections.map((_, index) => (
          <motion.div
            key={index}
            className="cursor-pointer"
            onClick={() => {
              const section = document.getElementById(sections[index])
              if (section) {
                window.scrollTo({
                  top: section.offsetTop - 80,
                  behavior: "smooth",
                })
              }
            }}
          >
            <motion.div
              className={`rounded-full transition-all duration-300 ${
                orientation === "vertical" ? "w-3 h-3" : "w-3 h-3"
              }`}
              animate={{
                scale: activeSection === index ? 1.5 : 1,
                backgroundColor: activeSection === index ? activeColor : inactiveColor,
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          </motion.div>
        ))}
      </div>
      <motion.div
        className="fixed left-0 top-0 h-1 bg-green-500"
        style={{ scaleX: smoothProgress, transformOrigin: "0%" }}
      />
    </div>
  )
}
