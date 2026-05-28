'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Badge className="mb-5 bg-slate-900 text-white hover:bg-slate-900">
            Hybrid Accounting Service Platform
          </Badge>
          <h1 className="text-balance text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
            Accessible accounting support for businesses in the digital economy.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl">
            Soth Nascent Accounting Services connects SMEs, startups, freelancers,
            and online sellers with verified accounting professionals through a
            secure website and flexible consultation setup.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild className="h-12 bg-blue-600 px-8 text-base text-white hover:bg-blue-700">
              <Link href="/login?role=client">
                Log In as Client
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild className="h-12 bg-green-600 px-8 text-base text-white hover:bg-green-700">
              <Link href="/login?role=accountant">
                Log In as Accountant
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-8 text-base">
              <Link href="/login">Login</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
              <ShieldCheck className="mt-0.5 text-blue-600" size={20} />
              <div>
                <p className="font-semibold text-slate-900">Verified professionals</p>
                <p className="text-sm text-slate-600">
                  Accountant credential checks and transparent feedback support trust.
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
              <CheckCircle2 className="mt-0.5 text-green-600" size={20} />
              <div>
                <p className="font-semibold text-slate-900">Flexible service model</p>
                <p className="text-sm text-slate-600">
                  Clients pay for only the accounting help they need, when they need it.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/70">
          <div className="rounded-[1.5rem] bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_55%,#10b981_100%)] p-6 text-white">
            <p className="text-sm uppercase tracking-[0.18em] text-white/75">
              Platform Snapshot
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              Hybrid support built for practical business needs
            </h2>
            <p className="mt-4 text-sm text-blue-50">
              Website-based requests, secure document uploads, direct messaging,
              flexible consultations, and role-based access for admin,
              accountants, and clients.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-500">Core Services</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                Bookkeeping, tax, payroll, advisory
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-500">Client Focus</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                SMEs, startups, freelancers, online sellers
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-500">Service Delivery</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                Online-first with optional face-to-face support
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-500">Revenue Model</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                5% to 15% service commission plus premium features
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
