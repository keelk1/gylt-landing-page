"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Euro } from "lucide-react"
import AnimatedButton from "./animated-button"

export default function SavingsEstimator() {
  const [budget, setBudget] = useState<string>("")
  const [savings, setSavings] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateSavings = () => {
    if (!budget || isNaN(Number(budget))) return

    setIsCalculating(true)

    // Simuler un calcul avec un délai pour l'effet visuel
    setTimeout(() => {
      // Calcul basé sur 18% du budget mensuel
      const budgetValue = Number.parseFloat(budget)
      const savingsValue = Math.round(budgetValue * 0.18)

      setSavings(savingsValue)
      setIsCalculating(false)
    }, 800)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    calculateSavings()
  }

  return (
    <motion.div
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-xl border border-green-100 dark:border-green-900/30"
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

        {savings !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-lg"
          >
            <p className="text-gray-700 dark:text-gray-200">Tu pourrais économiser environ :</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{savings} € / mois</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sans rien changer à ton style de vie</p>
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
            {isCalculating ? "Calcul en cours..." : "Estimer"}
          </AnimatedButton>
        </div>
      </form>
    </motion.div>
  )
}
