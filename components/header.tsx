'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  AUTH_CHANGE_EVENT,
  clearDemoSession,
  readDemoSession,
  type DemoSession,
} from '@/lib/demo-auth'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [session, setSession] = useState<DemoSession | null>(null)

  useEffect(() => {
    const syncSession = () => setSession(readDemoSession())

    syncSession()
    window.addEventListener('storage', syncSession)
    window.addEventListener(AUTH_CHANGE_EVENT, syncSession)

    return () => {
      window.removeEventListener('storage', syncSession)
      window.removeEventListener(AUTH_CHANGE_EVENT, syncSession)
    }
  }, [])

  const handleLogout = () => {
    clearDemoSession()
    setSession(null)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900">
              <span className="text-sm font-bold text-white">SN</span>
            </div>
            <div className="hidden sm:block">
              <span className="block font-bold text-slate-900">Soth Nascent</span>
              <span className="block text-xs text-slate-500">
                Hybrid Accounting Services
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-slate-600 hover:text-blue-600 transition">
              Services
            </Link>
            <Link href="#process" className="text-slate-600 hover:text-blue-600 transition">
              Process
            </Link>
            <Link href="#about" className="text-slate-600 hover:text-blue-600 transition">
              Vision
            </Link>
            <Link href="#contact" className="text-slate-600 hover:text-blue-600 transition">
              Contact
            </Link>
            {session ? (
              <>
                <Button asChild variant="outline">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  type="button"
                  onClick={handleLogout}
                  className="bg-slate-900 text-white hover:bg-slate-800"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <Button asChild className="bg-slate-900 text-white hover:bg-slate-800">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden pb-4 space-y-3">
            <Link href="#services" className="block text-slate-600 hover:text-blue-600 transition py-2">
              Services
            </Link>
            <Link href="#process" className="block text-slate-600 hover:text-blue-600 transition py-2">
              Process
            </Link>
            <Link href="#about" className="block text-slate-600 hover:text-blue-600 transition py-2">
              Vision
            </Link>
            <Link href="#contact" className="block text-slate-600 hover:text-blue-600 transition py-2">
              Contact
            </Link>
            {session ? (
              <>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  type="button"
                  onClick={handleLogout}
                  className="w-full bg-slate-900 text-white hover:bg-slate-800"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <Button asChild className="w-full bg-slate-900 text-white hover:bg-slate-800">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
