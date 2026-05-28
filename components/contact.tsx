'use client'

import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', company: '', message: '' })
      setTimeout(() => setSubmitStatus(''), 5000)
    } catch {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(''), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Contact Soth Nascent
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Reach out for accounting consultations, platform inquiries, or support
          related to bookkeeping, payroll, taxation, and business registration.
        </p>
      </div>

      <div className="mb-12 grid gap-6 md:grid-cols-3">
        <Card className="border-slate-200 p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
            <Phone className="text-blue-600" size={24} />
          </div>
          <h3 className="mb-2 font-semibold text-slate-900">Phone</h3>
          <p className="text-slate-600">+63 917 555 0142</p>
        </Card>
        <Card className="border-slate-200 p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
            <Mail className="text-blue-600" size={24} />
          </div>
          <h3 className="mb-2 font-semibold text-slate-900">Email</h3>
          <p className="text-slate-600">hello@sothnascent.com</p>
        </Card>
        <Card className="border-slate-200 p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
            <MapPin className="text-blue-600" size={24} />
          </div>
          <h3 className="mb-2 font-semibold text-slate-900">Office</h3>
          <p className="text-slate-600">Manila, Philippines</p>
        </Card>
      </div>

      <Card className="mx-auto max-w-2xl border-slate-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-900">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Juan Dela Cruz"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="juan@example.com"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-900">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="+63 900 000 0000"
              />
            </div>
            <div>
              <label htmlFor="company" className="mb-2 block text-sm font-medium text-slate-900">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Your business name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-900">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-2 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="Tell us whether you need bookkeeping, tax support, payroll, advisory, or registration help."
            />
          </div>

          {submitStatus === 'success' ? (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
              Thank you. Your inquiry has been received successfully.
            </div>
          ) : null}

          {submitStatus === 'error' ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
              Something went wrong. Please try again.
            </div>
          ) : null}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full bg-slate-900 text-white hover:bg-slate-800"
          >
            {isSubmitting ? 'Sending...' : 'Send Inquiry'}
          </Button>
        </form>
      </Card>
    </section>
  )
}
