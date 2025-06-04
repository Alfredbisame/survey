export function Partners() {
  return (
    <section className="py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-gray-300">Trusted by Leading Businesses</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-12 flex items-center justify-center">
              <div className="h-8 w-32 bg-white/10 rounded-md backdrop-blur-sm flex items-center justify-center text-white/40 font-semibold">
                Partner {i}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
