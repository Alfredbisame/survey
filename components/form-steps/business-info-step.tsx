"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import type { FormData, ValidationErrors } from "@/components/multi-step-form"
import { Building } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BusinessInfoStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  validationErrors: ValidationErrors
}

export function BusinessInfoStep({ formData, updateFormData, validationErrors }: BusinessInfoStepProps) {
  const handleSelectChange = (name: keyof FormData, value: string) => {
    updateFormData({ [name]: value })
  }

  const handleRadioChange = (name: keyof FormData, value: string) => {
    updateFormData({ [name]: value })
  }

  const handleSliderChange = (name: keyof FormData, value: number[]) => {
    updateFormData({ [name]: value[0] })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-2.5 rounded-lg text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          <Building className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold text-white">About Your Business</h3>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <Label htmlFor="businessType" className="text-white text-base">
          What type of business do you operate? <span className="text-purple-400">*</span>
        </Label>
        <Select
          name="businessType"
          value={formData.businessType}
          onValueChange={(value) => handleSelectChange("businessType", value)}
          required
        >
          <SelectTrigger
            className={cn(
              "bg-white/5 border-white/10 text-white h-12",
              validationErrors.businessType ? "border-red-500 ring-1 ring-red-500" : "",
            )}
          >
            <SelectValue placeholder="Select your business type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="retail-store">Retail Store/Shop</SelectItem>
            <SelectItem value="supermarket">Supermarket/Grocery Store</SelectItem>
            <SelectItem value="restaurant">Restaurant/Food Service</SelectItem>
            <SelectItem value="pharmacy">Pharmacy/Medical Store</SelectItem>
            <SelectItem value="convenience">Convenience Store</SelectItem>
            <SelectItem value="electronics">Electronics/Tech Store</SelectItem>
            <SelectItem value="fashion">Fashion/Clothing Store</SelectItem>
            <SelectItem value="bank">Bank/Financial Institution</SelectItem>
            <SelectItem value="mall">Shopping Mall</SelectItem>
            <SelectItem value="showroom">Showroom/Exhibition Space</SelectItem>
            <SelectItem value="service">Service Business</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {validationErrors.businessType && <p className="text-red-400 text-sm mt-1">{validationErrors.businessType}</p>}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <Label className="text-white text-base">
          How many locations do you operate? <span className="text-purple-400">*</span>
        </Label>
        <RadioGroup
          value={formData.businessSize}
          onValueChange={(value) => handleRadioChange("businessSize", value)}
          className="grid grid-cols-2 gap-3 pt-2"
        >
          {[
            { value: "single", label: "Single Location" },
            { value: "2-5", label: "2-5 Locations" },
            { value: "6-10", label: "6-10 Locations" },
            { value: "10+", label: "10+ Locations" },
          ].map((option) => (
            <motion.div
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex items-center space-x-2 rounded-lg border border-white/10 bg-white/5 p-4 cursor-pointer hover:bg-white/10 transition-colors",
                formData.businessSize === option.value ? "ring-2 ring-purple-500 bg-white/10" : "",
                validationErrors.businessSize ? "border-red-500/50" : "",
              )}
              onClick={() => handleRadioChange("businessSize", option.value)}
            >
              <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
              <div
                className={`w-4 h-4 rounded-full border ${
                  formData.businessSize === option.value
                    ? "bg-purple-500 border-purple-500"
                    : "bg-transparent border-white/30"
                }`}
              >
                {formData.businessSize === option.value && (
                  <div className="w-2 h-2 rounded-full bg-white mx-auto mt-0.5"></div>
                )}
              </div>
              <Label htmlFor={option.value} className="cursor-pointer text-white flex-1">
                {option.label}
              </Label>
            </motion.div>
          ))}
        </RadioGroup>
        {validationErrors.businessSize && <p className="text-red-400 text-sm mt-1">{validationErrors.businessSize}</p>}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <Label className="text-white text-base">Approximately how many cash transactions do you process daily?</Label>
        <div className="pt-6 px-2">
          <Slider
            defaultValue={[formData.dailyTransactions]}
            value={[formData.dailyTransactions]}
            max={1000}
            step={10}
            onValueChange={(value) => handleSliderChange("dailyTransactions", value)}
            className="[&>span]:bg-purple-400"
          />
          <div className="flex justify-between mt-2">
            <span className="text-white/60 text-sm">0</span>
            <span className="text-white/60 text-sm">500</span>
            <span className="text-white/60 text-sm">1000+</span>
          </div>
          <div className="text-center font-medium text-purple-400 mt-4 text-xl">
            {formData.dailyTransactions} transactions/day
          </div>
        </div>
      </motion.div>
    </div>
  )
}
