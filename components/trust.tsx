import { CheckCircle2, Users, Award, Zap } from 'lucide-react'

export default function Trust() {
  const trustMetrics = [
    { icon: CheckCircle2, number: '1000+', label: 'Verified Accountants' },
    { icon: Users, number: '5000+', label: 'Active Businesses' },
    { icon: Award, number: '4.8★', label: 'Average Rating' },
    { icon: Zap, number: '$2M+', label: 'Work Completed' },
  ]

  return (
    <section className="bg-blue-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Trusted by Professionals & Businesses
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our verification process ensures quality, transparency, and security for every transaction
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {trustMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <Icon size={40} className="text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{metric.number}</div>
                <div className="text-slate-600">{metric.label}</div>
              </div>
            )
          })}
        </div>

        <div className="bg-white rounded-lg p-8 border border-slate-200 mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Verification & Feedback System</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">Step 1</div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Credential Verification</h4>
              <p className="text-slate-600">All accountants must verify their professional certifications (CPA, CA, etc.) and relevant qualifications before joining the platform.</p>
            </div>
            <div>
              <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">Step 2</div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Background Check</h4>
              <p className="text-slate-600">We conduct thorough background checks to ensure compliance and professionalism standards on the marketplace.</p>
            </div>
            <div>
              <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">Step 3</div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Community Ratings</h4>
              <p className="text-slate-600">Real client feedback and two-way ratings ensure accountability and continuous quality improvement for all participants.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-6">How Our Feedback & Rating System Works</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-3">For Businesses</h4>
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="font-bold">1.</span>
                  <span>Rate your accountant after job completion (1-5 stars)</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold">2.</span>
                  <span>Leave detailed review on communication, quality, and timeliness</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold">3.</span>
                  <span>Help other businesses find trustworthy professionals</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold">4.</span>
                  <span>Ratings directly impact accountant visibility and opportunities</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">For Accountants</h4>
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="font-bold">1.</span>
                  <span>Get rated by clients on professionalism and expertise</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold">2.</span>
                  <span>Rate clients on clarity of requirements and timeliness</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold">3.</span>
                  <span>Build reputation through consistent quality work</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold">4.</span>
                  <span>Higher ratings unlock premium job opportunities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
