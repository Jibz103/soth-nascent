import { CheckCircle, Users, FileText, DollarSign, Briefcase, Award } from 'lucide-react'

export default function HowItWorks() {
  const businessSteps = [
    { icon: Briefcase, title: 'Post Your Task', description: 'Describe your accounting need and get matched with qualified professionals' },
    { icon: Users, title: 'Connect with Expert', description: 'Browse profiles, ratings, and experience to find the perfect accountant' },
    { icon: FileText, title: 'Collaborate Securely', description: 'Share documents and communicate in our secure digital workspace' },
    { icon: DollarSign, title: 'Pay with Confidence', description: 'Secure payment protection until work is completed to your satisfaction' },
  ]

  const accountantSteps = [
    { icon: Award, title: 'Build Your Profile', description: 'Showcase your credentials, certifications, and experience to attract clients' },
    { icon: CheckCircle, title: 'Browse Opportunities', description: 'Discover tasks that match your expertise and set your own rates' },
    { icon: Users, title: 'Collaborate Directly', description: 'Work with clients in a professional digital environment with built-in tools' },
    { icon: DollarSign, title: 'Earn Flexibly', description: 'Get paid securely for completed work without long-term contracts' },
  ]

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-balance">
            How Soth Nascent Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Simple, transparent process for both businesses seeking accounting help and professionals offering expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* For Businesses */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">B</span>
              For Businesses
            </h3>
            <div className="space-y-6">
              {businessSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100">
                        <Icon size={24} className="text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900">{step.title}</h4>
                      <p className="text-slate-600 mt-1">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* For Accountants */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">A</span>
              For Accountants
            </h3>
            <div className="space-y-6">
              {accountantSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100">
                        <Icon size={24} className="text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900">{step.title}</h4>
                      <p className="text-slate-600 mt-1">{step.description}</p>
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
