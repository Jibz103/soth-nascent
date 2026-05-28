import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-12 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400 text-slate-950">
                <span className="text-sm font-bold">SN</span>
              </div>
              <div>
                <span className="block font-bold">Soth Nascent</span>
                <span className="text-sm text-slate-400">
                  Accounting Services
                </span>
              </div>
            </div>
            <p className="text-slate-400">
              A hybrid accounting platform for businesses that need accessible,
              affordable, and reliable financial support.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="#services" className="transition hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#about" className="transition hover:text-white">
                  Vision and Mission
                </Link>
              </li>
              <li>
                <Link href="/login" className="transition hover:text-white">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Contact Info</h4>
            <ul className="space-y-3 text-slate-400">
              <li className="flex gap-2">
                <Phone size={18} />
                <span>+63 917 555 0142</span>
              </li>
              <li className="flex gap-2">
                <Mail size={18} />
                <span>hello@sothnascent.com</span>
              </li>
              <li className="flex gap-2">
                <MapPin size={18} />
                <span>Manila, Philippines</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Soth Nascent Accounting Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
