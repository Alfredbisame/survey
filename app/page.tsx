import { HeroSection } from "@/components/hero-section"
import { Navbar } from "@/components/navbar"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { Partners } from "@/components/partners"
import { Footer } from "@/components/footer"
import { FloatingElements } from "@/components/floating-elements"
import { MultiStepForm } from "@/components/multi-step-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-800 relative overflow-hidden">
      <FloatingElements />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <Features />
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          <MultiStepForm />
        </div>
        <Testimonials />
        <Partners />
      </main>
      <Footer />
    </div>
  )
}
