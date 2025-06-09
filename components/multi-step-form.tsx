"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Check, Sparkles, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { BusinessInfoStep } from "@/components/form-steps/business-info-step"
import { ChallengesStep } from "@/components/form-steps/challenges-step"
import { TechnologyStep } from "@/components/form-steps/technology-step"
import { VisionStep } from "@/components/form-steps/vision-step"
import { ContactStep } from "@/components/form-steps/contact-step"
import { SuccessStep } from "@/components/form-steps/success-step"
import { cn } from "@/lib/utils"

export type FormData = {
  businessType: string
  businessSize: string
  dailyTransactions: number
  challenges: string[]
  painLevel: number
  currentSolution: string
  features: string[]
  techComfort: string
  budgetRange: string
  businessGoals: string
  biggestWish: string
  betaInterest: string
  contactName: string
  contactEmail: string
  contactPhone: string
  businessLocation: string
}

export type ValidationErrors = {
  [key: string]: string
}

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    businessType: "",
    businessSize: "",
    dailyTransactions: 50,
    challenges: [],
    painLevel: 5,
    currentSolution: "",
    features: [],
    techComfort: "",
    budgetRange: "",
    businessGoals: "",
    biggestWish: "",
    betaInterest: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    businessLocation: "",
  })
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const steps = [
    { name: "Business Info", component: BusinessInfoStep },
    { name: "Challenges", component: ChallengesStep },
    { name: "Technology", component: TechnologyStep },
    { name: "Vision", component: VisionStep },
    { name: "Contact", component: ContactStep },
  ]

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }))
    // Clear validation errors for updated fields
    const updatedFields = Object.keys(newData)
    setValidationErrors((prev) => {
      const newErrors = { ...prev }
      updatedFields.forEach((field) => {
        delete newErrors[field]
      })
      return newErrors
    })
  }

  const validateStep = (stepIndex: number): boolean => {
    const errors: ValidationErrors = {}

    switch (stepIndex) {
      case 0: // Business Info
        if (!formData.businessType) {
          errors.businessType = "Please select your business type"
        }
        if (!formData.businessSize) {
          errors.businessSize = "Please select your business size"
        }
        break

      case 1: // Challenges
        if (formData.challenges.length === 0) {
          errors.challenges = "Please select at least one challenge you face"
        }
        if (!formData.currentSolution) {
          errors.currentSolution = "Please select how you currently handle cash counting"
        }
        break

      case 2: // Technology
        if (formData.features.length === 0) {
          errors.features = "Please select at least one feature that interests you"
        }
        if (!formData.techComfort) {
          errors.techComfort = "Please indicate your comfort level with technology"
        }
        if (!formData.budgetRange) {
          errors.budgetRange = "Please select a budget range"
        }
        break

      case 3: // Vision
        if (!formData.businessGoals.trim()) {
          errors.businessGoals = "Please share your business goals"
        }
        if (!formData.betaInterest) {
          errors.betaInterest = "Please indicate your interest in beta testing"
        }
        break

      case 4: // Contact
        if (!formData.contactEmail) {
          errors.contactEmail = "Email address is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
          errors.contactEmail = "Please enter a valid email address"
        }
        if (!formData.contactName.trim()) {
          errors.contactName = "Please enter your name"
        }
        break
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      setValidationErrors({}) // Clear errors when going back
    }
  }

const handleSubmit = () => {
  if (validateStep(currentStep)) {
    // Format form data into a WhatsApp-readable message with only values
    const messageLines = Object.entries(formData)
      .map(([key, value]) => {
        // Convert camelCase to readable format
        const readableKey = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())
          .trim();
        
        if (Array.isArray(value)) {
          return `${readableKey}: ${value.join(', ')}`;
        }
        return `${readableKey}: ${value}`;
      })
      .filter(line => line.split(': ')[1] && line.split(': ')[1].trim() !== '') // Remove empty values
      .join('\n');

    // Create a clean message format
    const finalMessage = `New Survey Submission:\n\n${messageLines}`;
    
    // Replace with your WhatsApp number (including country code without '+')
    const whatsappUrl = `https://wa.me/233249970393?text=${encodeURIComponent(finalMessage)}`;
    
    // Open WhatsApp with the message
    window.open(whatsappUrl, '_blank');
    
    // Show success screen
    setIsSubmitted(true);
  }
};
  
  

  const CurrentStepComponent = isSubmitted ? SuccessStep : steps[currentStep].component

  return (
    <div
      className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(168,85,247,0.15)] border border-white/10"
      id="survey"
    >
      {!isSubmitted && (
        <div className="mb-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              Business Operations Survey
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Help us understand your business needs and shape the future of operations in Ghana
            </p>
          </div>

          <div className="flex justify-between items-center mb-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center relative"
                style={{ width: `${100 / steps.length}%` }}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300",
                    index < currentStep
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                      : index === currentStep
                        ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white ring-4 ring-purple-500/20"
                        : "bg-white/10 text-white/50",
                  )}
                >
                  {index < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium hidden md:block transition-all duration-300",
                    index <= currentStep ? "text-white" : "text-white/50",
                  )}
                >
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute top-5 left-1/2 w-full h-0.5 transition-all duration-300",
                      index < currentStep ? "bg-gradient-to-r from-cyan-500 to-purple-600" : "bg-white/10",
                    )}
                    style={{ transform: "translateX(50%)" }}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {Object.keys(validationErrors).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
            >
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">Please fix the following errors:</span>
              </div>
              <ul className="mt-2 space-y-1">
                {Object.values(validationErrors).map((error, index) => (
                  <li key={index} className="text-red-300 text-sm ml-7">
                    • {error}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentStepComponent
            formData={formData}
            updateFormData={updateFormData}
            validationErrors={validationErrors}
          />
        </motion.div>
      </AnimatePresence>

      {!isSubmitted && (
        <div className="flex justify-between mt-10">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={cn(
              "text-white hover:bg-white/10 hover:text-white border border-white/20 transition-all duration-300",
              currentStep === 0 ? "opacity-0 pointer-events-none" : "",
            )}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={nextStep}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
          >
            {currentStep === steps.length - 1 ? (
              <>
                Submit
                <Sparkles className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
