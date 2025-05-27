"use client"

import { motion, useInView } from "framer-motion"
import { type ReactNode, useRef } from "react"

interface SectionTitleProps {
  children: ReactNode
  alignment?: "left" | "center"
  className?: string
  highlightText?: boolean
  withBar?: boolean
}

export default function SectionTitle({
  children,
  alignment = "left",
  className = "",
  highlightText = true,
  withBar = false,
}: SectionTitleProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
  }

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <div ref={ref} className={`relative ${alignment === "center" ? "flex justify-center" : ""}`}>
      {withBar && alignment === "left" && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500 dark:bg-green-600 rounded-full"
          initial={{ height: 0 }}
          animate={isInView ? { height: "100%" } : { height: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ left: "-20px" }}
        />
      )}

      <h2 className={`text-3xl md:text-4xl font-bold mb-6 dark:text-white ${alignmentClasses[alignment]} ${className}`}>
        {highlightText ? children : children}
      </h2>
    </div>
  )
}
