'use client'

import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
      <div className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 text-balance">
          Connect with Professional Accountants On-Demand
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto text-balance">
          Soth Nascent is a specialized marketplace connecting businesses with verified accounting professionals. Flexible, affordable, and transparent.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button 
            onClick={() => scrollToSection('cta')}
            className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 text-base font-medium flex items-center justify-center gap-2 rounded-md transition-colors cursor-pointer"
          >
            I&apos;m a Business
            <ArrowRight size={18} />
          </button>
          <button 
            onClick={() => scrollToSection('cta')}
            className="bg-green-600 hover:bg-green-700 text-white h-12 px-8 text-base font-medium flex items-center justify-center gap-2 rounded-md transition-colors cursor-pointer"
          >
            I&apos;m an Accountant
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">1000+</div>
          <p className="text-slate-600 mt-1">Verified Professionals</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">5000+</div>
          <p className="text-slate-600 mt-1">Active Businesses</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">4.8★</div>
          <p className="text-slate-600 mt-1">Average Rating</p>
        </div>
      </div>
    </section>
  )
}
