"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Logo from "./logo"
import { useScroll } from "@/hooks/use-scroll"
import ThemeToggle from "./theme-toggle"

const navItems = [
  { name: "Accueil", href: "#hero" },
  { name: "Pourquoi", href: "#why" },
  { name: "Comment", href: "#how" },
  { name: "Économies", href: "#savings" },
  { name: "Le modèle", href: "#business" },
  { name: "Ton avis", href: "#signup" },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero")
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollToSection } = useScroll()

  useEffect(() => {
    const handleScroll = () => {
      // Détection de la section active
      const sections = navItems.map((item) => item.href.substring(1))
      const scrollPosition = window.scrollY + 100 // Offset pour la détection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }

      // Détection du scroll pour l'effet de fond
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavigation = (sectionId: string) => {
    setMobileMenuOpen(false)
    scrollToSection(sectionId)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" : "bg-transparent dark:bg-transparent"
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              handleNavigation("hero")
            }}
            className="flex items-center cursor-pointer"
          >
            <Logo size="small" />
          </a>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation(item.href.substring(1))
                }}
                className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  activeSection === item.href.substring(1)
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                }`}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 dark:bg-green-400 rounded-full"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Actions à droite */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Bouton thème */}
            <ThemeToggle />

            {/* Bouton CTA */}
            <a
              href="https://prototype.gylt.space"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full text-sm shadow-md transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              Tester en avant-première
            </a>
          </div>

          {/* Menu mobile */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button
              type="button"
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      <motion.div
        className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, height: mobileMenuOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                handleNavigation(item.href.substring(1))
              }}
              className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${
                activeSection === item.href.substring(1)
                  ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                  : "text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/10 hover:text-green-600 dark:hover:text-green-400"
              }`}
            >
              {item.name}
            </a>
          ))}
          <a
            href="#signup"
            onClick={(e) => {
              e.preventDefault()
              handleNavigation("signup")
            }}
            className="block px-3 py-2 mt-4 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-medium rounded-md text-center shadow-md cursor-pointer"
          >
            Tester en avant-première
          </a>
        </div>
      </motion.div>
    </header>
  )
}
