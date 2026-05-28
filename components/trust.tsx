import { Briefcase, CheckCircle2, CreditCard, ShieldCheck } from 'lucide-react'

export default function Trust() {
  const trustMetrics = [
    {
      icon: CheckCircle2,
      number: '3 Roles',
      label: 'Admin, accountant, and client access',
    },
    {
      icon: ShieldCheck,
      number: 'Hybrid',
      label: 'Online-first with optional personal support',
    },
    {
      icon: Briefcase,
      number: '6 Core',
      label: 'Accounting and business support services',
    },
    {
      icon: CreditCard,
      number: '5%-15%',
      label: 'Service commission in the business model',
    },
  ]

  return (
    <section className="bg-blue-50/70 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Trust, Operations, and Platform Model
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            The platform is designed around verified professionals, secure file
            handling, ongoing customer support, and a scalable hybrid service model.
          </p>
        </div>

        <div className="mb-12 grid gap-8 md:grid-cols-4">
          {trustMetrics.map((metric) => {
            const Icon = metric.icon
            return (
              <div key={metric.label} className="text-center">
                <div className="mb-4 flex justify-center">
                  <Icon size={40} className="text-blue-600" />
                </div>
                <div className="mb-2 text-3xl font-bold text-slate-900">{metric.number}</div>
                <div className="text-slate-600">{metric.label}</div>
              </div>
            )
          })}
        </div>

        <div className="mb-12 rounded-3xl border border-slate-200 bg-white p-8">
          <h3 className="mb-6 text-2xl font-bold text-slate-900">
            Verification and Quality Assurance
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
                Step 1
              </div>
              <h4 className="mb-2 text-lg font-semibold text-slate-900">
                Credential Review
              </h4>
              <p className="text-slate-600">
                Accountants submit professional background details before becoming
                visible on the platform.
              </p>
            </div>
            <div>
              <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
                Step 2
              </div>
              <h4 className="mb-2 text-lg font-semibold text-slate-900">
                Secure Workspace Controls
              </h4>
              <p className="text-slate-600">
                Role-based access keeps client records, transactions, and project
                communication organized and protected.
              </p>
            </div>
            <div>
              <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
                Step 3
              </div>
              <h4 className="mb-2 text-lg font-semibold text-slate-900">
                Feedback and Support
              </h4>
              <p className="text-slate-600">
                Client reviews and admin support help maintain service quality and
                accountability across the platform.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_100%)] p-8 text-white">
          <h3 className="mb-6 text-2xl font-bold">Business Model Canvas Snapshot</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-3 text-lg font-semibold">Key Partners and Activities</h4>
              <p className="text-blue-50">
                The platform depends on accountants, IT support, website
                maintenance, government compliance awareness, client matching, and
                responsive customer support.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-lg font-semibold">Value and Revenue</h4>
              <p className="text-blue-50">
                Clients receive affordable on-demand accounting help, while the
                business earns through service commissions, premium visibility, and
                advisory-related opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
