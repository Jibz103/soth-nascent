import { Briefcase, Coins, Sparkles, Users } from 'lucide-react'

import { Card } from '@/components/ui/card'

export default function Testimonials() {
  const benefits = [
    {
      icon: Coins,
      title: 'Affordable for growing businesses',
      description:
        'SMEs and startups can access professional accounting help without carrying the cost of a full-time accounting department.',
    },
    {
      icon: Sparkles,
      title: 'Faster access to professional support',
      description:
        'Clients can communicate through the website, schedule consultations, and solve financial concerns more efficiently.',
    },
    {
      icon: Briefcase,
      title: 'Flexible work for accountants',
      description:
        'Accountants can accept projects based on specialization and availability, creating practical earning opportunities.',
    },
    {
      icon: Users,
      title: 'Mutual value for both sides',
      description:
        'Businesses receive reliable financial guidance while professionals build experience, reputation, and long-term networks.',
    },
  ]

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Customer Benefits
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          The concept paper focuses on a mutually beneficial setup where businesses
          gain accessible support and accountants gain flexible professional
          opportunities.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {benefits.map((benefit) => {
          const Icon = benefit.icon
          return (
            <Card
              key={benefit.title}
              className="border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                <Icon size={24} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{benefit.title}</h3>
              <p className="mt-3 text-slate-600">{benefit.description}</p>
            </Card>
          )
        })}
      </div>

      <div className="mt-16 rounded-3xl border border-slate-200 bg-slate-900 p-10 text-white">
        <h3 className="text-2xl font-bold">Unique Selling Proposition</h3>
        <p className="mt-4 max-w-4xl text-slate-200">
          A flexible hybrid accounting service that combines digital convenience
          and professional expertise to provide accessible, affordable, and
          reliable financial solutions for businesses anytime and anywhere.
        </p>
      </div>
    </section>
  )
}
