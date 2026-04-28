'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SA</span>
            </div>
            <span className="font-bold text-slate-900 hidden sm:inline">Soth Nascent</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-slate-600 hover:text-blue-600 transition">
              Services
            </Link>
            <Link href="#about" className="text-slate-600 hover:text-blue-600 transition">
              Platform
            </Link>
            <Link href="#contact" className="text-slate-600 hover:text-blue-600 transition">
              Contact
            </Link>
            <Link href="#cta">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
            </Link>
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
            <Link href="#about" className="block text-slate-600 hover:text-blue-600 transition py-2">
              Platform
            </Link>
            <Link href="#contact" className="block text-slate-600 hover:text-blue-600 transition py-2">
              Contact
            </Link>
            <Link href="#cta" className="block">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
