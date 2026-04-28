import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center">
                <span className="font-bold text-sm">SA</span>
              </div>
              <span className="font-bold">Soth Nascent</span>
            </div>
            <p className="text-slate-400">Professional accounting and financial consulting services for your business.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="#services" className="hover:text-white transition">Services</Link></li>
              <li><Link href="#about" className="hover:text-white transition">About</Link></li>
              <li><Link href="#contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-slate-400">
              <li className="flex gap-2">
                <Phone size={18} />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex gap-2">
                <Mail size={18} />
                <span>info@sothnascent.com</span>
              </li>
              <li className="flex gap-2">
                <MapPin size={18} />
                <span>Manila, Philippines</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Soth Nascent Accounting Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
