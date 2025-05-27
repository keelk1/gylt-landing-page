"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Euro } from "lucide-react"
import AnimatedButton from "./animated-button"

interface SavingsCalculatorProps {
  onCalculate?: (savings: number) => void
  className?: string
}

export default function SavingsCalculator({ onCalculate, className = "" }: SavingsCalculatorProps) {
  const [income, setIncome] = useState<string>("")
  const [savings, setSavings] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  // Fonction pour calculer les économies estimées
  const calculateSavings = () => {
    if (!income || isNaN(Number(income))) return

    setIsCalculating(true)

    // Simuler un calcul avec un délai pour l'effet visuel
    setTimeout(() => {
      // Formule simple : environ 8-12% du revenu mensuel
      const incomeValue = Number.parseFloat(income)
      const savingsValue = Math.round(incomeValue * (Math.random() * 0.04 + 0.08))

      setSavings(savingsValue)
      if (onCalculate) onCalculate(savingsValue)
      setIsCalculating(false)
    }, 800)
  }

  // Gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    calculateSavings()
  }

  return (
    <div className={`bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 shadow-lg ${className}`}>
      <h3 className="text-xl font-semibold mb-4 text-center dark:text-white">Calculez vos économies potentielles</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="income" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Quel est votre revenu mensuel moyen ?
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Euro size={18} className="text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="number"
              id="income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="2000"
              min="1"
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>
        </div>

        {savings !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-lg"
          >
            <p className="text-gray-700 dark:text-gray-200">Économies estimées avec gYlt :</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{savings} € / mois</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Soit environ {savings * 12} € par an</p>
          </motion.div>
        )}

        <div className="flex justify-center">
          <AnimatedButton
            type="submit"
            className={`w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition-all duration-300 ${
              isCalculating ? "opacity-70 cursor-wait" : ""
            }`}
            onClick={handleSubmit}
          >
            {isCalculating ? "Calcul en cours..." : "Calculer mes économies"}
          </AnimatedButton>
        </div>
      </form>

      <div className="mt-4 text-center">
        <a
          href="#signup"
          className="inline-flex items-center text-green-600 dark:text-green-400 font-medium hover:underline"
        >
          Essayer gratuitement →
        </a>
      </div>
    </div>
  )
}
