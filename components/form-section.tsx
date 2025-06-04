import { Building, AlertCircle, Zap, Lightbulb, Mail, type LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

interface FormSectionProps {
  title: string
  children: ReactNode
  icon: "Building" | "AlertCircle" | "Zap" | "Lightbulb" | "Mail"
}

export function FormSection({ title, children, icon }: FormSectionProps) {
  const icons: Record<string, LucideIcon> = {
    Building,
    AlertCircle,
    Zap,
    Lightbulb,
    Mail,
  }

  const IconComponent = icons[icon]

  return (
    <div className="mb-8 p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md transition-all hover:bg-white/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-2.5 rounded-lg text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          <IconComponent className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  )
}
