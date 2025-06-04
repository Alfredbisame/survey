"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { FormSection } from "@/components/form-section"
import { ProgressBar } from "@/components/progress-bar"

export function SurveyForm() {
  const [formData, setFormData] = useState({
    businessType: "",
    businessSize: "",
    dailyTransactions: 50,
    challenges: [] as string[],
    painLevel: 5,
    currentSolution: "",
    features: [] as string[],
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

  const [progress, setProgress] = useState(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    updateProgress()
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    updateProgress()
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    updateProgress()
  }

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({ ...prev, [name]: value[0] }))
    updateProgress()
  }

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    setFormData((prev) => {
      const currentValues = prev[name as keyof typeof prev] as string[]
      return {
        ...prev,
        [name]: checked ? [...currentValues, value] : currentValues.filter((item) => item !== value),
      }
    })
    updateProgress()
  }

  const updateProgress = () => {
    // Count filled required fields
    const requiredFields = ["businessType", "contactEmail"]
    const filledRequired = requiredFields.filter((field) => formData[field as keyof typeof formData]).length

    // Count filled optional fields
    const optionalFields = Object.keys(formData).filter((key) => !requiredFields.includes(key))
    const filledOptional = optionalFields.filter((field) => {
      const value = formData[field as keyof typeof formData]
      return Array.isArray(value) ? value.length > 0 : Boolean(value)
    }).length

    // Calculate progress (required fields have more weight)
    const requiredProgress = (filledRequired / requiredFields.length) * 60
    const optionalProgress = (filledOptional / optionalFields.length) * 40
    setProgress(Math.min(requiredProgress + optionalProgress, 100))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert(
      "🎉 Thank you for completing the survey! Check your email for your rewards and updates on our upcoming innovation.",
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(168,85,247,0.15)] border border-white/10"
      id="survey"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
          Business Operations Survey
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Help us understand your business needs and shape the future of operations in Ghana
        </p>
      </div>

      <ProgressBar progress={progress} />

      <FormSection title="About Your Business" icon="Building">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessType">What type of business do you operate? *</Label>
            <Select
              name="businessType"
              value={formData.businessType}
              onValueChange={(value) => handleSelectChange("businessType", value)}
              required
            >
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
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
          </div>

          <div className="space-y-2">
            <Label>How many locations do you operate?</Label>
            <RadioGroup
              value={formData.businessSize}
              onValueChange={(value) => handleRadioChange("businessSize", value)}
              className="grid grid-cols-2 gap-2 pt-2"
            >
              <div className="flex items-center space-x-2 rounded-lg border border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10 transition-colors">
                <RadioGroupItem value="single" id="single" />
                <Label htmlFor="single" className="cursor-pointer text-white">
                  Single Location
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10 transition-colors">
                <RadioGroupItem value="2-5" id="multiple2-5" />
                <Label htmlFor="multiple2-5" className="cursor-pointer text-white">
                  2-5 Locations
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10 transition-colors">
                <RadioGroupItem value="6-10" id="multiple6-10" />
                <Label htmlFor="multiple6-10" className="cursor-pointer text-white">
                  6-10 Locations
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10 transition-colors">
                <RadioGroupItem value="10+" id="multiple10plus" />
                <Label htmlFor="multiple10plus" className="cursor-pointer text-white">
                  10+ Locations
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Approximately how many cash transactions do you process daily?</Label>
            <div className="pt-6 px-2">
              <Slider
                defaultValue={[formData.dailyTransactions]}
                max={1000}
                step={10}
                onValueChange={(value) => handleSliderChange("dailyTransactions", value)}
                className="[&>span]:bg-purple-400"
              />
              <div className="text-center font-medium text-purple-400 mt-2">
                {formData.dailyTransactions} transactions/day
              </div>
            </div>
          </div>
        </div>
      </FormSection>

      <FormSection title="Current Business Challenges" icon="AlertCircle">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>What are your biggest challenges with cash management?</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {[
                { id: "countingErrors", label: "Manual counting errors" },
                { id: "timeConsuming", label: "Time-consuming processes" },
                { id: "security", label: "Security concerns" },
                { id: "counterfeit", label: "Counterfeit money" },
                { id: "tracking", label: "Cash flow tracking" },
                { id: "staffTime", label: "Staff time management" },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-2 rounded-lg border border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <Checkbox
                    id={item.id}
                    checked={formData.challenges.includes(item.id)}
                    onCheckedChange={(checked) => handleCheckboxChange("challenges", item.id, checked as boolean)}
                    className="border-white/20 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                  <Label htmlFor={item.id} className="cursor-pointer text-white">
                    {item.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>How much do cash management issues impact your daily operations?</Label>
            <div className="pt-6 px-2">
              <Slider
                defaultValue={[formData.painLevel]}
                max={10}
                min={1}
                step={1}
                onValueChange={(value) => handleSliderChange("painLevel", value)}
                className="[&>span]:bg-purple-400"
              />
              <div className="text-center font-medium text-purple-400 mt-2">
                {formData.painLevel}/10 -{" "}
                {formData.painLevel <= 3
                  ? "Minor Impact"
                  : formData.painLevel <= 6
                    ? "Moderate Impact"
                    : "Significant Impact"}
              </div>
            </div>
          </div>
        </div>
      </FormSection>

      <FormSection title="Technology & Innovation" icon="Zap">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Which automated business features would interest you most?</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {[
                { id: "autoCount", label: "Automatic cash counting" },
                { id: "realTimeReports", label: "Real-time business reports" },
                { id: "fraudDetection", label: "Fraud detection" },
                { id: "remoteMonitoring", label: "Remote monitoring" },
                { id: "predictiveAnalytics", label: "Sales predictions" },
                { id: "mobileIntegration", label: "Mobile app control" },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-2 rounded-lg border border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <Checkbox
                    id={item.id}
                    checked={formData.features.includes(item.id)}
                    onCheckedChange={(checked) => handleCheckboxChange("features", item.id, checked as boolean)}
                    className="border-white/20 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                  <Label htmlFor={item.id} className="cursor-pointer text-white">
                    {item.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              What would you consider a reasonable monthly investment for a solution that saves you 3+ hours daily?
            </Label>
            <Select
              name="budgetRange"
              value={formData.budgetRange}
              onValueChange={(value) => handleSelectChange("budgetRange", value)}
            >
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
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
          </div>
        </div>
      </FormSection>

      <FormSection title="Your Business Vision" icon="Lightbulb">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessGoals">What are your main business goals for the next 2 years?</Label>
            <Textarea
              id="businessGoals"
              name="businessGoals"
              value={formData.businessGoals}
              onChange={handleInputChange}
              placeholder="e.g., Expand to new locations, improve efficiency..."
              className="min-h-[100px] bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
          </div>

          <div className="space-y-2">
            <Label>Would you be interested in being a beta tester for innovative business solutions?</Label>
            <RadioGroup
              value={formData.betaInterest}
              onValueChange={(value) => handleRadioChange("betaInterest", value)}
              className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2"
            >
              <div className="flex items-center space-x-2 rounded-lg border border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10 transition-colors">
                <RadioGroupItem value="yes" id="betaYes" />
                <Label htmlFor="betaYes" className="cursor-pointer text-white">
                  Yes, definitely!
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10 transition-colors">
                <RadioGroupItem value="maybe" id="betaMaybe" />
                <Label htmlFor="betaMaybe" className="cursor-pointer text-white">
                  Maybe, tell me more
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10 transition-colors">
                <RadioGroupItem value="no" id="betaNo" />
                <Label htmlFor="betaNo" className="cursor-pointer text-white">
                  Not interested
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </FormSection>

      <FormSection title="Stay Connected" icon="Mail">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contactName">Name</Label>
            <Input
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleInputChange}
              placeholder="Your name"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Email Address *</Label>
            <Input
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              required
              type="email"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Phone Number (WhatsApp preferred)</Label>
            <Input
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleInputChange}
              placeholder="+233 XX XXX XXXX"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessLocation">Business Location</Label>
            <Input
              id="businessLocation"
              name="businessLocation"
              value={formData.businessLocation}
              onChange={handleInputChange}
              placeholder="e.g., Accra, Kumasi"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
          </div>
        </div>
      </FormSection>

      <Button
        type="submit"
        className="w-full mt-8 py-6 text-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] rounded-xl"
      >
        🚀 Submit Survey & Claim Rewards
      </Button>

      <div className="mt-6 p-4 bg-white/5 backdrop-blur-md rounded-lg text-sm text-gray-300 border border-white/10">
        <p className="flex items-center gap-2">
          <span className="text-lg">🔒</span>
          <span>
            <strong>Privacy Guaranteed:</strong> Your information is completely confidential and will only be used for
            research purposes. We'll never share your data with third parties.
          </span>
        </p>
      </div>
    </form>
  )
}
