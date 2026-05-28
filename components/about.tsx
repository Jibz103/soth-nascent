import { Check, Lightbulb, Target } from 'lucide-react'

export default function About() {
  const platformPoints = [
    'Accessible accounting support for SMEs, startups, freelancers, and online sellers',
    'Secure digital communication and document handling',
    'Flexible service arrangements instead of fixed long-term contracts',
    'Professional guidance for bookkeeping, payroll, tax, and business decisions',
    'A specialized platform focused on accounting, not general freelancing',
    'Role-based access for admin, accountant, and client workflows',
  ]

  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Vision, Mission, and Platform Direction
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            This website now follows the concept paper by presenting Soth Nascent
            as a trusted hybrid accounting platform for the digital economy.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <Lightbulb size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Company Vision</h3>
              <p className="mt-4 text-slate-600">
                To become a leading and trusted hybrid accounting service platform
                that empowers businesses and individuals through accessible,
                innovative, and reliable financial solutions.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Company Mission</h3>
              <p className="mt-4 text-slate-600">
                To deliver flexible, affordable, and high-quality accounting
                services through a secure and user-friendly digital platform that
                connects clients with verified accounting professionals.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#0f172a_0%,#16213d_100%)] p-8 text-white">
            <h3 className="text-2xl font-bold">Why Soth Nascent Stands Out</h3>
            <p className="mt-4 text-slate-300">
              The website positions the business as a focused accounting platform
              with the convenience of digital workflows and the reliability of
              personalized professional service.
            </p>
            <ul className="mt-8 space-y-4">
              {platformPoints.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-0.5 shrink-0 text-cyan-300" size={20} />
                  <span className="text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
