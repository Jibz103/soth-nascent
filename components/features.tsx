import { Card } from '@/components/ui/card'
import { Shield, Star, DollarSign, Zap, Lock, TrendingUp } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Shield,
      title: 'Verified Professionals',
      description: 'All accountants are credential-verified, ensuring you work with qualified experts with proven track records.'
    },
    {
      icon: Star,
      title: 'Transparent Ratings',
      description: 'Real feedback from clients builds trust. Review ratings, testimonials, and specializations before hiring.'
    },
    {
      icon: Lock,
      title: 'Secure Workspace',
      description: 'Encrypted document sharing, secure messaging, and protected payments keep your financial data safe.'
    },
    {
      icon: DollarSign,
      title: 'Flexible Pricing',
      description: 'No long-term contracts or hidden fees. Pay only for services you use at rates you agree on upfront.'
    },
    {
      icon: Zap,
      title: 'Quick Turnaround',
      description: 'Access to a network of available accountants means faster response times and quick project completion.'
    },
    {
      icon: TrendingUp,
      title: 'Professional Growth',
      description: 'For accountants: build your client base, grow your reputation, and earn on your own schedule.'
    },
  ]

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-balance">
          Why Choose Soth Nascent
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          A specialized accounting marketplace combining the flexibility of gig work with the expertise of certified professionals
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Card key={index} className="p-6 border-slate-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Icon size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600">
                {feature.description}
              </p>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
