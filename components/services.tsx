import { Card } from '@/components/ui/card'
import {
  BarChart3,
  BriefcaseBusiness,
  Calculator,
  ClipboardList,
  FileText,
  Landmark,
} from 'lucide-react'

export default function Services() {
  const services = [
    {
      icon: FileText,
      title: 'Bookkeeping',
      description:
        'Organize daily financial records, monitor transactions, and maintain accurate books for business reporting.',
    },
    {
      icon: Calculator,
      title: 'Tax Assistance',
      description:
        'Get support for tax preparation, compliance requirements, and practical filing guidance for businesses.',
    },
    {
      icon: BarChart3,
      title: 'Financial Statement Preparation',
      description:
        'Receive clear and timely financial statements prepared by qualified accounting professionals.',
    },
    {
      icon: ClipboardList,
      title: 'Payroll Processing',
      description:
        'Simplify payroll workflows, salary computations, and recurring employee payment records.',
    },
    {
      icon: BriefcaseBusiness,
      title: 'Financial Consultation',
      description:
        'Access budgeting, startup planning, and decision support to improve long-term financial management.',
    },
    {
      icon: Landmark,
      title: 'Business Registration Support',
      description:
        'Get help with business registration steps and related government compliance requirements.',
    },
  ]

  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Products and Services
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Soth Nascent delivers flexible accounting support for clients who need
          reliable financial help without the cost of a permanent in-house team.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <Card
              key={service.title}
              className="border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <Icon size={22} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
              <p className="mt-3 text-slate-600">{service.description}</p>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
