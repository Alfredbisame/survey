import { BarChartIcon as ChartBar, Clock, Shield, Zap, Lightbulb, Smartphone } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: <ChartBar className="h-6 w-6" />,
      title: "Real-time Analytics",
      description: "Get instant insights into your business performance with powerful analytics tools.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Time Efficiency",
      description: "Save hours daily with automated processes and streamlined operations.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enhanced Security",
      description: "Protect your business with advanced security features and fraud detection.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Increased Productivity",
      description: "Boost your team's productivity with intelligent workflow automation.",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Innovative Solutions",
      description: "Access cutting-edge technology tailored for the Ghanaian market.",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Integration",
      description: "Manage your business from anywhere with powerful mobile tools.",
    },
  ]

  return (
    <section className="py-20 relative z-10" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            Transforming Business Operations
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our upcoming solutions will revolutionize how businesses operate in Ghana and West Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] group"
            >
              <div className="bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl p-3 inline-block mb-4 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
