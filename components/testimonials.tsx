export function Testimonials() {
  const testimonials = [
    {
      quote:
        "This innovative solution has completely transformed how we manage our daily operations. The time savings alone have been worth the investment.",
      author: "Sarah Mensah",
      role: "Retail Store Owner, Accra",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "As a bank manager, I've seen many solutions come and go, but this one stands out for its security features and ease of use.",
      author: "Kwame Osei",
      role: "Branch Manager, GCB Bank",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "Managing multiple mall locations became significantly easier. The real-time analytics have helped us make better business decisions.",
      author: "Abena Boateng",
      role: "Operations Director, Accra Mall",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <section className="py-20 relative z-10" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            What Business Leaders Say
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Hear from business owners and managers who have already experienced the benefits of our solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <svg
                    className="h-8 w-8 text-purple-400 mb-4"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-gray-300 italic">{testimonial.quote}</p>
                </div>
                <div className="mt-auto flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    className="h-10 w-10 rounded-full mr-3 bg-purple-400"
                  />
                  <div>
                    <p className="text-white font-medium">{testimonial.author}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
