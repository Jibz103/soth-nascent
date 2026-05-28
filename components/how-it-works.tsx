import {
  Briefcase,
  CalendarCheck2,
  CheckCircle,
  FileText,
  ShieldCheck,
  Users,
} from 'lucide-react'

export default function HowItWorks() {
  const businessSteps = [
    {
      icon: Briefcase,
      title: 'Request a Service',
      description:
        'Clients choose bookkeeping, tax support, payroll, registration, or advisory services based on current business needs.',
    },
    {
      icon: FileText,
      title: 'Upload Financial Records',
      description:
        'Business documents can be submitted through the secure digital workspace for organized review.',
    },
    {
      icon: Users,
      title: 'Connect with a Verified Accountant',
      description:
        'The platform matches clients with a suitable professional for remote support or limited face-to-face consultation.',
    },
    {
      icon: CalendarCheck2,
      title: 'Receive Ongoing Guidance',
      description:
        'Clients track progress, consultations, and deliverables without long hiring processes or fixed contracts.',
    },
  ]

  const accountantSteps = [
    {
      icon: ShieldCheck,
      title: 'Verify Credentials',
      description:
        'Accountants submit qualifications and background details before offering services on the platform.',
    },
    {
      icon: Briefcase,
      title: 'Accept Matching Projects',
      description:
        'Professionals choose tasks based on expertise, availability, and preferred service type.',
    },
    {
      icon: FileText,
      title: 'Work in a Secure Workspace',
      description:
        'All files, deliverables, and updates are organized in one shared environment for better accountability.',
    },
    {
      icon: CheckCircle,
      title: 'Build Reputation and Income',
      description:
        'Successful projects and client feedback help accountants grow their profile and career opportunities.',
    },
  ]

  return (
    <section id="process" className="bg-slate-50/80 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            How the Hybrid Platform Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Soth Nascent combines a professional website with personalized
            accounting support so both businesses and accountants can work with
            more flexibility and less overhead.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-8 flex items-center gap-3 text-2xl font-bold text-slate-900">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                C
              </span>
              For Clients and Businesses
            </h3>
            <div className="space-y-6">
              {businessSteps.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100">
                      <Icon size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900">{step.title}</h4>
                      <p className="mt-1 text-slate-600">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-8 flex items-center gap-3 text-2xl font-bold text-slate-900">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                A
              </span>
              For Accountants
            </h3>
            <div className="space-y-6">
              {accountantSteps.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100">
                      <Icon size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900">{step.title}</h4>
                      <p className="mt-1 text-slate-600">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
