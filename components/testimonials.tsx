import { Star } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Maria Santos',
      role: 'CEO, Santos Trading Co.',
      type: 'business',
      rating: 5,
      text: 'Finding a reliable accountant was difficult until I discovered Soth Nascent. Within 24 hours, I was matched with an expert who understood my business needs. The transparent pricing and quality of work exceeded my expectations.',
      avatar: 'MS',
    },
    {
      name: 'Juan dela Cruz',
      role: 'CPA, Certified Accountant',
      type: 'accountant',
      rating: 5,
      text: 'As an accountant, I love the flexibility Soth Nascent provides. I can take projects that fit my schedule and expertise. The platform handles payments securely and clients are serious about their work.',
      avatar: 'JD',
    },
    {
      name: 'Tech Startup Manila',
      role: 'Finance Manager',
      type: 'business',
      rating: 4.8,
      text: 'We needed help with payroll and tax compliance. Soth Nascent connected us with an accountant who was not only qualified but also understood startup challenges. Highly professional and responsive.',
      avatar: 'TS',
    },
    {
      name: 'Ana Reyes',
      role: 'Freelance Accountant',
      type: 'accountant',
      rating: 5,
      text: 'The rating system on Soth Nascent has helped me build my reputation. With every positive review, I attract higher-quality clients. It\'s a fair system that rewards good work.',
      avatar: 'AR',
    },
    {
      name: 'Rodrigo Fernandez',
      role: 'Business Owner, Retail',
      type: 'business',
      rating: 4.9,
      text: 'The secure workspace and document sharing features make collaboration seamless. I can monitor the progress of my accounting work in real-time, and communication is always clear and professional.',
      avatar: 'RF',
    },
    {
      name: 'Patricia Lim',
      role: 'Senior Accountant',
      type: 'accountant',
      rating: 5,
      text: 'I appreciate how Soth Nascent connects me with clients who value quality. The feedback system is transparent, and it\'s motivating to see clients recognize good work with positive reviews.',
      avatar: 'PL',
    },
  ]

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}
          />
        ))}
      </div>
    )
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          Real Feedback from Our Community
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          See what businesses and accountants are saying about their experience on Soth Nascent
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="p-6 border-slate-200 flex flex-col hover:shadow-lg transition"
          >
            {/* Rating Stars */}
            <div className="mb-4">
              <StarRating rating={testimonial.rating} />
            </div>

            {/* Review Text */}
            <p className="text-slate-600 mb-6 flex-grow italic">{`"${testimonial.text}"`}</p>

            {/* Reviewer Info */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm ${
                testimonial.type === 'business' ? 'bg-blue-600' : 'bg-green-600'
              }`}>
                {testimonial.avatar}
              </div>
              <div>
                <div className="font-semibold text-slate-900">{testimonial.name}</div>
                <div className="text-sm text-slate-500">{testimonial.role}</div>
                <div className="text-xs text-slate-400 mt-1">
                  {testimonial.type === 'business' ? 'Business' : 'Accountant'}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Rating Statistics */}
      <div className="mt-20 bg-blue-50 rounded-lg p-12 border border-blue-100">
        <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
          Platform Rating & Feedback Metrics
        </h3>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">4.9★</div>
            <p className="text-slate-600">Overall Platform Rating</p>
            <p className="text-sm text-slate-500 mt-2">Based on 2,300+ reviews</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
            <p className="text-slate-600">Positive Feedback Rate</p>
            <p className="text-sm text-slate-500 mt-2">4-5 star ratings</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">2.4hrs</div>
            <p className="text-slate-600">Avg. Response Time</p>
            <p className="text-sm text-slate-500 mt-2">From accountants</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">99.2%</div>
            <p className="text-slate-600">Job Completion Rate</p>
            <p className="text-sm text-slate-500 mt-2">Tasks completed on time</p>
          </div>
        </div>
      </div>

      {/* Rating System Features */}
      <div className="mt-16 grid md:grid-cols-3 gap-8">
        <div className="border border-slate-200 rounded-lg p-6">
          <div className="text-2xl font-bold text-blue-600 mb-2">⭐ Two-Way Ratings</div>
          <p className="text-slate-600">Both businesses and accountants rate each other, creating a fair and transparent feedback system that ensures quality on both sides.</p>
        </div>
        <div className="border border-slate-200 rounded-lg p-6">
          <div className="text-2xl font-bold text-green-600 mb-2">💬 Detailed Reviews</div>
          <p className="text-slate-600">Users can leave detailed feedback highlighting specific strengths - communication, accuracy, timeliness, and professionalism - helping others make informed decisions.</p>
        </div>
        <div className="border border-slate-200 rounded-lg p-6">
          <div className="text-2xl font-bold text-purple-600 mb-2">✓ Verified Reviews</div>
          <p className="text-slate-600">Only completed transactions can generate reviews, ensuring all feedback comes from genuine experiences on the platform.</p>
        </div>
      </div>
    </section>
  )
}
