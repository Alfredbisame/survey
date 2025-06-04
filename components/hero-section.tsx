"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  const scrollToSurvey = () => {
    const surveyElement = document.getElementById("survey")
    if (surveyElement) {
      surveyElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative py-20 md:py-32 overflow-hidden" id="home">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full p-1 mr-2">
              <Sparkles className="h-4 w-4 text-black" />
            </span>
            <span className="text-white text-sm font-medium">Shaping the future of business in Ghana</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Revolutionize Your Business Operations
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Join our market survey to help us understand how businesses manage their daily operations and what
            innovations could transform your industry in Ghana and West Africa.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
              onClick={scrollToSurvey}
            >
              Take the Survey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-violet-950/80 to-transparent z-0"></div>
    </div>
  )
}
