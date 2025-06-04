"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import type { FormData, ValidationErrors } from "@/components/multi-step-form"
import { AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface ChallengesStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  validationErrors: ValidationErrors
}

export function ChallengesStep({ formData, updateFormData, validationErrors }: ChallengesStepProps) {
  const handleCheckboxChange = (name: keyof FormData, value: string, checked: boolean) => {
    const currentValues = formData[name] as string[]
    updateFormData({
      [name]: checked ? [...currentValues, value] : currentValues.filter((item) => item !== value),
    })
  }

  const handleSliderChange = (name: keyof FormData, value: number[]) => {
    updateFormData({ [name]: value[0] })
  }

  const handleSelectChange = (name: keyof FormData, value: string) => {
    updateFormData({ [name]: value })
  }

  const getPainLevelLabel = (level: number) => {
    if (level <= 3) return "Minor Impact"
    if (level <= 6) return "Moderate Impact"
    return "Significant Impact"
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-2.5 rounded-lg text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          <AlertCircle className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold text-white">Current Business Challenges</h3>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <Label className="text-white text-base">
          What are your biggest challenges with cash management? <span className="text-purple-400">*</span>
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {[
            { id: "countingErrors", label: "Manual counting errors" },
            { id: "timeConsuming", label: "Time-consuming processes" },
            { id: "security", label: "Security concerns" },
            { id: "counterfeit", label: "Counterfeit money" },
            { id: "tracking", label: "Cash flow tracking" },
            { id: "staffTime", label: "Staff time management" },
          ].map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex items-center space-x-2 rounded-lg border border-white/10 bg-white/5 p-4 cursor-pointer hover:bg-white/10 transition-colors",
                formData.challenges.includes(item.id) ? "ring-2 ring-purple-500 bg-white/10" : "",
                validationErrors.challenges ? "border-red-500/50" : "",
              )}
              onClick={() => handleCheckboxChange("challenges", item.id, !formData.challenges.includes(item.id))}
            >
              <Checkbox
                id={item.id}
                checked={formData.challenges.includes(item.id)}
                onCheckedChange={(checked) => handleCheckboxChange("challenges", item.id, checked as boolean)}
                className="border-white/20 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
              />
              <Label htmlFor={item.id} className="cursor-pointer text-white flex-1">
                {item.label}
              </Label>
            </motion.div>
          ))}
        </div>
        {validationErrors.challenges && <p className="text-red-400 text-sm mt-1">{validationErrors.challenges}</p>}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <Label className="text-white text-base">How much do cash management issues impact your daily operations?</Label>
        <div className="pt-6 px-2">
          <Slider
            defaultValue={[formData.painLevel]}
            value={[formData.painLevel]}
            max={10}
            min={1}
            step={1}
            onValueChange={(value) => handleSliderChange("painLevel", value)}
            className="[&>span]:bg-purple-400"
          />
          <div className="flex justify-between mt-2">
            <span className="text-white/60 text-sm">Minor</span>
            <span className="text-white/60 text-sm">Moderate</span>
            <span className="text-white/60 text-sm">Significant</span>
          </div>
          <div className="text-center font-medium text-purple-400 mt-4 text-xl">
            {formData.painLevel}/10 - {getPainLevelLabel(formData.painLevel)}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-2"
      >
        <Label htmlFor="currentSolution" className="text-white text-base">
          How do you currently handle end-of-day cash counting? <span className="text-purple-400">*</span>
        </Label>
        <Select
          name="currentSolution"
          value={formData.currentSolution}
          onValueChange={(value) => handleSelectChange("currentSolution", value)}
        >
          <SelectTrigger
            className={cn(
              "bg-white/5 border-white/10 text-white h-12",
              validationErrors.currentSolution ? "border-red-500 ring-1 ring-red-500" : "",
            )}
          >
            <SelectValue placeholder="Select your current method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manual">Manual counting by staff</SelectItem>
            <SelectItem value="basic-machine">Basic counting machine</SelectItem>
            <SelectItem value="pos-system">POS system tracking</SelectItem>
            <SelectItem value="combination">Combination of methods</SelectItem>
            <SelectItem value="outsourced">Outsourced to security company</SelectItem>
          </SelectContent>
        </Select>
        {validationErrors.currentSolution && (
          <p className="text-red-400 text-sm mt-1">{validationErrors.currentSolution}</p>
        )}
      </motion.div>
    </div>
  )
}
