"use client"

import type React from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { FormData, ValidationErrors } from "@/components/multi-step-form"
import { Mail } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ContactStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  validationErrors: ValidationErrors
}

export function ContactStep({ formData, updateFormData, validationErrors }: ContactStepProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-2.5 rounded-lg text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          <Mail className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold text-white">Stay Connected</h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <Label htmlFor="contactName" className="text-white text-base">
            Name <span className="text-purple-400">*</span>
          </Label>
          <Input
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleInputChange}
            placeholder="Your name"
            className={cn(
              "bg-white/5 border-white/10 text-white placeholder:text-white/50 h-12",
              validationErrors.contactName ? "border-red-500 ring-1 ring-red-500" : "",
            )}
          />
          {validationErrors.contactName && <p className="text-red-400 text-sm mt-1">{validationErrors.contactName}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <Label htmlFor="contactEmail" className="text-white text-base">
            Email Address <span className="text-purple-400">*</span>
          </Label>
          <Input
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleInputChange}
            placeholder="your.email@example.com"
            required
            type="email"
            className={cn(
              "bg-white/5 border-white/10 text-white placeholder:text-white/50 h-12",
              validationErrors.contactEmail ? "border-red-500 ring-1 ring-red-500" : "",
            )}
          />
          {validationErrors.contactEmail && (
            <p className="text-red-400 text-sm mt-1">{validationErrors.contactEmail}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <Label htmlFor="contactPhone" className="text-white text-base">
            Phone Number (WhatsApp preferred)
          </Label>
          <Input
            id="contactPhone"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleInputChange}
            placeholder="+233 XX XXX XXXX"
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 h-12"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <Label htmlFor="businessLocation" className="text-white text-base">
            Business Location
          </Label>
          <Input
            id="businessLocation"
            name="businessLocation"
            value={formData.businessLocation}
            onChange={handleInputChange}
            placeholder="e.g., Accra, Kumasi, Ho"
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 h-12"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-white/5 backdrop-blur-md rounded-lg text-sm text-gray-300 border border-white/10"
      >
        <p className="flex items-center gap-2">
          <span className="text-lg">🔒</span>
          <span>
            <strong>Privacy Guaranteed:</strong> Your information is completely confidential and will only be used for
            research purposes. We'll never share your data with third parties.
          </span>
        </p>
      </motion.div>
    </div>
  )
}
