'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function CTASections() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-100 p-8">
            <div className="text-3xl font-bold text-slate-900">
              Need accounting help?
            </div>
            <p className="mb-6 mt-4 text-slate-700">
              Clients can request only the services they need, communicate through
              the platform, upload business documents securely, and schedule
              consultations with verified professionals.
            </p>
            <div className="mb-8 space-y-3">
              <div className="flex gap-2">
                <span className="font-bold text-blue-600">1.</span>
                <span className="text-slate-700">Bookkeeping, tax, payroll, and advisory support</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-blue-600">2.</span>
                <span className="text-slate-700">Affordable, on-demand services without fixed contracts</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-blue-600">3.</span>
                <span className="text-slate-700">Secure document uploads and direct communication</span>
              </div>
            </div>
            <Button asChild className="h-11 w-full bg-blue-600 text-white hover:bg-blue-700">
              <Link href="/login?role=client">Open Client Demo</Link>
            </Button>
          </div>

          <div className="rounded-[2rem] border border-green-200 bg-gradient-to-br from-green-50 to-emerald-100 p-8">
            <div className="text-3xl font-bold text-slate-900">
              Ready to work as an accountant?
            </div>
            <p className="mb-6 mt-4 text-slate-700">
              Verified professionals can accept projects based on expertise and
              availability while building reputation through quality work and
              client feedback.
            </p>
            <div className="mb-8 space-y-3">
              <div className="flex gap-2">
                <span className="font-bold text-green-600">1.</span>
                <span className="text-slate-700">Flexible project-based income opportunities</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-green-600">2.</span>
                <span className="text-slate-700">A secure workspace for files, updates, and consultations</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-green-600">3.</span>
                <span className="text-slate-700">Professional visibility through ratings and completed engagements</span>
              </div>
            </div>
            <Button asChild className="h-11 w-full bg-green-600 text-white hover:bg-green-700">
              <Link href="/login?role=accountant">Open Accountant Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
