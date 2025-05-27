"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface TimelineItemProps {
  step: number
  title: string
  description: string
  isLast?: boolean
}

// Modifier la fonction TimelineItem pour réduire les ombres et rendre les cercles plus légers
function TimelineItem({ step, title, description, isLast = false }: TimelineItemProps) {
  const itemRef = useRef(null)
  const isInView = useInView(itemRef, { once: true, amount: 0.3 })

  return (
    <div ref={itemRef} className="relative">
      {/* Ligne verticale avec effet de lueur */}
      {!isLast && (
        <div className="absolute left-6 top-10 bottom-0 w-1 -z-10">
          {/* Fond de lueur */}
          <div className="absolute inset-0 w-3 -left-1 bg-green-300/10 dark:bg-green-700/10 blur-sm rounded-full" />

          {/* Ligne animée */}
          <motion.div
            className="absolute inset-0 w-1 bg-green-500 dark:bg-green-600 rounded-full"
            initial={{ height: 0 }}
            animate={isInView ? { height: "calc(100% - 1rem)" } : { height: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </div>
      )}

      <div className="flex items-start gap-4 md:gap-8">
        {/* Cercle numéroté avec animation - version plus légère et élégante */}
        <motion.div
          className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500 dark:bg-green-600 text-white flex items-center justify-center text-xl font-bold z-10 relative group"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2 + step * 0.15,
          }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Effet de lueur au survol - plus subtil */}
          <span className="absolute inset-0 rounded-full bg-green-400/20 dark:bg-green-500/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />

          {/* Numéro */}
          <span className="relative z-10">{step}</span>
        </motion.div>

        {/* Contenu avec animation */}
        <motion.div
          className="bg-white/90 dark:bg-gray-900/90 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mb-8 flex-1 transform origin-left relative overflow-hidden group"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 + step * 0.15 }}
          whileHover={{ y: -5 }}
        >
          {/* Fond subtil avec motif - plus léger */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzIyYzU1ZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzRhZGU4MCIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L3N2Zz4=')]" />

          {/* Effet de lueur au survol */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-transparent dark:from-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Contenu */}
          <div className="relative z-10">
            <h3 className="text-xl font-semibold mb-3 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function Timeline() {
  const timelineRef = useRef(null)
  const isInView = useInView(timelineRef, { once: true, amount: 0.1 })

  const timelineItems = [
    {
      step: 1,
      title: "Connecte ta banque",
      description: "Liaison sécurisée avec ton compte bancaire pour importer tes transactions.",
    },
    {
      step: 2,
      title: 'Découvre ton bilan "Wrapped"',
      description: "Visualise tes dépenses sous forme de stories interactives et personnalisées.",
    },
    {
      step: 3,
      title: "Suis tes progrès chaque mois",
      description: "Reçois des mises à jour mensuelles et vois ton évolution financière au fil du temps.",
    },
  ]

  return (
    <div ref={timelineRef} className="max-w-3xl mx-auto relative">
      {/* Fond radial pour la timeline - plus subtil */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-green-50/30 via-transparent to-transparent dark:from-green-900/5 dark:via-transparent dark:to-transparent rounded-3xl" />
      </motion.div>

      {/* Timeline items */}
      {timelineItems.map((item, index) => (
        <TimelineItem
          key={item.step}
          step={item.step}
          title={item.title}
          description={item.description}
          isLast={index === timelineItems.length - 1}
        />
      ))}
    </div>
  )
}
