"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface WhyCardProps {
  icon: ReactNode
  title: string
  description: string
  delay?: number
}

export default function WhyCard({ icon, title, description, delay = 0 }: WhyCardProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center p-6 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
    >
      {/* Liseré vert à gauche de l'icône */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-300 via-green-500 to-green-300 dark:from-green-500 dark:via-green-400 dark:to-green-500 rounded-l" />

      <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full mb-6 shadow-inner relative">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  )
}
