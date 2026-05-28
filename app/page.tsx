import Header from '@/components/header'
import Hero from '@/components/hero'
import HowItWorks from '@/components/how-it-works'
import Features from '@/components/features'
import Services from '@/components/services'
import Trust from '@/components/trust'
import Testimonials from '@/components/testimonials'
import About from '@/components/about'
import CTASections from '@/components/cta-sections'
import Contact from '@/components/contact'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_48%,#eff8f6_100%)]">
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      <Services />
      <Trust />
      <Testimonials />
      <About />
      <div id="cta">
        <CTASections />
      </div>
      <Contact />
      <Footer />
    </main>
  )
}
