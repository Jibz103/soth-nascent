import { Card } from '@/components/ui/card'
import {
  DollarSign,
  Lock,
  MessageSquareMore,
  Shield,
  Star,
  TrendingUp,
} from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: DollarSign,
      title: 'On-Demand Accounting Services',
      description:
        'Businesses can request bookkeeping, payroll, tax, and advisory services only when needed instead of hiring full-time staff.',
    },
    {
      icon: MessageSquareMore,
      title: 'Hybrid Consultation Setup',
      description:
        'The platform supports online communication and scheduled face-to-face consultations for clients who need personal interaction.',
    },
    {
      icon: Shield,
      title: 'Verified Professionals',
      description:
        'Accountants undergo credential and background review to help maintain service quality, professionalism, and accountability.',
    },
    {
      icon: Star,
      title: 'Transparent Feedback System',
      description:
        'Ratings and client reviews reinforce trust and help businesses choose accounting support with more confidence.',
    },
    {
      icon: Lock,
      title: 'Secure Document Handling',
      description:
        'Sensitive financial records can be uploaded, stored, and reviewed in a protected digital workspace.',
    },
    {
      icon: TrendingUp,
      title: 'Advisory for Growth',
      description:
        'Beyond compliance work, the platform supports budgeting, startup planning, and better financial decision-making.',
    },
  ]

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Key Platform Features
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          The service model follows your concept paper by combining flexibility,
          professional expertise, data security, and accessibility in one platform.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Card
              key={feature.title}
              className="border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                <Icon size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-slate-600">{feature.description}</p>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
