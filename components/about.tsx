import { Check } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 text-balance">
              The Soth Nascent Advantage
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              Built on the thesis of modern gig economy accounting, Soth Nascent combines the flexibility of on-demand work with the expertise of certified professionals. We solve the accounting needs gap for growing businesses.
            </p>
            <ul className="space-y-4">
              {[
                'Verified and certified accounting professionals',
                'Flexible engagement without long-term contracts',
                'Specialized accounting expertise (not general freelancing)',
                'Transparent, market-driven pricing',
                'Secure digital workspace and communication',
                'Professional growth opportunities for accountants'
              ].map((item, index) => (
                <li key={index} className="flex gap-3">
                  <Check className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 h-96 flex items-center justify-center">
            <div className="text-center text-blue-600">
              <div className="text-6xl font-bold opacity-10 mb-4">SN</div>
              <p className="text-slate-600">Accounting Marketplace Platform</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
