"use client"

import type React from "react"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { FormData, ValidationErrors } from "@/components/multi-step-form"
import { Lightbulb } from "lucide-react"
import { motion } from "framer-motion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

interface VisionStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  validationErrors: ValidationErrors
}

export function VisionStep({ formData, updateFormData, validationErrors }: VisionStepProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handleRadioChange = (name: keyof FormData, value: string) => {
    updateFormData({ [name]: value })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-2.5 rounded-lg text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          <Lightbulb className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold text-white">Your Business Vision</h3>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <Label htmlFor="businessGoals" className="text-white text-base">
          What are your main business goals for the next 2 years? <span className="text-purple-400">*</span>
        </Label>
        <Textarea
          id="businessGoals"
          name="businessGoals"
          value={formData.businessGoals}
          onChange={handleInputChange}
          placeholder="e.g., Expand to new locations, improve efficiency..."
          className={cn(
            "min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-white/50",
            validationErrors.businessGoals ? "border-red-500 ring-1 ring-red-500" : "",
          )}
        />
        {validationErrors.businessGoals && (
          <p className="text-red-400 text-sm mt-1">{validationErrors.businessGoals}</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <Label htmlFor="biggestWish" className="text-white text-base">
          If you could automate one aspect of your business operations, what would it be?
        </Label>
        <Textarea
          id="biggestWish"
          name="biggestWish"
          value={formData.biggestWish}
          onChange={handleInputChange}
          placeholder="Describe your biggest operational wish..."
          className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-white/50"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <Label className="text-white text-base">
          Would you be interested in being a beta tester for innovative business solutions?{" "}
          <span className="text-purple-400">*</span>
        </Label>
        <RadioGroup
          value={formData.betaInterest}
          onValueChange={(value) => handleRadioChange("betaInterest", value)}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2"
        >
          {[
            { value: "yes", label: "Yes, definitely!", icon: "✅" },
            { value: "maybe", label: "Maybe, tell me more", icon: "🤔" },
            { value: "no", label: "Not interested", icon: "❌" },
          ].map((option) => (
            <motion.div
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex items-center space-x-3 rounded-lg border border-white/10 bg-white/5 p-4 cursor-pointer hover:bg-white/10 transition-colors",
                formData.betaInterest === option.value ? "ring-2 ring-purple-500 bg-white/10" : "",
                validationErrors.betaInterest ? "border-red-500/50" : "",
              )}
              onClick={() => handleRadioChange("betaInterest", option.value)}
            >
              <div className="text-xl">{option.icon}</div>
              <div className="flex items-center space-x-2 flex-1">
                <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                <div
                  className={`w-4 h-4 rounded-full border ${
                    formData.betaInterest === option.value
                      ? "bg-purple-500 border-purple-500"
                      : "bg-transparent border-white/30"
                  }`}
                >
                  {formData.betaInterest === option.value && (
                    <div className="w-2 h-2 rounded-full bg-white mx-auto mt-0.5"></div>
                  )}
                </div>
                <Label htmlFor={option.value} className="cursor-pointer text-white flex-1">
                  {option.label}
                </Label>
              </div>
            </motion.div>
          ))}
        </RadioGroup>
        {validationErrors.betaInterest && <p className="text-red-400 text-sm mt-1">{validationErrors.betaInterest}</p>}
      </motion.div>
    </div>
  )
}
