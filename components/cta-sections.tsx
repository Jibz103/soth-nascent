'use client'

export default function CTASections() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* For Businesses */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border border-blue-200">
            <div className="text-3xl font-bold text-slate-900 mb-4">
              Need Accounting Help?
            </div>
            <p className="text-slate-700 mb-6">
              Connect with verified, affordable accountants without long-term contracts. Post your task today and get matched with the right professional for your needs.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-slate-700">No long-term commitments</span>
              </div>
              <div className="flex gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-slate-700">Flexible, affordable pricing</span>
              </div>
              <div className="flex gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-slate-700">Secure document sharing</span>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-medium rounded-md w-full transition-colors">
              Post Your First Task
            </button>
          </div>

          {/* For Accountants */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 border border-green-200">
            <div className="text-3xl font-bold text-slate-900 mb-4">
              Ready to Earn?
            </div>
            <p className="text-slate-700 mb-6">
              Join our network of verified accounting professionals. Build your client base, set your own rates, and work on projects that match your expertise.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-slate-700">Work on your own schedule</span>
              </div>
              <div className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-slate-700">Set your own rates</span>
              </div>
              <div className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-slate-700">Build professional reputation</span>
              </div>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-medium rounded-md w-full transition-colors">
              Apply as Accountant
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
