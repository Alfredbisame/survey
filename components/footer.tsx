import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black/20 backdrop-blur-xl pt-12 pb-6 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
              FutureBiz
            </h3>
            <p className="text-gray-400 mb-4">
              Revolutionizing business operations in Ghana and West Africa with cutting-edge technology solutions.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "FAQ", "Support"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin className="h-4 w-4 text-purple-400 mr-2" />
                <span className="text-gray-400 text-sm">Accra, Ghana</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 text-purple-400 mr-2" />
                <span className="text-gray-400 text-sm">+233 XX XXX XXXX</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 text-purple-400 mr-2" />
                <span className="text-gray-400 text-sm">info@futurebiz.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} FutureBiz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
