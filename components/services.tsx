import { Card } from '@/components/ui/card'
import { BarChart3, FileText, TrendingUp, Calculator, PieChart } from 'lucide-react'

const PesoIcon = () => (
  <span className="text-2xl font-bold">₱</span>
)

export default function Services() {
  const services = [
    {
      icon: FileText,
      title: 'Bookkeeping',
      description: 'Professional bookkeeping services to organize and maintain accurate financial records.'
    },
    {
      icon: Calculator,
      title: 'Tax Assistance',
      description: 'Expert tax planning and preparation to minimize liabilities and maximize savings.'
    },
    {
      icon: BarChart3,
      title: 'Financial Statement Preparation',
      description: 'Comprehensive financial statements prepared by certified accountants.'
    },
    {
      icon: TrendingUp,
      title: 'Financial Advisory',
      description: 'Professional guidance for business growth, planning, and financial decisions.'
    },
    {
      icon: PesoIcon,
      title: 'Payroll Processing',
      description: 'Streamlined payroll management and processing for businesses of all sizes in Philippines.'
    },
    {
      icon: PieChart,
      title: 'Business Registration',
      description: 'Complete setup assistance for business registration and compliance requirements.'
    },
  ]

  return (
    <section id="services" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-balance">
          Available Services on Soth Nascent
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto text-balance">
          Browse our range of accounting expertise. Post your specific need and connect with the right professional.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <Card key={index} className="p-6 border-slate-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Icon size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {service.title}
              </h3>
              <p className="text-slate-600">
                {service.description}
              </p>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
