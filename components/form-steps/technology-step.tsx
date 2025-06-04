"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { FormData, ValidationErrors } from "@/components/multi-step-form"
import { Zap } from "lucide-react"
import { motion } from "framer-motion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface TechnologyStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  validationErrors: ValidationErrors
}

export function TechnologyStep({ formData, updateFormData, validationErrors }: TechnologyStepProps) {
  const handleCheckboxChange = (name: keyof FormData, value: string, checked: boolean) => {
    const currentValues = formData[name] as string[]
    updateFormData({
      [name]: checked ? [...currentValues, value] : currentValues.filter((item) => item !== value),
    })
  }

  const handleRadioChange = (name: keyof FormData, value: string) => {
    updateFormData({ [name]: value })
  }

  const handleSelectChange = (name: keyof FormData, value: string) => {
    updateFormData({ [name]: value })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-2.5 rounded-lg text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          <Zap className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold text-white">Technology & Innovation</h3>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <Label className="text-white text-base">
          Which automated business features would interest you most? <span className="text-purple-400">*</span>
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {[
            { id: "autoCount", label: "Automatic cash counting", icon: "💰" },
            { id: "realTimeReports", label: "Real-time business reports", icon: "📊" },
            { id: "fraudDetection", label: "Fraud detection", icon: "🔍" },
            { id: "remoteMonitoring", label: "Remote monitoring", icon: "📱" },
            { id: "predictiveAnalytics", label: "Sales predictions", icon: "📈" },
            { id: "mobileIntegration", label: "Mobile app control", icon: "📲" },
          ].map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex items-center space-x-3 rounded-lg border border-white/10 bg-white/5 p-4 cursor-pointer hover:bg-white/10 transition-colors",
                formData.features.includes(item.id) ? "ring-2 ring-purple-500 bg-white/10" : "",
                validationErrors.features ? "border-red-500/50" : "",
              )}
              onClick={() => handleCheckboxChange("features", item.id, !formData.features.includes(item.id))}
            >
              <div className="text-xl">{item.icon}</div>
              <div className="flex items-center space-x-2 flex-1">
                <Checkbox
                  id={item.id}
                  checked={formData.features.includes(item.id)}
                  onCheckedChange={(checked) => handleCheckboxChange("features", item.id, checked as boolean)}
                  className="border-white/20 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                />
                <Label htmlFor={item.id} className="cursor-pointer text-white flex-1">
                  {item.label}
                </Label>
              </div>
            </motion.div>
          ))}
        </div>
        {validationErrors.features && <p className="text-red-400 text-sm mt-1">{validationErrors.features}</p>}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <Label className="text-white text-base">
          How comfortable are you with adopting new technology? <span className="text-purple-400">*</span>
        </Label>
        <RadioGroup
          value={formData.techComfort}
          onValueChange={(value) => handleRadioChange("techComfort", value)}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2"
        >
          {[
            { value: "early-adopter", label: "Early adopter", icon: "🚀" },
            { value: "cautious", label: "Cautiously optimistic", icon: "🤔" },
            { value: "skeptical", label: "Skeptical but open", icon: "🧐" },
            { value: "traditional", label: "Prefer traditional methods", icon: "📝" },
          ].map((option) => (
            <motion.div
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex items-center space-x-3 rounded-lg border border-white/10 bg-white/5 p-4 cursor-pointer hover:bg-white/10 transition-colors",
                formData.techComfort === option.value ? "ring-2 ring-purple-500 bg-white/10" : "",
                validationErrors.techComfort ? "border-red-500/50" : "",
              )}
              onClick={() => handleRadioChange("techComfort", option.value)}
            >
              <div className="text-xl">{option.icon}</div>
              <div className="flex items-center space-x-2 flex-1">
                <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                <div
                  className={`w-4 h-4 rounded-full border ${
                    formData.techComfort === option.value
                      ? "bg-purple-500 border-purple-500"
                      : "bg-transparent border-white/30"
                  }`}
                >
                  {formData.techComfort === option.value && (
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
        {validationErrors.techComfort && <p className="text-red-400 text-sm mt-1">{validationErrors.techComfort}</p>}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-2"
      >
        <Label htmlFor="budgetRange" className="text-white text-base">
          What would you consider a reasonable monthly investment for a solution that saves you 3+ hours daily?{" "}
          <span className="text-purple-400">*</span>
        </Label>
        <Select
          name="budgetRange"
          value={formData.budgetRange}
          onValueChange={(value) => handleSelectChange("budgetRange", value)}
        >
          <SelectTrigger
            className={cn(
              "bg-white/5 border-white/10 text-white h-12",
              validationErrors.budgetRange ? "border-red-500 ring-1 ring-red-500" : "",
            )}
          >
            <SelectValue placeholder="Select budget range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-100">GH₵ 0-100</SelectItem>
            <SelectItem value="100-300">GH₵ 100-300</SelectItem>
            <SelectItem value="300-500">GH₵ 300-500</SelectItem>
            <SelectItem value="500-1000">GH₵ 500-1000</SelectItem>
            <SelectItem value="1000+">GH₵ 1000+</SelectItem>
            <SelectItem value="depends">Depends on ROI</SelectItem>
          </SelectContent>
        </Select>
        {validationErrors.budgetRange && <p className="text-red-400 text-sm mt-1">{validationErrors.budgetRange}</p>}
      </motion.div>
    </div>
  )
}
