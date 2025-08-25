"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { ChevronDown, Download, ExternalLink } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const taglines = [
    'Building scalable web applications',
    'Crafting exceptional user experiences',
    'Solving complex technical challenges',
    'Creating innovative digital solutions'
  ]

  useEffect(() => {
    const currentTagline = taglines[currentIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTagline.length) {
          setDisplayText(currentTagline.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % taglines.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, currentIndex, isDeleting, taglines])

  return (
    <section className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <p className="text-muted-foreground text-lg font-medium tracking-wide uppercase">
                  Hello, I'm
                </p>
              </motion.div>

              <motion.h1
                className="text-6xl lg:text-7xl xl:text-8xl font-bold font-display leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  John Smith
                </span>
              </motion.h1>

              <motion.h2
                className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-text-primary leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Full-Stack Software Engineer
              </motion.h2>

              <motion.div
                className="h-16 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <p className="text-xl lg:text-2xl text-text-secondary font-medium min-h-[2.5rem] flex items-center">
                  {displayText}
                  <motion.span
                    className="ml-1 w-0.5 h-6 bg-primary"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </p>
              </motion.div>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 hover:scale-105 group"
              >
                View Projects
                <ExternalLink className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-border hover:bg-accent hover:text-accent-foreground font-semibold transition-all duration-300 hover:scale-105 group"
              >
                <Download className="mr-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
                Download Resume
              </Button>
            </motion.div>

            <motion.div
              className="pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <div className="flex items-center gap-4 text-text-secondary">
                <span className="text-sm font-medium">Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Avatar */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-lg opacity-30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div
                className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-border bg-surface"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-8xl font-bold text-text-secondary/40">JS</div>
                </div>
              </motion.div>

              {/* Floating elements around avatar */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-4 h-4 bg-primary rounded-full" />
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-secondary/30"
                animate={{
                  y: [0, 10, 0],
                  rotate: [360, 180, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-6 h-6 bg-secondary rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}