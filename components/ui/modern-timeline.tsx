"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { CreditCard, BarChart3, TrendingUp } from "lucide-react"

interface TimelineStepProps {
  step: number
  title: string
  description: string
  icon: React.ReactNode
  isLast?: boolean
  delay?: number
}

const TimelineStep = ({ step, title, description, icon, isLast = false, delay = 0 }: TimelineStepProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      className="relative mb-16 last:mb-0"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.2 + delay }}
    >
      {/* Ligne verticale connectant les étapes */}
      {!isLast && (
        <div className="absolute left-[2.25rem] top-16 bottom-0 -z-10">
          <motion.div
            className="h-full w-[2px] bg-gradient-to-b from-green-400/50 via-green-500/30 to-green-400/10 dark:from-green-500/50 dark:via-green-400/30 dark:to-green-500/10"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1, delay: 0.5 + delay }}
          />
        </div>
      )}

      <div className="flex items-start gap-6 md:gap-8">
        {/* Cercle avec icône animée */}
        <div className="relative flex-shrink-0">
          <motion.div
            className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 flex items-center justify-center text-white relative z-10"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.05 }}
            animate={isHovered ? { rotate: [0, -5, 5, -5, 0] } : {}}
            transition={{
              duration: 0.5,
              rotate: { duration: 0.5, ease: "easeInOut" },
            }}
          >
            {/* Effet de pulsation */}
            <motion.div
              className="absolute inset-0 rounded-full bg-green-500/20 dark:bg-green-400/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.2, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            {/* Icône */}
            <motion.div
              animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative z-20"
            >
              {icon}
            </motion.div>
          </motion.div>

          {/* Numéro d'étape */}
          <motion.div
            className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white dark:bg-gray-800 border-2 border-green-500 dark:border-green-400 flex items-center justify-center text-xs font-bold text-green-600 dark:text-green-400 shadow-sm"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + delay }}
          >
            {step}
          </motion.div>
        </div>

        {/* Contenu de l'étape */}
        <motion.div
          className="flex-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ModernTimeline() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  const timelineSteps = [
    {
      step: 1,
      title: "Connecte ta banque",
      description: "Liaison sécurisée avec ton compte bancaire pour importer tes transactions automatiquement.",
      icon: <CreditCard size={24} className="text-white" />,
    },
    {
      step: 2,
      title: 'Découvre ton bilan "Wrapped"',
      description: "Visualise tes dépenses sous forme de stories interactives et personnalisées.",
      icon: <BarChart3 size={24} className="text-white" />,
    },
    {
      step: 3,
      title: "Suis tes progrès chaque mois",
      description: "Reçois des mises à jour mensuelles et vois ton évolution financière au fil du temps.",
      icon: <TrendingUp size={24} className="text-white" />,
    },
  ]

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto py-4 px-2">
      {/* Fond subtil */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-30"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-green-50/20 to-transparent dark:from-green-900/5 dark:to-transparent rounded-3xl" />
      </motion.div>

      {/* Timeline steps */}
      {timelineSteps.map((step, index) => (
        <TimelineStep
          key={step.step}
          step={step.step}
          title={step.title}
          description={step.description}
          icon={step.icon}
          isLast={index === timelineSteps.length - 1}
          delay={index * 0.2}
        />
      ))}
    </div>
  )
}
