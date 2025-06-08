"use client"

import React from "react"

import { Repeat } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Euro, CreditCard, Calendar, Target, HelpCircle, X } from "lucide-react"
import AnimatedButton from "./animated-button"

interface SavingsCardProps {
  icon: React.ReactNode
  title: string
  description: string
  amount: number
  delay?: number
}

const SavingsCard = ({ icon, title, description, amount, delay = 0 }: SavingsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white/90 dark:bg-gray-800/90 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full flex-shrink-0">{icon}</div>
        <div>
          <h4 className="font-medium text-gray-800 dark:text-white">{title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
          <p className="text-green-600 dark:text-green-400 font-semibold mt-2">
            {amount.toFixed(0)}€<span className="text-xs font-normal"> / mois</span>
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function EnhancedSavingsEstimator() {
  const [budget, setBudget] = useState<string>("")
  const [savings, setSavings] = useState<{
    subscriptions: number
    timing: number
    goals: number
    total: number
  } | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const calculateSavings = () => {
    if (!budget || isNaN(Number(budget))) return

    setIsCalculating(true)

    // Simuler un calcul avec un délai pour l'effet visuel
    setTimeout(() => {
      // Calcul basé sur les pourcentages spécifiés
      const budgetValue = Number.parseFloat(budget)
      const subscriptionsSavings = budgetValue * 0.005 // 0.5% du budget
      const timingSavings = budgetValue * 0.01 // 5% du budget
      const goalsSavings = budgetValue * 0.015 // 5% du budget
      const totalSavings = subscriptionsSavings + timingSavings + goalsSavings

      setSavings({
        subscriptions: subscriptionsSavings,
        timing: timingSavings,
        goals: goalsSavings,
        total: totalSavings,
      })
      setIsCalculating(false)
    }, 800)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    calculateSavings()
  }

  // Fermer le tooltip si on clique en dehors
  const handleClickOutside = (e: MouseEvent) => {
    if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
      setShowTooltip(false)
    }
  }

  // Ajouter/supprimer l'event listener pour le clic en dehors du tooltip
  React.useEffect(() => {
    if (showTooltip) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showTooltip])

  return (
    <motion.div
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-xl border border-green-100 dark:border-green-900/30 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-semibold mb-4 text-center dark:text-white">Estime tes économies</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Quel est ton budget mensuel ?
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Euro size={18} className="text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="2000"
              min="1"
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>
        </div>

        <div className="flex justify-center">
          <AnimatedButton
            type="submit"
            className={`w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition-all duration-300 ${
              isCalculating ? "opacity-70 cursor-wait" : ""
            }`}
            onClick={handleSubmit}
          >
            {isCalculating ? "Calcul en cours..." : "Estimer"}
          </AnimatedButton>
        </div>
      </form>

      {savings !== null && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <div className="text-center mb-4">
            <p className="text-gray-700 dark:text-gray-200">gYlt peut t'aider à économiser environ :</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{savings.total.toFixed(0)} € / mois</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Sans te priver. Juste en comprenant mieux comment tu dépenses.
            </p>
          </div>

          <div className="space-y-3 mt-4">
            <SavingsCard
              icon={<CreditCard size={18} className="text-green-600 dark:text-green-400" />}
              title="Abonnements oubliés & doublons"
              description="Identifie et supprime les services que tu n'utilises plus"
              amount={savings.subscriptions}
              delay={0.1}
            />
            <SavingsCard
              icon={<Repeat size={18} className="text-green-600 dark:text-green-400" />}
              title="Changer de fournisseur"
              description="Optimise tes contrats en fonction de la concurrence"
              amount={savings.timing}
              delay={0.2}
            />
            <SavingsCard
              icon={<ShoppingCart size={18} className="text-green-600 dark:text-green-400" />}
              title="Éviter les achats inutiles"
              description="Garde la main sur tes dépenses facilement et repère les postes inutiles"
              amount={savings.goals}
              delay={0.3}
            />
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => setShowTooltip(true)}
              className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
            >
              <HelpCircle size={14} className="mr-1" />
              Comment on calcule ça ?
            </button>
          </div>
        </motion.div>
      )}

      {/* Tooltip/Modal explicatif */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-4 bottom-16 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-800 dark:text-white">Notre méthode de calcul</h4>
              <button
                onClick={() => setShowTooltip(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Nos estimations sont basées sur des données anonymisées d'utilisateurs et des études sur les habitudes de
              consommation :
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 pl-5 list-disc">
              <li>
                <span className="font-medium"> Abonnements oubliés & doublons</span> : 0,5% de ton budget mensuel (~10€ sur 2000€)
              </li>
              <li>
                <span className="font-medium">Changer de fournisseur</span> : 1% de ton budget mensuel (~20€ sur 2000€)
              </li>
              <li>
                <span className="font-medium">Éviter les achats inutiles</span> : 1,5% de ton budget mensuel (~30€ sur 2000€)
              </li>
            </ul>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Ces estimations sont indicatives et peuvent varier selon ton profil de dépenses.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
