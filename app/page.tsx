"use client"

import type React from "react"

import Link from "next/link";
import { useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { BarChart3, Lightbulb, PiggyBank, ChevronDown, Calendar, CreditCard, Target, ShieldCheck } from "lucide-react"
import Navbar from "@/components/navbar"
import Logo from "@/components/logo"
import { useScroll as useScrollToSection } from "@/hooks/use-scroll"
import AnimatedButton from "@/components/ui/animated-button"
import ModernTimeline from "@/components/ui/modern-timeline"
import SectionTransition from "@/components/ui/section-transition"
import ScrollProgress from "@/components/ui/scroll-progress"
import ScrollIndicator from "@/components/ui/scroll-indicator"
import { useTheme } from "next-themes"
import WaveBackground from "@/components/ui/wave-background"
import HighlightText from "@/components/ui/highlight-text"
import SectionTitle from "@/components/ui/section-title"
import EnhancedSavingsEstimator from "@/components/ui/enhanced-savings-estimator"
import PrototypeVideo from "@/components/ui/prototype-video"
import WhyCard from "@/components/ui/why-card"

export default function Home() {
  const [email, setEmail] = useState("")
  const heroRef = useRef(null)
  const whyRef = useRef(null)
  const howRef = useRef(null)
  const savingsRef = useRef(null)
  const businessRef = useRef(null)
  const signupRef = useRef(null)

  const isWhyInView = useInView(whyRef, { once: true, amount: 0.3 })
  const isHowInView = useInView(howRef, { once: true, amount: 0.3 })
  const isSavingsInView = useInView(savingsRef, { once: true, amount: 0.3 })
  const isBusinessInView = useInView(businessRef, { once: true, amount: 0.3 })
  const isSignupInView = useInView(signupRef, { once: true, amount: 0.3 })

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  const { scrollToSection } = useScrollToSection()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Traitement du formulaire ici
    alert(`Merci de votre intérêt ! Nous vous contacterons à ${email}`)
    setEmail("")
  }

  const sectionIds = ["hero", "why", "how", "savings", "business", "signup"]
  const { theme } = useTheme()

  return (
    <main className="min-h-screen overflow-hidden">
      <WaveBackground />
      <Navbar />
      <ScrollProgress />
      <ScrollIndicator sections={sectionIds} position="right" />

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-[100vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-16"
      >
        <motion.div
          style={{ opacity, scale }}
          className="container max-w-6xl mx-auto py-12 md:py-24 flex flex-col md:flex-row items-center gap-8 relative z-10"
        >
          {/* Texte à gauche */}
          <SectionTransition type="slide" direction="up" threshold={0.1} className="flex-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Logo size="large" className="mb-8" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
                Gérer ton argent
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
                <HighlightText className="text-green-600 dark:text-green-400" isSpecial={true}>
                  t&apos;ennuie ?
                </HighlightText>
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-8 text-gray-700 dark:text-gray-300">
                Transforme ton budget en stories visuelles.
              </h2>
              <a
                href="https://prototype.gylt.space"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-green-500 text-white px-6 py-3 rounded-md">
                  Tester en avant-première
                </button>
              </a>
            </motion.div>
          </SectionTransition>

          {/* Vidéo à droite */}
          <div className="flex-1 mt-8 md:mt-0">
            <PrototypeVideo />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          onClick={() => scrollToSection("why")}
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
            <ChevronDown size={32} className="text-green-600 dark:text-green-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* Why gYlt Section */}
      <section
        id="why"
        ref={whyRef}
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white/60 dark:bg-gray-900/70 backdrop-blur-sm"
      >
        <div className="container max-w-6xl mx-auto">
          <SectionTransition type="slide" direction="up">
            <div className="max-w-3xl mx-auto mb-16">
              <SectionTitle alignment="center" highlightText={false}>
                <HighlightText className="text-green-600 dark:text-green-400">Pourquoi gYlt ?</HighlightText>
              </SectionTitle>
              <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
                On voit un solde, des lignes comptables mais sans comprendre nos dépense.
                <br />
                Résultat : aucune envie de s&apos;améliorer, aucune fierté de bien gérer.
              </p>
            </div>
          </SectionTransition>

          <div className="grid md:grid-cols-3 gap-10">
            <WhyCard
              icon={<BarChart3 size={32} className="text-green-600 dark:text-green-400" />}
              title="Visualiser tes dépenses"
              description="Tes dépenses compréhensibles en un coup d'œil."
              delay={0.1}
            />

            <WhyCard
              icon={<Lightbulb size={32} className="text-green-600 dark:text-green-400" />}
              title="Comprendre tes habitudes"
              description="Découvre tes tendances de consommation et identifie facilement où tu peux économiser."
              delay={0.2}
            />

            <WhyCard
              icon={<PiggyBank size={32} className="text-green-600 dark:text-green-400" />}
              title="Économiser sans efforts"
              description="Reçois des suggestions personnalisées pour économiser sans sacrifier ton style de vie."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* How it Works Section - UPDATED with ModernTimeline */}
      <section
        id="how"
        ref={howRef}
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/60 dark:bg-gray-800/70 backdrop-blur-sm"
      >
        <div className="container max-w-6xl mx-auto relative z-10">
          <SectionTransition type="zoom">
            <div className="max-w-2xl ml-6">
              <SectionTitle alignment="left" withBar highlightText={false}>
                <HighlightText className="text-green-600 dark:text-green-400">Comment ça marche ?</HighlightText>
              </SectionTitle>
            </div>
          </SectionTransition>

          <SectionTransition type="slide" direction="up">
            <ModernTimeline />
          </SectionTransition>
        </div>
      </section>

      {/* Savings Section */}
      <section
        id="savings"
        ref={savingsRef}
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white/60 dark:bg-gray-900/70 backdrop-blur-sm"
      >
        <div className="container max-w-6xl mx-auto relative z-10">
          <SectionTransition type="slide" direction="up">
            <div className="max-w-3xl mx-auto mb-16">
              <SectionTitle alignment="center" highlightText={false}>
                <HighlightText className="text-green-600 dark:text-green-400">
                  Combien peux-tu économiser ?
                </HighlightText>
              </SectionTitle>
              <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12">
                Laisse gYlt te montrer les économies cachées à portée de main.
              </p>
            </div>
          </SectionTransition>

          {/* 3 Content Blocks */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <SectionTransition type="slide" direction="left" delay={0.1}>
              <motion.div
                className="flex flex-col p-6 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-all duration-500"
                whileHover={{ y: -5 }}
              >
                <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 shadow-inner">
                  <CreditCard size={28} className="text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Abonnements oubliés</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  gYlt repère les paiements récurrents anciens ou doublons que tu n'utilises plus.
                </p>
                <div className="mt-auto">
                  <p className="font-bold text-green-600 dark:text-green-400 text-lg">+12€/mois économisés</p>
                </div>
              </motion.div>
            </SectionTransition>

            <SectionTransition type="slide" direction="up" delay={0.2}>
              <motion.div
                className="flex flex-col p-6 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-all duration-500"
                whileHover={{ y: -5 }}
              >
                <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 shadow-inner">
                  <Calendar size={28} className="text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Meilleur timing</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Visualise les pics de dépenses et apprends à réduire au bon moment, sans te priver.
                </p>
                <div className="mt-auto">
                  <p className="font-bold text-green-600 dark:text-green-400 text-lg">-25% sur tes sorties</p>
                </div>
              </motion.div>
            </SectionTransition>

            <SectionTransition type="slide" direction="right" delay={0.3}>
              <motion.div
                className="flex flex-col p-6 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-all duration-500"
                whileHover={{ y: -5 }}
              >
                <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 shadow-inner">
                  <Target size={28} className="text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Objectifs malins</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Fixe-toi des objectifs simples, basés sur tes habitudes — pas sur la culpabilité.
                </p>
                <div className="mt-auto">
                  <p className="font-bold text-green-600 dark:text-green-400 text-lg">+480€/an économisé</p>
                </div>
              </motion.div>
            </SectionTransition>
          </div>

          {/* Simulateur d'économies */}
          <SectionTransition type="zoom" delay={0.4}>
            <div className="max-w-2xl mx-auto">
              <EnhancedSavingsEstimator />
            </div>
          </SectionTransition>
        </div>
      </section>

      {/* Business Model Section */}
      <section
        id="business"
        ref={businessRef}
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/60 dark:bg-gray-800/70 backdrop-blur-sm"
      >
        <div className="container max-w-6xl mx-auto relative z-10">
          <SectionTransition type="slide" direction="down">
            <div className="max-w-2xl ml-6">
              <SectionTitle alignment="left" withBar highlightText={false}>
                <HighlightText className="text-green-600 dark:text-green-400">Comment gYlt se finance ?</HighlightText>
              </SectionTitle>
            </div>
          </SectionTransition>

          <SectionTransition type="zoom" delay={0.2}>
            <div className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-xl shadow-[0_10px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_50px_-12px_rgba(0,0,0,0.5)] max-w-3xl mx-auto transform transition-all duration-500 hover:shadow-[0_20px_70px_-12px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_70px_-12px_rgba(0,0,0,0.5)] text-gray-800 dark:text-white">
              <div className="flex items-start mb-6">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4 shadow-inner">
                  <ShieldCheck size={24} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">100% gratuit pour toi</h3>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                gYlt est 100% gratuit. Pas de pub intrusive, pas de vente de données personnelles.
              </p>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Nous collaborons avec des partenaires (banques éthiques, fournisseurs mobiles, etc.) qui proposent des
                offres utiles et alignées avec tes dépenses.
              </p>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4">
                <p className="text-gray-700 dark:text-gray-200 italic">
                  Exemple : si tu payes 15€/mois pour ton forfait mobile, gYlt pourra te proposer une alternative
                  équivalente à 9€, sans que personne ne sache qui tu es.
                </p>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Tout est basé sur des tendances anonymes, jamais sur ton identité.
              </p>
            </div>
          </SectionTransition>
        </div>
      </section>

      {/* Signup Section */}
      <section
        id="signup"
        ref={signupRef}
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white/60 dark:bg-gray-900/70 backdrop-blur-sm"
      >
        <div className="container max-w-6xl mx-auto relative z-10">
          <SectionTransition type="slide" direction="up">
            <div className="max-w-3xl mx-auto mb-10">
              <SectionTitle alignment="center" highlightText={false}>
                <HighlightText className="text-green-600 dark:text-green-400">
                  Exprime toi et prend de nos nouvelles
                </HighlightText>
              </SectionTitle>
            </div>
          </SectionTransition>

          <SectionTransition type="zoom" delay={0.2}>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ton adresse e-mail"
                  required
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-300 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white"
                />
                <AnimatedButton
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
                >
                  Reste au courant et fait tes retours
                </AnimatedButton>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
                Aide nous a améliorer le produit qui va te faire économiser. Promis, pas de spam.
              </p>
            </form>
          </SectionTransition>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/60 dark:bg-gray-800/70 backdrop-blur-sm border-t border-gray-200/60 dark:border-gray-700/60">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("hero")
                }}
                className="cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                <Logo size="small" className="mx-auto md:mx-0" />
              </a>
            </div>

            <div className="flex gap-6">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  alert("Les mentions légales seront disponibles prochainement.")
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors cursor-pointer hover:underline"
              >
                Mentions légales
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  alert("La politique de confidentialité sera disponible prochainement.")
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors cursor-pointer hover:underline"
              >
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
