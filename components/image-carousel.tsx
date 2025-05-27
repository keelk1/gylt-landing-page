"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ImageCarouselProps {
  images: string[]
  interval?: number
  className?: string
}

export default function ImageCarousel({ images, interval = 3000, className = "" }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_84,_0.7)] dark:shadow-[0_20px_50px_rgba(34,_197,_94,_0.4)]">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
              currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{ display: currentIndex === index ? "block" : "none" }}
          >
            <Image
              src={src || "/placeholder.svg"}
              alt={`Image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              priority={index === 0}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={handlePrevClick}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/70 dark:bg-gray-800/70 rounded-full p-2 hover:bg-white dark:hover:bg-gray-800 transition-colors"
        aria-label="Image précédente"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-green-600 dark:text-green-400"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button
        onClick={handleNextClick}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/70 dark:bg-gray-800/70 rounded-full p-2 hover:bg-white dark:hover:bg-gray-800 transition-colors"
        aria-label="Image suivante"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-green-600 dark:text-green-400"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-green-500 scale-125" : "bg-gray-300 dark:bg-gray-600"
            }`}
            aria-label={`Voir image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
