"use client"

import { Button } from "@/components/ui/button"
import type { FormData } from "@/components/multi-step-form"
import { CheckCircle, Download, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { useEffect } from "react"

interface SuccessStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export function SuccessStep({ formData }: SuccessStepProps) {
  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#8B5CF6", "#EC4899", "#06B6D4"],
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#8B5CF6", "#EC4899", "#06B6D4"],
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-10"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
        className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full mx-auto mb-8 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.5)]"
      >
        <CheckCircle className="h-12 w-12 text-white" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400"
      >
        Thank You for Your Participation!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-xl text-gray-300 mb-8"
      >
        Your insights will help shape the future of business operations in Ghana.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 mb-8 text-left"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Your Rewards:</h3>
        <ul className="space-y-3">
          <li className="flex items-center text-gray-300">
            <span className="bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full p-1 mr-3">
              <CheckCircle className="h-4 w-4 text-white" />
            </span>
            Early access to our beta program
          </li>
          <li className="flex items-center text-gray-300">
            <span className="bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full p-1 mr-3">
              <CheckCircle className="h-4 w-4 text-white" />
            </span>
            20% discount on future services
          </li>
          <li className="flex items-center text-gray-300">
            <span className="bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full p-1 mr-3">
              <CheckCircle className="h-4 w-4 text-white" />
            </span>
            Exclusive business insights report
          </li>
        </ul>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-gray-300 mb-8"
      >
        We'll be in touch soon with more details about your rewards and our upcoming innovations.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button
          variant="outline"
          className="bg-transparent border-white/20 text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download Report
        </Button>
        <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share with Colleagues
        </Button>
      </motion.div>
    </motion.div>
  )
}
