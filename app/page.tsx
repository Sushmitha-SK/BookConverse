import CTA from '@/components/CTA'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import ScrollReveal from '@/components/ScrollReveal'

const Page = () => {
  return (
    <main className='wrapper container' id='main-content'>
      <ScrollReveal>
        <HeroSection />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <HowItWorks />
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <Features />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <Testimonials />
      </ScrollReveal>

      <ScrollReveal delay={0.25}>
        <Pricing />
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <CTA />
      </ScrollReveal>

      <ScrollReveal delay={0.35}>
        <Footer />
      </ScrollReveal>

    </main>
  )
}

export default Page